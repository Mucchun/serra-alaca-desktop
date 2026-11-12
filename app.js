/* =========================================================
   EDIT YOUR CONTENT HERE
   - ART: each entry becomes a folder on the desktop.
   - CODE, EXPERIENCE, EDUCATION: lists shown inside windows.
   - x / y are the icon's position on the desktop, in percent.
   ========================================================= */

const ART = [
  {
    id: "ephesus",
    name: "Ephesus",
    x: 74,
    y: 9,
    intro: "Environment piece.",
    images: [
      { src: "assets/artstation/ephesus.jpg", caption: "Ephesus", alt: "A ruined classical library facade with columns and arches, glowing orange in smoke under a large sun.", wide: true },
      { src: "assets/artstation/ephesus-alt.jpg", caption: "Ephesus, alternate shot", alt: "The same ruined facade seen straight on through thick orange smoke.", wide: true }
    ]
  },
  {
    id: "character",
    name: "Character",
    x: 88,
    y: 21,
    intro: "Character model, from T-pose to presentation sheet.",
    images: [
      { src: "assets/artstation/character-model.webp", caption: "Character model sheet", alt: "Presentation sheet for a 3D character: front, side and back views, close-ups, and untextured and UV-checker versions.", wide: true },
      { src: "assets/artstation/character-detail.webp", caption: "T-pose", alt: "A 3D character model in T-pose wearing a white shirt, brown waistcoat and belt holsters." },
      { src: "assets/artstation/aether.jpg", caption: "Aether", alt: "The same character standing against a field of blue stars." }
    ]
  },
  {
    id: "tartarus",
    name: "To Tartarus",
    x: 79,
    y: 36,
    intro: "Illustration.",
    images: [
      { src: "assets/artstation/to-tartarus.jpg", caption: "To Tartarus", alt: "Illustrated title art in electric blue: a figure holding a glowing light in a cave of blue flames, with a dark castle behind.", wide: true }
    ]
  },
  {
    id: "props",
    name: "Props",
    x: 88,
    y: 49,
    intro: "Prop and asset models.",
    images: [
      { src: "assets/artstation/sundial.jpg", caption: "Sundial", alt: "A carved stone sundial with a raised gnomon and lettered rim, shown from three angles." },
      { src: "assets/artstation/sundial-closeup.webp", caption: "Sundial, close-up", alt: "Top-down close-up of the carved sundial face." },
      { src: "assets/artstation/steampunk-device.webp", caption: "Steampunk device", alt: "A steampunk case with a clock face, brass dials and a numbered keypad, shown from three angles." },
      { src: "assets/artstation/magical-tree.webp", caption: "Magical tree", alt: "A sculpted tree with a thick twisted trunk and golden foliage, shown from three angles." }
    ]
  }
];

