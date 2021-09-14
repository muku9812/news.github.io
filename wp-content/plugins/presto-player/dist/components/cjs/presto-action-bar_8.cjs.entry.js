'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-858a23c7.js');

/**
 * Find out if time is passed.
 * @returns boolean
 */
function timePassed({ current, duration, showAfter }) {
  if (current === showAfter) {
    return true;
  }
  let percent = (current / duration) * 100;
  if (99.9 < percent) {
    percent = 100;
  }
  return percent >= showAfter;
}
function timeToSeconds(time) {
  let pieces = time.split(':');
  let seconds;
  if (pieces.length > 1) {
    seconds = parseInt(pieces[0]) * 60;
  }
  return parseInt(pieces[1]) + parseInt(seconds);
}
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor;
  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone';
  }
  if (/android/i.test(userAgent)) {
    return 'Android';
  }
  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if ((navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) || /(iPad|iPhone|iPod)/gi.test(navigator.platform)) {
    return 'iOS';
  }
  return 'unknown';
}
function isIOS() {
  return getMobileOperatingSystem() === 'iOS';
}
/**
 * Is iOS Youtube Fullscreen.
 */
function isiOSYoutubeFullscreen(player) {
  var _a, _b;
  return isIOS() && player.provider === 'youtube' && !((_b = (_a = player === null || player === void 0 ? void 0 : player.config) === null || _a === void 0 ? void 0 : _a.blockAttributes) === null || _b === void 0 ? void 0 : _b.playsinline);
}
function isWebView() {
  var standalone = window.navigator['standalone'], userAgent = window.navigator.userAgent.toLowerCase(), safari = /safari/.test(userAgent), ios = /iphone|ipod|ipad/.test(userAgent);
  if (ios) {
    if (!standalone && safari) {
      // Safari
      return false;
    }
    else if (!standalone && !safari) {
      // iOS webview
      return true;
    }
  }
  else {
    if (userAgent.includes('wv')) {
      // Android webview
      return true;
    }
    else {
      // Chrome
      return false;
    }
  }
}
function isAndroidWebView() {
  if (getMobileOperatingSystem() === 'Android' && isWebView()) {
    return true;
  }
  else {
    return false;
  }
}
function parseColor(color) {
  var m = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
  if (m) {
    return [m[1], m[2], m[3], '1'];
  }
  m = color.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*((0.)?\d+)\s*\)$/i);
  if (m) {
    return [m[1], m[2], m[3], m[4]];
  }
}
function exitFullScreen(player) {
  var _a, _b, _c, _d, _e;
  if (player.fullscreen.active) {
    player.fullscreen.exit();
  }
  // handle iOS.
  if (isIOS() && !((_b = (_a = player === null || player === void 0 ? void 0 : player.config) === null || _a === void 0 ? void 0 : _a.blockAttributes) === null || _b === void 0 ? void 0 : _b.playsinline)) {
    // html5
    typeof ((_c = player === null || player === void 0 ? void 0 : player.media) === null || _c === void 0 ? void 0 : _c.webkitExitFullScreen) === 'function' && (player === null || player === void 0 ? void 0 : player.media.webkitExitFullScreen());
    // vimeo
    typeof ((_d = player === null || player === void 0 ? void 0 : player.embed) === null || _d === void 0 ? void 0 : _d.exitFullscreen) === 'function' && ((_e = player === null || player === void 0 ? void 0 : player.embed) === null || _e === void 0 ? void 0 : _e.exitFullscreen());
    // youtube hack
    if (isiOSYoutubeFullscreen(player)) {
      const lastTime = player.currentTime;
      player.currentTime = player.duration;
      player.once('playing', () => {
        player.currentTime = lastTime;
      });
    }
  }
}

const prestoActionBarCss = ":host{display:block}";

