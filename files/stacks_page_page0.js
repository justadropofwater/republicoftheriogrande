//
// jarallax
//

/*!
 * Jarallax v2.1.3 (https://github.com/nk-o/jarallax)
 * Copyright 2022 nK <https://nkdev.info>
 * Licensed under MIT (https://github.com/nk-o/jarallax/blob/master/LICENSE)
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).jarallax=t()}(this,(function(){"use strict";function e(e){"complete"===document.readyState||"interactive"===document.readyState?e():document.addEventListener("DOMContentLoaded",e,{capture:!0,once:!0,passive:!0})}let t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};var i=t,o={type:"scroll",speed:.5,containerClass:"jarallax-container",imgSrc:null,imgElement:".jarallax-img",imgSize:"cover",imgPosition:"50% 50%",imgRepeat:"no-repeat",keepImg:!1,elementInViewport:null,zIndex:-100,disableParallax:!1,onScroll:null,onInit:null,onDestroy:null,onCoverImage:null,videoClass:"jarallax-video",videoSrc:null,videoStartTime:0,videoEndTime:0,videoVolume:0,videoLoop:!0,videoPlayOnlyVisible:!0,videoLazyLoading:!0,disableVideo:!1,onVideoInsert:null,onVideoWorkerInit:null};const{navigator:n}=i,a=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(n.userAgent);let s,l,r;function c(){s=i.innerWidth||document.documentElement.clientWidth,a?(!r&&document.body&&(r=document.createElement("div"),r.style.cssText="position: fixed; top: -9999px; left: 0; height: 100vh; width: 0;",document.body.appendChild(r)),l=(r?r.clientHeight:0)||i.innerHeight||document.documentElement.clientHeight):l=i.innerHeight||document.documentElement.clientHeight}function m(){return{width:s,height:l}}c(),i.addEventListener("resize",c),i.addEventListener("orientationchange",c),i.addEventListener("load",c),e((()=>{c()}));const p=[];function d(){if(!p.length)return;const{width:e,height:t}=m();p.forEach(((i,o)=>{const{instance:n,oldData:a}=i;if(!n.isVisible())return;const s=n.$item.getBoundingClientRect(),l={width:s.width,height:s.height,top:s.top,bottom:s.bottom,wndW:e,wndH:t},r=!a||a.wndW!==l.wndW||a.wndH!==l.wndH||a.width!==l.width||a.height!==l.height,c=r||!a||a.top!==l.top||a.bottom!==l.bottom;p[o].oldData=l,r&&n.onResize(),c&&n.onScroll()})),i.requestAnimationFrame(d)}const g=new i.IntersectionObserver((e=>{e.forEach((e=>{e.target.jarallax.isElementInViewport=e.isIntersecting}))}),{rootMargin:"50px"});const{navigator:u}=i;let f=0;class h{constructor(e,t){const i=this;i.instanceID=f,f+=1,i.$item=e,i.defaults={...o};const n=i.$item.dataset||{},a={};if(Object.keys(n).forEach((e=>{const t=e.substr(0,1).toLowerCase()+e.substr(1);t&&void 0!==i.defaults[t]&&(a[t]=n[e])})),i.options=i.extend({},i.defaults,a,t),i.pureOptions=i.extend({},i.options),Object.keys(i.options).forEach((e=>{"true"===i.options[e]?i.options[e]=!0:"false"===i.options[e]&&(i.options[e]=!1)})),i.options.speed=Math.min(2,Math.max(-1,parseFloat(i.options.speed))),"string"==typeof i.options.disableParallax&&(i.options.disableParallax=new RegExp(i.options.disableParallax)),i.options.disableParallax instanceof RegExp){const e=i.options.disableParallax;i.options.disableParallax=()=>e.test(u.userAgent)}if("function"!=typeof i.options.disableParallax&&(i.options.disableParallax=()=>!1),"string"==typeof i.options.disableVideo&&(i.options.disableVideo=new RegExp(i.options.disableVideo)),i.options.disableVideo instanceof RegExp){const e=i.options.disableVideo;i.options.disableVideo=()=>e.test(u.userAgent)}"function"!=typeof i.options.disableVideo&&(i.options.disableVideo=()=>!1);let s=i.options.elementInViewport;s&&"object"==typeof s&&void 0!==s.length&&([s]=s),s instanceof Element||(s=null),i.options.elementInViewport=s,i.image={src:i.options.imgSrc||null,$container:null,useImgTag:!1,position:"fixed"},i.initImg()&&i.canInitParallax()&&i.init()}css(e,t){return function(e,t){return"string"==typeof t?i.getComputedStyle(e).getPropertyValue(t):(Object.keys(t).forEach((i=>{e.style[i]=t[i]})),e)}(e,t)}extend(e,...t){return function(e,...t){return e=e||{},Object.keys(t).forEach((i=>{t[i]&&Object.keys(t[i]).forEach((o=>{e[o]=t[i][o]}))})),e}(e,...t)}getWindowData(){const{width:e,height:t}=m();return{width:e,height:t,y:document.documentElement.scrollTop}}initImg(){const e=this;let t=e.options.imgElement;return t&&"string"==typeof t&&(t=e.$item.querySelector(t)),t instanceof Element||(e.options.imgSrc?(t=new Image,t.src=e.options.imgSrc):t=null),t&&(e.options.keepImg?e.image.$item=t.cloneNode(!0):(e.image.$item=t,e.image.$itemParent=t.parentNode),e.image.useImgTag=!0),!!e.image.$item||(null===e.image.src&&(e.image.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",e.image.bgImage=e.css(e.$item,"background-image")),!(!e.image.bgImage||"none"===e.image.bgImage))}canInitParallax(){return!this.options.disableParallax()}init(){const e=this,t={position:"absolute",top:0,left:0,width:"100%",height:"100%",overflow:"hidden"};let o={pointerEvents:"none",transformStyle:"preserve-3d",backfaceVisibility:"hidden"};if(!e.options.keepImg){const t=e.$item.getAttribute("style");if(t&&e.$item.setAttribute("data-jarallax-original-styles",t),e.image.useImgTag){const t=e.image.$item.getAttribute("style");t&&e.image.$item.setAttribute("data-jarallax-original-styles",t)}}if("static"===e.css(e.$item,"position")&&e.css(e.$item,{position:"relative"}),"auto"===e.css(e.$item,"z-index")&&e.css(e.$item,{zIndex:0}),e.image.$container=document.createElement("div"),e.css(e.image.$container,t),e.css(e.image.$container,{"z-index":e.options.zIndex}),"fixed"===this.image.position&&e.css(e.image.$container,{"-webkit-clip-path":"polygon(0 0, 100% 0, 100% 100%, 0 100%)","clip-path":"polygon(0 0, 100% 0, 100% 100%, 0 100%)"}),e.image.$container.setAttribute("id",`jarallax-container-${e.instanceID}`),e.options.containerClass&&e.image.$container.setAttribute("class",e.options.containerClass),e.$item.appendChild(e.image.$container),e.image.useImgTag?o=e.extend({"object-fit":e.options.imgSize,"object-position":e.options.imgPosition,"max-width":"none"},t,o):(e.image.$item=document.createElement("div"),e.image.src&&(o=e.extend({"background-position":e.options.imgPosition,"background-size":e.options.imgSize,"background-repeat":e.options.imgRepeat,"background-image":e.image.bgImage||`url("${e.image.src}")`},t,o))),"opacity"!==e.options.type&&"scale"!==e.options.type&&"scale-opacity"!==e.options.type&&1!==e.options.speed||(e.image.position="absolute"),"fixed"===e.image.position){const t=function(e){const t=[];for(;null!==e.parentElement;)1===(e=e.parentElement).nodeType&&t.push(e);return t}(e.$item).filter((e=>{const t=i.getComputedStyle(e),o=t["-webkit-transform"]||t["-moz-transform"]||t.transform;return o&&"none"!==o||/(auto|scroll)/.test(t.overflow+t["overflow-y"]+t["overflow-x"])}));e.image.position=t.length?"absolute":"fixed"}var n;o.position=e.image.position,e.css(e.image.$item,o),e.image.$container.appendChild(e.image.$item),e.onResize(),e.onScroll(!0),e.options.onInit&&e.options.onInit.call(e),"none"!==e.css(e.$item,"background-image")&&e.css(e.$item,{"background-image":"none"}),n=e,p.push({instance:n}),1===p.length&&i.requestAnimationFrame(d),g.observe(n.options.elementInViewport||n.$item)}destroy(){const e=this;var t;t=e,p.forEach(((e,i)=>{e.instance.instanceID===t.instanceID&&p.splice(i,1)})),g.unobserve(t.options.elementInViewport||t.$item);const i=e.$item.getAttribute("data-jarallax-original-styles");if(e.$item.removeAttribute("data-jarallax-original-styles"),i?e.$item.setAttribute("style",i):e.$item.removeAttribute("style"),e.image.useImgTag){const t=e.image.$item.getAttribute("data-jarallax-original-styles");e.image.$item.removeAttribute("data-jarallax-original-styles"),t?e.image.$item.setAttribute("style",i):e.image.$item.removeAttribute("style"),e.image.$itemParent&&e.image.$itemParent.appendChild(e.image.$item)}e.image.$container&&e.image.$container.parentNode.removeChild(e.image.$container),e.options.onDestroy&&e.options.onDestroy.call(e),delete e.$item.jarallax}coverImage(){const e=this,{height:t}=m(),i=e.image.$container.getBoundingClientRect(),o=i.height,{speed:n}=e.options,a="scroll"===e.options.type||"scroll-opacity"===e.options.type;let s=0,l=o,r=0;return a&&(n<0?(s=n*Math.max(o,t),t<o&&(s-=n*(o-t))):s=n*(o+t),n>1?l=Math.abs(s-t):n<0?l=s/n+Math.abs(s):l+=(t-o)*(1-n),s/=2),e.parallaxScrollDistance=s,r=a?(t-l)/2:(o-l)/2,e.css(e.image.$item,{height:`${l}px`,marginTop:`${r}px`,left:"fixed"===e.image.position?`${i.left}px`:"0",width:`${i.width}px`}),e.options.onCoverImage&&e.options.onCoverImage.call(e),{image:{height:l,marginTop:r},container:i}}isVisible(){return this.isElementInViewport||!1}onScroll(e){const t=this;if(!e&&!t.isVisible())return;const{height:i}=m(),o=t.$item.getBoundingClientRect(),n=o.top,a=o.height,s={},l=Math.max(0,n),r=Math.max(0,a+n),c=Math.max(0,-n),p=Math.max(0,n+a-i),d=Math.max(0,a-(n+a-i)),g=Math.max(0,-n+i-a),u=1-(i-n)/(i+a)*2;let f=1;if(a<i?f=1-(c||p)/a:r<=i?f=r/i:d<=i&&(f=d/i),"opacity"!==t.options.type&&"scale-opacity"!==t.options.type&&"scroll-opacity"!==t.options.type||(s.transform="translate3d(0,0,0)",s.opacity=f),"scale"===t.options.type||"scale-opacity"===t.options.type){let e=1;t.options.speed<0?e-=t.options.speed*f:e+=t.options.speed*(1-f),s.transform=`scale(${e}) translate3d(0,0,0)`}if("scroll"===t.options.type||"scroll-opacity"===t.options.type){let e=t.parallaxScrollDistance*u;"absolute"===t.image.position&&(e-=n),s.transform=`translate3d(0,${e}px,0)`}t.css(t.image.$item,s),t.options.onScroll&&t.options.onScroll.call(t,{section:o,beforeTop:l,beforeTopEnd:r,afterTop:c,beforeBottom:p,beforeBottomEnd:d,afterBottom:g,visiblePercent:f,fromViewportCenter:u})}onResize(){this.coverImage()}}const b=function(e,t,...i){("object"==typeof HTMLElement?e instanceof HTMLElement:e&&"object"==typeof e&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName)&&(e=[e]);const o=e.length;let n,a=0;for(;a<o;a+=1)if("object"==typeof t||void 0===t?e[a].jarallax||(e[a].jarallax=new h(e[a],t)):e[a].jarallax&&(n=e[a].jarallax[t].apply(e[a].jarallax,i)),void 0!==n)return n;return e};b.constructor=h;const y=i.jQuery;if(void 0!==y){const e=function(...e){Array.prototype.unshift.call(e,this);const t=b.apply(i,e);return"object"!=typeof t?t:this};e.constructor=b.constructor;const t=y.fn.jarallax;y.fn.jarallax=e,y.fn.jarallax.noConflict=function(){return y.fn.jarallax=t,this}}return e((()=>{b(document.querySelectorAll("[data-jarallax]"))})),b}));

//
// intersection-observer-poly-fill
//

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
 *
 *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 */
