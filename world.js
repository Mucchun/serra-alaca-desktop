/* =========================================================
   The pixel world: clouds, a cat that walks along the grass,
   and things growing on it.

   Every sprite is drawn here as rows of letters. Each letter
   is one pixel, coloured by PALETTE; a dot is transparent.
   ========================================================= */

const PALETTE = {
  d: "#2b2233", // outline
  o: "#f0a45c", // cat orange
  w: "#fff7ea", // white
  p: "#f58fb0", // pink
  k: "#2b2233", // eyes
  r: "#ef6f6c", // red
  y: "#f7c948", // gold
  g: "#6cc082", // leaf green
  t: "#c97b4a", // terracotta
  c: "#b98556", // cork
  b: "#9db8e8" // glass blue
};

const SPRITES = {
  catA: [
    "...........d..d.",
    "..d.......dodod.",
    ".dod......dooood",
    ".dod......dkookd",
    ".doddddddddowpwd",
    ".doooooooooooood",
    "..dooooooooooood",
    "..doooooooooood.",
    "..doodddddddood.",
    "..dood.....dood.",
    "..dwwd.....dwwd.",
    "..dddd.....dddd."
  ],
  catB: [
    "...........d..d.",
    "..d.......dodod.",
    ".dod......dooood",
    ".dod......dkookd",
    ".doddddddddowpwd",
    ".doooooooooooood",
    "..dooooooooooood",
    "..doooooooooood.",
    "..doodddddddood.",
    ".dood.......dood",
    ".dwwd.......dwwd",
    ".dddd.......dddd"
  ],
  heart: [
    ".dd...dd.",
    "drrd.drrd",
    "drwrdrrrd",
    "drrrrrrrd",
    ".drrrrrd.",
    "..drrrd..",
    "...drd...",
    "....d...."
  ],
  mushroom: [
    "....dddd....",
    "..ddrrrrdd..",
    ".drwwrrrrrd.",
    "drrwwrrrwwrd",
    "drrrrrrrwwrd",
    "drrrrrrrrrrd",
    ".dddddddddd.",
    "...dwwwwd...",
    "...dkwwkd...",
    "...dwwwwd...",
    "....dddd...."
  ],
  plant: [
    "...dd.....",
    "..dggd.dd.",
    "..dggddggd",
    ".ddgggdggd",
    "dggdggggd.",
    "dgggdggd..",
    ".dggggd...",
    "..dddd....",
    ".dttttttd.",
    ".dttttttd.",
    "..dttttd..",
    "..dddddd.."
  ],
  cloud: [
    ".....wwww.......",
    "...wwwwwwww.....",
    "..wwwwwwwwwwww..",
    ".wwwwwwwwwwwwww.",
    "wwwwwwwwwwwwwwww",
    ".wwwwwwwwwwwwww."
  ]
};

function spriteUrl(name) {
  const rows = SPRITES[name];
  const width = Math.max(...rows.map((row) => row.length));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = rows.length;
  const ctx = canvas.getContext("2d");
  rows.forEach((row, y) => {
    [...row].forEach((letter, x) => {
      if (!PALETTE[letter]) return;
      ctx.fillStyle = PALETTE[letter];
      ctx.fillRect(x, y, 1, 1);
    });
  });
  return { url: canvas.toDataURL(), width, height: rows.length };
}

function spriteImage(name, scale, className) {
  const { url, width, height } = spriteUrl(name);
  const image = document.createElement("img");
  image.src = url;
  image.width = width * scale;
  image.height = height * scale;
  image.alt = "";
  image.className = `pixel ${className || ""}`;
  image.draggable = false;
  return image;
}

const desktop = document.querySelector("#desktop");
const ground = document.querySelector("#ground");
const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Clouds */

[
  { top: 7, scale: 7, seconds: 150, delay: -20 },
  { top: 22, scale: 5, seconds: 110, delay: -70 },
  { top: 46, scale: 4, seconds: 180, delay: -120 }
].forEach((cloud) => {
  const image = spriteImage("cloud", cloud.scale, "cloud");
  image.style.top = `${cloud.top}%`;
  image.style.animationDuration = `${cloud.seconds}s`;
  image.style.animationDelay = `${cloud.delay}s`;
  image.setAttribute("aria-hidden", "true");
  desktop.prepend(image);
});

/* Things growing on the grass */

[
  { name: "plant", scale: 4, left: 1.5 },
  { name: "mushroom", scale: 3, left: 57 },
  { name: "plant", scale: 3, left: 83 },
  { name: "mushroom", scale: 2, left: 30 }
].forEach((thing) => {
  const image = spriteImage(thing.name, thing.scale, "ground-thing");
  image.style.left = `${thing.left}%`;
  image.setAttribute("aria-hidden", "true");
  ground.appendChild(image);
});

/* Hearts that float up when you pet something */

function popHeart(actor) {
  const heart = spriteImage("heart", 3, "heart-pop");
  heart.style.left = `${actor.offsetLeft + actor.offsetWidth / 2 - 13}px`;
  heart.setAttribute("aria-hidden", "true");
  ground.appendChild(heart);
  heart.addEventListener("animationend", () => heart.remove());
}

/* The cat */

function makeActor({ label, frames, scale, speed, startAt, onPet }) {
  const urls = frames.map((name) => spriteUrl(name));
  const actor = document.createElement("button");
  actor.type = "button";
  actor.className = "actor";
  actor.setAttribute("aria-label", label);
  const image = spriteImage(frames[0], scale);
  actor.appendChild(image);
  ground.appendChild(actor);

  const state = {
    x: ground.clientWidth * startAt,
    direction: Math.random() < 0.5 ? -1 : 1,
    restUntil: 0,
    frame: 0,
    frameAt: 0
  };

  actor.addEventListener("click", () => {
    actor.classList.remove("is-petted");
    void actor.offsetWidth; // restart the hop animation
    actor.classList.add("is-petted");
    popHeart(actor);
    if (onPet) onPet(actor, image);
  });

  function step(time) {
    const limit = Math.max(0, ground.clientWidth - actor.offsetWidth);
    if (!calm && time > state.restUntil) {
      state.x += state.direction * speed;
      if (state.x <= 0 || state.x >= limit) {
        state.direction *= -1;
      } else if (Math.random() < 0.002) {
        // Now and then: stop for a breather, and maybe turn around.
        state.restUntil = time + 1200 + Math.random() * 2600;
        if (Math.random() < 0.5) state.direction *= -1;
      }
      if (urls.length > 1 && time - state.frameAt > 170) {
        state.frame = (state.frame + 1) % urls.length;
        state.frameAt = time;
        image.src = urls[state.frame].url;
      }
    }
    state.x = Math.min(limit, Math.max(0, state.x));
    actor.style.transform = `translateX(${Math.round(state.x)}px)`;
    image.style.transform = `scaleX(${state.direction})`;
    actor.classList.toggle("is-resting", calm || time <= state.restUntil);
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
  return actor;
}

makeActor({ label: "Pet the cat", frames: ["catA", "catB"], scale: 4, speed: 0.7, startAt: 0.42 });