const PrestoActionBar = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.show = false;
    this.youtubeRenderKey = 1;
  }
  componentWillLoad() {
    this.handleDuration();
  }
  handleButtonCountChange(newVal, oldVal) {
    if ((newVal === null || newVal === void 0 ? void 0 : newVal.button_count) !== (oldVal === null || oldVal === void 0 ? void 0 : oldVal.button_count)) {
      this.youtubeRenderKey++;
    }
    if (newVal === null || newVal === void 0 ? void 0 : newVal.enabled) {
      this.handleDuration();
    }
  }
  /**
   * Wait for duration to start before checking time
   * @returns void
   */
  handleDuration() {
    var _a, _b;
    if ((_a = window === null || window === void 0 ? void 0 : window.wp) === null || _a === void 0 ? void 0 : _a.blocks) {
      this.show = true;
      return;
    }
    this.show = timePassed({
      current: this.currentTime,
      duration: this.duration,
      showAfter: ((_b = this.config) === null || _b === void 0 ? void 0 : _b.percentage_start) || 0,
    });
  }
  youtubeButton() {
    var _a, _b, _c, _d;
    if (((_a = this.config) === null || _a === void 0 ? void 0 : _a.button_type) !== 'youtube' || !((_b = this.youtube) === null || _b === void 0 ? void 0 : _b.channelId)) {
      return;
    }
    return index.h("presto-youtube-subscribe-button", { key: this.youtubeRenderKey, channel: (_c = this.youtube) === null || _c === void 0 ? void 0 : _c.channelId, showCount: (_d = this.config) === null || _d === void 0 ? void 0 : _d.button_count });
  }
  customButton() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    if (((_a = this.config) === null || _a === void 0 ? void 0 : _a.button_type) !== 'custom') {
      return;
    }
    return (index.h("presto-player-button", { type: "primary", size: "small", href: (_c = (_b = this.config) === null || _b === void 0 ? void 0 : _b.button_link) === null || _c === void 0 ? void 0 : _c.url, target: ((_e = (_d = this.config) === null || _d === void 0 ? void 0 : _d.button_link) === null || _e === void 0 ? void 0 : _e.opensInNewTab) ? '_blank' : '_self', style: Object.assign(Object.assign({ '--presto-player-button-border-radius': `${(_f = this.config) === null || _f === void 0 ? void 0 : _f.button_radius}px` }, (((_g = this.config) === null || _g === void 0 ? void 0 : _g.button_color)
        ? {
          '--presto-player-button-color': `${(_h = this.config) === null || _h === void 0 ? void 0 : _h.button_color}`,
        }
        : {})), (((_j = this.config) === null || _j === void 0 ? void 0 : _j.button_text_color)
        ? {
          '--presto-player-button-text': `${(_k = this.config) === null || _k === void 0 ? void 0 : _k.button_text_color}`,
        }
        : {})) }, (_l = this.config) === null || _l === void 0 ? void 0 : _l.button_text));
  }
  render() {
    var _a, _b;
    return (index.h("presto-action-bar-ui", { open: this.show, style: {
        '--presto-action-bar-background': ((_a = this.config) === null || _a === void 0 ? void 0 : _a.background_color) || '#1d1d1d',
      } }, (_b = this.config) === null || _b === void 0 ? void 0 :
      _b.text, index.h("div", { slot: "button" }, this.youtubeButton(), this.customButton())));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "config": ["handleButtonCountChange"],
    "currentTime": ["handleDuration"],
    "duration": ["handleDuration"]
  }; }
};
PrestoActionBar.style = prestoActionBarCss;

const PrestoBunny = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  componentWillLoad() {
    this.poster = this.poster || this.thumbnail; // maybe add bunny thumbnail
  }
  render() {
    return (index.h("presto-video", { getRef: this.getRef, player: this.player, autoplay: this.autoplay, preload: this.preload, poster: this.poster, playsinline: this.playsinline, src: this.src, tracks: this.tracks }));
  }
};

const prestoCtaOverlayCss = ":host{display:block}";

