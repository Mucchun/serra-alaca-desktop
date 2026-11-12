/* =========================================================
   Desktop extras, on top of the window manager in app.js:
   - View and Window menus, and a right-click menu
   - wallpapers (day, plaid, sunset, night)
   - desktop icons you can drag around
   - search (Ctrl or Cmd + K, or the / key)
   - a small terminal
   ========================================================= */

function remember(key, value) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Private windows can refuse storage; the feature still works for this visit.
  }
}

function recall(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return null;
  }
}

// The desktop itself never scrolls; undo it if focusing something off screen nudges it.
stage.addEventListener("scroll", () => {
  if (isCompact()) return;
  stage.scrollTop = 0;
  stage.scrollLeft = 0;
});

/* =========================================================
   Wallpapers
   ========================================================= */

const WALLPAPERS = [
  { id: "day", label: "Day" },
  { id: "plaid", label: "Plaid" },
  { id: "sunset", label: "Sunset" },
  { id: "night", label: "Night" }
];

function currentWallpaper() {
  return document.documentElement.dataset.sky || "day";
}

function setWallpaper(id) {
  if (!WALLPAPERS.some((wallpaper) => wallpaper.id === id)) return false;
  document.documentElement.dataset.sky = id;
  remember("sa-sky", id);
  return true;
}

setWallpaper(recall("sa-sky") || "day");

/* =========================================================
   Pop-up menus (used by the menu bar and by right-click)
   Items: { label, action, checked, disabled } or "-" for a line.
   ========================================================= */

let openMenu = null;

function closeMenu(returnFocus) {
  if (!openMenu) return;
  const { element, owner } = openMenu;
  element.remove();
  if (owner) owner.setAttribute("aria-expanded", "false");
  openMenu = null;
  if (returnFocus && owner) owner.focus();
}

function showMenu(items, x, y, owner) {
  closeMenu(false);
  const element = document.createElement("div");
  element.className = "menu";
  element.setAttribute("role", "menu");

  items.forEach((item) => {
    if (item === "-") {
      const line = document.createElement("div");
      line.className = "menu-line";
      line.setAttribute("role", "separator");
      element.appendChild(line);
      return;
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = "menu-item";
    button.setAttribute("role", item.checked === undefined ? "menuitem" : "menuitemradio");
    if (item.checked !== undefined) button.setAttribute("aria-checked", String(item.checked));
    button.disabled = Boolean(item.disabled);
    button.textContent = item.label;
    if (item.hint) {
      const hint = document.createElement("kbd");
      hint.textContent = item.hint;
      button.appendChild(hint);
    }
    button.addEventListener("click", () => {
      closeMenu(false);
      item.action();
    });
    element.appendChild(button);
  });

  document.body.appendChild(element);
  // Keep the whole menu on screen.
  element.style.left = `${Math.max(6, Math.min(x, window.innerWidth - element.offsetWidth - 6))}px`;
  element.style.top = `${Math.max(6, Math.min(y, window.innerHeight - element.offsetHeight - 6))}px`;

  element.addEventListener("keydown", (event) => {
    const choices = [...element.querySelectorAll(".menu-item:not(:disabled)")];
    const at = choices.indexOf(document.activeElement);
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const next = at + (event.key === "ArrowDown" ? 1 : -1);
      choices[(next + choices.length) % choices.length].focus();
    } else if (event.key === "Escape" || event.key === "Tab") {
      event.preventDefault();
      event.stopPropagation(); // don't also close the window behind
      closeMenu(true);
    }
  });

  openMenu = { element, owner };
  if (owner) owner.setAttribute("aria-expanded", "true");
  const first = element.querySelector(".menu-item:not(:disabled)");
  if (first) first.focus();
}

document.addEventListener("pointerdown", (event) => {
  if (openMenu && !openMenu.element.contains(event.target) && !event.target.closest("[data-menu]")) closeMenu(false);
});
window.addEventListener("resize", () => closeMenu(false));
window.addEventListener("blur", () => closeMenu(false));

function wallpaperItems() {
  return WALLPAPERS.map((wallpaper) => ({
    label: `${wallpaper.label} wallpaper`,
    checked: currentWallpaper() === wallpaper.id,
    action: () => setWallpaper(wallpaper.id)
  }));
}

