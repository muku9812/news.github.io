import { Component, Event, h, Prop, State, Watch } from '@stencil/core';
import { exitFullScreen } from '../../../../util';
export class PrestoCTAOverlay {
  constructor() {
    this.percentagePassed = 0;
  }
  componentWillLoad() {
    this.handleDuration();
  }
  handlePlayerInit(_, old) {
    // only the first time
    if (old) {
      return;
    }
    this.player.on('ended', () => {
      this.ended = true;
    });
    this.player.on('timeupdate', () => {
      this.currentTime = this.player.currentTime;
    });
  }
  /**
   * Find out if time is passed.
   * @returns boolean
   */
  timePassed({ current, duration, showAfter }) {
    if (current === showAfter) {
      return true;
    }
    let percent = (current / duration) * 100;
    if (99.9 < percent) {
      percent = 100;
    }
    return percent >= showAfter;
  }
  /**
   * Handle with the player is ended
   * @param val
   * @returns
   */
  handleEnded(val) {
    var _a, _b;
    if (val) {
      if (((_b = (_a = this.preset) === null || _a === void 0 ? void 0 : _a.cta) === null || _b === void 0 ? void 0 : _b.percentage) !== 100)
        return;
      this.show = true;
    }
  }
  handleFullScreen() {
    if (!this.show)
      return;
    // @ts-ignore
    // exit fullscreen.
    exitFullScreen(this.player);
  }
  /**
   * Wait for duration to start before checking time
   * @returns void
   */
  handleDuration() {
    var _a, _b;
    this.enabled = this.skipped ? false : (_b = (_a = this.preset) === null || _a === void 0 ? void 0 : _a.cta) === null || _b === void 0 ? void 0 : _b.enabled;
    this.handleTime();
  }
  handlePercentagePassed() {
    this.percentagePassed = (this.currentTime / this.duration) * 100;
  }
  /**
   * Watch current time and check if we should
   * pause the video.
   */
  handleEnabled() {
    if (!this.show)
      return; // not showing.
    if (this.skipped)
      return; // already skipped.
    if (!this.player)
      return; // need a player object.
    // pause player
    this.player.pause();
  }
  /**
   * When current time changes, check to see if we should
   * enable the overlay
   * @returns void
   */
  handleTime() {
    var _a, _b;
    if (!this.enabled)
      return; // not enabled.
    if (this.skipped)
      return; // skipped.
    if (((_b = (_a = this.preset) === null || _a === void 0 ? void 0 : _a.cta) === null || _b === void 0 ? void 0 : _b.percentage) === 100)
      return; // we'll catch this on ended event.
    this.checkTime();
  }
  /**
   * Set enabled/disabled based on time that has passed
   */
  checkTime() {
    var _a, _b;
    this.show = this.timePassed({
      current: this.currentTime,
      duration: this.duration,
      showAfter: ((_b = (_a = this.preset) === null || _a === void 0 ? void 0 : _a.cta) === null || _b === void 0 ? void 0 : _b.percentage) || 0,
    });
  }
  /**
   * Skip email collection
   */
  skip() {
    this.skipped = true;
    this.show = false;
    this.playVideo.emit();
  }
  /**
   * Handle rewatch click.
   */
  rewatch() {
    this.ended = false;
    this.show = false;
    this.rewatchVideo.emit();
    this.player.once('timeupdate', () => {
      setTimeout(() => this.player.play(), 500);
    });
    this.player.restart();
  }
  /**
   * Maybe render
   * @returns JSX
   */
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
    if (!this.show) {
      return;
    }
    return (h("presto-cta-overlay-ui", { style: Object.assign(Object.assign(Object.assign({ '--presto-player-button-border-radius': `${(_b = (_a = this.preset) === null || _a === void 0 ? void 0 : _a.cta) === null || _b === void 0 ? void 0 : _b.button_radius}px` }, (((_d = (_c = this.preset) === null || _c === void 0 ? void 0 : _c.cta) === null || _d === void 0 ? void 0 : _d.background_opacity) ? { '--presto-player-cta-background-opacity': `${((_f = (_e = this.preset) === null || _e === void 0 ? void 0 : _e.cta) === null || _f === void 0 ? void 0 : _f.background_opacity) / 100}` } : {})), (((_h = (_g = this.preset) === null || _g === void 0 ? void 0 : _g.cta) === null || _h === void 0 ? void 0 : _h.button_color)
        ? {
          '--presto-player-button-color': `${(_k = (_j = this.preset) === null || _j === void 0 ? void 0 : _j.cta) === null || _k === void 0 ? void 0 : _k.button_color}`,
        }
        : {})), (((_m = (_l = this.preset) === null || _l === void 0 ? void 0 : _l.cta) === null || _m === void 0 ? void 0 : _m.button_text_color)
        ? {
          '--presto-player-button-text': `${(_p = (_o = this.preset) === null || _o === void 0 ? void 0 : _o.cta) === null || _p === void 0 ? void 0 : _p.button_text_color}`,
        }
        : {})), direction: this.direction, class: "cta-overlay", headline: (_r = (_q = this.preset) === null || _q === void 0 ? void 0 : _q.cta) === null || _r === void 0 ? void 0 : _r.headline, "bottom-text": (_t = (_s = this.preset) === null || _s === void 0 ? void 0 : _s.cta) === null || _t === void 0 ? void 0 : _t.bottom_text, "show-button": (_v = (_u = this.preset) === null || _u === void 0 ? void 0 : _u.cta) === null || _v === void 0 ? void 0 : _v.show_button, buttonLink: (_x = (_w = this.preset) === null || _w === void 0 ? void 0 : _w.cta) === null || _x === void 0 ? void 0 : _x.button_link, allowSkip: !this.ended && ((_z = (_y = this.preset) === null || _y === void 0 ? void 0 : _y.cta) === null || _z === void 0 ? void 0 : _z.show_skip), allowRewatch: this.ended && ((_1 = (_0 = this.preset) === null || _0 === void 0 ? void 0 : _0.cta) === null || _1 === void 0 ? void 0 : _1.show_rewatch), "button-text": (_3 = (_2 = this.preset) === null || _2 === void 0 ? void 0 : _2.cta) === null || _3 === void 0 ? void 0 : _3.button_text, onSkip: () => this.skip(), onRewatch: () => this.rewatch(), i18n: this.i18n }));
  }
  static get is() { return "presto-cta-overlay"; }
  static get originalStyleUrls() { return {
    "$": ["presto-cta-overlay.css"]
  }; }
  static get styleUrls() { return {
    "$": ["presto-cta-overlay.css"]
  }; }
  static get properties() { return {
    "player": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "player",
      "reflect": false
    },
    "preset": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "presetAttributes",
        "resolved": "presetAttributes",
        "references": {
          "presetAttributes": {
            "location": "import",
            "path": "../../../../interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      }
    },
    "videoId": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "video-id",
      "reflect": false
    },
    "i18n": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "i18nConfig",
        "resolved": "i18nConfig",
        "references": {
          "i18nConfig": {
            "location": "import",
            "path": "../../../../interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      }
    },
    "duration": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "duration",
      "reflect": false
    },
    "direction": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'rtl'",
        "resolved": "\"rtl\"",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "direction",
      "reflect": false
    }
  }; }
  static get states() { return {
    "enabled": {},
    "show": {},
    "loading": {},
    "error": {},
    "skipped": {},
    "percentagePassed": {},
    "currentTime": {},
    "ended": {}
  }; }
  static get events() { return [{
      "method": "playVideo",
      "name": "playVideo",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }, {
      "method": "rewatchVideo",
      "name": "rewatchVideo",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }]; }
  static get watchers() { return [{
      "propName": "player",
      "methodName": "handlePlayerInit"
    }, {
      "propName": "ended",
      "methodName": "handleEnded"
    }, {
      "propName": "currentTime",
      "methodName": "handleFullScreen"
    }, {
      "propName": "duration",
      "methodName": "handleDuration"
    }, {
      "propName": "currentTime",
      "methodName": "handlePercentagePassed"
    }, {
      "propName": "duration",
      "methodName": "handlePercentagePassed"
    }, {
      "propName": "currentTime",
      "methodName": "handleEnabled"
    }, {
      "propName": "currentTime",
      "methodName": "handleTime"
    }]; }
}
