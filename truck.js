class Truck {
  pos = 30;
  cowcatcherWidth = 6;
  lane = 2;

  render() {
    this.el.style.transform = `translateY(${this.lane * 16}rem)`;
  }

  detectCollision(objectArray) {
    if (objectArray[0]) {
    }

    for (const object of objectArray) {
      if (
        object.pos <= this.pos &&
        object.pos >= this.pos - this.cowcatcherWidth &&
        object.lane === this.lane
      ) {
        return [object, "woo"];
      } else if (
        object.pos <= this.pos &&
        object.pos >= this.pos - this.pos &&
        object.lane === this.lane
      ) {
        return [object, "ouch"];
      }
    }
  }

  switchLanes(key) {
    if (["ArrowUp", "w", "W"].includes(key) && this.lane > 1) {
      this.lane -= 1;
    } else if (["ArrowDown", "s", "S"].includes(key) && this.lane < 4) {
      this.lane += 1;
    }
  }
}