const PrestoCTAOverlay = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.playVideo = index.createEvent(this, "playVideo", 7);
    this.rewatchVideo = index.createEvent(this, "rewatchVideo", 7);
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
    return (index.h("presto-cta-overlay-ui", { style: Object.assign(Object.assign(Object.assign({ '--presto-player-button-border-radius': `${(_b = (_a = this.preset) === null || _a === void 0 ? void 0 : _a.cta) === null || _b === void 0 ? void 0 : _b.button_radius}px` }, (((_d = (_c = this.preset) === null || _c === void 0 ? void 0 : _c.cta) === null || _d === void 0 ? void 0 : _d.background_opacity) ? { '--presto-player-cta-background-opacity': `${((_f = (_e = this.preset) === null || _e === void 0 ? void 0 : _e.cta) === null || _f === void 0 ? void 0 : _f.background_opacity) / 100}` } : {})), (((_h = (_g = this.preset) === null || _g === void 0 ? void 0 : _g.cta) === null || _h === void 0 ? void 0 : _h.button_color)
        ? {
          '--presto-player-button-color': `${(_k = (_j = this.preset) === null || _j === void 0 ? void 0 : _j.cta) === null || _k === void 0 ? void 0 : _k.button_color}`,
        }
        : {})), (((_m = (_l = this.preset) === null || _l === void 0 ? void 0 : _l.cta) === null || _m === void 0 ? void 0 : _m.button_text_color)
        ? {
          '--presto-player-button-text': `${(_p = (_o = this.preset) === null || _o === void 0 ? void 0 : _o.cta) === null || _p === void 0 ? void 0 : _p.button_text_color}`,
        }
        : {})), direction: this.direction, class: "cta-overlay", headline: (_r = (_q = this.preset) === null || _q === void 0 ? void 0 : _q.cta) === null || _r === void 0 ? void 0 : _r.headline, "bottom-text": (_t = (_s = this.preset) === null || _s === void 0 ? void 0 : _s.cta) === null || _t === void 0 ? void 0 : _t.bottom_text, "show-button": (_v = (_u = this.preset) === null || _u === void 0 ? void 0 : _u.cta) === null || _v === void 0 ? void 0 : _v.show_button, buttonLink: (_x = (_w = this.preset) === null || _w === void 0 ? void 0 : _w.cta) === null || _x === void 0 ? void 0 : _x.button_link, allowSkip: !this.ended && ((_z = (_y = this.preset) === null || _y === void 0 ? void 0 : _y.cta) === null || _z === void 0 ? void 0 : _z.show_skip), allowRewatch: this.ended && ((_1 = (_0 = this.preset) === null || _0 === void 0 ? void 0 : _0.cta) === null || _1 === void 0 ? void 0 : _1.show_rewatch), "button-text": (_3 = (_2 = this.preset) === null || _2 === void 0 ? void 0 : _2.cta) === null || _3 === void 0 ? void 0 : _3.button_text, onSkip: () => this.skip(), onRewatch: () => this.rewatch(), i18n: this.i18n }));
  }
  static get watchers() { return {
    "player": ["handlePlayerInit"],
    "ended": ["handleEnded"],
    "currentTime": ["handleFullScreen", "handlePercentagePassed", "handleEnabled", "handleTime"],
    "duration": ["handleDuration", "handlePercentagePassed"]
  }; }
};
PrestoCTAOverlay.style = prestoCtaOverlayCss;

const prestoDynamicOverlaysCss = ".top-left,.top-right{position:absolute;display:block;padding:20px;max-width:45%;z-index:20;display:flex;flex-direction:column;flex-wrap:wrap}.top-left{top:0;left:0}.top-right{top:0;right:0;align-items:flex-end}presto-dynamic-overlay-ui{overflow:hidden;height:0;opacity:0;transition:height 0ms 400ms, opacity 400ms 0ms}presto-dynamic-overlay-ui.visible{margin-bottom:10px;height:auto;opacity:1;transition:height 0ms 0ms, opacity 500ms 0ms}";