const MENUS = {
  view: () => [
    ...wallpaperItems(),
    "-",
    { label: "Tidy up icons", action: tidyIcons, disabled: isCompact() },
    "-",
    { label: "Search", hint: "/", action: openSearch },
    { label: "Open Terminal", action: () => openWindow("terminal", null) }
  ],
  window: () => {
    const entries = [...openWindows.values()];
    const front = visibleWindows().pop();
    if (!entries.length) return [{ label: "No open windows", disabled: true, action: () => {} }];
    return [
      ...entries.map((entry) => ({
        label: WINDOWS[entry.id].title + (entry.win.hidden ? " (minimised)" : ""),
        checked: entry === front,
        action: () => openWindow(entry.id, null)
      })),
      "-",
      { label: "Minimise all", action: () => entries.forEach((entry) => minimiseWindow(entry.id)) },
      { label: "Close all", action: closeAllWindows }
    ];
  }
};

document.querySelectorAll("[data-menu]").forEach((button) => {
  button.addEventListener("click", () => {
    if (openMenu && openMenu.owner === button) {
      closeMenu(false);
      return;
    }
    const box = button.getBoundingClientRect();
    showMenu(MENUS[button.dataset.menu](), box.left, box.bottom + 3, button);
  });
});

// Right-click on the desktop (windows keep the browser's own menu, for copying links and text).
stage.addEventListener("contextmenu", (event) => {
  if (event.target.closest(".window, a, input")) return;
  event.preventDefault();
  const icon = event.target.closest(".icons .icon");
  const items = [];
  if (icon) {
    items.push({ label: `Open ${icon.textContent.trim()}`, action: () => openWindow(icon.dataset.open, icon) }, "-");
  }
  items.push(
    { label: "Search", hint: "/", action: openSearch },
    { label: "Open Terminal", action: () => openWindow("terminal", null) },
    "-",
    ...wallpaperItems(),
    "-",
    { label: "Tidy up icons", action: tidyIcons, disabled: isCompact() },
    { label: "Close all windows", action: closeAllWindows, disabled: openWindows.size === 0 }
  );
  showMenu(items, event.clientX, event.clientY, null);
});

/* =========================================================
   Desktop icons you can drag. A plain click still opens them.
   ========================================================= */

const iconButtons = [...iconsRoot.querySelectorAll(".icon")];

function placeIcons(saved) {
  iconButtons.forEach((button, index) => {
    const home = DESKTOP_ICONS[index];
    const spot = (saved && saved[home.open]) || home;
    button.style.setProperty("--x", `${spot.x}%`);
    button.style.setProperty("--y", `${spot.y}%`);
  });
}

function tidyIcons() {
  remember("sa-icons-2", null);
  placeIcons(null);
}

placeIcons(recall("sa-icons-2"));

iconButtons.forEach((button) => {
  button.addEventListener("pointerdown", (event) => {
    if (isCompact() || event.button !== 0) return;
    const startX = event.clientX;
    const startY = event.clientY;
    const offsetX = event.clientX - button.offsetLeft;
    const offsetY = event.clientY - button.offsetTop;
    let dragging = false;

    function move(moveEvent) {
      // A small wobble while clicking shouldn't count as a drag.
      if (!dragging && Math.hypot(moveEvent.clientX - startX, moveEvent.clientY - startY) < 6) return;
      dragging = true;
      button.classList.add("is-dragging");
      const maxX = stage.clientWidth - button.offsetWidth;
      const maxY = stage.clientHeight - button.offsetHeight;
      const x = Math.min(maxX, Math.max(0, moveEvent.clientX - offsetX));
      const y = Math.min(maxY, Math.max(0, moveEvent.clientY - offsetY));
      button.style.setProperty("--x", `${((x / stage.clientWidth) * 100).toFixed(2)}%`);
      button.style.setProperty("--y", `${((y / stage.clientHeight) * 100).toFixed(2)}%`);
    }
    function drop() {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", drop);
      window.removeEventListener("pointercancel", drop);
      if (!dragging) return;
      button.classList.remove("is-dragging");
      // Swallow the click that follows the drop, so the icon doesn't also open.
      const swallow = (clickEvent) => clickEvent.stopPropagation();
      window.addEventListener("click", swallow, { capture: true, once: true });
      setTimeout(() => {
        window.removeEventListener("click", swallow, { capture: true });
        const saved = {};
        iconButtons.forEach((other, index) => {
          saved[DESKTOP_ICONS[index].open] = {
            x: parseFloat(other.style.getPropertyValue("--x")),
            y: parseFloat(other.style.getPropertyValue("--y"))
          };
        });
        remember("sa-icons-2", saved);
      }, 0);
    }
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", drop);
    window.addEventListener("pointercancel", drop);
  });
});

