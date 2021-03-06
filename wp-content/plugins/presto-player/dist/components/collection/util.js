/**
 * Find out if time is passed.
 * @returns boolean
 */
export function timePassed({ current, duration, showAfter }) {
  if (current === showAfter) {
    return true;
  }
  let percent = (current / duration) * 100;
  if (99.9 < percent) {
    percent = 100;
  }
  return percent >= showAfter;
}
export function timeToSeconds(time) {
  let pieces = time.split(':');
  let seconds;
  if (pieces.length > 1) {
    seconds = parseInt(pieces[0]) * 60;
  }
  return parseInt(pieces[1]) + parseInt(seconds);
}
export function getMobileOperatingSystem() {
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
export function isIOS() {
  return getMobileOperatingSystem() === 'iOS';
}
/**
 * Is iOS Youtube Fullscreen.
 */
export function isiOSYoutubeFullscreen(player) {
  var _a, _b;
  return isIOS() && player.provider === 'youtube' && !((_b = (_a = player === null || player === void 0 ? void 0 : player.config) === null || _a === void 0 ? void 0 : _a.blockAttributes) === null || _b === void 0 ? void 0 : _b.playsinline);
}
export function isWebView() {
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
export function isAndroidWebView() {
  if (getMobileOperatingSystem() === 'Android' && isWebView()) {
    return true;
  }
  else {
    return false;
  }
}
export function parseColor(color) {
  var m = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
  if (m) {
    return [m[1], m[2], m[3], '1'];
  }
  m = color.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*((0.)?\d+)\s*\)$/i);
  if (m) {
    return [m[1], m[2], m[3], m[4]];
  }
}
export function exitFullScreen(player) {
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