const PrestoDynamicOverlays = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.reloadComponent = index.createEvent(this, "reloadComponent", 7);
    this.watermarkRef = {
      left: null,
      right: null,
    };
    this.destroy = false;
    this.refs = {};
  }
  componentDidLoad() {
    this.player.on('timeupdate', e => {
      this.currentTime = e.detail.plyr.currentTime;
      this.checkValidity(); // check overlays validity.
    });
  }
  /**
   * Check validity of the overlays.
   * Blow up if any funny business.
   */
  checkValidity() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    // only if we are playing
    if (!this.player.playing) {
      return;
    }
    if (!((_a = this === null || this === void 0 ? void 0 : this.overlays) === null || _a === void 0 ? void 0 : _a.length) && !((_c = (_b = this.preset) === null || _b === void 0 ? void 0 : _b.watermark) === null || _c === void 0 ? void 0 : _c.enabled)) {
      return;
    }
    // make sure container and other divs are not removed.
    if (!((_d = this.container) === null || _d === void 0 ? void 0 : _d.offsetParent) || !((_e = this.topLeft) === null || _e === void 0 ? void 0 : _e.offsetParent) || !((_f = this.topRight) === null || _f === void 0 ? void 0 : _f.offsetParent)) {
      this.reloadComponent.emit();
    }
    // check for funny business on overlays.
    Object.keys(this.refs || {}).forEach(key => {
      const { overlay, component } = this.refs[key];
      this.checkComponent(component, overlay.text, () => this.reloadComponent.emit());
    });
    // check for any funny business on watermark
    if (this.shouldShowWatermark('top-left') && this.watermarkRef.left) {
      this.checkComponent(this.watermarkRef.left, (_h = (_g = this.preset) === null || _g === void 0 ? void 0 : _g.watermark) === null || _h === void 0 ? void 0 : _h.text, () => this.reloadComponent.emit());
    }
    if (this.shouldShowWatermark('top-right') && this.watermarkRef.right) {
      this.checkComponent(this.watermarkRef.right, (_k = (_j = this.preset) === null || _j === void 0 ? void 0 : _j.watermark) === null || _k === void 0 ? void 0 : _k.text, () => this.reloadComponent.emit());
    }
  }
  /**
   * Check if the component is valid.
   * If invalid, run a callback.
   *
   * @param component
   * @param text
   * @returns
   */
  checkComponent(component, text, callback) {
    // hidden, it's invalid.
    if (!(component === null || component === void 0 ? void 0 : component.offsetParent)) {
      return callback();
    }
    // slot was removed.
    if (!component.shadowRoot.querySelector('slot')) {
      return callback();
    }
    // only if we're playing
    if (!!this.player && this.player.playing) {
      const content = component.shadowRoot.querySelector('slot').assignedNodes()[0];
      if (content) {
        // slot content changed.
        if (content.parentElement.innerHTML != text) {
          return callback();
        }
        // font-size changes.
        const style = getComputedStyle(content.parentElement.shadowRoot.querySelector('.overlay-text'));
        if (parseInt(style.fontSize, 10) < 10) {
          return callback();
        }
        // opacity changes
        const color = parseColor(style.color);
        if ((color === null || color === void 0 ? void 0 : color[3]) !== '1') {
          return callback();
        }
      }
    }
  }
  /**
   * Show the overlay
   * @param overlay
   * @returns
   */
  shouldShowOverlay(overlay) {
    // need a time.
    if (typeof this.currentTime === 'undefined') {
      return;
    }
    // bail if current time is less than start time
    if (this.currentTime < timeToSeconds(overlay === null || overlay === void 0 ? void 0 : overlay.startTime)) {
      return false;
    }
    // bail if current time is more than end time
    if (this.currentTime > timeToSeconds(overlay === null || overlay === void 0 ? void 0 : overlay.endTime)) {
      return false;
    }
    return true;
  }
  /**
   * Render the watermark
   */
  renderOverlay(overlay) {
    var _a, _b;
    return (index.h("presto-dynamic-overlay-ui", { class: {
        visible: this.shouldShowOverlay(overlay),
      }, ref: el => (this.refs[overlay.id] = {
        overlay,
        component: el,
      }), key: overlay.id, position: overlay.position, href: (_a = overlay === null || overlay === void 0 ? void 0 : overlay.link) === null || _a === void 0 ? void 0 : _a.url, target: ((_b = overlay === null || overlay === void 0 ? void 0 : overlay.link) === null || _b === void 0 ? void 0 : _b.opensInNewTab) ? '_blank' : '_self', innerHTML: this.shouldShowOverlay(overlay) ? overlay.text : '', style: {
        '--presto-dynamic-overlay-color': (overlay === null || overlay === void 0 ? void 0 : overlay.color) || '#fff',
        '--presto-dynamic-overlay-background': (overlay === null || overlay === void 0 ? void 0 : overlay.backgroundColor) || '#333',
        '--presto-dynamic-overlay-opacity': (overlay === null || overlay === void 0 ? void 0 : overlay.opacity) ? (overlay.opacity / 100).toString() : '1',
      } }));
  }
  /**
   * Should we show the watermark?
   */
  shouldShowWatermark(position) {
    var _a, _b, _c;
    if (!((_b = (_a = this.preset) === null || _a === void 0 ? void 0 : _a.watermark) === null || _b === void 0 ? void 0 : _b.enabled))
      return false;
    const watermark = (_c = this.preset) === null || _c === void 0 ? void 0 : _c.watermark;
    // randomize
    if (watermark.position === 'randomize') {
      const time = Math.floor((this.player.currentTime || 0) / 10);
      // even or odd
      if (time % 2 == 0) {
        return position === 'top-left';
      }
      else {
        return position === 'top-right';
      }
    }
    // position is set.
    if (watermark.position === position) {
      return true;
    }
    // fallback.
    if (!watermark.position && 'top-right' === position) {
      return true;
    }
    return false;
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    // bail if disabled.
    if (!this.enabled) {
      return;
    }
    // bail if no overlays or watermark
    if (!((_a = this === null || this === void 0 ? void 0 : this.overlays) === null || _a === void 0 ? void 0 : _a.length) && !((_c = (_b = this.preset) === null || _b === void 0 ? void 0 : _b.watermark) === null || _c === void 0 ? void 0 : _c.enabled)) {
      return;
    }
    return (index.h("div", { class: "overlays", ref: el => (this.container = el) }, index.h("div", { class: "top-left", ref: el => (this.topLeft = el) }, !!this.shouldShowWatermark('top-left') && (index.h("presto-dynamic-overlay-ui", { ref: el => (this.watermarkRef.left = el), style: {
        '--presto-dynamic-overlay-color': ((_d = this.preset.watermark) === null || _d === void 0 ? void 0 : _d.color) || '#fff',
        '--presto-dynamic-overlay-background': ((_e = this.preset.watermark) === null || _e === void 0 ? void 0 : _e.backgroundColor) || '#333',
        '--presto-dynamic-overlay-opacity': ((_f = this.preset.watermark) === null || _f === void 0 ? void 0 : _f.opacity) ? (this.preset.watermark.opacity / 100).toString() : '1',
      }, class: "visible", position: 'top-left', innerHTML: this.preset.watermark.text })), !!((_g = this === null || this === void 0 ? void 0 : this.overlays) === null || _g === void 0 ? void 0 : _g.length) &&
      this.overlays.map(overlay => {
        if (overlay.position !== 'top-left') {
          return '';
        }
        return this.renderOverlay(overlay);
      })), index.h("div", { class: "top-right", ref: el => (this.topRight = el) }, !!this.shouldShowWatermark('top-right') && (index.h("presto-dynamic-overlay-ui", { ref: el => (this.watermarkRef.right = el), style: {
        '--presto-dynamic-overlay-color': ((_h = this.preset.watermark) === null || _h === void 0 ? void 0 : _h.color) || '#fff',
        '--presto-dynamic-overlay-background': ((_j = this.preset.watermark) === null || _j === void 0 ? void 0 : _j.backgroundColor) || '#333',
        '--presto-dynamic-overlay-opacity': ((_k = this.preset.watermark) === null || _k === void 0 ? void 0 : _k.opacity) ? (this.preset.watermark.opacity / 100).toString() : '1',
      }, class: "visible", position: 'top-right', innerHTML: this.preset.watermark.text })), !!((_l = this === null || this === void 0 ? void 0 : this.overlays) === null || _l === void 0 ? void 0 : _l.length) &&
      this.overlays.map(overlay => {
        if (overlay.position !== 'top-right') {
          return '';
        }
        return this.renderOverlay(overlay);
      }))));
  }
  get el() { return index.getElement(this); }
};
PrestoDynamicOverlays.style = prestoDynamicOverlaysCss;