/* =========================================================
   Search
   ========================================================= */

const searchDialog = document.querySelector("#search");
const searchInput = searchDialog.querySelector("input");
const searchList = searchDialog.querySelector(".search-results");

// After opening a window, scroll to the entry with this heading and flash it.
function revealEntry(windowId, heading) {
  openWindow(windowId, null);
  const entry = openWindows.get(windowId);
  if (!entry || !heading) return;
  const match = [...entry.win.querySelectorAll("h3, figcaption")].find((element) => element.textContent.trim() === heading);
  if (!match) return;
  const target = match.closest("li, article, figure") || match;
  target.scrollIntoView({ block: "center" });
  target.classList.remove("is-found");
  void target.offsetWidth; // restart the flash
  target.classList.add("is-found");
}

const SEARCH_INDEX = [
  ...["about", "art", "code", "experience", "education", "contact", "cv", "terminal"].map((id) => ({
    kind: "Window",
    title: id === "terminal" ? "Terminal" : WINDOWS[id].title,
    words: id,
    go: () => openWindow(id, null)
  })),
  ...ART.flatMap((folder) => [
    { kind: "Art folder", title: folder.name, words: folder.intro, go: () => openWindow(folder.id, null) },
    ...folder.images.map((image) => ({
      kind: "Artwork",
      title: image.caption,
      words: `${folder.name} ${image.alt}`,
      go: () => revealEntry(folder.id, image.caption)
    }))
  ]),
  ...CODE.map((project) => ({
    kind: "Project",
    title: project.name,
    words: `${project.text} ${project.tags}`,
    go: () => revealEntry("code", project.name)
  })),
  ...EXPERIENCE.map((item) => ({
    kind: "Experience",
    title: item.title,
    words: `${item.when} ${item.meta || ""} ${(item.points || []).join(" ")}`,
    go: () => revealEntry("experience", item.title)
  })),
  ...EDUCATION.map((item) => ({
    kind: "Education",
    title: item.title,
    words: `${item.when} ${item.meta || ""} ${item.text || ""} ${(item.points || []).join(" ")}`,
    go: () => revealEntry("education", item.title)
  }))
];

let searchMatches = [];
let searchAt = 0;

function renderSearch() {
  const terms = searchInput.value.toLowerCase().split(/\s+/).filter(Boolean);
  const scored = SEARCH_INDEX.map((entry) => {
    const title = entry.title.toLowerCase();
    const all = `${title} ${entry.kind} ${entry.words}`.toLowerCase();
    if (!terms.every((term) => all.includes(term))) return null;
    // Matches in the title rank above matches in the description.
    const score = terms.reduce((sum, term) => sum + (title.startsWith(term) ? 3 : title.includes(term) ? 2 : 1), 0);
    return { entry, score };
  }).filter(Boolean);
  if (terms.length) scored.sort((one, two) => two.score - one.score);
  searchMatches = (terms.length ? scored : scored.filter((match) => match.entry.kind === "Window")).slice(0, 8).map((match) => match.entry);
  searchAt = 0;

  searchList.innerHTML = "";
  searchMatches.forEach((entry, index) => {
    const row = document.createElement("li");
    row.id = `search-option-${index}`;
    row.setAttribute("role", "option");
    const title = document.createElement("strong");
    title.textContent = entry.title;
    const kind = document.createElement("span");
    kind.textContent = entry.kind;
    row.append(title, kind);
    row.addEventListener("click", () => chooseSearch(index));
    row.addEventListener("pointermove", () => highlightSearch(index));
    searchList.appendChild(row);
  });
  if (!searchMatches.length) {
    const empty = document.createElement("li");
    empty.className = "search-empty";
    empty.textContent = `Nothing matches "${searchInput.value.trim()}". Try a project name, a tool or a year.`;
    searchList.appendChild(empty);
  }
  highlightSearch(0);
}