(function() {
'use strict';

// Exit early if we're not running in a browser.
if (typeof window !== 'object') {
  return;
}

// Exit early if all IntersectionObserver and IntersectionObserverEntry
// features are natively supported.
if ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

  // Minimal polyfill for Edge 15's lack of `isIntersecting`
  // See: https://github.com/w3c/IntersectionObserver/issues/211
  if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
    Object.defineProperty(window.IntersectionObserverEntry.prototype,
      'isIntersecting', {
      get: function () {
        return this.intersectionRatio > 0;
      }
    });
  }
  return;
}

/**
 * Returns the embedding frame element, if any.
 * @param {!Document} doc
 * @return {!Element}
 */
function getFrameElement(doc) {
  try {
    return doc.defaultView && doc.defaultView.frameElement || null;
  } catch (e) {
    // Ignore the error.
    return null;
  }
}

/**
 * A local reference to the root document.
 */
var document = (function(startDoc) {
  var doc = startDoc;
  var frame = getFrameElement(doc);
  while (frame) {
    doc = frame.ownerDocument;
    frame = getFrameElement(doc);
  }
  return doc;
})(window.document);

/**
 * An IntersectionObserver registry. This registry exists to hold a strong
 * reference to IntersectionObserver instances currently observing a target
 * element. Without this registry, instances without another reference may be
 * garbage collected.
 */
var registry = [];

/**
 * The signal updater for cross-origin intersection. When not null, it means
 * that the polyfill is configured to work in a cross-origin mode.
 * @type {function(DOMRect|ClientRect, DOMRect|ClientRect)}
 */
var crossOriginUpdater = null;

/**
 * The current cross-origin intersection. Only used in the cross-origin mode.
 * @type {DOMRect|ClientRect}
 */
var crossOriginRect = null;


/**
 * Creates the global IntersectionObserverEntry constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
 * @param {Object} entry A dictionary of instance properties.
 * @constructor
 */
function IntersectionObserverEntry(entry) {
  this.time = entry.time;
  this.target = entry.target;
  this.rootBounds = ensureDOMRect(entry.rootBounds);
  this.boundingClientRect = ensureDOMRect(entry.boundingClientRect);
  this.intersectionRect = ensureDOMRect(entry.intersectionRect || getEmptyRect());
  this.isIntersecting = !!entry.intersectionRect;

  // Calculates the intersection ratio.
  var targetRect = this.boundingClientRect;
  var targetArea = targetRect.width * targetRect.height;
  var intersectionRect = this.intersectionRect;
  var intersectionArea = intersectionRect.width * intersectionRect.height;

  // Sets intersection ratio.
  if (targetArea) {
    // Round the intersection ratio to avoid floating point math issues:
    // https://github.com/w3c/IntersectionObserver/issues/324
    this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
  } else {
    // If area is zero and is intersecting, sets to 1, otherwise to 0
    this.intersectionRatio = this.isIntersecting ? 1 : 0;
  }
}


/**
 * Creates the global IntersectionObserver constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
 * @param {Function} callback The function to be invoked after intersection
 *     changes have queued. The function is not invoked if the queue has
 *     been emptied by calling the `takeRecords` method.
 * @param {Object=} opt_options Optional configuration options.
 * @constructor
 */
function IntersectionObserver(callback, opt_options) {

  var options = opt_options || {};

  if (typeof callback != 'function') {
    throw new Error('callback must be a function');
  }

  if (
    options.root &&
    options.root.nodeType != 1 &&
    options.root.nodeType != 9
  ) {
    throw new Error('root must be a Document or Element');
  }

  // Binds and throttles `this._checkForIntersections`.
  this._checkForIntersections = throttle(
      this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);

  // Private properties.
  this._callback = callback;
  this._observationTargets = [];
  this._queuedEntries = [];
  this._rootMarginValues = this._parseRootMargin(options.rootMargin);

  // Public properties.
  this.thresholds = this._initThresholds(options.threshold);
  this.root = options.root || null;
  this.rootMargin = this._rootMarginValues.map(function(margin) {
    return margin.value + margin.unit;
  }).join(' ');

  /** @private @const {!Array<!Document>} */
  this._monitoringDocuments = [];
  /** @private @const {!Array<function()>} */
  this._monitoringUnsubscribes = [];
}


/**
 * The minimum interval within which the document will be checked for
 * intersection changes.
 */
IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;


/**
 * The frequency in which the polyfill polls for intersection changes.
 * this can be updated on a per instance basis and must be set prior to
 * calling `observe` on the first target.
 */