const prestoEmailOverlayCss = ":host{display:block}";

const PrestoEmailOverlay = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.playVideo = index.createEvent(this, "playVideo", 7);
  }
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
    return (index.h("presto-email-overlay-ui", { direction: this.direction, class: "email-overlay", headline: (_b = (_a = this.preset) === null || _a === void 0 ? void 0 : _a.email_collection) === null || _b === void 0 ? void 0 : _b.headline, bottomText: (_d = (_c = this.preset) === null || _c === void 0 ? void 0 : _c.email_collection) === null || _d === void 0 ? void 0 : _d.bottom_text, allowSkip: (_f = (_e = this.preset) === null || _e === void 0 ? void 0 : _e.email_collection) === null || _f === void 0 ? void 0 : _f.allow_skip, buttonText: (_h = (_g = this.preset) === null || _g === void 0 ? void 0 : _g.email_collection) === null || _h === void 0 ? void 0 : _h.button_text, isLoading: this.loading, errorMessage: this.error, onSubmitForm: e => this.submit(e), onSkip: () => this.skip(), i18n: this.i18n }));
  }
  static get watchers() { return {
    "player": ["handlePlayerInit"],
    "duration": ["handleDuration"],
    "currentTime": ["handleTime"]
  }; }
};
PrestoEmailOverlay.style = prestoEmailOverlayCss;

