'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-858a23c7.js');
const fittext = require('./fittext-e71fc29f.js');

const prestoCtaOverlayUiCss = ":host{display:block;font-size:16px;width:100%;height:100%;position:absolute;top:0;left:0;bottom:0;right:0;width:100%;height:100%;z-index:99999;user-select:none}*{box-sizing:border-box}a{color:#fff}.wrapper{height:100%;position:relative;color:#fff;font-family:var(--plyr-font-family, \"San Francisco\", -apple-system, BlinkMacSystemFont, \".SFNSText-Regular\", Avenir, \"Avenir Next\", \"Helvetica Neue\", \"Segoe UI\", Helvetica, Arial, sans-serif)}.overlay{position:relative;display:flex;align-items:center;justify-content:center;padding:48px;height:100%}.overlay.has-link{cursor:pointer}.overlay:before{content:\"\";border-radius:var(--presto-player-border-radius, 0);opacity:var(--presto-player-cta-background-opacity, 0.75);position:absolute;top:0;left:0;bottom:0;right:0;background-color:var(--presto-player-cta-background, #000);z-index:-1;box-shadow:inset 0 0 100px black}.content{width:80%;max-width:600px}.content *~*{margin-top:22px}button{background:var(--plyr-color-main, #000);appearance:none;padding:6px 12px;align-items:center;display:inline-flex;border-width:1px;border-color:transparent;color:#fff;border-radius:0;cursor:pointer;font-size:0.8em;border-radius:0 var(--presto-player-cta-border-radius, 0) var(--presto-player-cta-border-radius) 0}@media screen and (min-width: 700px){button{padding:10px 18px}}button:focus{box-shadow:white 0px 0px 0px 2px, var(--plyr-color-main, #000) 0px 0px 0px 4px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;z-index:1}button:focus,button:hover{outline:none}h1{font-size:1.5em;font-weight:500;margin:0;line-height:1.1em}.skip,.rewatch{font-size:0.8em;font-weight:600;position:absolute;top:0;right:0;padding:4%;cursor:pointer}.rewatch{display:inline-flex;align-items:center;right:auto;left:0}.rewatch .icon{margin-right:5px}p{font-size:0.85em;margin:0;margin-top:1.5em;line-height:1.4em;opacity:0.75}";

const CTAOverlayUI = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.skip = index.createEvent(this, "skip", 7);
    this.rewatch = index.createEvent(this, "rewatch", 7);
  }
  componentDidLoad() {
    fittext.fitText(this.textInput, 3, {
      maxFontSize: 20,
      minFontSize: 8,
    });
  }
  handleCTAClick(e) {
    var _a;
    if (!((_a = this.buttonLink) === null || _a === void 0 ? void 0 : _a.url)) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    this.handleLink();
  }
  handleLink() {
    var _a, _b, _c;
    if ((_a = this.buttonLink) === null || _a === void 0 ? void 0 : _a.opensInNewTab) {
      window.open((_b = this.buttonLink) === null || _b === void 0 ? void 0 : _b.url, '_blank');
    }
    else {
      window.location.href = (_c = this.buttonLink) === null || _c === void 0 ? void 0 : _c.url;
    }
  }
  render() {
    var _a, _b, _c, _d, _e;
    return (index.h("div", { class: "wrapper", ref: el => (this.textInput = el) }, index.h("div", { onClick: e => this.handleCTAClick(e), class: `overlay ${this.direction === 'rtl' ? 'rtl' : ''} ${((_a = this.buttonLink) === null || _a === void 0 ? void 0 : _a.url) ? 'has-link' : ''}` }, index.h("div", { class: "content" }, index.h("h1", { part: "cta-headline" }, this.headline || this.defaultHeadline), this.bottomText && index.h("p", { part: "cta-bottom-text", innerHTML: this.bottomText }), this.showButton && (index.h("presto-player-button", { full: true, onClick: e => this.handleCTAClick(e), part: "cta-button", href: (_b = this === null || this === void 0 ? void 0 : this.buttonLink) === null || _b === void 0 ? void 0 : _b.url, target: ((_c = this === null || this === void 0 ? void 0 : this.buttonLink) === null || _c === void 0 ? void 0 : _c.opensInNewTab) ? '_blank' : '_self', class: "button", type: "primary" }, this.buttonText)))), !!this.allowRewatch && (index.h("div", { class: "rewatch", onClick: e => {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.rewatch.emit();
      } }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "3", "stroke-linecap": "round", "stroke-linejoin": "round", class: "icon icon-corner-up-left" }, index.h("polyline", { points: "9 14 4 9 9 4" }), index.h("path", { d: "M20 20v-7a4 4 0 0 0-4-4H4" })), (_d = this === null || this === void 0 ? void 0 : this.i18n) === null || _d === void 0 ? void 0 :
      _d.rewatch)), !!this.allowSkip && (index.h("div", { class: "skip", onClick: e => {
        e.preventDefault();
        this.skip.emit();
      } }, (_e = this === null || this === void 0 ? void 0 : this.i18n) === null || _e === void 0 ? void 0 :
      _e.skip, " \u2192"))));
  }
};
CTAOverlayUI.style = prestoCtaOverlayUiCss;

exports.presto_cta_overlay_ui = CTAOverlayUI;
