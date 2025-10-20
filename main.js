const road = document.getElementById("road");
let truck = new Truck();
truck.el = document.getElementById("truck");
const movingObjects = new Set();
let points = 0;
let health = 10;
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

  if (Math.random() * 100 > 99) {
    let zombie = new Zombie();
    zombie.create();
    movingObjects.add(zombie);
  }

  for (object of movingObjects) {
    object.step(dt);
    object.render();
  }

  truck.render();
  let roadkill = truck.detectCollision(movingObjects);
  if (roadkill) {
    movingObjects.delete(roadkill[0]);
    roadkill[0].destroy();
    roadkill[1] === "ouch" ? (health -= 1) : (points += 100);
    updatePoints();
    updateHealth();
  }

  const stutterShift = (-0.05 * elapsed) % 256;
  road.style.transform = `translateX(${stutterShift}rem)`;

  requestAnimationFrame(step);
}
function updatePoints() {
  const scoreboard = document.getElementById("scoreboard");
  scoreboard.innerText = `Points: ${points}`;
}

function updateHealth() {
  const healthBar = document.getElementById("health");
  healthBar.style.width = `${20 * health}rem`;
}

requestAnimationFrame(step);
