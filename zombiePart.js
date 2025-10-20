class ZombiePartSystem {
  parts = new Set();
  xSpeed = -0.05;
  ySpeed = -0.15;

  step(dt) {
    for(const p of this.parts) {
      p.step(dt);
      if(p.x ** 2 + p.y ** 2 > 1000 ** 2) {
        p.destroy();
        this.parts.delete(p);
      }
    }
  }

  render() {
    for(const p of this.parts) {
      p.render();
    }
  }

  explodeFrom({x, y}) {
    const newParts = [
      new ZombiePart(0, {x, y: y - 4}, {x: this.xSpeed, y: this.ySpeed * (Math.random() * 0.6 + 0.7)}),
      new ZombiePart(1, {x, y: y + 4}, {x: this.xSpeed, y: this.ySpeed * (Math.random() * 0.6 + 0.7)}),
    ];
    newParts.forEach(p => {
      p.create();
      this.parts.add(p);
    });
  }
}

class ZombiePart{
  gravity = 0.0005;

  constructor(partIndex, pos, vel) {
    this.partIndex = partIndex;
    this.pos = {...pos};
    this.vel = {...vel};
    this.rot = 0;
    this.rotVel = (Math.random() - 0.5) * 1.6;
  }

  create() {
    this.el = document.createElement("div");
    this.el.className = "zombiePart";
    this.el.style.backgroundPosition = ['top', 'bottom'][this.partIndex % 2];
    document.body.appendChild(this.el);
  }

  render() {
    this.el.style.transform = `translate(${this.pos.x}rem, ${this.pos.y}rem) rotate(${this.rot}deg)`;
  }

  step(dt) {
    this.pos.x += this.vel.x * dt;
    this.pos.y += this.vel.y * dt;
    this.vel.y += this.gravity * dt;
    this.rot += this.rotVel * dt;
  }

  destroy() {
    this.el.remove();
  }
}
