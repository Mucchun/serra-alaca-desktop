/* =========================================================
   The 3D desk toy: a small low-poly model you can drag to
   spin. The "Next" button swaps between the models below.
   ========================================================= */

const toy = document.querySelector("#toy");
const toyCanvas = document.querySelector("#toy-canvas");
const toyName = document.querySelector("#toy-name");
const toyNext = document.querySelector("#toy-next");
const toyCalm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

async function startToy() {
  const THREE = await import("./vendor/three.module.js");

  const renderer = new THREE.WebGLRenderer({ canvas: toyCanvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
  camera.position.set(0, 1.1, 7.4);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x9fc9c4, 1.5));
  const sun = new THREE.DirectionalLight(0xfff1d6, 2.2);
  sun.position.set(3, 5, 4);
  scene.add(sun);

  const flat = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, flatShading: true, roughness: 0.75, ...extra });

  function makeTemple() {
    const temple = new THREE.Group();
    const marble = flat(0xfff3df);
    const roofTile = flat(0xf0a45c);

    const island = new THREE.Mesh(new THREE.CylinderGeometry(1.75, 1.1, 0.7, 7), flat(0x6cc082));
    island.position.y = -1.25;
    const rock = new THREE.Mesh(new THREE.ConeGeometry(1.1, 0.9, 7), flat(0xb98556));
    rock.position.y = -2.05;
    rock.rotation.x = Math.PI;
    const step = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.16, 1.7), marble);
    step.position.y = -0.82;
    const floor = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.16, 1.45), marble);
    floor.position.y = -0.66;
    temple.add(island, rock, step, floor);

    for (const x of [-0.8, -0.27, 0.27, 0.8]) {
      for (const z of [-0.52, 0.52]) {
        const column = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 1.1, 8), marble);
        column.position.set(x, -0.03, z);
        temple.add(column);
      }
    }

    const beam = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.16, 1.45), marble);
    beam.position.y = 0.6;
    // A triangular prism for the roof, lying along the temple's width.
    const roof = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.82, 2.15, 3), roofTile);
    roof.rotation.z = Math.PI / 2;
    roof.rotation.x = Math.PI / 2;
    roof.scale.set(1, 1, 0.62);
    roof.position.y = 0.94;
    temple.add(beam, roof);

    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.4, 6), flat(0xb98556));
    const leaves = new THREE.Mesh(new THREE.IcosahedronGeometry(0.3, 0), flat(0x4fa56c));
    leaves.position.y = 0.38;
    tree.add(trunk, leaves);
    tree.position.set(1.35, -0.7, 0.55);
    temple.add(tree);

    temple.position.y = 0.35;
    return temple;
  }

  function makeDie() {
    const die = new THREE.Group();
    const body = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 0), flat(0xf7c948, { roughness: 0.4, metalness: 0.15 }));
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(body.geometry),
      new THREE.LineBasicMaterial({ color: 0x2b2233 })
    );
    die.add(body, edges);
    return die;
  }

  function makeCrystal() {
    const crystal = new THREE.Group();
    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(1.15, 0), flat(0x7fd6cf, { roughness: 0.25, metalness: 0.2 }));
    gem.scale.y = 1.55;
    crystal.add(gem);
    const orbit = new THREE.Group();
    [0xf58fb0, 0xf7c948, 0x9db8e8, 0xf58fb0, 0xf7c948].forEach((color, index, all) => {
      const shard = new THREE.Mesh(new THREE.OctahedronGeometry(0.2, 0), flat(color));
      const angle = (index / all.length) * Math.PI * 2;
      shard.position.set(Math.cos(angle) * 1.8, Math.sin(angle * 2) * 0.35, Math.sin(angle) * 1.8);
      orbit.add(shard);
    });
    crystal.add(orbit);
    crystal.userData.orbit = orbit;
    return crystal;
  }

  const models = [
    { name: "Temple island", object: makeTemple() },
    { name: "Lucky D20", object: makeDie() },
    { name: "Crystal", object: makeCrystal() }
  ];

  const holder = new THREE.Group();
  scene.add(holder);
  let current = 0;

  function showModel(index) {
    current = (index + models.length) % models.length;
    holder.clear();
    holder.add(models[current].object);
    toyName.textContent = models[current].name;
  }

  toyNext.addEventListener("click", () => showModel(current + 1));

  /* Drag to spin, with a little momentum when you let go */

  const spin = { x: 0.25, y: -0.5, velocityX: 0, velocityY: 0, held: false };

  toyCanvas.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    spin.held = true;
    let lastX = event.clientX;
    let lastY = event.clientY;
    toy.classList.add("is-held");

    function move(moveEvent) {
      spin.velocityY = (moveEvent.clientX - lastX) * 0.012;
      spin.velocityX = (moveEvent.clientY - lastY) * 0.012;
      spin.y += spin.velocityY;
      spin.x += spin.velocityX;
      lastX = moveEvent.clientX;
      lastY = moveEvent.clientY;
    }
    function release() {
      spin.held = false;
      toy.classList.remove("is-held");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
    }
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
  });

  // Arrow keys spin it too, when the toy has keyboard focus.
  toyCanvas.addEventListener("keydown", (event) => {
    const nudge = { ArrowLeft: [0, -0.2], ArrowRight: [0, 0.2], ArrowUp: [-0.2, 0], ArrowDown: [0.2, 0] }[event.key];
    if (!nudge) return;
    event.preventDefault();
    spin.x += nudge[0];
    spin.y += nudge[1];
  });

  function resize() {
    const size = toyCanvas.clientWidth;
    if (size) renderer.setSize(size, size, false);
  }
  new ResizeObserver(resize).observe(toyCanvas);
  resize();

  function frame(time) {
    if (!document.hidden) {
      if (!spin.held) {
        spin.y += spin.velocityY;
        spin.x += spin.velocityX;
        spin.velocityY *= 0.95;
        spin.velocityX *= 0.95;
        if (!toyCalm) spin.y += 0.004; // idle turn
      }
      spin.x = Math.min(1.2, Math.max(-1.2, spin.x));
      holder.rotation.set(spin.x, spin.y, 0);
      holder.position.y = toyCalm ? 0 : Math.sin(time * 0.0015) * 0.12;
      const orbit = models[current].object.userData.orbit;
      if (orbit && !toyCalm) orbit.rotation.y = time * 0.001;
      renderer.render(scene, camera);
    }
    requestAnimationFrame(frame);
  }

  showModel(0);
  toy.classList.add("is-ready");
  requestAnimationFrame(frame);
}

// If WebGL isn't available the toy simply stays hidden.
startToy().catch(() => {
  toy.hidden = true;
});
