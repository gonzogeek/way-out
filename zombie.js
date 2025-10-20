class Zombie {
  pos = 200;
  lane = Math.ceil(Math.random() * 4);
  speedMod = 0.05;

  create() {
    this.el = document.createElement("div");
    this.el.className = "zombie";
    document.body.appendChild(this.el);
  }

  render() {
    this.el.style.transform = `translate(${this.pos - 100}rem, ${
      this.lane * 16
    }rem)`;
  }

  step(dt) {
    this.pos -= dt * this.speedMod;
  }

  destroy() {
    this.el.remove();
  }
}
