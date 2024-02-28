export class Screen {
  constructor() {
    this.preventDefault = this.preventDefault.bind(this);
    this.preventDefaultForScrollKeys = this.preventDefaultForScrollKeys.bind(this);

    this.supportsPassive = false;
    try {
      window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { this.supportsPassive = true; }.bind(this)
      }));
    } catch (e) { console.error(e) }

    this.wheelOpt = this.supportsPassive ? { passive: false } : false;
    this.wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
  }
  preventDefault(e) {
    e.preventDefault();
  }

  preventDefaultForScrollKeys(e) {
    const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

    if (keys[e.keyCode]) {
      this.preventDefault(e);
      return false;
    }
  }

  disableScroll = () => {
    window.addEventListener('DOMMouseScroll', this.preventDefault, false); // older FF
    window.addEventListener(this.wheelEvent, this.preventDefault, this.wheelOpt); // modern desktop
    window.addEventListener('touchmove', this.preventDefault, this.wheelOpt); // mobile
    window.addEventListener('keydown', this.preventDefaultForScrollKeys, false);
  }

  enableScroll = () => {
    window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
    window.removeEventListener(this.wheelEvent, this.preventDefault, this.wheelOpt);
    window.removeEventListener('touchmove', this.preventDefault, this.wheelOpt);
    window.removeEventListener('keydown', this.preventDefaultForScrollKeys, false);
  }
  scrollUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }
}

// Usage
export const screen = new Screen();