IntersectionObserver.prototype.POLL_INTERVAL = null;

/**
 * Use a mutation observer on the root element
 * to detect intersection changes.
 */
IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;


/**
 * Sets up the polyfill in the cross-origin mode. The result is the
 * updater function that accepts two arguments: `boundingClientRect` and
 * `intersectionRect` - just as these fields would be available to the
 * parent via `IntersectionObserverEntry`. This function should be called
 * each time the iframe receives intersection information from the parent
 * window, e.g. via messaging.
 * @return {function(DOMRect|ClientRect, DOMRect|ClientRect)}
 */
IntersectionObserver._setupCrossOriginUpdater = function() {
  if (!crossOriginUpdater) {
    /**
     * @param {DOMRect|ClientRect} boundingClientRect
     * @param {DOMRect|ClientRect} intersectionRect
     */
    crossOriginUpdater = function(boundingClientRect, intersectionRect) {
      if (!boundingClientRect || !intersectionRect) {
        crossOriginRect = getEmptyRect();
      } else {
        crossOriginRect = convertFromParentRect(boundingClientRect, intersectionRect);
      }
      registry.forEach(function(observer) {
        observer._checkForIntersections();
      });
    };
  }
  return crossOriginUpdater;
};


/**
 * Resets the cross-origin mode.
 */
IntersectionObserver._resetCrossOriginUpdater = function() {
  crossOriginUpdater = null;
  crossOriginRect = null;
};


/**
 * Starts observing a target element for intersection changes based on
 * the thresholds values.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.observe = function(target) {
  var isTargetAlreadyObserved = this._observationTargets.some(function(item) {
    return item.element == target;
  });

  if (isTargetAlreadyObserved) {
    return;
  }

  if (!(target && target.nodeType == 1)) {
    throw new Error('target must be an Element');
  }

  this._registerInstance();
  this._observationTargets.push({element: target, entry: null});
  this._monitorIntersections(target.ownerDocument);
  this._checkForIntersections();
};


/**
 * Stops observing a target element for intersection changes.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.unobserve = function(target) {
  this._observationTargets =
      this._observationTargets.filter(function(item) {
        return item.element != target;
      });
  this._unmonitorIntersections(target.ownerDocument);
  if (this._observationTargets.length == 0) {
    this._unregisterInstance();
  }
};


/**
 * Stops observing all target elements for intersection changes.
 */
IntersectionObserver.prototype.disconnect = function() {
  this._observationTargets = [];
  this._unmonitorAllIntersections();
  this._unregisterInstance();
};


/**
 * Returns any queue entries that have not yet been reported to the
 * callback and clears the queue. This can be used in conjunction with the
 * callback to obtain the absolute most up-to-date intersection information.
 * @return {Array} The currently queued entries.
 */
IntersectionObserver.prototype.takeRecords = function() {
  var records = this._queuedEntries.slice();
  this._queuedEntries = [];
  return records;
};


/**
 * Accepts the threshold value from the user configuration object and
 * returns a sorted array of unique threshold values. If a value is not
 * between 0 and 1 and error is thrown.
 * @private
 * @param {Array|number=} opt_threshold An optional threshold value or
 *     a list of threshold values, defaulting to [0].
 * @return {Array} A sorted list of unique and valid threshold values.
 */
IntersectionObserver.prototype._initThresholds = function(opt_threshold) {
  var threshold = opt_threshold || [0];
  if (!Array.isArray(threshold)) threshold = [threshold];

  return threshold.sort().filter(function(t, i, a) {
    if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
      throw new Error('threshold must be a number between 0 and 1 inclusively');
    }
    return t !== a[i - 1];
  });
};


/**
 * Accepts the rootMargin value from the user configuration object
 * and returns an array of the four margin values as an object containing
 * the value and unit properties. If any of the values are not properly
 * formatted or use a unit other than px or %, and error is thrown.
 * @private
 * @param {string=} opt_rootMargin An optional rootMargin value,
 *     defaulting to '0px'.
 * @return {Array<Object>} An array of margin objects with the keys
 *     value and unit.
 */
IntersectionObserver.prototype._parseRootMargin = function(opt_rootMargin) {
  var marginString = opt_rootMargin || '0px';
  var margins = marginString.split(/\s+/).map(function(margin) {
    var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
    if (!parts) {
      throw new Error('rootMargin must be specified in pixels or percent');
    }
    return {value: parseFloat(parts[1]), unit: parts[2]};
  });

  // Handles shorthand.
  margins[1] = margins[1] || margins[0];
  margins[2] = margins[2] || margins[0];
  margins[3] = margins[3] || margins[1];

  return margins;
};


/**
 * Starts polling for intersection changes if the polling is not already
 * happening, and if the page's visibility state is visible.
 * @param {!Document} doc
 * @private
 */
IntersectionObserver.prototype._monitorIntersections = function(doc) {
  var win = doc.defaultView;
  if (!win) {
    // Already destroyed.
    return;
  }
  if (this._monitoringDocuments.indexOf(doc) != -1) {
    // Already monitoring.
    return;
  }

  // Private state for monitoring.
  var callback = this._checkForIntersections;
  var monitoringInterval = null;
  var domObserver = null;

  // If a poll interval is set, use polling instead of listening to
  // resize and scroll events or DOM mutations.
  if (this.POLL_INTERVAL) {
    monitoringInterval = win.setInterval(callback, this.POLL_INTERVAL);
  } else {
    addEvent(win, 'resize', callback, true);
    addEvent(doc, 'scroll', callback, true);
    if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in win) {
      domObserver = new win.MutationObserver(callback);
      domObserver.observe(doc, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      });
    }
  }

  this._monitoringDocuments.push(doc);
  this._monitoringUnsubscribes.push(function() {
    // Get the window object again. When a friendly iframe is destroyed, it
    // will be null.
    var win = doc.defaultView;

    if (win) {
      if (monitoringInterval) {
        win.clearInterval(monitoringInterval);
      }
      removeEvent(win, 'resize', callback, true);
    }

    removeEvent(doc, 'scroll', callback, true);
    if (domObserver) {
      domObserver.disconnect();
    }
  });

  // Also monitor the parent.
  var rootDoc =
    (this.root && (this.root.ownerDocument || this.root)) || document;
  if (doc != rootDoc) {
    var frame = getFrameElement(doc);
    if (frame) {
      this._monitorIntersections(frame.ownerDocument);
    }
  }
};


/**
 * Stops polling for intersection changes.
 * @param {!Document} doc
 * @private
 */
IntersectionObserver.prototype._unmonitorIntersections = function(doc) {
  var index = this._monitoringDocuments.indexOf(doc);
  if (index == -1) {
    return;
  }

  var rootDoc =
    (this.root && (this.root.ownerDocument || this.root)) || document;

  // Check if any dependent targets are still remaining.
  var hasDependentTargets =
      this._observationTargets.some(function(item) {
        var itemDoc = item.element.ownerDocument;
        // Target is in this context.
        if (itemDoc == doc) {
          return true;
        }
        // Target is nested in this context.
        while (itemDoc && itemDoc != rootDoc) {
          var frame = getFrameElement(itemDoc);
          itemDoc = frame && frame.ownerDocument;
          if (itemDoc == doc) {
            return true;
          }
        }
        return false;
      });
  if (hasDependentTargets) {
    return;
  }

  // Unsubscribe.
  var unsubscribe = this._monitoringUnsubscribes[index];
  this._monitoringDocuments.splice(index, 1);
  this._monitoringUnsubscribes.splice(index, 1);
  unsubscribe();

  // Also unmonitor the parent.
  if (doc != rootDoc) {
    var frame = getFrameElement(doc);
    if (frame) {
      this._unmonitorIntersections(frame.ownerDocument);
    }
  }
};


/**
 * Stops polling for intersection changes.
 * @param {!Document} doc
 * @private
 */
IntersectionObserver.prototype._unmonitorAllIntersections = function() {
  var unsubscribes = this._monitoringUnsubscribes.slice(0);
  this._monitoringDocuments.length = 0;
  this._monitoringUnsubscribes.length = 0;
  for (var i = 0; i < unsubscribes.length; i++) {
    unsubscribes[i]();
  }
};


/**
 * Scans each observation target for intersection changes and adds them
 * to the internal entries queue. If new entries are found, it
 * schedules the callback to be invoked.
 * @private
 */