const CODE = [
  { name: "Zebra Circus Blaster", url: "https://github.com/Mucchun/zebra-circus-game", demo: "https://zebra-circus-game.vercel.app", demoLabel: "Play it", text: "A first-person blaster browser game that doubles as a Zebra Technologies product showcase. Shoot barcode-balloon targets in a circus tent and pick up real Zebra devices as weapons.", tags: "Three.js, JavaScript, game" },
  { name: "Carnival", url: "https://github.com/Mucchun/Carnival", text: "An Unreal Engine supported C++ game development project with gameplay files, content structure, and implementation work in GitHub.", tags: "C++, Unreal Engine, gameplay code" },
  { name: "Cupid's 21", url: "https://github.com/Mucchun/cupids-table", text: "A browser card game: play 21 at Cupid's table against Eros.", tags: "HTML, JavaScript, game" },
  { name: "Spatial Replay", url: "https://github.com/Mucchun/spatial-replay", text: "Walk inside your footage: flat video becomes an explorable 4D world. Built for the VAST Builders Challenge.", tags: "JavaScript, YOLO, homography, Three.js" },
  { name: "POLIS", url: "https://github.com/Mucchun/polis", text: "Parliamentary Intelligence System. Turns any UK bill into a structured policy brief, with autonomous agents that fetch live parliamentary data, score demographic impacts and run a multi-stakeholder debate. Built for the UK AI Agent Hackathon EP5 at Imperial College London.", tags: "TypeScript, AI agents" },
  { name: "Luna Health", url: "https://github.com/Mucchun/luna-health", text: "A women's health app for PCOS, Endometriosis and PMDD: cycle tracking, AI insights and an anonymous community.", tags: "TypeScript, health, AI" },
  { name: "Assistive Web App", url: "https://github.com/Mucchun/assistive-web-app", demo: "https://project-3eq72.vercel.app", demoLabel: "Live demo", text: "A real-time mobile object detection and audio guidance system for visually impaired users using TensorFlow.js COCO-SSD.", tags: "TypeScript, TensorFlow.js, accessibility" },
  { name: "Assistive Object Detection Demo", url: "https://github.com/Mucchun/assistive-object-detection-app-demo", text: "A mobile object detection and audio guidance application for visually impaired users.", tags: "JavaScript, accessibility" },
  { name: "PlainLaunch", url: "", text: "A Codeplain-native launch planner that turns rough AI startup ideas into structured specs, pricing models, tests, launch copy, proof scans, and judge packets.", tags: "JavaScript, HTML/CSS, product specs" },
  { name: "Diabetes Data Analytics", url: "https://github.com/Mucchun/DiabetesDataAnalytics", text: "Investigates causal relationships in diabetes and cardiovascular health data using Bayesian structure learning and Bayesian networks, comparing learning algorithms against a knowledge-based DAG.", tags: "Bayesian networks, data analysis" },
  { name: "London Underground Trains Database", url: "https://github.com/Mucchun/London-Underground-Trains-Database-SQL", text: "A database project for tracking check-in and check-out data for London Underground train journeys.", tags: "SQL, database design, transport data" },
  { name: "UKHSA Influenza Data Dashboard", url: "https://github.com/Mucchun/UKSHA-Influenza-Data-Dashboard", text: "A public-health data dashboard project using UKHSA influenza API data and notebook-based analysis.", tags: "Jupyter, data dashboard, public health" },
  { name: "MoMA Artwork Department Classifier", url: "https://github.com/Mucchun/Classification-of-MoMA-Artworks-by-Department-using-Logistic-Regression-and-K-Nearest-Neighbours", text: "A data analytics project classifying MoMA artworks by department with logistic regression and K-nearest neighbours.", tags: "Jupyter, logistic regression, KNN" },
  { name: "Serra Alaca Portfolio", url: "https://github.com/Mucchun/serra-alaca-portfolio", demo: "https://mucchun.github.io/serra-alaca-portfolio/", demoLabel: "Visit", text: "My main portfolio site, with a 3D ancient-temple scene.", tags: "JavaScript, Three.js, HTML/CSS" },
  { name: "Mucchun.github.io", url: "https://github.com/Mucchun/Mucchun.github.io", demo: "https://mucchun.github.io/", demoLabel: "Visit", text: "Experimental website design using HTML.", tags: "HTML" }
];