const prestoMutedOverlayCss = ":host{display:block}";

const PrestoMutedOverlay = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.playVideo = index.createEvent(this, "playVideo", 7);
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return (index.h("div", { class: "presto-player__muted-overlay", onClick: () => {
        this.mutedPreview = false;
        this.playVideo.emit();
      } }, ((_a = this.preset) === null || _a === void 0 ? void 0 : _a['play-large']) &&
      index.h("div", { class: "plyr__control plyr__control--overlaid", "data-plyr": "play", "aria-label": "Play", part: "muted-overlay-play" }, index.h("svg", { id: "plyr-play", viewBox: "0 0 18 18" }, index.h("path", { d: "M15.562 8.1L3.87.225c-.818-.562-1.87 0-1.87.9v15.75c0 .9 1.052 1.462 1.87.9L15.563 9.9c.584-.45.584-1.35 0-1.8z" })), index.h("span", { class: "plyr__sr-only" }, "Play")), ((_b = this.mutedOverlay) === null || _b === void 0 ? void 0 : _b.enabled) && ((_c = this.mutedOverlay) === null || _c === void 0 ? void 0 : _c.src) ? (index.h("div", { class: "presto-player__overlay is-image", part: "muted-overlay-image", style: {
        width: `${((_d = this.mutedOverlay) === null || _d === void 0 ? void 0 : _d.width) || 50}%`,
        left: `${(((_f = (_e = this.mutedOverlay) === null || _e === void 0 ? void 0 : _e.focalPoint) === null || _f === void 0 ? void 0 : _f.x) || 0.5) * 100}%`,
        top: `${(((_h = (_g = this.mutedOverlay) === null || _g === void 0 ? void 0 : _g.focalPoint) === null || _h === void 0 ? void 0 : _h.y) || 0.5) * 100}%`,
      } }, index.h("img", { src: (_j = this.mutedOverlay) === null || _j === void 0 ? void 0 : _j.src, style: { transform: 'translateX(-50%) translateY(-50%)' } }))) : ('')));
  }
};
PrestoMutedOverlay.style = prestoMutedOverlayCss;

const prestoVimeoCss = ":host{display:block}";

const PrestoVimeo = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  getId(url) {
    const regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
    const parseUrl = regExp.exec(url || '');
    return (parseUrl === null || parseUrl === void 0 ? void 0 : parseUrl[5]) || '';
  }
  render() {
    if (!this.src) {
      return;
    }
    /*
      Our player is not working on Android WebView.
      https://github.com/prestomade/presto-player/issues/124
    */
    if (isAndroidWebView()) {
      return (index.h("div", { class: "presto-iframe-fallback-container" }, index.h("iframe", { src: `https://player.vimeo.com/video/${this.getId(this.src)}?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media`, allowFullScreen: true, allowTransparency: true, allow: "autoplay", style: { "width": "100%" }, class: "presto-fallback-iframe" })));
    }
    return index.h("div", { class: "plyr__video-embed", part: "embed", ref: this.getRef, "data-plyr-provider": "vimeo", "data-plyr-embed-id": this.getId(this.src) });
  }
};
PrestoVimeo.style = prestoVimeoCss;

