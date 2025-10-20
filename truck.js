class Truck {
  pos = 60;
  cowcatcherWidth = 12;
  lane = 2;

  render() {
    this.el.style.transform = `translateY(${this.lane * 32}px)`;
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
    if (key == "ArrowUp" && this.lane > 1) {
      this.lane -= 1;
    } else if (key == "ArrowDown" && this.lane < 4) {
      this.lane += 1;
    }
  }
}
