'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-858a23c7.js');
const fittext = require('./fittext-e71fc29f.js');

const prestoDynamicOverlayUiCss = ":host{display:block}.overlay-text{text-decoration:none;display:inline-block;user-select:none;line-height:1;opacity:var(--presto-dynamic-overlay-opacity, 1);font-size:var(--presto-dynamic-overlay-font-size, 18px);padding:var(--presto-dynamic-overlay-padding, 0.65em 0.85em);font-weight:var(--presto-dynamic-overlay-font-weight, 500);border-radius:var(--presto-dynamic-overlay-radius, 0.25em);background:var(--presto-dynamic-overlay-background, rgba(0, 0, 0, 0.8));color:var(--presto-dynamic-overlay-color, #fff);opacity:var(--presto-dynamic-overlay-opacity, 1);word-break:break-word}a.overlay-text{cursor:pointer}";

const PrestoDynamicOverlayUi = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.position = 'top-right';
  }
  closestElement(selector, el) {
    return (el && el != document && el != window && el.closest(selector)) || this.closestElement(selector, el.getRootNode().host);
  }
  componentDidLoad() {
    let player = this.closestElement('presto-player', this.el);
    fittext.fitText(this.text, 3, {
      maxFontSize: 16,
      minFontSize: 10,
      container: player,
    });
  }
  render() {
    const Tag = this.href ? 'a' : 'span';
    return (index.h(Tag, { class: {
        'overlay-text': true,
        'overlay--top-left': this.position === 'top-left',
        'overlay--top-right': this.position === 'top-right',
      }, href: this.href, target: this.target, part: "overlay-text", ref: el => (this.text = el) }, index.h("slot", null)));
  }
  get el() { return index.getElement(this); }
};
PrestoDynamicOverlayUi.style = prestoDynamicOverlayUiCss;

exports.presto_dynamic_overlay_ui = PrestoDynamicOverlayUi;