function highlightSearch(index) {
  if (!searchMatches.length) {
    searchInput.removeAttribute("aria-activedescendant");
    return;
  }
  searchAt = (index + searchMatches.length) % searchMatches.length;
  [...searchList.children].forEach((row, rowIndex) => row.setAttribute("aria-selected", String(rowIndex === searchAt)));
  searchInput.setAttribute("aria-activedescendant", `search-option-${searchAt}`);
  searchList.children[searchAt].scrollIntoView({ block: "nearest" });
}

function chooseSearch(index) {
  const entry = searchMatches[index];
  if (!entry) return;
  searchDialog.close();
  entry.go();
}

function openSearch() {
  if (typeof searchDialog.showModal !== "function" || searchDialog.open) return;
  searchInput.value = "";
  renderSearch();
  searchDialog.showModal();
  searchInput.focus();
}

searchInput.addEventListener("input", renderSearch);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    highlightSearch(searchAt + (event.key === "ArrowDown" ? 1 : -1));
  } else if (event.key === "Enter") {
    event.preventDefault();
    chooseSearch(searchAt);
  }
});
searchDialog.addEventListener("click", (event) => {
  if (event.target === searchDialog) searchDialog.close();
});
document.querySelector("#search-button").addEventListener("click", openSearch);

document.addEventListener("keydown", (event) => {
  const typing = event.target.closest("input, textarea, select");
  const shortcut = (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) || (event.key === "/" && !typing);
  if (!shortcut || document.querySelector("dialog[open]")) return;
  event.preventDefault();
  openSearch();
});

/* =========================================================
   Terminal
   ========================================================= */

WINDOWS.terminal = {
  title: "Terminal",
  size: "medium",
  html: () => `
    <div class="terminal">
      <div class="terminal-out" role="log" aria-live="polite"></div>
      <form class="terminal-line" autocomplete="off">
        <label for="terminal-input">serra@portfolio:~$</label>
        <input id="terminal-input" type="text" spellcheck="false" autocapitalize="off" autocorrect="off" aria-describedby="terminal-tip">
      </form>
      <p class="terminal-tip" id="terminal-tip">Type help and press Enter.</p>
    </div>`,
  onOpen: startTerminal
};

const TERMINAL_WINDOWS = ["about", "art", "code", "experience", "education", "contact", "cv", ...ART.map((folder) => folder.id)];