const prestoYoutubeCss = ":host{display:block}.fallback-container{position:relative;padding-bottom:56.25%;padding-top:30px;height:0;overflow:hidden}.fallback-container iframe,.fallback-container object,.fallback-container embed{position:absolute;top:0;left:0;width:100%;height:100%}@supports not (aspect-ratio: 16/9){.plyr__video-embed,.plyr__video-wrapper--fixed-ratio{height:0 !important;padding-bottom:56.25%;position:relative}}";

const PrestoYoutube = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.reload = index.createEvent(this, "reload", 7);
  }
  /**
   * When player is set, do ratio and fixes
   * @returns
   */
  handlePlayerChange() {
    if (!this.player) {
      return;
    }
    this.fixes();
  }
  // fixes issue where youtube can sometimes can be muted if played before load
  fixes() {
    this.player.on('statechange', e => {
      var _a, _b, _c, _d, _e;
      // only playing
      if (e.detail.code !== 1) {
        return;
      }
      // not autoplay
      if ((_e = (_d = (_c = (_b = (_a = e === null || e === void 0 ? void 0 : e.detail) === null || _a === void 0 ? void 0 : _a.plyr) === null || _b === void 0 ? void 0 : _b.config) === null || _c === void 0 ? void 0 : _c.blockAttributes) === null || _d === void 0 ? void 0 : _d.mutedPreview) === null || _e === void 0 ? void 0 : _e.enabled) {
        return;
      }
      // unmute
      this.player.muted = false;
    });
  }
  // get id from youtube url
  getId(url) {
    var _a;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = (url || '').match(regExp);
    return match && ((_a = match === null || match === void 0 ? void 0 : match[2]) === null || _a === void 0 ? void 0 : _a.length) === 11 ? match[2] : null;
  }
  // load player
  loadPlayer() {
    this.lazyLoad = false;
    this.reloadPlayer = true;
  }
  // wait for component to update before reloading
  componentDidRender() {
    if (this.reloadPlayer) {
      this.reloadPlayer = false;
      this.reload.emit('play');
    }
  }
  /**
   * detect if we're in a webview browser
   */
  setWebView() {
    var _a;
    // @ts-ignore
    let standalone = (_a = window.navigator) === null || _a === void 0 ? void 0 : _a.standalone, userAgent = window.navigator.userAgent.toLowerCase(), safari = /safari/.test(userAgent), ios = /iphone|ipod|ipad/.test(userAgent);
    if (ios) {
      // ios webview
      this.isWebView = !standalone && !safari;
    }
    else {
      // android webview
      this.isWebView = userAgent.includes('wv');
    }
  }
  // don't lazy load on iOS
  componentWillLoad() {
    this.setWebView();
    // pull default Youtube poster if nothing set.
    if (!this.poster) {
      this.poster = `//img.youtube.com/vi/${this.getId(this.src)}/maxresdefault.jpg`;
    }
    if (this.lazyLoad && isIOS()) {
      this.lazyLoad = false;
    }
  }
  render() {
    if (this.isWebView) {
      return (index.h("div", { class: "fallback-container" }, index.h("iframe", { src: this.src, allowFullScreen: true, allowtransparency: true, allow: "autoplay" })));
    }
    if (this.lazyLoad) {
      return (index.h("div", null, index.h("presto-video", { part: "video", getRef: this.getRef, poster: this.poster, src: "", provider: "youtube" }), index.h("div", { class: "presto-player__play-cover", onClick: () => this.loadPlayer() })));
    }
    return index.h("div", { class: "plyr__video-embed", part: "embed", ref: this.getRef, "data-plyr-provider": "youtube", "data-plyr-embed-id": this.getId(this.src) });
  }
  static get watchers() { return {
    "player": ["handlePlayerChange"]
  }; }
};
PrestoYoutube.style = prestoYoutubeCss;

exports.presto_action_bar = PrestoActionBar;
exports.presto_bunny = PrestoBunny;
exports.presto_cta_overlay = PrestoCTAOverlay;
exports.presto_dynamic_overlays = PrestoDynamicOverlays;
exports.presto_email_overlay = PrestoEmailOverlay;
exports.presto_muted_overlay = PrestoMutedOverlay;
exports.presto_vimeo = PrestoVimeo;
exports.presto_youtube = PrestoYoutube;
