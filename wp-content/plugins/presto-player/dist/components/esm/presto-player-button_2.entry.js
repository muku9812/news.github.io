import { _ as _toConsumableArray, r as registerInstance, c as createEvent, h, g as getElement } from './index-65cf7490.js';

const Fragment = (function (props, children) {
  return _toConsumableArray(children);
});

const prestoPlayerButtonCss = ":host{display:inline-block;width:auto;cursor:pointer}:host([full]){display:block}.button{display:inline-flex;align-items:stretch;justify-content:center;width:100%;border-style:solid;border-width:var(--presto-player-button-border-width);font-family:var(--plyr-font-family, inherit);font-weight:var(--presto-player-button-font-weight, 500);text-decoration:none;user-select:none;white-space:nowrap;vertical-align:middle;padding:0;transition:var(--presto--player-transition-fast, 150ms) background-color, var(--presto-player-transition-fast, 150ms) color, var(--presto-player-transition-fast, 150ms) border, var(--presto--player-transition-fast, 150ms) box-shadow;cursor:inherit;border-radius:var(--presto-player-button-border-radius, 0.25rem)}.button::-moz-focus-inner{border:0}.button:focus{outline:none}.button.button--disabled{opacity:0.5;cursor:not-allowed}.button.button--disabled *{pointer-events:none}.button ::slotted(.presto--icon){pointer-events:none}.button__prefix,.button__suffix{flex:0 0 auto;display:flex;align-items:center}.button__label{display:flex;align-items:center}.button__label ::slotted(presto-icon){vertical-align:-2px}.button.button--default{background-color:var(--presto-player-color-white, #fff);border-color:var(--presto-player-color-gray-300, #d1d5db);color:var(--presto-player-color-gray-600, #4b5563)}.button.button--default:hover:not(.button--disabled){border-color:var(--presto-player-button-color, var(--plyr-color-main));color:var(--presto-player-button-color, var(--plyr-color-main));opacity:0.75}.button.button--default:focus:not(.button--disabled){border-color:var(--presto-player-button-color, var(--plyr-color-main));color:var(--presto-player-button-color, var(--plyr-color-main));opacity:1}.button.button--default:active:not(.button--disabled){border-color:var(--presto-player-button-color, var(--plyr-color-main));color:var(--presto-player-button-color, var(--plyr-color-main));opacity:1}.button.button--primary{background-color:var(--presto-player-button-color, var(--plyr-color-main));border-color:var(--presto-player-button-color, var(--plyr-color-main));color:var(--presto-player-button-text, #fff)}.button.button--primary:hover:not(.button--disabled){opacity:0.9}.button.button--primary:focus:not(.button--disabled){opacity:1}.button.button--primary:active:not(.button--disabled){opacity:1}.button--text{background-color:transparent;border-color:transparent;color:var(--presto-player-button-color, var(--plyr-color-main))}.button--text:hover:not(.button--disabled){background-color:transparent;border-color:transparent;opacity:0.8}.button--text:focus:not(.button--disabled){background-color:transparent;border-color:transparent;opacity:0.7}.button--text:active:not(.button--disabled){background-color:transparent;border-color:transparent;opacity:0.7}.button--small{font-size:var(--presto-player-button-font-size-small, 0.875rem);height:var(--presto-player-button-height-small, 1.875rem);line-height:calc(var(--presto-player-button-height-small, 1.875rem) - var(--presto-player-button-border-width, 1px) * 2)}.button--medium{font-size:var(--presto-player-button-font-size-medium, 1rem);height:var(--presto-player-button-height-medium, 2.5rem);line-height:calc(var(--presto-player-button-height-medium, 2.5rem) - var(--presto-player-button-border-width, 1px) * 2)}.button--large{font-size:var(--presto-player-button-font-size-large, 1.25rem);height:var(--presto-player-button-height-large, 3.125rem);line-height:calc(var(--presto-player-button-height-large, 3.125rem) - var(--presto-player-button-border-width, 1px) * 2)}.button--full{display:block}.button--has-label.button--small .button__label{padding:0 var(--presto-player-button-spacing-small, 0.75rem)}.button--has-label.button--medium .button__label{padding:0 var(--presto-player-button-spacing-medium, 1rem)}.button--has-label.button--large .button__label{padding:0 var(--presto-player-button-spacing-large, 1.25rem)}.button--has-prefix.button--small{padding-left:var(--presto-player-button-spacing-x-small, 0.5rem)}.button--has-prefix.button--small .button__label{padding-left:var(--presto-player-button-spacing-x-small, 0.5rem)}.button--has-prefix.button--medium{padding-left:var(--presto-player-button-spacing-small, 0.75rem)}.button--has-prefix.button--medium .button__label{padding-left:var(--presto-player-button-spacing-small, 0.75rem)}.button--has-prefix.button--large{padding-left:var(--presto-player-button-spacing-small, 0.75rem)}.button--has-prefix.button--large .button__label{padding-left:var(--presto-player-button-spacing-small, 0.75rem)}.button--has-suffix.button--small,.button--caret.button--small{padding-right:var(--presto-player-button-spacing-x-small, 0.5rem)}.button--has-suffix.button--small .button__label,.button--caret.button--small .button__label{padding-right:var(--presto-player-button-spacing-x-small, 0.5rem)}.button--has-suffix.button--medium,.button--caret.button--medium{padding-right:var(--presto-player-button-spacing-small, 0.75rem)}.button--has-suffix.button--medium .button__label,.button--caret.button--medium .button__label{padding-right:var(--presto-player-button-spacing-small, 0.75rem)}.button--has-suffix.button--large,.button--caret.button--large{padding-right:var(--presto-player-button-spacing-small, 0.75rem)}.button--has-suffix.button--large .button__label,.button--caret.button--large .button__label{padding-right:var(--presto-player-button-spacing-small, 0.75rem)}";

const PrestoPlayerButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.prestoBlur = createEvent(this, "prestoBlur", 7);
    this.prestoFocus = createEvent(this, "prestoFocus", 7);
    this.hasFocus = false;
    this.hasLabel = false;
    this.hasPrefix = false;
    this.hasSuffix = false;
    /** The button's type. */
    this.type = 'default';
    /** The button's size. */
    this.size = 'medium';
    /** Draws the button with a caret for use with dropdowns, popovers, etc. */
    this.full = false;
    /** Disables the button. */
    this.disabled = false;
    /** Indicates if activating the button should submit the form. Ignored when `href` is set. */
    this.submit = false;
  }
  componentWillLoad() {
    this.handleSlotChange();
  }
  /** Simulates a click on the button. */
  click() {
    this.button.click();
  }
  /** Sets focus on the button. */
  focus(options) {
    this.button.focus(options);
  }
  /** Removes focus from the button. */
  blur() {
    this.button.blur();
  }
  handleSlotChange() {
    this.hasLabel = !!this.button.children;
    this.hasPrefix = !!this.button.querySelector('[slot="prefix"]');
    this.hasSuffix = !!this.button.querySelector('[slot="suffix"]');
  }
  handleBlur() {
    this.hasFocus = false;
    this.prestoBlur.emit();
  }
  handleFocus() {
    this.hasFocus = true;
    this.prestoFocus.emit();
  }
  handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  render() {
    const isLink = this.href ? true : false;
    const interior = (h(Fragment, null, h("span", { part: "prefix", class: "button__prefix" }, h("slot", { onSlotchange: () => this.handleSlotChange(), name: "prefix" })), h("span", { part: "label", class: "button__label" }, h("slot", { onSlotchange: () => this.handleSlotChange() })), h("span", { part: "suffix", class: "button__suffix" }, h("slot", { onSlotchange: () => this.handleSlotChange(), name: "suffix" }))));
    const button = (h("button", { part: "base", class: {
        'button': true,
        'button--default': this.type === 'default',
        'button--primary': this.type === 'primary',
        'button--success': this.type === 'success',
        'button--info': this.type === 'info',
        'button--warning': this.type === 'warning',
        'button--danger': this.type === 'danger',
        'button--text': this.type === 'text',
        'button--small': this.size === 'small',
        'button--medium': this.size === 'medium',
        'button--large': this.size === 'large',
        'button--disabled': this.disabled,
        'button--focused': this.hasFocus,
        'button--has-label': this.hasLabel,
        'button--has-prefix': this.hasPrefix,
        'button--has-suffix': this.hasSuffix,
      }, disabled: this.disabled, type: this.submit ? 'submit' : 'button', name: this.name, value: this.value, onBlur: () => this.handleBlur, onFocus: () => this.handleFocus, onClick: () => this.handleClick }, interior));
    const link = (h("a", { part: "base", class: {
        'button': true,
        'button--default': this.type === 'default',
        'button--primary': this.type === 'primary',
        'button--success': this.type === 'success',
        'button--info': this.type === 'info',
        'button--warning': this.type === 'warning',
        'button--danger': this.type === 'danger',
        'button--text': this.type === 'text',
        'button--small': this.size === 'small',
        'button--medium': this.size === 'medium',
        'button--large': this.size === 'large',
        'button--disabled': this.disabled,
        'button--focused': this.hasFocus,
        'button--has-label': this.hasLabel,
        'button--has-prefix': this.hasPrefix,
        'button--has-suffix': this.hasSuffix,
      }, href: this.href, target: this.target, download: this.download, rel: this.target ? 'noreferrer noopener' : undefined, role: "button", "aria-disabled": this.disabled ? 'true' : 'false', tabindex: this.disabled ? '-1' : '0', onBlur: () => this.handleBlur, onFocus: () => this.handleFocus, onClick: () => this.handleClick }, interior));
    return isLink ? link : button;
  }
  get button() { return getElement(this); }
};
PrestoPlayerButton.style = prestoPlayerButtonCss;

const prestoVideoCurtainUiCss = ":host{font-size:16px}.curtain{font-family:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";background-color:#000;text-align:center;color:#fff;padding-bottom:56.25%;position:relative;font-size:1.5em}::slotted(:not(:first-child)){margin-top:14px}.content{position:absolute;inset:0;display:flex;justify-content:center;align-items:center;flex-direction:column;padding:48px}";

const CurtainUI = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("div", { class: "curtain" }, h("div", { class: "content", part: "curtain-content" }, h("slot", null))));
  }
};
CurtainUI.style = prestoVideoCurtainUiCss;

export { PrestoPlayerButton as presto_player_button, CurtainUI as presto_video_curtain_ui };