IntersectionObserver.prototype._checkForIntersections = function() {
  if (!this.root && crossOriginUpdater && !crossOriginRect) {
    // Cross origin monitoring, but no initial data available yet.
    return;
  }

  var rootIsInDom = this._rootIsInDom();
  var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

  this._observationTargets.forEach(function(item) {
    var target = item.element;
    var targetRect = getBoundingClientRect(target);
    var rootContainsTarget = this._rootContainsTarget(target);
    var oldEntry = item.entry;
    var intersectionRect = rootIsInDom && rootContainsTarget &&
        this._computeTargetAndRootIntersection(target, targetRect, rootRect);

    var rootBounds = null;
    if (!this._rootContainsTarget(target)) {
      rootBounds = getEmptyRect();
    } else if (!crossOriginUpdater || this.root) {
      rootBounds = rootRect;
    }

    var newEntry = item.entry = new IntersectionObserverEntry({
      time: now(),
      target: target,
      boundingClientRect: targetRect,
      rootBounds: rootBounds,
      intersectionRect: intersectionRect
    });

    if (!oldEntry) {
      this._queuedEntries.push(newEntry);
    } else if (rootIsInDom && rootContainsTarget) {
      // If the new entry intersection ratio has crossed any of the
      // thresholds, add a new entry.
      if (this._hasCrossedThreshold(oldEntry, newEntry)) {
        this._queuedEntries.push(newEntry);
      }
    } else {
      // If the root is not in the DOM or target is not contained within
      // root but the previous entry for this target had an intersection,
      // add a new record indicating removal.
      if (oldEntry && oldEntry.isIntersecting) {
        this._queuedEntries.push(newEntry);
      }
    }
  }, this);

  if (this._queuedEntries.length) {
    this._callback(this.takeRecords(), this);
  }
};


/**
 * Accepts a target and root rect computes the intersection between then
 * following the algorithm in the spec.
 * TODO(philipwalton): at this time clip-path is not considered.
 * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
 * @param {Element} target The target DOM element
 * @param {Object} targetRect The bounding rect of the target.
 * @param {Object} rootRect The bounding rect of the root after being
 *     expanded by the rootMargin value.
 * @return {?Object} The final intersection rect object or undefined if no
 *     intersection is found.
 * @private
 */
IntersectionObserver.prototype._computeTargetAndRootIntersection =
    function(target, targetRect, rootRect) {
  // If the element isn't displayed, an intersection can't happen.
  if (window.getComputedStyle(target).display == 'none') return;

  var intersectionRect = targetRect;
  var parent = getParentNode(target);
  var atRoot = false;

  while (!atRoot && parent) {
    var parentRect = null;
    var parentComputedStyle = parent.nodeType == 1 ?
        window.getComputedStyle(parent) : {};

    // If the parent isn't displayed, an intersection can't happen.
    if (parentComputedStyle.display == 'none') return null;

    if (parent == this.root || parent.nodeType == /* DOCUMENT */ 9) {
      atRoot = true;
      if (parent == this.root || parent == document) {
        if (crossOriginUpdater && !this.root) {
          if (!crossOriginRect ||
              crossOriginRect.width == 0 && crossOriginRect.height == 0) {
            // A 0-size cross-origin intersection means no-intersection.
            parent = null;
            parentRect = null;
            intersectionRect = null;
          } else {
            parentRect = crossOriginRect;
          }
        } else {
          parentRect = rootRect;
        }
      } else {
        // Check if there's a frame that can be navigated to.
        var frame = getParentNode(parent);
        var frameRect = frame && getBoundingClientRect(frame);
        var frameIntersect =
            frame &&
            this._computeTargetAndRootIntersection(frame, frameRect, rootRect);
        if (frameRect && frameIntersect) {
          parent = frame;
          parentRect = convertFromParentRect(frameRect, frameIntersect);
        } else {
          parent = null;
          intersectionRect = null;
        }
      }
    } else {
      // If the element has a non-visible overflow, and it's not the <body>
      // or <html> element, update the intersection rect.
      // Note: <body> and <html> cannot be clipped to a rect that's not also
      // the document rect, so no need to compute a new intersection.
      var doc = parent.ownerDocument;
      if (parent != doc.body &&
          parent != doc.documentElement &&
          parentComputedStyle.overflow != 'visible') {
        parentRect = getBoundingClientRect(parent);
      }
    }

    // If either of the above conditionals set a new parentRect,
    // calculate new intersection data.
    if (parentRect) {
      intersectionRect = computeRectIntersection(parentRect, intersectionRect);
    }
    if (!intersectionRect) break;
    parent = parent && getParentNode(parent);
  }
  return intersectionRect;
};


/**
 * Returns the root rect after being expanded by the rootMargin value.
 * @return {ClientRect} The expanded root rect.
 * @private
 */
IntersectionObserver.prototype._getRootRect = function() {
  var rootRect;
  if (this.root && !isDoc(this.root)) {
    rootRect = getBoundingClientRect(this.root);
  } else {
    // Use <html>/<body> instead of window since scroll bars affect size.
    var doc = isDoc(this.root) ? this.root : document;
    var html = doc.documentElement;
    var body = doc.body;
    rootRect = {
      top: 0,
      left: 0,
      right: html.clientWidth || body.clientWidth,
      width: html.clientWidth || body.clientWidth,
      bottom: html.clientHeight || body.clientHeight,
      height: html.clientHeight || body.clientHeight
    };
  }
  return this._expandRectByRootMargin(rootRect);
};


/**
 * Accepts a rect and expands it by the rootMargin value.
 * @param {DOMRect|ClientRect} rect The rect object to expand.
 * @return {ClientRect} The expanded rect.
 * @private
 */
IntersectionObserver.prototype._expandRectByRootMargin = function(rect) {
  var margins = this._rootMarginValues.map(function(margin, i) {
    return margin.unit == 'px' ? margin.value :
        margin.value * (i % 2 ? rect.width : rect.height) / 100;
  });
  var newRect = {
    top: rect.top - margins[0],
    right: rect.right + margins[1],
    bottom: rect.bottom + margins[2],
    left: rect.left - margins[3]
  };
  newRect.width = newRect.right - newRect.left;
  newRect.height = newRect.bottom - newRect.top;

  return newRect;
};


/**
 * Accepts an old and new entry and returns true if at least one of the
 * threshold values has been crossed.
 * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
 *    particular target element or null if no previous entry exists.
 * @param {IntersectionObserverEntry} newEntry The current entry for a
 *    particular target element.
 * @return {boolean} Returns true if a any threshold has been crossed.
 * @private
 */
IntersectionObserver.prototype._hasCrossedThreshold =
    function(oldEntry, newEntry) {

  // To make comparing easier, an entry that has a ratio of 0
  // but does not actually intersect is given a value of -1
  var oldRatio = oldEntry && oldEntry.isIntersecting ?
      oldEntry.intersectionRatio || 0 : -1;
  var newRatio = newEntry.isIntersecting ?
      newEntry.intersectionRatio || 0 : -1;

  // Ignore unchanged ratios
  if (oldRatio === newRatio) return;

  for (var i = 0; i < this.thresholds.length; i++) {
    var threshold = this.thresholds[i];

    // Return true if an entry matches a threshold or if the new ratio
    // and the old ratio are on the opposite sides of a threshold.
    if (threshold == oldRatio || threshold == newRatio ||
        threshold < oldRatio !== threshold < newRatio) {
      return true;
    }
  }
};


/**
 * Returns whether or not the root element is an element and is in the DOM.
 * @return {boolean} True if the root element is an element and is in the DOM.
 * @private
 */
IntersectionObserver.prototype._rootIsInDom = function() {
  return !this.root || containsDeep(document, this.root);
};


/**
 * Returns whether or not the target element is a child of root.
 * @param {Element} target The target element to check.
 * @return {boolean} True if the target element is a child of root.
 * @private
 */
IntersectionObserver.prototype._rootContainsTarget = function(target) {
  var rootDoc =
    (this.root && (this.root.ownerDocument || this.root)) || document;
  return (
    containsDeep(rootDoc, target) &&
    (!this.root || rootDoc == target.ownerDocument)
  );
};


/**
 * Adds the instance to the global IntersectionObserver registry if it isn't
 * already present.
 * @private
 */
IntersectionObserver.prototype._registerInstance = function() {
  if (registry.indexOf(this) < 0) {
    registry.push(this);
  }
};


/**
 * Removes the instance from the global IntersectionObserver registry.
 * @private
 */
IntersectionObserver.prototype._unregisterInstance = function() {
  var index = registry.indexOf(this);
  if (index != -1) registry.splice(index, 1);
};


/**
 * Returns the result of the performance.now() method or null in browsers
 * that don't support the API.
 * @return {number} The elapsed time since the page was requested.
 */
function now() {
  return window.performance && performance.now && performance.now();
}