const EXPERIENCE = [
  { when: "Nov 2026 - Present", title: "Software Intern / ElCode", points: ["Managing the construction of the \"cat ate the elephant\" animation tool, enhancing user engagement.", "Contributing to digital marketing strategies, improving brand visibility and outreach.", "Assisting in software integrations, streamlining project workflows and enhancing team collaboration."] },
  { when: "Sep 2026 - Present", title: "AI Creative Technologist / Phenomena Creative Advisory", points: ["Collaborating to create an innovative 3D (WebGL / Three.js / Next.js) project for a healthcare company.", "Assisting in coding the website, ensuring functionality and user experience.", "Contributing to the design process, integrating creative solutions to enhance visual appeal."] },
  { when: "Sep 2026 - Present", title: "HerFuture Ambassador", meta: "Research and volunteer", points: ["Selected to represent HerFuture as part of a UK ambassador network.", "Support initiatives promoting inclusion, representation, and opportunity in the industry while engaging with industry communities and contributing to ambassador-led activities."] },
  { when: "Jan 2026 - Present", title: "Women in Games Ambassador", meta: "Research and volunteer", points: ["Selected to represent Women in Games as part of a global ambassador network.", "Support initiatives promoting inclusion, representation, and opportunity in the games industry while engaging with industry communities and contributing to ambassador-led activities."] },
  { when: "Jan 2026", title: "Active member of the Archery Club", meta: "Extracurricular activity" },
  { when: "Jun 2025 - Sep 2025", title: "Technical Intern / Luna Group Technologies", points: ["Assisted the team with software, hardware, and technical tasks across ongoing projects.", "Presented ideas for the upcoming projects.", "Worked with back-end developers."] },
  { when: "Sep 2023 - Jun 2024", title: "Secretary of Rotaract Society / Rotary Club", meta: "Extracurricular activity", points: ["Organized multiple fundraiser events by gathering volunteers for people in need.", "Also, active member of the Arts and Fencing Society."] },
  { when: "Aug 2021", title: "Research Assistant / Technology Department Intern / Blu TV Digital Platform", meta: "35 hrs/wk, 4 wks/yr", points: ["Reviewed the digital product management process jointly carried out by BluTV and their strategic partner Discovery Inc Group.", "Assisted the Technology Department in new product design from scratch, customized product applications, and product enhancements on current products."] },
  { when: "Jul 2021", title: "Assistant Animator / 23 Animations", meta: "35 hrs/wk, 4 wks/yr", points: ["Helped the visual designer to decide on the concept and design of characters used in films.", "Assisted editors for the video editing procedures and took notes on the flaws of the process."] },
  { when: "Jun 2021", title: "Marketing Internship / LG Electronics", meta: "30 hrs/wk, 3 wks/yr", points: ["Participated in various marketing activities, including social media, websites, printed marketing material, video marketing and brand awareness.", "Researched ideas for the design of posts and the prime time for the broadcasting of the products.", "Helped the team members to create tactics to draw the attention of the followers on social media."] },
  { when: "Jul 2020 - Aug 2020", title: "Partner Company Team Member / Zebra Technologies", meta: "30 hrs/wk, 6 wks/yr", points: ["Observed the digital marketing steps of a product and took part in the process.", "Assisted the project leader in the presentation of the strategic planning.", "Collected data on the implications of strategic plans for advertising."] },
  { when: "Jun 2020 - Jul 2020", title: "Marketing Research Assistant / Media Department / Luna Group, Luna Media", meta: "35 hrs/wk, 4 wks/yr", points: ["Offered and designed a new logo for the company name.", "Helped with the production of PR material, including photographs, multimedia programs, graphic designs, publicity brochures, and promotional videos."] },
  { when: "Aug 2019", title: "Video Editing Department Intern / CNN International, CNN TURK", meta: "25 hrs/wk, 4 wks/yr", points: ["Arranged the old, edited videos according to their dates and contents.", "Attended meetings with the team and presented ideas for the creation of a video."] },
  { when: "Jul 2019", title: "Advertising Department Intern / FCB ARTGROUP", meta: "25 hrs/wk, 4 wks/yr", points: ["Gathered information on different marketing strategies.", "Observed how customer relationship management systems work.", "Took part in the organization of marketing events."] }
];

const EDUCATION = [
  { when: "Sep 2025 - Jun 2026", title: "MSc Computer Science", meta: "Queen Mary University of London", points: ["Computer Architecture and Networks", "Computer Programming", "Database Systems", "Data Analytics", "Interactive System Design", "Intro to Software Engineering", "Risk and Decision Making for Data Science and AI", "Security and Authentication"] },
  { when: "Sep 2022 - Jun 2025", title: "BA Video Games, Art and Design", meta: "Royal Holloway University of London, First Class Honours", points: ["Game Engines: Interactive and Immersive Environments", "3D Digital Art", "Virtual Production", "Coding for the Arts Workflows and Industry", "Digital Storytelling", "Animation and Visual Effects", "Game Art, Design and Story", "Contemporary Digital Practice", "Indie and Mobile Game Design", "Advanced 3D Modelling", "Advanced Digital Media"] },
  { when: "Sep 2018 - Jun 2022", title: "International Baccalaureate", meta: "Sisli Terakki Foundation Private High Schools", text: "Completed the IB Diploma Programme." },
  { when: "Sep 2025", title: "Queen Mary University of London Global Talent Scholarship", meta: "Honours and awards", text: "Merit-based award for academic excellence." },
  { when: "Sep 2022", title: "Royal Holloway Future International Leaders Scholarship", meta: "Honours and awards", text: "Awarded for academic merit and leadership potential, granted to 30 students." },
  { when: "Nov 2025", title: "CS50's Introduction to Artificial Intelligence with Python", meta: "Certificate, Harvard University" },
  { when: "Sep 2024", title: "The Technology Academy Couch to Coder", meta: "Certificate, Bright Network" }
];

