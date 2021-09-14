import { r as registerInstance, c as createEvent, h } from './index-65cf7490.js';
import { f as fitText } from './fittext-65fbf465.js';

const prestoEmailOverlayUiCss = ":host{display:block;font-size:16px;width:100%;height:100%;position:absolute;top:0;left:0;bottom:0;right:0;width:100%;height:100%;z-index:99999}*{box-sizing:border-box}a{color:#fff}.overlay{position:relative;display:flex;align-items:center;text-align:center;justify-content:center;padding:48px;color:#fff;font-family:var(--plyr-font-family, \"San Francisco\", -apple-system, BlinkMacSystemFont, \".SFNSText-Regular\", Avenir, \"Avenir Next\", \"Helvetica Neue\", \"Segoe UI\", Helvetica, Arial, sans-serif);height:100%}.overlay:before{content:\"\";border-radius:var(--presto-player-border-radius, 0);opacity:var(--presto-player-email-background-opacity, 0.75);position:absolute;top:0;left:0;bottom:0;right:0;background-color:var(--presto-player-email-background, #000);z-index:-1;box-shadow:inset 0 0 100px black}.content{width:20em}form{display:flex;align-items:stretch;justify-content:center}input{background:#fff;border:none;font-size:0.8em;line-height:20px;padding:6px 8px;border-radius:0;border-width:1px;border-style:solid;border-color:transparent;border-radius:var(--presto-player-email-border-radius, 0) 0 0 var(--presto-player-email-border-radius);flex:1}@media screen and (min-width: 700px){input{padding:10px 14px}}input:focus{border-color:var(--plyr-color-main, #000);z-index:1}input:focus,input:hover{outline:none}.rtl input{border-radius:0 var(--presto-player-email-border-radius, 0) var(--presto-player-email-border-radius) 0}button{background:var(--plyr-color-main, #000);appearance:none;padding:6px 12px;align-items:center;display:inline-flex;border-width:1px;border-color:transparent;color:#fff;border-radius:0;cursor:pointer;font-size:0.8em;border-radius:0 var(--presto-player-email-border-radius, 0) var(--presto-player-email-border-radius) 0}@media screen and (min-width: 700px){button{padding:10px 18px}}button:focus{box-shadow:white 0px 0px 0px 2px, var(--plyr-color-main, #000) 0px 0px 0px 4px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;z-index:1}button:focus,button:hover{outline:none}.rtl button{border-radius:var(--presto-player-email-border-radius, 0) 0 0 var(--presto-player-email-border-radius)}h1{font-size:1.5em;font-weight:500;margin:0 0 22px 0;max-width:600px;line-height:1.1em}.skip{font-size:0.8em;font-weight:600;position:absolute;top:0;right:0;padding:4%;cursor:pointer}p{font-size:0.7em;margin:0;margin-top:1.5em}";

const EmailOverlayUI = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.submitForm = createEvent(this, "submitForm", 7);
    this.skip = createEvent(this, "skip", 7);
  }
  /**
   * Handle form submission
   * @param e Event
   */
  handleSubmit(e) {
    this.submitForm.emit({
      email: this.email,
    });
    e.preventDefault();
  }
  componentDidLoad() {
    fitText(this.textInput, 3, {
      maxFontSize: 20,
      minFontSize: 8,
    });
  }
  /**
   * Handle input change
   * @param e Event
   */
  handleChange(e) {
    this.email = e.target.value;
  }
  render() {
    var _a, _b, _c, _d;
    return (h("div", { class: `overlay ${this.direction === 'rtl' ? 'rtl' : ''}`, ref: el => (this.textInput = el) }, h("div", { class: "content" }, h("h1", null, this.headline || ((_a = this === null || this === void 0 ? void 0 : this.i18n) === null || _a === void 0 ? void 0 : _a.emailDefaultHeadline)), this.isLoading ? (h("presto-player-spinner", null)) : (h("form", { onSubmit: e => this.handleSubmit(e) }, h("input", { type: "email", placeholder: (_b = this === null || this === void 0 ? void 0 : this.i18n) === null || _b === void 0 ? void 0 : _b.emailPlaceholder, value: this.email, onInput: event => this.handleChange(event), required: true }), h("button", { type: "submit" }, this.buttonText || ((_c = this === null || this === void 0 ? void 0 : this.i18n) === null || _c === void 0 ? void 0 : _c.play)))), this.errorMessage && h("p", { class: "error" }, this.errorMessage), this.bottomText && h("p", { innerHTML: this.bottomText }), !!this.allowSkip && (h("div", { class: "skip", onClick: () => {
        this.skip.emit();
      } }, (_d = this === null || this === void 0 ? void 0 : this.i18n) === null || _d === void 0 ? void 0 :
      _d.skip, " \u2192")))));
  }
};
EmailOverlayUI.style = prestoEmailOverlayUiCss;

const prestoSpinnerCss = ":host{position:relative;box-sizing:border-box;--track-color:#0d131e20;--indicator-color:var(--plyr-color-main);--stroke-width:2px;display:inline-flex}:host *,:host *:before,:host *:after{box-sizing:inherit}.spinner{display:inline-block;width:1em;height:1em;border-radius:50%;border:solid var(--stroke-width) var(--track-color);border-top-color:var(--indicator-color);border-right-color:var(--indicator-color);animation:1s linear infinite spin}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

const PrestoSpinner = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return h("span", { part: "base", class: "spinner", "aria-busy": "true", "aria-live": "polite" });
  }
};
PrestoSpinner.style = prestoSpinnerCss;

export { EmailOverlayUI as presto_email_overlay_ui, PrestoSpinner as presto_player_spinner };