/**
 * Throttles a function and delays its execution, so it's only called at most
 * once within a given time period.
 * @param {Function} fn The function to throttle.
 * @param {number} timeout The amount of time that must pass before the
 *     function can be called again.
 * @return {Function} The throttled function.
 */
function throttle(fn, timeout) {
  var timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(function() {
        fn();
        timer = null;
      }, timeout);
    }
  };
}


/**
 * Adds an event handler to a DOM node ensuring cross-browser compatibility.
 * @param {Node} node The DOM node to add the event handler to.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to add.
 * @param {boolean} opt_useCapture Optionally adds the even to the capture
 *     phase. Note: this only works in modern browsers.
 */
function addEvent(node, event, fn, opt_useCapture) {
  if (typeof node.addEventListener == 'function') {
    node.addEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.attachEvent == 'function') {
    node.attachEvent('on' + event, fn);
  }
}


/**
 * Removes a previously added event handler from a DOM node.
 * @param {Node} node The DOM node to remove the event handler from.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to remove.
 * @param {boolean} opt_useCapture If the event handler was added with this
 *     flag set to true, it should be set to true here in order to remove it.
 */
function removeEvent(node, event, fn, opt_useCapture) {
  if (typeof node.removeEventListener == 'function') {
    node.removeEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.detachEvent == 'function') {
    node.detachEvent('on' + event, fn);
  }
}


/**
 * Returns the intersection between two rect objects.
 * @param {Object} rect1 The first rect.
 * @param {Object} rect2 The second rect.
 * @return {?Object|?ClientRect} The intersection rect or undefined if no
 *     intersection is found.
 */
function computeRectIntersection(rect1, rect2) {
  var top = Math.max(rect1.top, rect2.top);
  var bottom = Math.min(rect1.bottom, rect2.bottom);
  var left = Math.max(rect1.left, rect2.left);
  var right = Math.min(rect1.right, rect2.right);
  var width = right - left;
  var height = bottom - top;

  return (width >= 0 && height >= 0) && {
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    width: width,
    height: height
  } || null;
}


/**
 * Shims the native getBoundingClientRect for compatibility with older IE.
 * @param {Element} el The element whose bounding rect to get.
 * @return {DOMRect|ClientRect} The (possibly shimmed) rect of the element.
 */
function getBoundingClientRect(el) {
  var rect;

  try {
    rect = el.getBoundingClientRect();
  } catch (err) {
    // Ignore Windows 7 IE11 "Unspecified error"
    // https://github.com/w3c/IntersectionObserver/pull/205
  }

  if (!rect) return getEmptyRect();

  // Older IE
  if (!(rect.width && rect.height)) {
    rect = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };
  }
  return rect;
}


/**
 * Returns an empty rect object. An empty rect is returned when an element
 * is not in the DOM.
 * @return {ClientRect} The empty rect.
 */
function getEmptyRect() {
  return {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0
  };
}


/**
 * Ensure that the result has all of the necessary fields of the DOMRect.
 * Specifically this ensures that `x` and `y` fields are set.
 *
 * @param {?DOMRect|?ClientRect} rect
 * @return {?DOMRect}
 */
function ensureDOMRect(rect) {
  // A `DOMRect` object has `x` and `y` fields.
  if (!rect || 'x' in rect) {
    return rect;
  }
  // A IE's `ClientRect` type does not have `x` and `y`. The same is the case
  // for internally calculated Rect objects. For the purposes of
  // `IntersectionObserver`, it's sufficient to simply mirror `left` and `top`
  // for these fields.
  return {
    top: rect.top,
    y: rect.top,
    bottom: rect.bottom,
    left: rect.left,
    x: rect.left,
    right: rect.right,
    width: rect.width,
    height: rect.height
  };
}


/**
 * Inverts the intersection and bounding rect from the parent (frame) BCR to
 * the local BCR space.
 * @param {DOMRect|ClientRect} parentBoundingRect The parent's bound client rect.
 * @param {DOMRect|ClientRect} parentIntersectionRect The parent's own intersection rect.
 * @return {ClientRect} The local root bounding rect for the parent's children.
 */
function convertFromParentRect(parentBoundingRect, parentIntersectionRect) {
  var top = parentIntersectionRect.top - parentBoundingRect.top;
  var left = parentIntersectionRect.left - parentBoundingRect.left;
  return {
    top: top,
    left: left,
    height: parentIntersectionRect.height,
    width: parentIntersectionRect.width,
    bottom: top + parentIntersectionRect.height,
    right: left + parentIntersectionRect.width
  };
}


/**
 * Checks to see if a parent element contains a child element (including inside
 * shadow DOM).
 * @param {Node} parent The parent element.
 * @param {Node} child The child element.
 * @return {boolean} True if the parent node contains the child node.
 */
function containsDeep(parent, child) {
  var node = child;
  while (node) {
    if (node == parent) return true;

    node = getParentNode(node);
  }
  return false;
}


/**
 * Gets the parent node of an element or its host element if the parent node
 * is a shadow root.
 * @param {Node} node The node whose parent to get.
 * @return {Node|null} The parent node or null if no parent exists.
 */
function getParentNode(node) {
  var parent = node.parentNode;

  if (node.nodeType == /* DOCUMENT */ 9 && node != document) {
    // If this node is a document node, look for the embedding frame.
    return getFrameElement(node);
  }

  // If the parent has element that is assigned through shadow root slot
  if (parent && parent.assignedSlot) {
    parent = parent.assignedSlot.parentNode
  }

  if (parent && parent.nodeType == 11 && parent.host) {
    // If the parent is a shadow root, return the host element.
    return parent.host;
  }

  return parent;
}

/**
 * Returns true if `node` is a Document.
 * @param {!Node} node
 * @returns {boolean}
 */
function isDoc(node) {
  return node && node.nodeType === 9;
}


// Exposes the constructors globally.
window.IntersectionObserver = IntersectionObserver;
window.IntersectionObserverEntry = IntersectionObserverEntry;

}());


// 'stacks' is the Stacks global object.
// All of the other Stacks related Javascript will 
// be attatched to it.