const CONTACT = [
  { label: "Email", text: "alaca.serra@gmail.com", url: "mailto:alaca.serra@gmail.com" },
  { label: "LinkedIn", text: "serra-alaca-a1081b22a", url: "https://www.linkedin.com/in/serra-alaca-a1081b22a" },
  { label: "GitHub", text: "Mucchun", url: "https://github.com/Mucchun" },
  { label: "ArtStation", text: "serraalaca6", url: "https://serraalaca6.artstation.com" }
];

const CV_FILE = "assets/Serra-Alaca-CV.pdf";

/* =========================================================
   Windows: what each one shows
   ========================================================= */

function timelineHtml(items) {
  return `<div class="timeline">${items
    .map(
      (item) => `
      <article>
        <p class="when">${item.when}</p>
        <div>
          <h3>${item.title}</h3>
          ${item.meta ? `<p class="meta">${item.meta}</p>` : ""}
          ${item.text ? `<p>${item.text}</p>` : ""}
          ${item.points ? `<ul>${item.points.map((point) => `<li>${point}</li>`).join("")}</ul>` : ""}
        </div>
      </article>`
    )
    .join("")}</div>`;
}

function folderGridHtml(ids) {
  return `<div class="folder-grid">${ids
    .map((id) => `<button class="icon" type="button" data-open="${id}">${iconSvg("folder")}<span>${WINDOWS[id].title}</span></button>`)
    .join("")}</div>`;
}

