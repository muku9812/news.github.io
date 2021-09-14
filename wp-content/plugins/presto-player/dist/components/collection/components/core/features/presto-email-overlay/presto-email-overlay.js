import { Component, Event, h, Prop, State, Watch } from '@stencil/core';
import { exitFullScreen } from '../../../../util';
export class PrestoEmailOverlay {
  /**
   * Set email collection in local storage
   * @param status string
   */
  setStorage(status) {
    window.localStorage.setItem('presto.videos.email_collection', JSON.stringify({ [this.videoId]: status }));
  }
  /**
   * Get email collection in local storage
   * @returns status string
   */
  getStorage() {
    return window.localStorage.getItem('presto.videos.email_collection');
  }
  componentWillLoad() {
    this.handleDuration();
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
  handlePlayerInit(_, old) {
    // only the first time
    if (old) {
      return;
    }
    this.player.on('timeupdate', () => {
      this.currentTime = this.player.currentTime;
    });
    // don't allow player to be played if email overlay is showing
    this.player.on('play playing timeupdate', () => {
      // skipped
      if (this.getStorage()) {
        return;
      }
      // pause if enabled
      if (this.show) {
        this.player.pause();
      }
    });
  }
  /**
   * Wait for duration to start before checking time
   * @returns void
   */
  handleDuration() {
    var _a, _b;
    this.enabled = this.getStorage() ? false : (_b = (_a = this.preset) === null || _a === void 0 ? void 0 : _a.email_collection) === null || _b === void 0 ? void 0 : _b.enabled;
    this.handleTime();
  }
  /**
   * When current time changes, check to see if we should
   * enable the overlay
   * @returns void
   */
  handleTime() {
    if (!this.enabled) {
      return;
    }
    if (this.getStorage()) {
      return;
    }
    this.checkTime();
    if (!this.show)
      return;
    exitFullScreen(this.player);
  }
  /**
   * Set enabled/disabled based on time that has passed
   */
  checkTime() {
    var _a, _b;
    this.show = this.timePassed({
      current: this.currentTime,
      duration: this.duration,
      showAfter: ((_b = (_a = this.preset) === null || _a === void 0 ? void 0 : _a.email_collection) === null || _b === void 0 ? void 0 : _b.percentage) || 0,
    });
  }
  /**
   * Fetch updated nonce in case of caching
   * @returns Promise
   */
  async getNonce() {
    var _a;
    return fetch(`${(_a = window === null || window === void 0 ? void 0 : window.prestoPlayer) === null || _a === void 0 ? void 0 : _a.ajaxurl}?action=presto_refresh_progress_nonce`);
  }
  /**
   * Submit email collection
   * @param e Event
   */
  async submit(e) {
    var _a;
    this.loading = true;
    this.error = '';
    // get nonce refresh
    const response = await this.getNonce();
    const { data: nonce } = await response.json();
    // handle submit
    try {
      let response = await fetch((_a = window === null || window === void 0 ? void 0 : window.prestoPlayer) === null || _a === void 0 ? void 0 : _a.ajaxurl, {
        method: 'post',
        body: new URLSearchParams(Object.assign({ action: 'presto_player_email_submit', nonce, preset_id: this.preset.id, video_id: this.videoId }, ((e === null || e === void 0 ? void 0 : e.detail) || {}))),
      });
      const { success, data } = await response.json();
      if (success) {
        this.setStorage('collected');
        this.show = false;
        this.playVideo.emit();
      }
      else {
        throw data;
      }
    }
    catch (e) {
      const error = e === null || e === void 0 ? void 0 : e[0];
      if (error && typeof error === 'string') {
        this.error = error;
      }
    }
    finally {
      this.loading = false;
    }
  }
  /**
   * Skip email collection
   */
  skip() {
    this.setStorage('skipped');
    this.show = false;
    this.playVideo.emit();
  }
  /**
   * Maybe render
   * @returns JSX
   */
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (!this.show) {
      return;
    }
    return (h("presto-email-overlay-ui", { direction: this.direction, class: "email-overlay", headline: (_b = (_a = this.preset) === null || _a === void 0 ? void 0 : _a.email_collection) === null || _b === void 0 ? void 0 : _b.headline, bottomText: (_d = (_c = this.preset) === null || _c === void 0 ? void 0 : _c.email_collection) === null || _d === void 0 ? void 0 : _d.bottom_text, allowSkip: (_f = (_e = this.preset) === null || _e === void 0 ? void 0 : _e.email_collection) === null || _f === void 0 ? void 0 : _f.allow_skip, buttonText: (_h = (_g = this.preset) === null || _g === void 0 ? void 0 : _g.email_collection) === null || _h === void 0 ? void 0 : _h.button_text, isLoading: this.loading, errorMessage: this.error, onSubmitForm: e => this.submit(e), onSkip: () => this.skip(), i18n: this.i18n }));
  }
  static get is() { return "presto-email-overlay"; }
  static get originalStyleUrls() { return {
    "$": ["presto-email-overlay.css"]
  }; }
  static get styleUrls() { return {
    "$": ["presto-email-overlay.css"]
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
    "currentTime": {}
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
    }]; }
  static get watchers() { return [{
      "propName": "player",
      "methodName": "handlePlayerInit"
    }, {
      "propName": "duration",
      "methodName": "handleDuration"
    }, {
      "propName": "currentTime",
      "methodName": "handleTime"
    }]; }
}