var stacks = {};
// Javascript for stacks_in_2// ---------------------------------------------------------------------
// Each stack has its own object with its own namespace.  The name of// that object is the same as the stack's id.
stacks.stacks_in_2 = {};
// A closure is defined and assigned to the stack's object.  The object// is also passed in as 'stack' which gives you a shorthand for referring// to this object from elsewhere.
stacks.stacks_in_2 = (function(stack) {document.addEventListener('DOMContentLoaded', function(event) {
	
	
		// If we're using Typeface for the Base Font we'll apply the
		// class name to the <body> tag so Typeface can set it via CSS.
		document.body.classList.add("foundry-typeface-one");
	

	
		// If we're using Typeface for the Base Font we'll apply the
		// class name to the <body> tag so Typeface can set it via CSS.
		document.body.classList.add("foundry-typeface-one-page-wide-headers");
	

	
	// if (typeof foundryThreeThemeCheck === 'undefined') {
	// 	var bodyTag = document.querySelector('body');
	// 	bodyTag.style.border = "10px solid red";
	// }
	
	// Check to see if WebP images are supported by browser.
	// Give the body tag a class reflecting this so we can reference it in the CSS.
	function WebpIsSupported(e){if(window.createImageBitmap){fetch("data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=").then(function(e){return e.blob()}).then(function(t){createImageBitmap(t).then(function(){e(!0)},function(){e(!1)})})}else e(!1)}WebpIsSupported(function(e){e?document.body.classList.add("webp-supported"):document.body.classList.add("webp-not-supported")});

	console.log("Foundry 3 — v3.2023.09.06");


});





	
	
return stack;})(stacks.stacks_in_2);
// Javascript for stacks_in_28// ---------------------------------------------------------------------
// Each stack has its own object with its own namespace.  The name of// that object is the same as the stack's id.
stacks.stacks_in_28 = {};
// A closure is defined and assigned to the stack's object.  The object// is also passed in as 'stack' which gives you a shorthand for referring// to this object from elsewhere.
stacks.stacks_in_28 = (function(stack) {document.addEventListener('DOMContentLoaded', function(event) {

	stacks_in_28_popToggle = document.querySelector('#stacks_in_28-popup-toggle');
	stacks_in_28_popToggleIcon = document.querySelector('#stacks_in_28-popup-toggle > i.popup-toggle-icon')
	stacks_in_28_popNav = document.querySelector('#stacks_in_28-popup-navigation');
	stacks_in_28_popNavWrap = document.querySelector('#stacks_in_28-nav-wrap');
	stacks_in_28_popOpenerIcon = 'bi-list';
	
	
	
	stacks_in_28_popNavIsVisible = false;
	stacks_in_28_dispNone = true;
		

	document.addEventListener('click', function(e) {
	if (stacks_in_28_popToggle.contains(e.target)) {
		if (stacks_in_28_popNavIsVisible) {
			stacks_in_28_popNav.classList.remove('reveal');
			stacks_in_28_popNav.classList.add('dismiss');
			stacks_in_28_popToggleIcon.classList.remove('rotate-icon');
			stacks_in_28_popToggleIcon.classList.remove('bi-x');
			stacks_in_28_popToggleIcon.classList.add('stacks_in_28_popOpenerIcon');
			stacks_in_28_popNavIsVisible = false;
			setTimeout(function() {
				if (!stacks_in_28_dispNone){
					stacks_in_28_popNav.style.display="none";
					stacks_in_28_dispNone = true;
				}
			}, 400);
		} else {
			if (stacks_in_28_dispNone){
				stacks_in_28_popNav.style.display="block";
				stacks_in_28_dispNone = false;
			}
			stacks_in_28_popNav.classList.remove('dismiss');
			stacks_in_28_popNav.classList.add('reveal');
			stacks_in_28_popToggleIcon.classList.add('rotate-icon');
			stacks_in_28_popToggleIcon.classList.remove('stacks_in_28_popOpenerIcon');
			stacks_in_28_popToggleIcon.classList.add('bi-x');
			stacks_in_28_popNavIsVisible = true;
		}		
	} else if (!stacks_in_28_popNavWrap.contains(e.target)) {
		if (stacks_in_28_popNavIsVisible) {
			stacks_in_28_popNav.classList.remove('reveal');
			stacks_in_28_popNav.classList.add('dismiss');
			stacks_in_28_popToggleIcon.classList.remove('rotate-icon');
			stacks_in_28_popToggleIcon.classList.remove('bi-x');
			stacks_in_28_popToggleIcon.classList.add('stacks_in_28_popOpenerIcon');
			// popToggleIcon.classList.toggle('bi-x');
			stacks_in_28_popNavIsVisible = false;
			setTimeout(function() {
				if (!stacks_in_28_dispNone){
					stacks_in_28_popNav.style.display="none";
					stacks_in_28_dispNone = true;
				}
			}, 400);
		}
    }
	});
});





	
	
return stack;})(stacks.stacks_in_28);
// Javascript for stacks_in_374// ---------------------------------------------------------------------
// Each stack has its own object with its own namespace.  The name of// that object is the same as the stack's id.
stacks.stacks_in_374 = {};
// A closure is defined and assigned to the stack's object.  The object// is also passed in as 'stack' which gives you a shorthand for referring// to this object from elsewhere.
stacks.stacks_in_374 = (function(stack) {document.addEventListener('DOMContentLoaded', function(event) {
	const modal = document.getElementById('contact');
	document.body.append(modal);
});
return stack;})(stacks.stacks_in_374);
// Javascript for stacks_in_382// ---------------------------------------------------------------------
// Each stack has its own object with its own namespace.  The name of// that object is the same as the stack's id.
stacks.stacks_in_382 = {};
// A closure is defined and assigned to the stack's object.  The object// is also passed in as 'stack' which gives you a shorthand for referring// to this object from elsewhere.
stacks.stacks_in_382 = (function(stack) {document.addEventListener('DOMContentLoaded', function(event) {

	document.querySelectorAll(".stacks_in_382-list .list-inner-wrap").forEach(function(e){
		
	});
	
	document.querySelectorAll(".stacks_in_382-list .indv-list-item").forEach(function(e){
			
		e.classList.add("var(--bs-white)");
		
		
		
		
	});

	


});

return stack;})(stacks.stacks_in_382);
// Javascript for stacks_in_139// ---------------------------------------------------------------------
// Each stack has its own object with its own namespace.  The name of// that object is the same as the stack's id.
stacks.stacks_in_139 = {};
// A closure is defined and assigned to the stack's object.  The object// is also passed in as 'stack' which gives you a shorthand for referring// to this object from elsewhere.
stacks.stacks_in_139 = (function(stack) {document.addEventListener('DOMContentLoaded', function(event) {
	
	
	// Remove the transition class
	const alchemy = document.querySelector('.stacks_in_139-alchemy');
	alchemy.classList.remove('stacks_in_139-alchemy-transition');
	
	// Create the observer
	// Offset from bottom is controlled by the rootMargin
	let options = {
	  rootMargin: "0px 0px -25.00px 0px",
	  threshold: 0
	}

	const observer = new IntersectionObserver(entries => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) {
		  alchemy.classList.add('stacks_in_139-alchemy-transition');
		  return;
		}
		
		alchemy.classList.remove('stacks_in_139-alchemy-transition');
		
	  });
	}, options);
	
	observer.observe(document.querySelector('.stacks_in_139-alchemy-wrapper'));
	
});





	
	
return stack;})(stacks.stacks_in_139);
// Javascript for stacks_in_220// ---------------------------------------------------------------------
// Each stack has its own object with its own namespace.  The name of// that object is the same as the stack's id.
stacks.stacks_in_220 = {};
// A closure is defined and assigned to the stack's object.  The object// is also passed in as 'stack' which gives you a shorthand for referring// to this object from elsewhere.
stacks.stacks_in_220 = (function(stack) {document.addEventListener('DOMContentLoaded', function(event) {
	
	
	// Remove the transition class
	const alchemy = document.querySelector('.stacks_in_220-alchemy');
	alchemy.classList.remove('stacks_in_220-alchemy-transition');
	
	// Create the observer
	// Offset from bottom is controlled by the rootMargin
	let options = {
	  rootMargin: "0px 0px -25.00px 0px",
	  threshold: 0
	}

	const observer = new IntersectionObserver(entries => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) {
		  alchemy.classList.add('stacks_in_220-alchemy-transition');
		  return;
		}
		
	  });
	}, options);
	
	observer.observe(document.querySelector('.stacks_in_220-alchemy-wrapper'));
	
});





	
	
return stack;})(stacks.stacks_in_220);
// Javascript for stacks_in_224// ---------------------------------------------------------------------
// Each stack has its own object with its own namespace.  The name of// that object is the same as the stack's id.
stacks.stacks_in_224 = {};
// A closure is defined and assigned to the stack's object.  The object// is also passed in as 'stack' which gives you a shorthand for referring// to this object from elsewhere.
stacks.stacks_in_224 = (function(stack) {document.addEventListener('DOMContentLoaded', function(event) {
	
	
	// Remove the transition class
	const alchemy = document.querySelector('.stacks_in_224-alchemy');
	alchemy.classList.remove('stacks_in_224-alchemy-transition');
	
	// Create the observer
	// Offset from bottom is controlled by the rootMargin
	let options = {
	  rootMargin: "0px 0px -25.00px 0px",
	  threshold: 0
	}

	const observer = new IntersectionObserver(entries => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) {
		  alchemy.classList.add('stacks_in_224-alchemy-transition');
		  return;
		}
		
	  });
	}, options);
	
	observer.observe(document.querySelector('.stacks_in_224-alchemy-wrapper'));
	
});





	
	
return stack;})(stacks.stacks_in_224);
// Javascript for stacks_in_402// ---------------------------------------------------------------------
// Each stack has its own object with its own namespace.  The name of// that object is the same as the stack's id.
stacks.stacks_in_402 = {};
// A closure is defined and assigned to the stack's object.  The object// is also passed in as 'stack' which gives you a shorthand for referring// to this object from elsewhere.
stacks.stacks_in_402 = (function(stack) {document.addEventListener('DOMContentLoaded', function(event) {
	
	
	// Remove the transition class
	const alchemy = document.querySelector('.stacks_in_402-alchemy');
	alchemy.classList.remove('stacks_in_402-alchemy-transition');
	
	// Create the observer
	// Offset from bottom is controlled by the rootMargin
	let options = {
	  rootMargin: "0px 0px -25.00px 0px",
	  threshold: 0
	}

	const observer = new IntersectionObserver(entries => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) {
		  alchemy.classList.add('stacks_in_402-alchemy-transition');
		  return;
		}
		
		alchemy.classList.remove('stacks_in_402-alchemy-transition');
		
	  });
	}, options);
	
	observer.observe(document.querySelector('.stacks_in_402-alchemy-wrapper'));
	
});





	
	