const WINDOWS = {
  about: {
    title: "About Me",
    size: "medium",
    html: () => `
      <img class="banner" src="assets/artstation/ephesus.jpg" alt="Ephesus, an environment render of a ruined classical library glowing orange in smoke.">
      <div class="pad">
        <h2>Hi, I'm Serra</h2>
        <p class="lede">Game developer, designer and software engineer</p>
        <p>
          Junior developer specializing in software engineering, game development, gameplay
          programming, and real-time systems. Also a versatile designer across game design, 3D art
          and interactive design.
        </p>
        <h3>Code</h3>
        <p>Python, SQL, HTML, C++, C#, Blueprints, JavaScript, TypeScript.</p>
        <h3>Engines and 3D</h3>
        <p>Unreal Engine (advanced), Maya 2025 (advanced), ZBrush (advanced), Unity, Marmoset Toolbag.</p>
        <h3>Also</h3>
        <p>DaVinci Resolve, Oracle SQL, Adobe, Visual Studio, Figma.</p>
        <h3>Design</h3>
        <p>
          Game design, 3D modelling, character and asset creation, texturing, UI/UX, VFX, virtual production,
          animation, rigging, cinematics, level building, storyboards and concept art.
        </p>
        <p class="note">
          Based in Central London. English (bilingual), Turkish (native), Spanish (limited working proficiency).
        </p>
        <div class="actions">
          <button class="button is-primary" type="button" data-open="art">See my art</button>
          <button class="button" type="button" data-open="code">See my code</button>
          <button class="button" type="button" data-open="contact">Contact me</button>
        </div>
      </div>`
  },
  art: {
    title: "Art and 3D",
    size: "small",
    html: () => `<div class="pad">${folderGridHtml(ART.map((folder) => folder.id))}
      <p class="note">More on <a href="https://serraalaca6.artstation.com" target="_blank" rel="noopener">ArtStation</a>.</p></div>`
  },
  code: {
    title: "Code projects",
    size: "medium",
    html: () => `<div class="pad"><p class="lede">${CODE.length} projects, games first.</p><ul class="code-list">${CODE.map(
      (project) => `
        <li>
          <h3>${project.name}</h3>
          <p>${project.text}</p>
          <p class="meta">${project.tags}${project.url ? "" : " (private repository)"}</p>
          ${project.url ? `<p class="links"><a href="${project.url}" target="_blank" rel="noopener">GitHub</a>${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener">${project.demoLabel}</a>` : ""}</p>` : ""}
        </li>`
    ).join("")}</ul></div>`
  },
  experience: {
    title: "Experience.txt",
    size: "medium",
    html: () => `<div class="pad">${timelineHtml(EXPERIENCE)}</div>`
  },
  education: {
    title: "Education.txt",
    size: "medium",
    html: () => `<div class="pad">${timelineHtml(EDUCATION)}</div>`
  },
  contact: {
    title: "Contact",
    size: "small",
    html: () => `<div class="pad">
      <h2>Say hello</h2>
      <p>Open to game development, technical art, and interactive design opportunities.</p>
      <ul class="contact-list">${CONTACT.map(
        (item) => `<li><a href="${item.url}" ${item.url.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}><span>${item.label}</span><strong>${item.text}</strong></a></li>`
      ).join("")}</ul></div>`
  },
  cv: {
    title: "CV.pdf",
    size: "small",
    html: () => `<div class="pad">
      <h2>CV</h2>
      <p>One PDF with my experience, education and skills.</p>
      <div class="actions">
        <a class="button is-primary" href="${CV_FILE}" target="_blank" rel="noopener">Open CV</a>
        <a class="button" href="${CV_FILE}" download="Serra-Alaca-CV.pdf">Download CV</a>
      </div></div>`
  },
  trash: {
    title: "Trash",
    size: "small",
    html: () => `<div class="pad">
      <p>You weren't supposed to look in here.</p>
      <ul class="trash-list">
        <li>level_01_final.umap</li>
        <li>level_01_final_v2.umap</li>
        <li>level_01_final_v2_ACTUALLY_final.umap</li>
        <li>character_no_topology_issues_i_promise.ma</li>
        <li>why_is_it_pink.material</li>
        <li>sleep_schedule.txt</li>
      </ul></div>`
  }
};

ART.forEach((folder) => {
  WINDOWS[folder.id] = {
    title: folder.name,
    size: "large",
    html: () => `<div class="pad">
      <p class="lede">${folder.intro}</p>
      <div class="art-grid">${folder.images
        .map(
          (image) => `
          <figure class="${image.wide ? "is-wide" : ""}">
            <a href="${image.src}" data-lightbox data-title="${image.caption}"><img src="${image.src}" alt="${image.alt}" loading="lazy"></a>
            <figcaption>${image.caption}</figcaption>
          </figure>`
        )
        .join("")}</div></div>`
  };
});

/* =========================================================
   Desktop icons and dock
   ========================================================= */

const DESKTOP_ICONS = [
  { open: "about", label: "About Me", kind: "folder", x: 27, y: 57 },
  { open: "cv", label: "CV.pdf", kind: "pdf", x: 38, y: 60 },
  { open: "experience", label: "Experience.txt", kind: "file", x: 30, y: 71 },
  { open: "education", label: "Education.txt", kind: "file", x: 49, y: 69 },
  ...ART.map((folder) => ({ open: folder.id, label: folder.name, kind: "folder", x: folder.x, y: folder.y })),
  { open: "code", label: "Code projects", kind: "folder", x: 66, y: 60 },
  { open: "trash", label: "Don't look", kind: "trash", x: 90, y: 68 }
];

const DOCK = [
  { open: "about", label: "About me", glyph: "person", color: "#e3b471" },
  { open: "art", label: "Art and 3D", glyph: "image", color: "#86d7d2" },
  { open: "code", label: "Code projects", glyph: "code", color: "#9db8e8" },
  { open: "experience", label: "Experience", glyph: "list", color: "#f0a98a" },
  { open: "contact", label: "Contact", glyph: "mail", color: "#c5b3ea" },
  { open: "cv", label: "CV", glyph: "pdf", color: "#fbfaf6" }
];

function iconSvg(kind) {
  const icons = {
    folder: `<svg viewBox="0 0 16 13" shape-rendering="crispEdges" aria-hidden="true"><path d="M1 0h5v1h1v1h8v1h1v9h-1v1H1v-1H0V1h1z" fill="#2b2233"/><path d="M1 1h5v1h1v1h8v1H1z" fill="#d9903d"/><path d="M1 4h14v8H1z" fill="#f7c35f"/><path d="M1 4h14v1H1z" fill="#ffe09a"/><path d="M1 11h14v1H1z" fill="#e0a13f"/></svg>`,
    file: `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M14 4h26l12 12v40a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z" fill="#fbfaf6" stroke="#b9c7cc" stroke-width="2"/><path d="M40 4v12h12" fill="#e6eef0" stroke="#b9c7cc" stroke-width="2"/><path d="M19 30h26M19 38h26M19 46h17" stroke="#9fb0b6" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    pdf: `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M14 4h26l12 12v40a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z" fill="#fbfaf6" stroke="#b9c7cc" stroke-width="2"/><path d="M40 4v12h12" fill="#e6eef0" stroke="#b9c7cc" stroke-width="2"/><text x="31" y="44" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#c0563f">PDF</text></svg>`,
    trash: `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M16 18h32l-3 38a4 4 0 0 1-4 4H23a4 4 0 0 1-4-4l-3-38z" fill="#dfe8ea" stroke="#9fb0b6" stroke-width="2"/><path d="M12 18h40M26 12h12" stroke="#9fb0b6" stroke-width="3" stroke-linecap="round"/><path d="M26 27v24M32 27v24M38 27v24" stroke="#9fb0b6" stroke-width="2" stroke-linecap="round"/></svg>`,
    person: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8.5" r="3.7"/><path d="M4.5 20c.6-4 3.6-6.2 7.5-6.200s6.9 2.2 7.5 6.2"/></svg>`,
    image: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M4 17l5-4.5 3.5 3 3-2.5 4.5 4"/></svg>`,
    code: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 7.500L4 12l4.5 4.500M15.5 7.500L20 12l-4.5 4.500M13.2 5.500l-2.4 13"/></svg>`,
    list: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7h11M9 12h11M9 17h11"/><circle cx="4.8" cy="7" r="1"/><circle cx="4.8" cy="12" r="1"/><circle cx="4.8" cy="17" r="1"/></svg>`,
    mail: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="6" width="17" height="12" rx="2"/><path d="M4 7.500l8 6 8-6"/></svg>`
  };
  return icons[kind] || "";
}

const iconsRoot = document.querySelector("#icons");
const windowsRoot = document.querySelector("#windows");
const stage = document.querySelector("#desktop");
const dockRoot = document.querySelector("#dock");

iconsRoot.innerHTML = DESKTOP_ICONS.map(
  (icon) => `<button class="icon" type="button" data-open="${icon.open}" style="--x:${icon.x}%; --y:${icon.y}%">${iconSvg(icon.kind)}<span>${icon.label}</span></button>`
).join("");

dockRoot.innerHTML = DOCK.map(
  (app, index) => `<button class="dock-app" type="button" data-open="${app.open}" aria-label="${app.label}" style="--c:${app.color}"><i aria-hidden="true">${index + 1}</i>
      ${app.glyph === "pdf" ? '<b aria-hidden="true">PDF</b>' : iconSvg(app.glyph)}<span class="dock-tip" aria-hidden="true">${app.label}</span></button>`
).join("");

/* =========================================================
   Window manager
   ========================================================= */

const openWindows = new Map();
let topLayer = 10;
let openCount = 0;
const isCompact = () => window.matchMedia("(max-width: 720px)").matches;

function focusWindow(win) {
  topLayer += 1;
  win.style.zIndex = topLayer;
  windowsRoot.querySelectorAll(".window").forEach((other) => other.classList.toggle("is-front", other === win));
  syncDock();
}

function syncDock() {
  dockRoot.querySelectorAll(".dock-app").forEach((app) => app.classList.toggle("is-open", openWindows.has(app.dataset.open)));
}

function closeWindow(id) {
  const entry = openWindows.get(id);
  if (!entry) return;
  entry.win.remove();
  openWindows.delete(id);
  syncDock();
  if (entry.opener && document.contains(entry.opener)) entry.opener.focus();
  if (location.hash === `#${id}`) history.replaceState(null, "", location.pathname + location.search);
}

