const road = document.getElementById("road");
let truck = new Truck();
truck.el = document.getElementById("truck");
const movingObjects = [];
let start;
let last;

document.addEventListener("keydown", (e) => {
  truck.switchLanes(e.key);
});

function step(timestamp) {
  if (start === undefined) {
    start = timestamp;
  }
  const elapsed = timestamp - start;

  // Math.min() is used here to make sure the element stops at exactly 200px
  const shift = -0.1 * elapsed;
  last ??= timestamp;
  const dt = timestamp - last;
  last = timestamp;

  for (object of movingObjects) {
    object.step(dt);
    object.render();
  }

  if (Math.random() * 100 > 99) {
    let zombie = new Zombie();
    zombie.create();
    movingObjects.push(zombie);
  }

  truck.render();
  if (truck.detectCollision(movingObjects)) {
    return;
  }

  const stutterShift = (-0.1 * elapsed) % 64;
  road.style.transform = `translateX(${stutterShift}px)`;

  requestAnimationFrame(step);
}

function spawn() {}

requestAnimationFrame(step);