return stack;})(stacks.stacks_in_402);
// Javascript for stacks_in_535// ---------------------------------------------------------------------
// Each stack has its own object with its own namespace.  The name of// that object is the same as the stack's id.
stacks.stacks_in_535 = {};
// A closure is defined and assigned to the stack's object.  The object// is also passed in as 'stack' which gives you a shorthand for referring// to this object from elsewhere.
stacks.stacks_in_535 = (function(stack) {document.addEventListener( 'DOMContentLoaded', function() {

	reframe('#stacks_in_535-video iframe, #stacks_in_535-video video');


window.addEventListener('load', videoScroll);
window.addEventListener('scroll', videoScroll);

function videoScroll() {

  if ( document.querySelectorAll('video.stacks_in_535-scroll-autoplay').length > 0) {
    var windowHeight = window.innerHeight,
        videoEl = document.querySelectorAll('video.stacks_in_535-scroll-autoplay');

    for (var i = 0; i < videoEl.length; i++) {

      var thisVideoEl = videoEl[i],
          videoHeight = thisVideoEl.clientHeight,
          videoClientRect = thisVideoEl.getBoundingClientRect().top;

      if ( videoClientRect <= ( (windowHeight) - (videoHeight*.5) ) && videoClientRect >= ( 0 - ( videoHeight*.5 ) ) ) {
        thisVideoEl.play();
      } else {
        thisVideoEl.pause();
      }

    }
  }

}



});
return stack;})(stacks.stacks_in_535);
// Javascript for stacks_in_406// ---------------------------------------------------------------------
// Each stack has its own object with its own namespace.  The name of// that object is the same as the stack's id.
stacks.stacks_in_406 = {};
// A closure is defined and assigned to the stack's object.  The object// is also passed in as 'stack' which gives you a shorthand for referring// to this object from elsewhere.
stacks.stacks_in_406 = (function(stack) {document.addEventListener('DOMContentLoaded', function(event) {
	
	
	// Remove the transition class
	const alchemy = document.querySelector('.stacks_in_406-alchemy');
	alchemy.classList.remove('stacks_in_406-alchemy-transition');
	
	// Create the observer
	// Offset from bottom is controlled by the rootMargin
	let options = {
	  rootMargin: "0px 0px -25.00px 0px",
	  threshold: 0
	}

	const observer = new IntersectionObserver(entries => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) {
		  alchemy.classList.add('stacks_in_406-alchemy-transition');
		  return;
		}
		
		alchemy.classList.remove('stacks_in_406-alchemy-transition');
		
	  });
	}, options);
	
	observer.observe(document.querySelector('.stacks_in_406-alchemy-wrapper'));
	
});





	
	
return stack;})(stacks.stacks_in_406);
// Javascript for stacks_in_532// ---------------------------------------------------------------------
// Each stack has its own object with its own namespace.  The name of// that object is the same as the stack's id.
stacks.stacks_in_532 = {};
// A closure is defined and assigned to the stack's object.  The object// is also passed in as 'stack' which gives you a shorthand for referring// to this object from elsewhere.
stacks.stacks_in_532 = (function(stack) {document.addEventListener( 'DOMContentLoaded', function() {

	reframe('#stacks_in_532-video iframe, #stacks_in_532-video video');


window.addEventListener('load', videoScroll);
window.addEventListener('scroll', videoScroll);

function videoScroll() {

  if ( document.querySelectorAll('video.stacks_in_532-scroll-autoplay').length > 0) {
    var windowHeight = window.innerHeight,
        videoEl = document.querySelectorAll('video.stacks_in_532-scroll-autoplay');

    for (var i = 0; i < videoEl.length; i++) {

      var thisVideoEl = videoEl[i],
          videoHeight = thisVideoEl.clientHeight,
          videoClientRect = thisVideoEl.getBoundingClientRect().top;

      if ( videoClientRect <= ( (windowHeight) - (videoHeight*.5) ) && videoClientRect >= ( 0 - ( videoHeight*.5 ) ) ) {
        thisVideoEl.play();
      } else {
        thisVideoEl.pause();
      }

    }
  }

}



});
return stack;})(stacks.stacks_in_532);
// Javascript for stacks_in_426// ---------------------------------------------------------------------
// Each stack has its own object with its own namespace.  The name of// that object is the same as the stack's id.
stacks.stacks_in_426 = {};
// A closure is defined and assigned to the stack's object.  The object// is also passed in as 'stack' which gives you a shorthand for referring// to this object from elsewhere.
stacks.stacks_in_426 = (function(stack) {document.addEventListener('DOMContentLoaded', function(event) {
	
	
	// Remove the transition class
	const alchemy = document.querySelector('.stacks_in_426-alchemy');
	alchemy.classList.remove('stacks_in_426-alchemy-transition');
	
	// Create the observer
	// Offset from bottom is controlled by the rootMargin
	let options = {
	  rootMargin: "0px 0px -25.00px 0px",
	  threshold: 0
	}

	const observer = new IntersectionObserver(entries => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) {
		  alchemy.classList.add('stacks_in_426-alchemy-transition');
		  return;
		}
		
		alchemy.classList.remove('stacks_in_426-alchemy-transition');
		
	  });
	}, options);
	
	observer.observe(document.querySelector('.stacks_in_426-alchemy-wrapper'));
	
});





	
	