function openWindow(id, opener) {
  const config = WINDOWS[id];
  if (!config) return;

  if (openWindows.has(id)) {
    const existing = openWindows.get(id).win;
    focusWindow(existing);
    existing.focus();
    return;
  }

  const win = document.createElement("section");
  win.className = `window is-${config.size}`;
  win.setAttribute("role", "dialog");
  win.setAttribute("aria-label", config.title);
  win.tabIndex = -1;
  win.innerHTML = `
    <header class="window-bar">
      <button class="window-close" type="button" aria-label="Close ${config.title}"></button>
      <span class="window-title">${config.title}</span>
    </header>
    <div class="window-body">${config.html()}</div>`;
  windowsRoot.appendChild(win);

  // Each new window opens a little down and right of the last, like a real desktop.
  if (!isCompact()) {
    const step = (openCount % 6) * 26;
    // Keep clear of the hotbar on the left.
    const left = Math.max(96, (stage.clientWidth - win.offsetWidth) / 2 - 40 + step);
    const top = Math.max(14, (stage.clientHeight - win.offsetHeight) / 2 - 50 + step);
    win.style.left = `${Math.min(left, Math.max(96, stage.clientWidth - win.offsetWidth - 12))}px`;
    win.style.top = `${top}px`;
  }
  openCount += 1;

  openWindows.set(id, { win, opener });
  win.addEventListener("pointerdown", () => focusWindow(win));
  win.querySelector(".window-close").addEventListener("click", () => closeWindow(id));
  enableDrag(win);
  focusWindow(win);
  win.focus();
  history.replaceState(null, "", `#${id}`);
}

