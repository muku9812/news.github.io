/*!
 * 
 * Presto Player
 * 
 * @author Presto Made, Inc
 * @version 0.1.0
 * @link undefined
 * @license GPL
 * 
 * Copyright (c) 2021 Presto Made, Inc
 * 
 * This software is released under the GPL License
 * https://opensource.org/licenses/GPL
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackioprestoPlayeranalyticsJsonp=window.wpackioprestoPlayeranalyticsJsonp||[]).push([[6],{53:function(t,o,n){"use strict";n.r(o),o.default=function(t){var o=function(t,o){var e,r=n().post_id,a={action:"sync_video_playback",currentTime:t.currentTime,duration:t.duration,post_id:r};a[_tutorobject.nonce_key]=_tutorobject[_tutorobject.nonce_key];var u=a;o&&(u=Object.assign(a,o)),jQuery.post(null===(e=_tutorobject)||void 0===e?void 0:e.ajaxurl,u)},n=function(){var t=jQuery("#tutor_video_tracking_information").val();return t?JSON.parse(t):{}},e=0;t.on("timeupdate",(function(t){var n=t.detail.plyr;e/4>=30&&(o(n),e=0),e++})),t.on("ended",(function(t){var e=n(),r=t.detail.plyr;o(r,{is_ended:!0}),e.autoload_next_course_content&&function(){var t,o;if(_tutorobject.nonce_key&&null!==(t=_tutorobject)&&void 0!==t&&t.ajaxurl){var e={action:"autoload_next_course_content",post_id:n().post_id};e[_tutorobject.nonce_key]=_tutorobject[_tutorobject.nonce_key],jQuery.post(null===(o=_tutorobject)||void 0===o?void 0:o.ajaxurl,e).done((function(t){var o;null!=t&&t.success&&null!=t&&null!==(o=t.data)&&void 0!==o&&o.next_url&&(location.href=t.data.next_url)}))}}()}))}}}]);
//# sourceMappingURL=6-952599ce.js.map