/*!
 * FitText-UMD
 *
 * Copyright 2011, Dave Rupert http://daverupert.com
 * Released under the WTFPL license
 * http://sam.zoy.org/wtfpl/
 * Modified by Slawomir Kolodziej http://slawekk.info
 * Modified by Peace Chen to support modules
 *
 * Date: Tue Jan 12 2016 10:03:36 GMT-0600 (CST)
 */
const e=function(e,n,r){var i=function(e,n){for(var r in n)n.hasOwnProperty(r)&&(e[r]=n[r]);return e}({minFontSize:-1/0,maxFontSize:1/0,container:e},r),o=function(e){var r=n||1,o=function(){e.style.fontSize=Math.max(Math.min(i.container.clientWidth/(10*r),parseFloat(i.maxFontSize)),parseFloat(i.minFontSize))+"px"};if(o(),"ResizeObserver"in window==0)var t=import("./p-97e2763b.js").then((function(){window.ResizeObserver=t.ResizeObserver,new ResizeObserver(o).observe(i.container)}));else new ResizeObserver(o).observe(i.container)};if(e.length)for(var t=0;t<e.length;t++)o(e[t]);else o(e);return e};export{e as f}