import { Component, h, Prop } from '@stencil/core';
import { isAndroidWebView } from '../../../../util';
export class PrestoVimeo {
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
      return (h("div", { class: "presto-iframe-fallback-container" },
        h("iframe", { src: `https://player.vimeo.com/video/${this.getId(this.src)}?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media`, allowFullScreen: true, allowTransparency: true, allow: "autoplay", style: { "width": "100%" }, class: "presto-fallback-iframe" })));
    }
    return h("div", { class: "plyr__video-embed", part: "embed", ref: this.getRef, "data-plyr-provider": "vimeo", "data-plyr-embed-id": this.getId(this.src) });
  }
  static get is() { return "presto-vimeo"; }
  static get originalStyleUrls() { return {
    "$": ["presto-vimeo.css"]
  }; }
  static get styleUrls() { return {
    "$": ["presto-vimeo.css"]
  }; }
  static get properties() { return {
    "src": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "src",
      "reflect": false
    },
    "poster": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "poster",
      "reflect": false
    },
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
    "getRef": {
      "type": "unknown",
      "mutable": true,
      "complexType": {
        "original": "(elm?: HTMLIFrameElement) => void",
        "resolved": "(elm?: HTMLIFrameElement) => void",
        "references": {
          "HTMLIFrameElement": {
            "location": "global"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      }
    }
  }; }
}