function enableDrag(win) {
  const bar = win.querySelector(".window-bar");
  bar.addEventListener("pointerdown", (event) => {
    if (isCompact() || event.target.closest("button")) return;
    event.preventDefault();
    const startX = event.clientX - win.offsetLeft;
    const startY = event.clientY - win.offsetTop;
    win.classList.add("is-dragging");

    // Listen on the window object: iOS drops pointermove on the element mid-drag.
    function move(moveEvent) {
      const maxLeft = stage.clientWidth - 80;
      const maxTop = stage.clientHeight - 44;
      win.style.left = `${Math.min(maxLeft, Math.max(80 - win.offsetWidth, moveEvent.clientX - startX))}px`;
      win.style.top = `${Math.min(maxTop, Math.max(0, moveEvent.clientY - startY))}px`;
    }
    function stop() {
      win.classList.remove("is-dragging");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    }
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
  });
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-open]");
  if (trigger) openWindow(trigger.dataset.open, trigger);
});

// Keys 1 to 6 open the hotbar slots, like a game inventory.
document.addEventListener("keydown", (event) => {
  if (event.metaKey || event.ctrlKey || event.altKey || lightbox.open) return;
  if (event.target.closest("input, textarea, select")) return;
  const slot = DOCK[Number(event.key) - 1];
  if (slot) openWindow(slot.open, dockRoot.children[Number(event.key) - 1]);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || lightbox.open) return;
  const front = windowsRoot.querySelector(".window.is-front") || windowsRoot.lastElementChild;
  if (!front) return;
  for (const [id, entry] of openWindows) {
    if (entry.win === front) {
      closeWindow(id);
      const next = windowsRoot.lastElementChild;
      if (next) focusWindow(next);
      break;
    }
  }
});

/* =========================================================
   Artwork viewer
   ========================================================= */

const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");
let lightboxLinks = [];
let lightboxIndex = 0;

function showArtwork(index) {
  lightboxIndex = (index + lightboxLinks.length) % lightboxLinks.length;
  const link = lightboxLinks[lightboxIndex];
  lightboxImage.src = link.getAttribute("href");
  lightboxImage.alt = link.querySelector("img").alt;
  lightboxCaption.textContent =
    lightboxLinks.length > 1 ? `${link.dataset.title} (${lightboxIndex + 1} of ${lightboxLinks.length})` : link.dataset.title;
  lightbox.classList.toggle("is-single", lightboxLinks.length < 2);
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-lightbox]");
  if (!link || typeof lightbox.showModal !== "function") return;
  if (event.metaKey || event.ctrlKey || event.shiftKey) return;
  event.preventDefault();
  lightboxLinks = Array.from(link.closest(".window").querySelectorAll("[data-lightbox]"));
  showArtwork(lightboxLinks.indexOf(link));
  lightbox.showModal();
});

lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.querySelector(".lightbox-prev").addEventListener("click", () => showArtwork(lightboxIndex - 1));
lightbox.querySelector(".lightbox-next").addEventListener("click", () => showArtwork(lightboxIndex + 1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showArtwork(lightboxIndex - 1);
  if (event.key === "ArrowRight") showArtwork(lightboxIndex + 1);
});

/* =========================================================
   Clock, and opening a window straight from a link (#about)
   ========================================================= */

const clock = document.querySelector("#clock");
function tick() {
  const now = new Date();
  const day = now.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  clock.textContent = isCompact() ? time : `${day}, ${time}`;
}
tick();
setInterval(tick, 20000);

const startId = location.hash.slice(1);
if (WINDOWS[startId]) openWindow(startId, null);
