(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[17],{IP4Q:function(e,t,n){"use strict";var r=n("pVnL"),o=n.n(r),a=n("lSNA"),i=n.n(a),s=n("8OQS"),l=n.n(s),c=n("qKvR"),u=n("q1tI"),d=n("BMxC"),f=n("D7Da");function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var h=Object(u.forwardRef)((function(e,t){var n=e.size,r=e.variantColor,a=e.variant,s=e.isAttached,h=e.spacing,m=void 0===h?2:h,E=e.children,y=l()(e,["size","variantColor","variant","isAttached","spacing","children"]),g=Object(f.b)(E),v=g.map((function(e,t){var o=0===t,l=t===g.length-1;return Object(u.cloneElement)(e,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(n,!0).forEach((function(t){i()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({size:n||e.props.size,variantColor:e.props.variantColor||r,variant:e.props.variant||a,_focus:{boxShadow:"outline",zIndex:1}},!l&&!s&&{mr:m},{},o&&s&&{roundedRight:0},{},l&&s&&{roundedLeft:0},{},!l&&s&&{borderRight:0},{},!o&&!l&&s&&{rounded:0}))}));return Object(c.d)(d.a,o()({ref:t,display:"inline-block"},y),v)}));t.a=h},OQ2h:function(e,t,n){"use strict";var r=n("pVnL"),o=n.n(r),a=n("8OQS"),i=n.n(a),s=n("qKvR"),l=n("q1tI"),c=n("w0db"),u=n("eJLp"),d=n("BMxC"),f=Object(l.forwardRef)((function(e,t){var n=e.icon,r=e.isRound,a=e["aria-label"],l=i()(e,["icon","isRound","aria-label"]),f=(l.isFullWidth,l.leftIcon,l.rightIcon,l.loadingText,i()(l,["isFullWidth","leftIcon","rightIcon","loadingText"]));return Object(s.d)(u.a,o()({p:"0",borderRadius:r?"full":"md",ref:t,"aria-label":a},f),"string"===typeof n?Object(s.d)(c.a,{name:n,focusable:"false",color:"currentColor","aria-hidden":!0}):Object(s.d)(d.a,{as:n,"aria-hidden":!0,focusable:"false",color:"currentColor"}))}));f.displayName="IconButton",f.defaultProps=u.a.defaultProps,t.a=f},"Q/0U":function(e,t,n){e.exports=function(){function e(t,n,r){function o(i,s){if(!n[i]){if(!t[i]){if(a)return a(i,!0);var l=new Error("Cannot find module '"+i+"'");throw l.code="MODULE_NOT_FOUND",l}var c=n[i]={exports:{}};t[i][0].call(c.exports,(function(e){return o(t[i][1][e]||e)}),c,c.exports,e,t,n,r)}return n[i].exports}for(var a=!1,i=0;i<r.length;i++)o(r[i]);return o}return e}()({1:[function(e,t,n){var r=Object.create||A,o=Object.keys||_,a=Function.prototype.bind||R;function i(){this._events&&Object.prototype.hasOwnProperty.call(this,"_events")||(this._events=r(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0}t.exports=i,i.EventEmitter=i,i.prototype._events=void 0,i.prototype._maxListeners=void 0;var s,l=10;try{var c={};Object.defineProperty&&Object.defineProperty(c,"x",{value:0}),s=0===c.x}catch(w){s=!1}function u(e){return void 0===e._maxListeners?i.defaultMaxListeners:e._maxListeners}function d(e,t,n){if(t)e.call(n);else for(var r=e.length,o=b(e,r),a=0;a<r;++a)o[a].call(n)}function f(e,t,n,r){if(t)e.call(n,r);else for(var o=e.length,a=b(e,o),i=0;i<o;++i)a[i].call(n,r)}function p(e,t,n,r,o){if(t)e.call(n,r,o);else for(var a=e.length,i=b(e,a),s=0;s<a;++s)i[s].call(n,r,o)}function h(e,t,n,r,o,a){if(t)e.call(n,r,o,a);else for(var i=e.length,s=b(e,i),l=0;l<i;++l)s[l].call(n,r,o,a)}function m(e,t,n,r){if(t)e.apply(n,r);else for(var o=e.length,a=b(e,o),i=0;i<o;++i)a[i].apply(n,r)}function E(e,t,n,o){var a,i,s;if("function"!==typeof n)throw new TypeError('"listener" argument must be a function');if((i=e._events)?(i.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),i=e._events),s=i[t]):(i=e._events=r(null),e._eventsCount=0),s){if("function"===typeof s?s=i[t]=o?[n,s]:[s,n]:o?s.unshift(n):s.push(n),!s.warned&&(a=u(e))&&a>0&&s.length>a){s.warned=!0;var l=new Error("Possible EventEmitter memory leak detected. "+s.length+' "'+String(t)+'" listeners added. Use emitter.setMaxListeners() to increase limit.');l.name="MaxListenersExceededWarning",l.emitter=e,l.type=t,l.count=s.length,"object"===typeof console&&console.warn&&console.warn("%s: %s",l.name,l.message)}}else s=i[t]=n,++e._eventsCount;return e}function y(){if(!this.fired)switch(this.target.removeListener(this.type,this.wrapFn),this.fired=!0,arguments.length){case 0:return this.listener.call(this.target);case 1:return this.listener.call(this.target,arguments[0]);case 2:return this.listener.call(this.target,arguments[0],arguments[1]);case 3:return this.listener.call(this.target,arguments[0],arguments[1],arguments[2]);default:for(var e=new Array(arguments.length),t=0;t<e.length;++t)e[t]=arguments[t];this.listener.apply(this.target,e)}}function g(e,t,n){var r={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},o=a.call(y,r);return o.listener=n,r.wrapFn=o,o}function v(e,t,n){var r=e._events;if(!r)return[];var o=r[t];return o?"function"===typeof o?n?[o.listener||o]:[o]:n?T(o):b(o,o.length):[]}function N(e){var t=this._events;if(t){var n=t[e];if("function"===typeof n)return 1;if(n)return n.length}return 0}function O(e,t){for(var n=t,r=n+1,o=e.length;r<o;n+=1,r+=1)e[n]=e[r];e.pop()}function b(e,t){for(var n=new Array(t),r=0;r<t;++r)n[r]=e[r];return n}function T(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}function A(e){var t=function(){};return t.prototype=e,new t}function _(e){var t=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.push(n);return n}function R(e){var t=this;return function(){return t.apply(e,arguments)}}s?Object.defineProperty(i,"defaultMaxListeners",{enumerable:!0,get:function(){return l},set:function(e){if("number"!==typeof e||e<0||e!==e)throw new TypeError('"defaultMaxListeners" must be a positive number');l=e}}):i.defaultMaxListeners=l,i.prototype.setMaxListeners=function(e){if("number"!==typeof e||e<0||isNaN(e))throw new TypeError('"n" argument must be a positive number');return this._maxListeners=e,this},i.prototype.getMaxListeners=function(){return u(this)},i.prototype.emit=function(e){var t,n,r,o,a,i,s="error"===e;if(i=this._events)s=s&&null==i.error;else if(!s)return!1;if(s){if(arguments.length>1&&(t=arguments[1]),t instanceof Error)throw t;var l=new Error('Unhandled "error" event. ('+t+")");throw l.context=t,l}if(!(n=i[e]))return!1;var c="function"===typeof n;switch(r=arguments.length){case 1:d(n,c,this);break;case 2:f(n,c,this,arguments[1]);break;case 3:p(n,c,this,arguments[1],arguments[2]);break;case 4:h(n,c,this,arguments[1],arguments[2],arguments[3]);break;default:for(o=new Array(r-1),a=1;a<r;a++)o[a-1]=arguments[a];m(n,c,this,o)}return!0},i.prototype.addListener=function(e,t){return E(this,e,t,!1)},i.prototype.on=i.prototype.addListener,i.prototype.prependListener=function(e,t){return E(this,e,t,!0)},i.prototype.once=function(e,t){if("function"!==typeof t)throw new TypeError('"listener" argument must be a function');return this.on(e,g(this,e,t)),this},i.prototype.prependOnceListener=function(e,t){if("function"!==typeof t)throw new TypeError('"listener" argument must be a function');return this.prependListener(e,g(this,e,t)),this},i.prototype.removeListener=function(e,t){var n,o,a,i,s;if("function"!==typeof t)throw new TypeError('"listener" argument must be a function');if(!(o=this._events))return this;if(!(n=o[e]))return this;if(n===t||n.listener===t)0===--this._eventsCount?this._events=r(null):(delete o[e],o.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!==typeof n){for(a=-1,i=n.length-1;i>=0;i--)if(n[i]===t||n[i].listener===t){s=n[i].listener,a=i;break}if(a<0)return this;0===a?n.shift():O(n,a),1===n.length&&(o[e]=n[0]),o.removeListener&&this.emit("removeListener",e,s||t)}return this},i.prototype.removeAllListeners=function(e){var t,n,a;if(!(n=this._events))return this;if(!n.removeListener)return 0===arguments.length?(this._events=r(null),this._eventsCount=0):n[e]&&(0===--this._eventsCount?this._events=r(null):delete n[e]),this;if(0===arguments.length){var i,s=o(n);for(a=0;a<s.length;++a)"removeListener"!==(i=s[a])&&this.removeAllListeners(i);return this.removeAllListeners("removeListener"),this._events=r(null),this._eventsCount=0,this}if("function"===typeof(t=n[e]))this.removeListener(e,t);else if(t)for(a=t.length-1;a>=0;a--)this.removeListener(e,t[a]);return this},i.prototype.listeners=function(e){return v(this,e,!0)},i.prototype.rawListeners=function(e){return v(this,e,!1)},i.listenerCount=function(e,t){return"function"===typeof e.listenerCount?e.listenerCount(t):N.call(e,t)},i.prototype.listenerCount=N,i.prototype.eventNames=function(){return this._eventsCount>0?Reflect.ownKeys(this._events):[]}},{}],2:[function(e,t,n){"use strict";var r="%[a-f0-9]{2}",o=new RegExp(r,"gi"),a=new RegExp("("+r+")+","gi");function i(e,t){try{return decodeURIComponent(e.join(""))}catch(o){}if(1===e.length)return e;t=t||1;var n=e.slice(0,t),r=e.slice(t);return Array.prototype.concat.call([],i(n),i(r))}function s(e){try{return decodeURIComponent(e)}catch(r){for(var t=e.match(o),n=1;n<t.length;n++)t=(e=i(t,n).join("")).match(o);return e}}function l(e){for(var t={"%FE%FF":"\ufffd\ufffd","%FF%FE":"\ufffd\ufffd"},n=a.exec(e);n;){try{t[n[0]]=decodeURIComponent(n[0])}catch(c){var r=s(n[0]);r!==n[0]&&(t[n[0]]=r)}n=a.exec(e)}t["%C2"]="\ufffd";for(var o=Object.keys(t),i=0;i<o.length;i++){var l=o[i];e=e.replace(new RegExp(l,"g"),t[l])}return e}t.exports=function(e){if("string"!==typeof e)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return e=e.replace(/\+/g," "),decodeURIComponent(e)}catch(t){return l(e)}}},{}],3:[function(e,t,n){"use strict";t.exports=function(e,t){for(var n={},r=Object.keys(e),o=Array.isArray(t),a=0;a<r.length;a++){var i=r[a],s=e[i];(o?-1!==t.indexOf(i):t(i,s,e))&&(n[i]=s)}return n}},{}],4:[function(e,t,n){"use strict";const r=e("strict-uri-encode"),o=e("decode-uri-component"),a=e("split-on-first"),i=e("filter-obj"),s=e=>null===e||void 0===e;function l(e){switch(e.arrayFormat){case"index":return t=>(n,r)=>{const o=n.length;return void 0===r||e.skipNull&&null===r||e.skipEmptyString&&""===r?n:null===r?[...n,[d(t,e),"[",o,"]"].join("")]:[...n,[d(t,e),"[",d(o,e),"]=",d(r,e)].join("")]};case"bracket":return t=>(n,r)=>void 0===r||e.skipNull&&null===r||e.skipEmptyString&&""===r?n:null===r?[...n,[d(t,e),"[]"].join("")]:[...n,[d(t,e),"[]=",d(r,e)].join("")];case"comma":case"separator":return t=>(n,r)=>null===r||void 0===r||0===r.length?n:0===n.length?[[d(t,e),"=",d(r,e)].join("")]:[[n,d(r,e)].join(e.arrayFormatSeparator)];default:return t=>(n,r)=>void 0===r||e.skipNull&&null===r||e.skipEmptyString&&""===r?n:null===r?[...n,d(t,e)]:[...n,[d(t,e),"=",d(r,e)].join("")]}}function c(e){let t;switch(e.arrayFormat){case"index":return(e,n,r)=>{t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),t?(void 0===r[e]&&(r[e]={}),r[e][t[1]]=n):r[e]=n};case"bracket":return(e,n,r)=>{t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0!==r[e]?r[e]=[].concat(r[e],n):r[e]=[n]:r[e]=n};case"comma":case"separator":return(t,n,r)=>{const o="string"===typeof n&&n.includes(e.arrayFormatSeparator),a="string"===typeof n&&!o&&f(n,e).includes(e.arrayFormatSeparator);n=a?f(n,e):n;const i=o||a?n.split(e.arrayFormatSeparator).map(t=>f(t,e)):null===n?n:f(n,e);r[t]=i};default:return(e,t,n)=>{void 0!==n[e]?n[e]=[].concat(n[e],t):n[e]=t}}}function u(e){if("string"!==typeof e||1!==e.length)throw new TypeError("arrayFormatSeparator must be single character string")}function d(e,t){return t.encode?t.strict?r(e):encodeURIComponent(e):e}function f(e,t){return t.decode?o(e):e}function p(e){return Array.isArray(e)?e.sort():"object"===typeof e?p(Object.keys(e)).sort((e,t)=>Number(e)-Number(t)).map(t=>e[t]):e}function h(e){const t=e.indexOf("#");return-1!==t&&(e=e.slice(0,t)),e}function m(e){let t="";const n=e.indexOf("#");return-1!==n&&(t=e.slice(n)),t}function E(e){const t=(e=h(e)).indexOf("?");return-1===t?"":e.slice(t+1)}function y(e,t){return t.parseNumbers&&!Number.isNaN(Number(e))&&"string"===typeof e&&""!==e.trim()?e=Number(e):!t.parseBooleans||null===e||"true"!==e.toLowerCase()&&"false"!==e.toLowerCase()||(e="true"===e.toLowerCase()),e}function g(e,t){u((t=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},t)).arrayFormatSeparator);const n=c(t),r=Object.create(null);if("string"!==typeof e)return r;if(!(e=e.trim().replace(/^[?#&]/,"")))return r;for(const o of e.split("&")){if(""===o)continue;let[e,i]=a(t.decode?o.replace(/\+/g," "):o,"=");i=void 0===i?null:["comma","separator"].includes(t.arrayFormat)?i:f(i,t),n(f(e,t),i,r)}for(const o of Object.keys(r)){const e=r[o];if("object"===typeof e&&null!==e)for(const n of Object.keys(e))e[n]=y(e[n],t);else r[o]=y(e,t)}return!1===t.sort?r:(!0===t.sort?Object.keys(r).sort():Object.keys(r).sort(t.sort)).reduce((e,t)=>{const n=r[t];return Boolean(n)&&"object"===typeof n&&!Array.isArray(n)?e[t]=p(n):e[t]=n,e},Object.create(null))}n.extract=E,n.parse=g,n.stringify=(e,t)=>{if(!e)return"";u((t=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},t)).arrayFormatSeparator);const n=n=>t.skipNull&&s(e[n])||t.skipEmptyString&&""===e[n],r=l(t),o={};for(const i of Object.keys(e))n(i)||(o[i]=e[i]);const a=Object.keys(o);return!1!==t.sort&&a.sort(t.sort),a.map(n=>{const o=e[n];return void 0===o?"":null===o?d(n,t):Array.isArray(o)?o.reduce(r(n),[]).join("&"):d(n,t)+"="+d(o,t)}).filter(e=>e.length>0).join("&")},n.parseUrl=(e,t)=>{t=Object.assign({decode:!0},t);const[n,r]=a(e,"#");return Object.assign({url:n.split("?")[0]||"",query:g(E(e),t)},t&&t.parseFragmentIdentifier&&r?{fragmentIdentifier:f(r,t)}:{})},n.stringifyUrl=(e,t)=>{t=Object.assign({encode:!0,strict:!0},t);const r=h(e.url).split("?")[0]||"",o=n.extract(e.url),a=n.parse(o,{sort:!1}),i=Object.assign(a,e.query);let s=n.stringify(i,t);s&&(s="?"+s);let l=m(e.url);return e.fragmentIdentifier&&(l="#"+d(e.fragmentIdentifier,t)),`${r}${s}${l}`},n.pick=(e,t,r)=>{r=Object.assign({parseFragmentIdentifier:!0},r);const{url:o,query:a,fragmentIdentifier:s}=n.parseUrl(e,r);return n.stringifyUrl({url:o,query:i(a,t),fragmentIdentifier:s},r)},n.exclude=(e,t,r)=>{const o=Array.isArray(t)?e=>!t.includes(e):(e,n)=>!t(e,n);return n.pick(e,o,r)}},{"decode-uri-component":2,"filter-obj":3,"split-on-first":5,"strict-uri-encode":6}],5:[function(e,t,n){"use strict";t.exports=(e,t)=>{if("string"!==typeof e||"string"!==typeof t)throw new TypeError("Expected the arguments to be of type `string`");if(""===t)return[e];const n=e.indexOf(t);return-1===n?[e]:[e.slice(0,n),e.slice(n+t.length)]}},{}],6:[function(e,t,n){"use strict";t.exports=e=>encodeURIComponent(e).replace(/[!'()*]/g,e=>"%"+e.charCodeAt(0).toString(16).toUpperCase())},{}],7:[function(e,t,n){t.exports={name:"@transak/transak-sdk",version:"1.0.29",description:"Transak SDK that allows you to easily integrate the fiat on/ramp",main:"dist/sdk.js",scripts:{test:'echo "Error: no test specified" && exit 1',build:"browserify ./src/index.js -o ./dist/sdk.js -p esmify -s TransakSDK"},repository:{type:"git",url:"git+https://github.com/Transak/transak-sdk.git"},keywords:["fiat","ramp","on","off","cryptocurrency"],author:"Transak",license:"ISC",dependencies:{events:"^3.1.0","query-string":"^6.12.1",request:"^2.88.2"},devDependencies:{browserify:"^16.5.0",esmify:"^2.1.1"},browserslist:{production:[">0.2%","not dead","not op_mini all"],development:["last 1 chrome version","last 1 firefox version","last 1 safari version"]}}},{}],8:[function(e,t,n){"use strict";function r(e,t,n){return`\n/* Modal Content/Box */\n.transak_close {\n    float: right;\n      animation: 5s transak_fadeIn;\n      animation-fill-mode: forwards;\n      visibility: hidden;\n    transition: 0.5s;\n    position: absolute;\n    right: -5px;\n    width: 35px;\n    margin-top: -15px;\n    height: 35px;\n    font-weight: bold;\n    z-index: 1;\n    background: white;\n    color: #${e};\n    border-radius: 50%;\n}\n\n@keyframes transak_fadeIn {\n  0% {\n    opacity: 0;\n  }\n  50% {\n   visibility: hidden;\n    opacity: 0;\n  }\n  100% {\n    visibility: visible;\n    opacity: 1;\n  }\n}\n\n.transak_close:hover,\n.transak_close:focus {\n  color: white;\n  background: #${e};\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.transak_modal {\n  display: block;\n  width: ${n};\n  max-width: 500px;\n  height: ${t};\n  max-height: 100%;\n  position: fixed;\n  z-index: 100;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  background: white;\n      border: none;\n    border-radius: 2%;\n    margin: 0px auto;\n    display: block;\n}\n.transak_closed {\n  display: none;\n}\n\n#transakOnOffRampWidget{\n min-height: ${t}; \n    position: absolute; \n    border: none; \n    border-radius: 2%; \n    margin: 0px auto; \n    display: block;\n}\n\n.transak_modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 50;\n  \n  background: rgba(0, 0, 0, 0.6);\n}\n\n.transak_modal-content{\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n}\n\n.transak_modal .close-button {\n  position: absolute;\n  z-index: 1;\n  top: 10px;\n  right: 20px;\n  background: black;\n  color: white;\n  padding: 5px 10px;\n  font-size: 1.3rem;\n}\n\n.transak_transakContainer{\n    height: 100%;\n    width:100%;\n}\n\n#transakFiatOnOffRamp{\n    margin-left: 10px;\n    margin-right: 10px;\n}\n\n\n@media all and (max-width: ${n}) {\n  .transak_modal {\n    height: 100%;\n    max-height:${t};\n    top: 53%;\n  }\n}\n\n@media all and (max-height: ${t}) and (max-width: ${n}) {\n    #transakOnOffRampWidget{\n    padding-bottom: 15px;\n    }\n}\n`}Object.defineProperty(n,"__esModule",{value:!0}),n.getCSS=r},{}],9:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.closeSVGIcon=void 0;let r='<svg version="1.1" fill="currentColor" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\t viewBox="0 0 612 612" style="enable-background:new 0 0 612 612;" xml:space="preserve">\n<g>\n\t<g id="_x31_0_23_">\n\t\t<g>\n\t\t\t<path d="M306,0C136.992,0,0,136.992,0,306s136.992,306,306,306c168.988,0,306-137.012,306-306S475.008,0,306,0z M414.19,387.147\n\t\t\t\tc7.478,7.478,7.478,19.584,0,27.043c-7.479,7.478-19.584,7.478-27.043,0l-81.032-81.033l-81.588,81.588\n\t\t\t\tc-7.535,7.516-19.737,7.516-27.253,0c-7.535-7.535-7.535-19.737,0-27.254l81.587-81.587l-81.033-81.033\n\t\t\t\tc-7.478-7.478-7.478-19.584,0-27.042c7.478-7.478,19.584-7.478,27.042,0l81.033,81.033l82.181-82.18\n\t\t\t\tc7.535-7.535,19.736-7.535,27.253,0c7.535,7.535,7.535,19.737,0,27.253l-82.181,82.181L414.19,387.147z"/>\n\t\t</g>\n\t</g>\n</g>\n</svg>';n.closeSVGIcon=r},{}],10:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={SOMETHING_WRONG:"[Transak SDK] => Oops something went wrong please try again. Contact us at hello@transak.com",ENTER_API_KEY:"[Transak SDK] => Please enter your API Key",NOT_INITIALIZED_PROPERLY:"[Transak SDK] => Transak SDK is not initialized properly"};n.default=r},{}],11:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={TRANSAK_WIDGET_INITIALISED:"TRANSAK_WIDGET_INITIALISED",TRANSAK_WIDGET_OPEN:"TRANSAK_WIDGET_OPEN",TRANSAK_WIDGET_CLOSE_REQUEST:"TRANSAK_WIDGET_CLOSE_REQUEST",TRANSAK_WIDGET_CLOSE:"TRANSAK_WIDGET_CLOSE",TRANSAK_ORDER_CREATED:"TRANSAK_ORDER_CREATED",TRANSAK_ORDER_CANCELLED:"TRANSAK_ORDER_CANCELLED",TRANSAK_ORDER_FAILED:"TRANSAK_ORDER_FAILED",TRANSAK_ORDER_SUCCESSFUL:"TRANSAK_ORDER_SUCCESSFUL"};n.default=r},{}],12:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={ENVIRONMENT:{STAGING:{FRONTEND:"https://staging-global.transak.com",BACKEND:"https://staging-api.transak.com/api/v1",NAME:"STAGING"},LOCAL_DEVELOPMENT:{FRONTEND:"http://localhost:3000",BACKEND:"http://localhost:8292/api/v2",NAME:"LOCAL_DEVELOPMENT"},DEVELOPMENT:{FRONTEND:"https://development-global.transak.com",BACKEND:"https://development-api.transak.com/api/v2",NAME:"DEVELOPMENT"},PRODUCTION:{FRONTEND:"https://global.transak.com",BACKEND:"https://api.transak.com/api/v2",NAME:"PRODUCTION"}},STATUS:{INIT:"init",TRANSAK_INITIALISED:"transak_initialised"}};n.default=r},{}],13:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"EVENTS",{enumerable:!0,get:function(){return a.default}}),Object.defineProperty(n,"config",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(n,"errorsLang",{enumerable:!0,get:function(){return o.default}});var r=i(e("./globalConfig")),o=i(e("./errors")),a=i(e("./events"));function i(e){return e&&e.__esModule?e:{default:e}}},{"./errors":10,"./events":11,"./globalConfig":12}],14:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=c(e("events")),o=e("./constants"),a=(e("./utils/generalUtil"),e("./assets/svg")),i=e("./assets/css"),s=c(e("query-string")),l=e("../package.json");function c(e){return e&&e.__esModule?e:{default:e}}const u=new r.default.EventEmitter;function d(e){this.sdkVersion=l.version,this.partnerData=e,this.isInitialised=!1,this.EVENTS=o.EVENTS,this.ALL_EVENTS="*",this.ERROR="TRANSAK_ERROR"}async function f(e){let t={},n="development",r="",a="100%",i="100%";if(e){if(!e.apiKey)throw o.errorsLang.ENTER_API_KEY;e.environment&&o.config.ENVIRONMENT[e.environment]&&(n=o.config.ENVIRONMENT[e.environment].NAME);try{n=n.toUpperCase(),t.apiKey=e.apiKey,e.sdkVersion&&(t.sdkVersion=e.sdkVersion),e.cryptoCurrencyCode&&(t.cryptoCurrencyCode=e.cryptoCurrencyCode),e.defaultCryptoCurrency&&(t.defaultCryptoCurrency=e.defaultCryptoCurrency),e.walletAddress&&(t.walletAddress=e.walletAddress),e.themeColor&&(t.themeColor=e.themeColor.replace("#","")),e.walletAddress&&(t.walletAddress=e.walletAddress),e.fiatAmount&&(t.fiatAmount=e.fiatAmount),e.defaultFiatAmount&&(t.defaultFiatAmount=e.defaultFiatAmount),e.defaultCryptoAmount&&(t.defaultCryptoAmount=e.defaultCryptoAmount),e.walletAddressesData&&(e.walletAddressesData.networks||e.walletAddressesData.coins)&&(t.walletAddressesData={},e.walletAddressesData.networks&&(t.walletAddressesData.networks=e.walletAddressesData.networks),e.walletAddressesData.coins&&(t.walletAddressesData.coins=e.walletAddressesData.coins),t.walletAddressesData=JSON.stringify(t.walletAddressesData)),e.fiatCurrency&&(t.fiatCurrency=e.fiatCurrency),e.countryCode&&(t.countryCode=e.countryCode),e.paymentMethod&&(t.paymentMethod=e.paymentMethod),e.defaultPaymentMethod&&(t.defaultPaymentMethod=e.defaultPaymentMethod),e.isAutoFillUserData&&(t.isAutoFillUserData=e.isAutoFillUserData),e.isFeeCalculationHidden&&(t.isFeeCalculationHidden=e.isFeeCalculationHidden),e.disablePaymentMethods&&(t.disablePaymentMethods=e.disablePaymentMethods),e.email&&(t.email=e.email),e.userData&&(t.userData=JSON.stringify(e.userData)),e.partnerOrderId&&(t.partnerOrderId=e.partnerOrderId),e.partnerCustomerId&&(t.partnerCustomerId=e.partnerCustomerId),e.exchangeScreenTitle&&(t.exchangeScreenTitle=e.exchangeScreenTitle),e.hideMenu&&(t.hideMenu=e.hideMenu),e.accessToken&&(t.accessToken=e.accessToken),e.hideExchangeScreen&&(t.hideExchangeScreen=e.hideExchangeScreen),e.isDisableCrypto&&(t.isDisableCrypto=e.isDisableCrypto),e.redirectURL&&(t.redirectURL=e.redirectURL),e.hostURL&&(t.hostURL=e.hostURL?e.hostURL:window.location.origin),e.disableWalletAddressForm&&(t.disableWalletAddressForm=e.disableWalletAddressForm),e.cryptoCurrencyList&&(t.cryptoCurrencyList=e.cryptoCurrencyList.split(",")),e.networks&&(t.networks=e.networks.split(",")),e.defaultNetwork&&(t.defaultNetwork=e.defaultNetwork),e.network&&(t.network=e.network),r=s.default.stringify(t,{arrayFormat:"comma"})}catch(l){throw l}e.widgetWidth&&(a=e.widgetWidth),e.widgetHeight&&(i=e.widgetHeight)}return{width:a,height:i,partnerData:t,url:`${o.config.ENVIRONMENT[n].FRONTEND}?${r}`}}async function p(e,t,n){let r=await document.createElement("style");r.innerHTML=(0,i.getCSS)(e,n,t);let o=document.getElementById("transakFiatOnOffRamp");o&&await o.appendChild(r)}function h(e){let t;if(e.origin===o.config.ENVIRONMENT.LOCAL_DEVELOPMENT.FRONTEND?t=o.config.ENVIRONMENT.LOCAL_DEVELOPMENT.NAME:e.origin===o.config.ENVIRONMENT.PRODUCTION.FRONTEND?t=o.config.ENVIRONMENT.PRODUCTION.NAME:e.origin===o.config.ENVIRONMENT.STAGING.FRONTEND?t=o.config.ENVIRONMENT.STAGING.NAME:e.origin===o.config.ENVIRONMENT.DEVELOPMENT.FRONTEND&&(t=o.config.ENVIRONMENT.DEVELOPMENT.NAME),t&&e&&e.data&&e.data.event_id)switch(e.data.event_id){case o.EVENTS.TRANSAK_WIDGET_CLOSE:{u.emit(o.EVENTS.TRANSAK_WIDGET_CLOSE,{status:!0,eventName:o.EVENTS.TRANSAK_WIDGET_CLOSE}),document.documentElement.style.overflow="scroll",document.body.scroll="yes";let e=document.getElementById("transakFiatOnOffRamp");e&&e.style&&(e.style.display="none",e.innerHTML="",e.remove());break}case o.EVENTS.TRANSAK_ORDER_CREATED:u.emit(o.EVENTS.TRANSAK_ORDER_CREATED,{status:e.data.data,eventName:o.EVENTS.TRANSAK_ORDER_CREATED});break;case o.EVENTS.TRANSAK_ORDER_CANCELLED:u.emit(o.EVENTS.TRANSAK_ORDER_CANCELLED,{status:e.data.data,eventName:o.EVENTS.TRANSAK_ORDER_CANCELLED});break;case o.EVENTS.TRANSAK_ORDER_FAILED:u.emit(o.EVENTS.TRANSAK_ORDER_FAILED,{status:e.data.data,eventName:o.EVENTS.TRANSAK_ORDER_FAILED});break;case o.EVENTS.TRANSAK_ORDER_SUCCESSFUL:u.emit(o.EVENTS.TRANSAK_ORDER_SUCCESSFUL,{status:e.data.data,eventName:o.EVENTS.TRANSAK_ORDER_SUCCESSFUL});break;case o.EVENTS.TRANSAK_WIDGET_OPEN:u.emit(o.EVENTS.TRANSAK_WIDGET_OPEN,{status:!0,eventName:o.EVENTS.TRANSAK_WIDGET_OPEN})}}d.prototype.on=function(e,t){if(e===this.ALL_EVENTS)for(let n in o.EVENTS)u.on(o.EVENTS[n],t);o.EVENTS[e]&&u.on(e,t),e===this.ERROR&&u.on(this.ERROR,t)},d.prototype.init=function(){this.modal(this)},d.prototype.close=async function(){let e=document.getElementById("transakFiatOnOffRamp");e&&e.style&&(e.style.display="none",e.innerHTML="",await e.remove())},d.prototype.closeRequest=function(){let e=document.getElementById("transakOnOffRampWidget");e&&e.contentWindow.postMessage({event_id:o.EVENTS.TRANSAK_WIDGET_CLOSE_REQUEST,data:!0},"*")},d.prototype.modal=async function(){try{if(this.partnerData){let{url:e,width:t,height:n,partnerData:r}=await f({...this.partnerData,sdkVersion:this.sdkVersion}),i=document.createElement("div");i.id="transakFiatOnOffRamp",i.innerHTML=`<div class="transak_modal-overlay" id="transak_modal-overlay"></div><div class="transak_modal" id="transak_modal"><div class="transak_modal-content"><span class="transak_close">${a.closeSVGIcon}</span><div class="transakContainer"><iframe id="transakOnOffRampWidget" allow="camera;fullscreen;accelerometer;gyroscope;magnetometer" allowFullScreen src="${e}" style="width: ${t}; height: ${n}"></iframe></div></div></div>`;let s=document.getElementsByTagName("body");s||(s=document.getElementsByTagName("html")),s||(s=document.getElementsByTagName("div")),await s[0].appendChild(i),await p(this.partnerData.themeColor,t,n);let l=document.getElementById("transakFiatOnOffRamp"),c=document.getElementsByClassName("transak_close")[0];document.documentElement.style.overflow="hidden",document.body.scroll="no",l&&l.style&&(l.style.display="block"),this.isInitialised=!0,u.emit(o.EVENTS.TRANSAK_WIDGET_INITIALISED,{status:!0,eventName:o.EVENTS.TRANSAK_WIDGET_INITIALISED}),c.onclick=()=>this.closeRequest(),window.onclick=e=>{e.target===document.getElementById("transak_modal-overlay")&&this.closeRequest()},window.addEventListener?window.addEventListener("message",h):window.attachEvent("onmessage",h)}}catch(e){throw e}};var m=d;n.default=m},{"../package.json":7,"./assets/css":8,"./assets/svg":9,"./constants":13,"./utils/generalUtil":15,events:1,"query-string":4}],15:[function(e,t,n){"use strict";function r(e,t){if("object"==typeof e){let n=[];for(let r in e)n.push(r+"="+(t?encodeURIComponent(e[r]):e[r]));return n.join("&")}console.warn("error occur")}Object.defineProperty(n,"__esModule",{value:!0}),n.UrlEncode=r,n.default=void 0;var o={UrlEncode:r};n.default=o},{}]},{},[14])(14)},XZ7F:function(e,t,n){"use strict";var r=n("q1tI");t.a=function(e){var t=Object(r.useState)(Boolean(e)),n=t[0],o=t[1],a=Object(r.useCallback)((function(){return o(!1)}),[]);return{isOpen:n,onOpen:Object(r.useCallback)((function(){return o(!0)}),[]),onClose:a,onToggle:Object(r.useCallback)((function(){return o((function(e){return!e}))}),[])}}},zIq6:function(e,t,n){"use strict";n.d(t,"a",(function(){return h}));var r=n("ODXe"),o=n("q1tI"),a=n.n(o),i=n("IP4Q"),s=n("eJLp"),l=n("yI6m"),c=n("OQ2h"),u=n("Z6YE"),d=n("zmG3"),f=n("iBPG"),p=a.a.createElement;function h(e){var t=e.hash,n=e.onComplete,a=Object(u.b)(),h=a.library,m=a.chainId,E=Object(d.i)(),y=Object(r.a)(E,2)[1].removeTransaction,g=Object(o.useState)(),v=g[0],N=g[1];return Object(o.useEffect)((function(){if(h){var e=!0;return h.waitForTransaction(t).then((function(t){e&&(n&&n(),N(1===t.status))})),function(){e=!1}}}),[h,t]),p(i.a,{spacing:0},p(s.a,{as:"a",variantColor:"boolean"===typeof v?v?"green":"red":"blue",leftIcon:"boolean"===typeof v?v?"check-circle":"warning":function(){return p(l.a,{size:"sm",mr:"0.5rem",ml:"-0.25rem"})},rightIcon:"external-link",style:{borderTopRightRadius:0,borderBottomRightRadius:0},href:Object(f.f)(f.b.Transaction,[m,t]),target:"_blank",rel:"noopener noreferrer"},Object(f.l)(t,2)),p(c.a,{icon:"close",variantColor:"boolean"===typeof v?v?"green":"red":"blue","aria-label":"Close",style:{borderTopLeftRadius:0,borderBottomLeftRadius:0},borderLeft:"1px solid white",onClick:function(){y(m,t)}}))}}}]);