function startTerminal(win) {
  const out = win.querySelector(".terminal-out");
  const form = win.querySelector("form");
  const input = win.querySelector("input");
  const body = win.querySelector(".window-body");
  const history = [];
  let historyAt = 0;

  function print(text, className) {
    const line = document.createElement("p");
    if (className) line.className = className;
    line.textContent = text;
    out.appendChild(line);
    return line;
  }

  function printLink(label, url) {
    const line = document.createElement("p");
    const link = document.createElement("a");
    link.href = url;
    link.textContent = url.replace(/^mailto:/, "");
    if (url.startsWith("http")) {
      link.target = "_blank";
      link.rel = "noopener";
    }
    line.append(`${label}  `, link);
    out.appendChild(line);
  }

  function showProject(project, number) {
    print(`${number}. ${project.name}`, "is-strong");
    print(project.text);
    print(project.tags);
    if (project.url) printLink("GitHub", project.url);
    else print("Private repository.");
    if (project.demo) printLink(project.demoLabel, project.demo);
  }

  const commands = {
    help: () => {
      [
        ["about", "who I am"],
        ["skills", "languages, engines and tools"],
        ["projects", "list my code projects"],
        ["project <number or name>", "details and links for one project"],
        ["experience", "work history"],
        ["education", "degrees and awards"],
        ["contact", "how to reach me"],
        ["ls", "list the windows you can open"],
        ["open <name>", "open a window, for example: open art"],
        ["cv", "open my CV"],
        ["wallpaper <day|plaid|sunset|night>", "change the wallpaper"],
        ["date", "today's date and time"],
        ["clear", "clear the screen"]
      ].forEach(([name, what]) => print(`${name.padEnd(38)}${what}`));
    },
    about: () => {
      print("Serra Alaca", "is-strong");
      print("Game developer, designer and software engineer, based in Central London.");
      print("Junior developer specializing in software engineering, game development, gameplay programming, and real-time systems. Also a versatile designer across game design, 3D art and interactive design.");
    },
    whoami: () => commands.about(),
    skills: () => {
      print("Code      Python, SQL, HTML, C++, C#, Blueprints, JavaScript, TypeScript");
      print("Engines   Unreal Engine, Unity");
      print("3D        Maya 2025, ZBrush, Marmoset Toolbag");
      print("Also      DaVinci Resolve, Oracle SQL, Adobe, Visual Studio, Figma");
    },
    projects: () => {
      CODE.forEach((project, index) => print(`${String(index + 1).padStart(2)}. ${project.name}`));
      print("Type project and a number for details.", "is-dim");
    },
    project: (rest) => {
      if (!rest) return print("Which one? For example: project 1", "is-dim");
      const number = Number(rest);
      const index = Number.isInteger(number) ? number - 1 : CODE.findIndex((project) => project.name.toLowerCase().includes(rest.toLowerCase()));
      if (!CODE[index]) return print(`No project matches "${rest}". Type projects to see the list.`, "is-error");
      showProject(CODE[index], index + 1);
    },
    experience: () => {
      EXPERIENCE.forEach((item) => print(`${item.when.padEnd(22)}${item.title}`));
      print("Type open experience for the details.", "is-dim");
    },
    education: () => {
      EDUCATION.forEach((item) => print(`${item.when.padEnd(22)}${item.title}${item.meta ? `, ${item.meta}` : ""}`));
    },
    contact: () => CONTACT.forEach((item) => printLink(item.label.padEnd(10), item.url)),
    ls: () => print(TERMINAL_WINDOWS.join("   ")),
    open: (rest) => {
      const id = TERMINAL_WINDOWS.find((name) => name === rest.toLowerCase());
      if (!id) return print(`Can't find "${rest}". Type ls to see what you can open.`, "is-error");
      print(`Opening ${WINDOWS[id].title}.`);
      openWindow(id, input);
    },
    cv: () => {
      print("Opening the CV window.");
      openWindow("cv", input);
    },
    wallpaper: (rest) => {
      if (setWallpaper(rest.toLowerCase())) print(`Wallpaper set to ${rest.toLowerCase()}.`);
      else print("Choose one of: day, plaid, sunset, night. For example: wallpaper night", "is-error");
    },
    date: () => print(new Date().toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" })),
    clear: () => {
      out.innerHTML = "";
    }
  };

  print("Serra Alaca's portfolio, in a terminal.", "is-strong");
  print("Type help to see the commands.", "is-dim");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const typed = input.value.trim();
    input.value = "";
    if (!typed) return;
    history.push(typed);
    historyAt = history.length;
    print(`$ ${typed}`, "is-command");
    const [name, ...rest] = typed.split(/\s+/);
    const command = Object.hasOwn(commands, name.toLowerCase()) && commands[name.toLowerCase()];
    if (command) command(rest.join(" "));
    else print(`Unknown command: ${name}. Type help to see the commands.`, "is-error");
    body.scrollTop = body.scrollHeight;
  });

  // Up and down walk through what you typed before.
  input.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    historyAt = Math.min(history.length, Math.max(0, historyAt + (event.key === "ArrowUp" ? -1 : 1)));
    input.value = history[historyAt] || "";
  });

  // Clicking anywhere in the terminal puts the cursor in the prompt (unless you're selecting text).
  body.addEventListener("click", (event) => {
    if (!event.target.closest("a") && !String(window.getSelection())) input.focus();
  });
  // On phones, wait for a tap before bringing up the keyboard.
  if (!isCompact()) input.focus();
}
