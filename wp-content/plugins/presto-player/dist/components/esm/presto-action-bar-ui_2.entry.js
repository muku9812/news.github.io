import { r as registerInstance, h } from './index-65cf7490.js';

const prestoActionBarUiCss = ":host{display:block;overflow:hidden}.bar{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;background:var(--presto-action-bar-background, #1d1d1d);color:#fff;padding:0 var(--presto-action-bar-padding, 6px);line-height:1em;font-size:16px;margin-top:-100%;transition:margin var(--presto-action-bar-animation-speed, 0.5s) ease-in-out;transform:translate3d(0)}.bar.bar--open{margin-top:0}.bar__button{margin:var(--presto-action-bar-padding, 6px);display:flex;align-items:center}.bar__content{margin:var(--presto-action-bar-padding, 6px);width:100%;text-align:center}@media screen and (min-width: 480px){.bar__content{width:auto}}";

const PrestoActionBarUi = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("div", { class: {
        'bar': true,
        'bar--open': this.open,
      } }, h("span", { part: "content", class: "bar__content" }, h("slot", null)), h("span", { part: "button", class: "bar__button" }, h("slot", { name: "button" }))));
  }
};
PrestoActionBarUi.style = prestoActionBarUiCss;

const prestoYoutubeSubscribeButtonCss = ":host{display:block}";

const PrestoYoutubeSubscribeButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.layout = 'default';
  }
  waitForApi(callback) {
    var interval = setInterval(function () {
      var _a;
      if ((_a = window === null || window === void 0 ? void 0 : window.gapi) === null || _a === void 0 ? void 0 : _a.ytsubscribe) {
        clearInterval(interval);
        callback();
      }
    }, 50);
  }
  componentDidLoad() {
    const po = document.createElement('script');
    po.type = 'text/javascript';
    po.async = false;
    po.src = 'https://apis.google.com/js/platform.js';
    const s = document.getElementsByTagName('script')[0];
    s && s.parentNode.insertBefore(po, s);
    this.waitForApi(() => {
      window.gapi.ytsubscribe.render(this.textInput, {
        channelId: this.channel,
        layout: this.layout,
        count: this.showCount ? 'default' : 'hidden',
      });
    });
  }
  render() {
    return h("div", { class: "g-ytsubscribe", ref: el => (this.textInput = el) });
  }
};
PrestoYoutubeSubscribeButton.style = prestoYoutubeSubscribeButtonCss;

export { PrestoActionBarUi as presto_action_bar_ui, PrestoYoutubeSubscribeButton as presto_youtube_subscribe_button };