return stack;})(stacks.stacks_in_426);
// Javascript for stacks_in_542// ---------------------------------------------------------------------
// Each stack has its own object with its own namespace.  The name of// that object is the same as the stack's id.
stacks.stacks_in_542 = {};
// A closure is defined and assigned to the stack's object.  The object// is also passed in as 'stack' which gives you a shorthand for referring// to this object from elsewhere.
stacks.stacks_in_542 = (function(stack) {document.addEventListener('DOMContentLoaded', function(event) {
	

});





	
	
return stack;})(stacks.stacks_in_542);
// Javascript for stacks_in_547// ---------------------------------------------------------------------
// Each stack has its own object with its own namespace.  The name of// that object is the same as the stack's id.
stacks.stacks_in_547 = {};
// A closure is defined and assigned to the stack's object.  The object// is also passed in as 'stack' which gives you a shorthand for referring// to this object from elsewhere.
stacks.stacks_in_547 = (function(stack) {document.addEventListener('DOMContentLoaded', function(event) {
	// %[if ]%
	// // Set current page (those with an href == './') to have .active class
	// document.querySelectorAll("#stacks_in_547-collapse-section a[href='./']").forEach(function(e){
	// 	e.classList.add("active");
	// 	prnt = document.getElementById("stacks_in_547-collapse-section");
	// 	prnt.classList.add("show");
	// 	
	// 	document.querySelectorAll(".stacks_in_547-accordion-item .accordion-button").forEach(function(s){
	// 		s.classList.remove("collapsed");
	// 	});
	// });
	// %[endif]%
});





	
	
return stack;})(stacks.stacks_in_547);
// Javascript for stacks_in_552// ---------------------------------------------------------------------
// Each stack has its own object with its own namespace.  The name of// that object is the same as the stack's id.
stacks.stacks_in_552 = {};
// A closure is defined and assigned to the stack's object.  The object// is also passed in as 'stack' which gives you a shorthand for referring// to this object from elsewhere.
stacks.stacks_in_552 = (function(stack) {document.addEventListener('DOMContentLoaded', function(event) {
	// %[if ]%
	// // Set current page (those with an href == './') to have .active class
	// document.querySelectorAll("#stacks_in_552-collapse-section a[href='./']").forEach(function(e){
	// 	e.classList.add("active");
	// 	prnt = document.getElementById("stacks_in_552-collapse-section");
	// 	prnt.classList.add("show");
	// 	
	// 	document.querySelectorAll(".stacks_in_552-accordion-item .accordion-button").forEach(function(s){
	// 		s.classList.remove("collapsed");
	// 	});
	// });
	// %[endif]%
});





	
	
return stack;})(stacks.stacks_in_552);
// Javascript for stacks_in_557// ---------------------------------------------------------------------
// Each stack has its own object with its own namespace.  The name of// that object is the same as the stack's id.
stacks.stacks_in_557 = {};
// A closure is defined and assigned to the stack's object.  The object// is also passed in as 'stack' which gives you a shorthand for referring// to this object from elsewhere.
stacks.stacks_in_557 = (function(stack) {document.addEventListener('DOMContentLoaded', function(event) {
	// %[if ]%
	// // Set current page (those with an href == './') to have .active class
	// document.querySelectorAll("#stacks_in_557-collapse-section a[href='./']").forEach(function(e){
	// 	e.classList.add("active");
	// 	prnt = document.getElementById("stacks_in_557-collapse-section");
	// 	prnt.classList.add("show");
	// 	
	// 	document.querySelectorAll(".stacks_in_557-accordion-item .accordion-button").forEach(function(s){
	// 		s.classList.remove("collapsed");
	// 	});
	// });
	// %[endif]%
});





	
	
return stack;})(stacks.stacks_in_557);
// Javascript for stacks_in_565// ---------------------------------------------------------------------
// Each stack has its own object with its own namespace.  The name of// that object is the same as the stack's id.
stacks.stacks_in_565 = {};
// A closure is defined and assigned to the stack's object.  The object// is also passed in as 'stack' which gives you a shorthand for referring// to this object from elsewhere.
stacks.stacks_in_565 = (function(stack) {document.addEventListener('DOMContentLoaded', function(event) {
	// %[if ]%
	// // Set current page (those with an href == './') to have .active class
	// document.querySelectorAll("#stacks_in_565-collapse-section a[href='./']").forEach(function(e){
	// 	e.classList.add("active");
	// 	prnt = document.getElementById("stacks_in_565-collapse-section");
	// 	prnt.classList.add("show");
	// 	
	// 	document.querySelectorAll(".stacks_in_565-accordion-item .accordion-button").forEach(function(s){
	// 		s.classList.remove("collapsed");
	// 	});
	// });
	// %[endif]%
});





	
	
return stack;})(stacks.stacks_in_565);
// Javascript for stacks_in_571// ---------------------------------------------------------------------
// Each stack has its own object with its own namespace.  The name of// that object is the same as the stack's id.
stacks.stacks_in_571 = {};
// A closure is defined and assigned to the stack's object.  The object// is also passed in as 'stack' which gives you a shorthand for referring// to this object from elsewhere.
stacks.stacks_in_571 = (function(stack) {document.addEventListener('DOMContentLoaded', function(event) {
	// %[if ]%
	// // Set current page (those with an href == './') to have .active class
	// document.querySelectorAll("#stacks_in_571-collapse-section a[href='./']").forEach(function(e){
	// 	e.classList.add("active");
	// 	prnt = document.getElementById("stacks_in_571-collapse-section");
	// 	prnt.classList.add("show");
	// 	
	// 	document.querySelectorAll(".stacks_in_571-accordion-item .accordion-button").forEach(function(s){
	// 		s.classList.remove("collapsed");
	// 	});
	// });
	// %[endif]%
});





	
	
return stack;})(stacks.stacks_in_571);
// Javascript for stacks_in_577// ---------------------------------------------------------------------
// Each stack has its own object with its own namespace.  The name of// that object is the same as the stack's id.
stacks.stacks_in_577 = {};
// A closure is defined and assigned to the stack's object.  The object// is also passed in as 'stack' which gives you a shorthand for referring// to this object from elsewhere.
stacks.stacks_in_577 = (function(stack) {document.addEventListener('DOMContentLoaded', function(event) {
	// %[if ]%
	// // Set current page (those with an href == './') to have .active class
	// document.querySelectorAll("#stacks_in_577-collapse-section a[href='./']").forEach(function(e){
	// 	e.classList.add("active");
	// 	prnt = document.getElementById("stacks_in_577-collapse-section");
	// 	prnt.classList.add("show");
	// 	
	// 	document.querySelectorAll(".stacks_in_577-accordion-item .accordion-button").forEach(function(s){
	// 		s.classList.remove("collapsed");
	// 	});
	// });
	// %[endif]%
});





	
	
return stack;})(stacks.stacks_in_577);
// Javascript for stacks_in_583// ---------------------------------------------------------------------
// Each stack has its own object with its own namespace.  The name of// that object is the same as the stack's id.
stacks.stacks_in_583 = {};
// A closure is defined and assigned to the stack's object.  The object// is also passed in as 'stack' which gives you a shorthand for referring// to this object from elsewhere.
stacks.stacks_in_583 = (function(stack) {document.addEventListener('DOMContentLoaded', function(event) {
	// %[if ]%
	// // Set current page (those with an href == './') to have .active class
	// document.querySelectorAll("#stacks_in_583-collapse-section a[href='./']").forEach(function(e){
	// 	e.classList.add("active");
	// 	prnt = document.getElementById("stacks_in_583-collapse-section");
	// 	prnt.classList.add("show");
	// 	
	// 	document.querySelectorAll(".stacks_in_583-accordion-item .accordion-button").forEach(function(s){
	// 		s.classList.remove("collapsed");
	// 	});
	// });
	// %[endif]%
});





	
	
return stack;})(stacks.stacks_in_583);
// Javascript for stacks_in_589// ---------------------------------------------------------------------
// Each stack has its own object with its own namespace.  The name of// that object is the same as the stack's id.
stacks.stacks_in_589 = {};
// A closure is defined and assigned to the stack's object.  The object// is also passed in as 'stack' which gives you a shorthand for referring// to this object from elsewhere.
stacks.stacks_in_589 = (function(stack) {document.addEventListener('DOMContentLoaded', function(event) {
	// %[if ]%
	// // Set current page (those with an href == './') to have .active class
	// document.querySelectorAll("#stacks_in_589-collapse-section a[href='./']").forEach(function(e){
	// 	e.classList.add("active");
	// 	prnt = document.getElementById("stacks_in_589-collapse-section");
	// 	prnt.classList.add("show");
	// 	
	// 	document.querySelectorAll(".stacks_in_589-accordion-item .accordion-button").forEach(function(s){
	// 		s.classList.remove("collapsed");
	// 	});
	// });
	// %[endif]%
});





	
	
return stack;})(stacks.stacks_in_589);
// Javascript for stacks_in_595// ---------------------------------------------------------------------
// Each stack has its own object with its own namespace.  The name of// that object is the same as the stack's id.
stacks.stacks_in_595 = {};
// A closure is defined and assigned to the stack's object.  The object// is also passed in as 'stack' which gives you a shorthand for referring// to this object from elsewhere.
stacks.stacks_in_595 = (function(stack) {document.addEventListener('DOMContentLoaded', function(event) {
	// %[if ]%
	// // Set current page (those with an href == './') to have .active class
	// document.querySelectorAll("#stacks_in_595-collapse-section a[href='./']").forEach(function(e){
	// 	e.classList.add("active");
	// 	prnt = document.getElementById("stacks_in_595-collapse-section");
	// 	prnt.classList.add("show");
	// 	
	// 	document.querySelectorAll(".stacks_in_595-accordion-item .accordion-button").forEach(function(s){
	// 		s.classList.remove("collapsed");
	// 	});
	// });
	// %[endif]%
});





	
	
return stack;})(stacks.stacks_in_595);
// Javascript for stacks_in_450// ---------------------------------------------------------------------
// Each stack has its own object with its own namespace.  The name of// that object is the same as the stack's id.
stacks.stacks_in_450 = {};
// A closure is defined and assigned to the stack's object.  The object// is also passed in as 'stack' which gives you a shorthand for referring// to this object from elsewhere.
stacks.stacks_in_450 = (function(stack) {document.addEventListener('DOMContentLoaded', function(event) {
	
	
	// Remove the transition class
	const alchemy = document.querySelector('.stacks_in_450-alchemy');
	alchemy.classList.remove('stacks_in_450-alchemy-transition');
	
	// Create the observer
	// Offset from bottom is controlled by the rootMargin
	let options = {
	  rootMargin: "0px 0px -25.00px 0px",
	  threshold: 0
	}

	const observer = new IntersectionObserver(entries => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) {
		  alchemy.classList.add('stacks_in_450-alchemy-transition');
		  return;
		}
		
		alchemy.classList.remove('stacks_in_450-alchemy-transition');
		
	  });
	}, options);
	
	observer.observe(document.querySelector('.stacks_in_450-alchemy-wrapper'));
	
});





	
	
return stack;})(stacks.stacks_in_450);
// Javascript for stacks_in_454// ---------------------------------------------------------------------
// Each stack has its own object with its own namespace.  The name of// that object is the same as the stack's id.
stacks.stacks_in_454 = {};
// A closure is defined and assigned to the stack's object.  The object// is also passed in as 'stack' which gives you a shorthand for referring// to this object from elsewhere.
stacks.stacks_in_454 = (function(stack) {document.addEventListener('DOMContentLoaded', function(event) {
	
	
	// Remove the transition class
	const alchemy = document.querySelector('.stacks_in_454-alchemy');
	alchemy.classList.remove('stacks_in_454-alchemy-transition');
	
	// Create the observer
	// Offset from bottom is controlled by the rootMargin
	let options = {
	  rootMargin: "0px 0px -25.00px 0px",
	  threshold: 0
	}

	const observer = new IntersectionObserver(entries => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) {
		  alchemy.classList.add('stacks_in_454-alchemy-transition');
		  return;
		}
		
		alchemy.classList.remove('stacks_in_454-alchemy-transition');
		
	  });
	}, options);
	
	observer.observe(document.querySelector('.stacks_in_454-alchemy-wrapper'));
	
});





	
	
return stack;})(stacks.stacks_in_454);