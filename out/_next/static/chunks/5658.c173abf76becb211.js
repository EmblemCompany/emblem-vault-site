"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5658],{4942:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(83997);function i(e,t,n){return(t=(0,r.Z)(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},75068:function(e,t,n){function r(e,t){return(r=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function i(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,r(e,t)}n.d(t,{Z:function(){return i}})},63366:function(e,t,n){n.d(t,{Z:function(){return r}});function r(e,t){if(null==e)return{};var n,r,i={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}},83997:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(71002);function i(e){var t=function(e,t){if("object"!==(0,r.Z)(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,t||"default");if("object"!==(0,r.Z)(i))return i;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===(0,r.Z)(t)?t:String(t)}},71002:function(e,t,n){n.d(t,{Z:function(){return r}});function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}},8445:function(e,t,n){n.d(t,{O:function(){return f}});var r=n(57265),i=n(26245),l=n(52366),a=n(35155),o=n(81103),u=n(25432),s={border:"0",clip:"rect(0, 0, 0, 0)",height:"1px",width:"1px",margin:"-1px",padding:"0",overflow:"hidden",whiteSpace:"nowrap",position:"absolute"},c=n(78879),d=n(67294);function f(e={}){let t=(0,r.K)(e),{isDisabled:n,isReadOnly:f,isRequired:v,isInvalid:p,id:m,onBlur:b,onFocus:y,"aria-describedby":k}=t,{defaultChecked:w,isChecked:g,isFocusable:x,onChange:S,isIndeterminate:E,name:P,value:_,tabIndex:C,"aria-label":N,"aria-labelledby":B,"aria-invalid":M,...j}=e,L=function(e,t=[]){let n=Object.assign({},e);for(let e of t)e in n&&delete n[e];return n}(j,["isDisabled","isReadOnly","isRequired","isInvalid","id","onBlur","onFocus","aria-describedby"]),T=(0,a.W)(S),F=(0,a.W)(b),R=(0,a.W)(y),[D,$]=(0,d.useState)(!1),[I,O]=(0,d.useState)(!1),[q,U]=(0,d.useState)(!1),[z,A]=(0,d.useState)(!1);(0,d.useEffect)(()=>(0,c.BT)($),[]);let W=(0,d.useRef)(null),[G,H]=(0,d.useState)(!0),[K,Z]=(0,d.useState)(!!w),Q=void 0!==g,V=Q?g:K,Y=(0,d.useCallback)(e=>{if(f||n){e.preventDefault();return}Q||(V?Z(e.target.checked):Z(!!E||e.target.checked)),null==T||T(e)},[f,n,V,Q,E,T]);(0,i.G)(()=>{W.current&&(W.current.indeterminate=!!E)},[E]),(0,l.r)(()=>{n&&O(!1)},[n,O]),(0,i.G)(()=>{let e=W.current;if(!(null==e?void 0:e.form))return;let t=()=>{Z(!!w)};return e.form.addEventListener("reset",t),()=>{var n;return null==(n=e.form)?void 0:n.removeEventListener("reset",t)}},[]);let X=n&&!x,J=(0,d.useCallback)(e=>{" "===e.key&&A(!0)},[A]),ee=(0,d.useCallback)(e=>{" "===e.key&&A(!1)},[A]);(0,i.G)(()=>{if(!W.current)return;let e=W.current.checked!==V;e&&Z(W.current.checked)},[W.current]);let et=(0,d.useCallback)((e={},t=null)=>({...e,ref:t,"data-active":(0,u.PB)(z),"data-hover":(0,u.PB)(q),"data-checked":(0,u.PB)(V),"data-focus":(0,u.PB)(I),"data-focus-visible":(0,u.PB)(I&&D),"data-indeterminate":(0,u.PB)(E),"data-disabled":(0,u.PB)(n),"data-invalid":(0,u.PB)(p),"data-readonly":(0,u.PB)(f),"aria-hidden":!0,onMouseDown:(0,u.v0)(e.onMouseDown,e=>{I&&e.preventDefault(),A(!0)}),onMouseUp:(0,u.v0)(e.onMouseUp,()=>A(!1)),onMouseEnter:(0,u.v0)(e.onMouseEnter,()=>U(!0)),onMouseLeave:(0,u.v0)(e.onMouseLeave,()=>U(!1))}),[z,V,n,I,D,q,E,p,f]),en=(0,d.useCallback)((e={},t=null)=>({...e,ref:t,"data-active":(0,u.PB)(z),"data-hover":(0,u.PB)(q),"data-checked":(0,u.PB)(V),"data-focus":(0,u.PB)(I),"data-focus-visible":(0,u.PB)(I&&D),"data-indeterminate":(0,u.PB)(E),"data-disabled":(0,u.PB)(n),"data-invalid":(0,u.PB)(p),"data-readonly":(0,u.PB)(f)}),[z,V,n,I,D,q,E,p,f]),er=(0,d.useCallback)((e={},t=null)=>({...L,...e,ref:(0,o.lq)(t,e=>{e&&H("LABEL"===e.tagName)}),onClick:(0,u.v0)(e.onClick,()=>{var e;G||(null==(e=W.current)||e.click(),requestAnimationFrame(()=>{var e;null==(e=W.current)||e.focus({preventScroll:!0})}))}),"data-disabled":(0,u.PB)(n),"data-checked":(0,u.PB)(V),"data-invalid":(0,u.PB)(p)}),[L,n,V,p,G]),ei=(0,d.useCallback)((e={},t=null)=>({...e,ref:(0,o.lq)(W,t),type:"checkbox",name:P,value:_,id:m,tabIndex:C,onChange:(0,u.v0)(e.onChange,Y),onBlur:(0,u.v0)(e.onBlur,F,()=>O(!1)),onFocus:(0,u.v0)(e.onFocus,R,()=>O(!0)),onKeyDown:(0,u.v0)(e.onKeyDown,J),onKeyUp:(0,u.v0)(e.onKeyUp,ee),required:v,checked:V,disabled:X,readOnly:f,"aria-label":N,"aria-labelledby":B,"aria-invalid":M?!!M:p,"aria-describedby":k,"aria-disabled":n,style:s}),[P,_,m,Y,F,R,J,ee,v,V,X,f,N,B,M,p,k,n,C]),el=(0,d.useCallback)((e={},t=null)=>({...e,ref:t,onMouseDown:(0,u.v0)(e.onMouseDown,h),"data-disabled":(0,u.PB)(n),"data-checked":(0,u.PB)(V),"data-invalid":(0,u.PB)(p)}),[V,n,p]);return{state:{isInvalid:p,isFocused:I,isChecked:V,isActive:z,isHovered:q,isIndeterminate:E,isDisabled:n,isReadOnly:f,isRequired:v},getRootProps:er,getCheckboxProps:et,getIndicatorProps:en,getInputProps:ei,getLabelProps:el,htmlProps:L}}function h(e){e.preventDefault(),e.stopPropagation()}},18020:function(e,t,n){n.d(t,{NI:function(){return m},NJ:function(){return p},Q6:function(){return b},e:function(){return h}});var r=n(55227),i=n(81103),l=n(16554),a=n(27440),o=n(33179),u=n(65548),s=n(25432),c=n(67294),d=n(85893),[f,h]=(0,r.k)({name:"FormControlStylesContext",errorMessage:"useFormControlStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<FormControl />\" "}),[v,p]=(0,r.k)({strict:!1,name:"FormControlContext"}),m=(0,l.G)(function(e,t){let n=(0,a.jC)("Form",e),r=(0,o.Lr)(e),{getRootProps:l,htmlProps:h,...p}=function(e){let{id:t,isRequired:n,isInvalid:r,isDisabled:l,isReadOnly:a,...o}=e,u=(0,c.useId)(),d=t||`field-${u}`,f=`${d}-label`,h=`${d}-feedback`,v=`${d}-helptext`,[p,m]=(0,c.useState)(!1),[b,y]=(0,c.useState)(!1),[k,w]=(0,c.useState)(!1),g=(0,c.useCallback)((e={},t=null)=>({id:v,...e,ref:(0,i.lq)(t,e=>{e&&y(!0)})}),[v]),x=(0,c.useCallback)((e={},t=null)=>({...e,ref:t,"data-focus":(0,s.PB)(k),"data-disabled":(0,s.PB)(l),"data-invalid":(0,s.PB)(r),"data-readonly":(0,s.PB)(a),id:void 0!==e.id?e.id:f,htmlFor:void 0!==e.htmlFor?e.htmlFor:d}),[d,l,k,r,a,f]),S=(0,c.useCallback)((e={},t=null)=>({id:h,...e,ref:(0,i.lq)(t,e=>{e&&m(!0)}),"aria-live":"polite"}),[h]),E=(0,c.useCallback)((e={},t=null)=>({...e,...o,ref:t,role:"group"}),[o]),P=(0,c.useCallback)((e={},t=null)=>({...e,ref:t,role:"presentation","aria-hidden":!0,children:e.children||"*"}),[]);return{isRequired:!!n,isInvalid:!!r,isReadOnly:!!a,isDisabled:!!l,isFocused:!!k,onFocus:()=>w(!0),onBlur:()=>w(!1),hasFeedbackText:p,setHasFeedbackText:m,hasHelpText:b,setHasHelpText:y,id:d,labelId:f,feedbackId:h,helpTextId:v,htmlProps:o,getHelpTextProps:g,getErrorMessageProps:S,getRootProps:E,getLabelProps:x,getRequiredIndicatorProps:P}}(r),m=(0,s.cx)("chakra-form-control",e.className);return(0,d.jsx)(v,{value:p,children:(0,d.jsx)(f,{value:n,children:(0,d.jsx)(u.m.div,{...l({},t),className:m,__css:n.container})})})});m.displayName="FormControl";var b=(0,l.G)(function(e,t){let n=p(),r=h(),i=(0,s.cx)("chakra-form__helper-text",e.className);return(0,d.jsx)(u.m.div,{...null==n?void 0:n.getHelpTextProps(e,t),__css:r.helperText,className:i})});b.displayName="FormHelperText"},57265:function(e,t,n){n.d(t,{K:function(){return a},Y:function(){return l}});var r=n(18020),i=n(25432);function l(e){let{isDisabled:t,isInvalid:n,isReadOnly:r,isRequired:l,...o}=a(e);return{...o,disabled:t,readOnly:r,required:l,"aria-invalid":(0,i.Qm)(n),"aria-required":(0,i.Qm)(l),"aria-readonly":(0,i.Qm)(r)}}function a(e){var t,n,l;let a=(0,r.NJ)(),{id:o,disabled:u,readOnly:s,required:c,isRequired:d,isInvalid:f,isReadOnly:h,isDisabled:v,onFocus:p,onBlur:m,...b}=e,y=e["aria-describedby"]?[e["aria-describedby"]]:[];return(null==a?void 0:a.hasFeedbackText)&&(null==a?void 0:a.isInvalid)&&y.push(a.feedbackId),(null==a?void 0:a.hasHelpText)&&y.push(a.helpTextId),{...b,"aria-describedby":y.join(" ")||void 0,id:null!=o?o:null==a?void 0:a.id,isDisabled:null!=(t=null!=u?u:v)?t:null==a?void 0:a.isDisabled,isReadOnly:null!=(n=null!=s?s:h)?n:null==a?void 0:a.isReadOnly,isRequired:null!=(l=null!=c?c:d)?l:null==a?void 0:a.isRequired,isInvalid:null!=f?f:null==a?void 0:a.isInvalid,onFocus:(0,i.v0)(null==a?void 0:a.onFocus,p),onBlur:(0,i.v0)(null==a?void 0:a.onBlur,m)}}},32883:function(e,t,n){n.d(t,{r:function(){return s}});var r=n(16554),i=n(27440),l=n(33179),a=n(65548),o=n(25432),u=n(85893),s=(0,r.G)(function(e,t){let n=(0,i.mq)("Link",e),{className:r,isExternal:s,...c}=(0,l.Lr)(e);return(0,u.jsx)(a.m.a,{target:s?"_blank":void 0,rel:s?"noopener":void 0,ref:t,className:(0,o.cx)("chakra-link",r),...c,__css:n})});s.displayName="Link"},97878:function(e,t,n){n.d(t,{m:function(){return u}});var r=n(22602),i=n(25432),l=n(16554),a=n(65548),o=n(85893),u=(0,l.G)((e,t)=>{let{className:n,...l}=e,u=(0,i.cx)("chakra-modal__footer",n),s=(0,r.I_)(),c={display:"flex",alignItems:"center",justifyContent:"flex-end",...s.footer};return(0,o.jsx)(a.m.footer,{ref:t,...l,__css:c,className:u})});u.displayName="ModalFooter"},35155:function(e,t,n){n.d(t,{W:function(){return i}});var r=n(67294);function i(e,t=[]){let n=(0,r.useRef)(e);return(0,r.useEffect)(()=>{n.current=e}),(0,r.useCallback)((...e)=>{var t;return null==(t=n.current)?void 0:t.call(n,...e)},t)}},61942:function(e,t,n){n.d(t,{T:function(){return l}});var r=n(67294),i=n(35155);function l(e){let{value:t,defaultValue:n,onChange:l,shouldUpdate:a=(e,t)=>e!==t}=e,o=(0,i.W)(l),u=(0,i.W)(a),[s,c]=(0,r.useState)(n),d=void 0!==t,f=d?t:s,h=(0,i.W)(e=>{let t="function"==typeof e?e(f):e;u(f,t)&&(d||c(t),o(t))},[d,o,f,u]);return[f,h]}},52366:function(e,t,n){n.d(t,{r:function(){return i}});var r=n(67294);function i(e,t){let n=(0,r.useRef)(!1),i=(0,r.useRef)(!1);(0,r.useEffect)(()=>{let t=n.current,r=t&&i.current;if(r)return e();i.current=!0},t),(0,r.useEffect)(()=>(n.current=!0,()=>{n.current=!1}),[])}},4046:function(e,t,n){n.d(t,{iR:function(){return er},Ms:function(){return ea},gs:function(){return ei},Uj:function(){return el}});var r=e=>e?"":void 0,i=e=>!!e||void 0,l=(...e)=>e.filter(Boolean).join(" ");function a(...e){return function(t){e.some(e=>(null==e||e(t),null==t?void 0:t.defaultPrevented))}}function o(e){let{orientation:t,vertical:n,horizontal:r}=e;return"vertical"===t?n:r}var u={width:0,height:0},s=e=>e||u;function c(e){let t=!!e.touches;return t}function d(e,t="page"){return c(e)?function(e,t="page"){let n=e.touches[0]||e.changedTouches[0];return{x:n[`${t}X`],y:n[`${t}Y`]}}(e,t):function(e,t="page"){return{x:e[`${t}X`],y:e[`${t}Y`]}}(e,t)}function f(e,t,n,r){var i;return i=function(e,t=!1){function n(t){e(t,{point:d(t)})}let r=t?e=>{let t=function(e){var t;let n=null!=(t=e.view)?t:window;return void 0!==n.PointerEvent&&e instanceof n.PointerEvent?!("mouse"!==e.pointerType):e instanceof n.MouseEvent}(e);(!t||t&&0===e.button)&&n(e)}:n;return r}(n,"pointerdown"===t),e.addEventListener(t,i,r),()=>{e.removeEventListener(t,i,r)}}let h=1/60*1e3,v="undefined"!=typeof performance?()=>performance.now():()=>Date.now(),p="undefined"!=typeof window?e=>window.requestAnimationFrame(e):e=>setTimeout(()=>e(v()),h),m=!0,b=!1,y=!1,k={delta:0,timestamp:0},w=["read","update","preRender","render","postRender"],g=w.reduce((e,t)=>(e[t]=function(e){let t=[],n=[],r=0,i=!1,l=!1,a=new WeakSet,o={schedule:(e,l=!1,o=!1)=>{let u=o&&i,s=u?t:n;return l&&a.add(e),-1===s.indexOf(e)&&(s.push(e),u&&i&&(r=t.length)),e},cancel:e=>{let t=n.indexOf(e);-1!==t&&n.splice(t,1),a.delete(e)},process:u=>{if(i){l=!0;return}if(i=!0,[t,n]=[n,t],n.length=0,r=t.length)for(let n=0;n<r;n++){let r=t[n];r(u),a.has(r)&&(o.schedule(r),e())}i=!1,l&&(l=!1,o.process(u))}};return o}(()=>b=!0),e),{}),x=w.reduce((e,t)=>{let n=g[t];return e[t]=(e,t=!1,r=!1)=>(b||_(),n.schedule(e,t,r)),e},{}),S=w.reduce((e,t)=>(e[t]=g[t].cancel,e),{});w.reduce((e,t)=>(e[t]=()=>g[t].process(k),e),{});let E=e=>g[e].process(k),P=e=>{b=!1,k.delta=m?h:Math.max(Math.min(e-k.timestamp,40),1),k.timestamp=e,y=!0,w.forEach(E),y=!1,b&&(m=!1,p(P))},_=()=>{b=!0,m=!0,y||p(P)},C=()=>k;var N=Object.defineProperty,B=(e,t,n)=>t in e?N(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,M=(e,t,n)=>(B(e,"symbol"!=typeof t?t+"":t,n),n),j=class{constructor(e,t,n){var r;if(M(this,"history",[]),M(this,"startEvent",null),M(this,"lastEvent",null),M(this,"lastEventInfo",null),M(this,"handlers",{}),M(this,"removeListeners",()=>{}),M(this,"threshold",3),M(this,"win"),M(this,"updatePoint",()=>{if(!(this.lastEvent&&this.lastEventInfo))return;let e=T(this.lastEventInfo,this.history),t=null!==this.startEvent,n=function(e,t){if("number"==typeof e&&"number"==typeof t)return R(e,t);if(D(e)&&D(t)){let n=R(e.x,t.x),r=R(e.y,t.y);return Math.sqrt(n**2+r**2)}return 0}(e.offset,{x:0,y:0})>=this.threshold;if(!t&&!n)return;let{timestamp:r}=C();this.history.push({...e.point,timestamp:r});let{onStart:i,onMove:l}=this.handlers;t||(null==i||i(this.lastEvent,e),this.startEvent=this.lastEvent),null==l||l(this.lastEvent,e)}),M(this,"onPointerMove",(e,t)=>{this.lastEvent=e,this.lastEventInfo=t,x.update(this.updatePoint,!0)}),M(this,"onPointerUp",(e,t)=>{let n=T(t,this.history),{onEnd:r,onSessionEnd:i}=this.handlers;null==i||i(e,n),this.end(),r&&this.startEvent&&(null==r||r(e,n))}),this.win=null!=(r=e.view)?r:window,c(e)&&e.touches.length>1)return;this.handlers=t,n&&(this.threshold=n),e.stopPropagation(),e.preventDefault();let i={point:d(e)},{timestamp:l}=C();this.history=[{...i.point,timestamp:l}];let{onSessionStart:a}=t;null==a||a(e,T(i,this.history)),this.removeListeners=function(...e){return t=>e.reduce((e,t)=>t(e),t)}(f(this.win,"pointermove",this.onPointerMove),f(this.win,"pointerup",this.onPointerUp),f(this.win,"pointercancel",this.onPointerUp))}updateHandlers(e){this.handlers=e}end(){var e;null==(e=this.removeListeners)||e.call(this),S.update(this.updatePoint)}};function L(e,t){return{x:e.x-t.x,y:e.y-t.y}}function T(e,t){return{point:e.point,delta:L(e.point,t[t.length-1]),offset:L(e.point,t[0]),velocity:function(e,t){if(e.length<2)return{x:0,y:0};let n=e.length-1,r=null,i=e[e.length-1];for(;n>=0&&(r=e[n],!(i.timestamp-r.timestamp>F(.1)));)n--;if(!r)return{x:0,y:0};let l=(i.timestamp-r.timestamp)/1e3;if(0===l)return{x:0,y:0};let a={x:(i.x-r.x)/l,y:(i.y-r.y)/l};return a.x===1/0&&(a.x=0),a.y===1/0&&(a.y=0),a}(t,0)}}var F=e=>1e3*e;function R(e,t){return Math.abs(e-t)}function D(e){return"x"in e&&"y"in e}var $=n(67294);function I(e){let t=(0,$.useRef)(null);return t.current=e,t}var O=n(35155),q=n(52366),U=n(61942),z=(null==globalThis?void 0:globalThis.document)?$.useLayoutEffect:$.useEffect,A=n(81103);function W(e,t,n){let r=Math.round((e-t)/n)*n+t,i=function(e){if(!Number.isFinite(e))return 0;let t=1,n=0;for(;Math.round(e*t)/t!==e;)t*=10,n+=1;return n}(n);return function(e,t){let n=function(e){let t=parseFloat(e);return"number"!=typeof t||Number.isNaN(t)?0:t}(e),r=10**(null!=t?t:10);return n=Math.round(n*r)/r,t?n.toFixed(t):n.toString()}(r,i)}function G(e,t,n){return null==e?e:(n<t&&console.warn("clamp: max cannot be less than min"),Math.min(Math.max(e,t),n))}var H=n(55227),K=n(16554),Z=n(27440),Q=n(33179),V=n(48940),Y=n(65548),X=n(85893),[J,ee]=(0,H.k)({name:"SliderContext",hookName:"useSliderContext",providerName:"<Slider />"}),[et,en]=(0,H.k)({name:"SliderStylesContext",hookName:"useSliderStyles",providerName:"<Slider />"}),er=(0,K.G)((e,t)=>{var n;let c={...e,orientation:null!=(n=null==e?void 0:e.orientation)?n:"horizontal"},d=(0,Z.jC)("Slider",c),h=(0,Q.Lr)(c),{direction:v}=(0,V.F)();h.direction=v;let{getInputProps:p,getRootProps:m,...b}=function(e){var t;let{min:n=0,max:l=100,onChange:c,value:d,defaultValue:h,isReversed:v,direction:p="ltr",orientation:m="horizontal",id:b,isDisabled:y,isReadOnly:k,onChangeStart:w,onChangeEnd:g,step:x=1,getAriaValueText:S,"aria-valuetext":E,"aria-label":P,"aria-labelledby":_,name:C,focusThumbOnChange:N=!0,...B}=e,M=(0,O.W)(w),L=(0,O.W)(g),T=(0,O.W)(S),F=function(e){let{isReversed:t,direction:n,orientation:r}=e;return"ltr"===n||"vertical"===r?t:!t}({isReversed:v,direction:p,orientation:m}),[R,D]=(0,U.T)({value:d,defaultValue:null!=h?h:l<n?n:n+(l-n)/2,onChange:c}),[H,K]=(0,$.useState)(!1),[Z,Q]=(0,$.useState)(!1),V=!(y||k),Y=(l-n)/10,X=x||(l-n)/100,J=G(R,n,l),ee=l-J+n,et=F?ee:J,en=(et-n)*100/(l-n),er="vertical"===m,ei=I({min:n,max:l,step:x,isDisabled:y,value:J,isInteractive:V,isReversed:F,isVertical:er,eventSource:null,focusThumbOnChange:N,orientation:m}),el=(0,$.useRef)(null),ea=(0,$.useRef)(null),eo=(0,$.useRef)(null),eu=(0,$.useId)(),es=null!=b?b:eu,[ec,ed]=[`slider-thumb-${es}`,`slider-track-${es}`],ef=(0,$.useCallback)(e=>{var t,n,r,i;if(!el.current)return;let l=ei.current;l.eventSource="pointer";let a=el.current.getBoundingClientRect(),{clientX:o,clientY:u}=null!=(n=null==(t=e.touches)?void 0:t[0])?n:e,s=er?a.bottom-u:o-a.left,c=er?a.height:a.width,d=s/c;F&&(d=1-d);let f=(r=d,i=l.min,(l.max-i)*r+i);return l.step&&(f=parseFloat(W(f,l.min,l.step))),f=G(f,l.min,l.max)},[er,F,ei]),eh=(0,$.useCallback)(e=>{let t=ei.current;t.isInteractive&&D(e=G(e=parseFloat(W(e,t.min,X)),t.min,t.max))},[X,D,ei]),ev=(0,$.useMemo)(()=>({stepUp(e=X){let t=F?J-e:J+e;eh(t)},stepDown(e=X){let t=F?J+e:J-e;eh(t)},reset(){eh(h||0)},stepTo(e){eh(e)}}),[eh,F,J,X,h]),ep=(0,$.useCallback)(e=>{let t=ei.current,n={ArrowRight:()=>ev.stepUp(),ArrowUp:()=>ev.stepUp(),ArrowLeft:()=>ev.stepDown(),ArrowDown:()=>ev.stepDown(),PageUp:()=>ev.stepUp(Y),PageDown:()=>ev.stepDown(Y),Home:()=>eh(t.min),End:()=>eh(t.max)}[e.key];n&&(e.preventDefault(),e.stopPropagation(),n(e),t.eventSource="keyboard")},[ev,eh,Y,ei]),em=null!=(t=null==T?void 0:T(J))?t:E,eb=function(e){let[t]=function({getNodes:e,observeMutation:t=!0}){let[n,r]=(0,$.useState)([]),[i,l]=(0,$.useState)(0);return z(()=>{let n=e(),i=n.map((e,t)=>(function(e,t){if(!e){t(void 0);return}t({width:e.offsetWidth,height:e.offsetHeight});let n=e.ownerDocument.defaultView??window,r=new n.ResizeObserver(n=>{let r,i;if(!Array.isArray(n)||!n.length)return;let[l]=n;if("borderBoxSize"in l){let e=l.borderBoxSize,t=Array.isArray(e)?e[0]:e;r=t.inlineSize,i=t.blockSize}else r=e.offsetWidth,i=e.offsetHeight;t({width:r,height:i})});return r.observe(e,{box:"border-box"}),()=>r.unobserve(e)})(e,e=>{r(n=>[...n.slice(0,t),e,...n.slice(t+1)])}));if(t){let e=n[0];i.push(function(e,t){var n,r;if(!e||!e.parentElement)return;let i=null!=(r=null==(n=e.ownerDocument)?void 0:n.defaultView)?r:window,l=new i.MutationObserver(()=>{t()});return l.observe(e.parentElement,{childList:!0}),()=>{l.disconnect()}}(e,()=>{l(e=>e+1)}))}return()=>{i.forEach(e=>{null==e||e()})}},[i]),n}({observeMutation:!1,getNodes(){let t="object"==typeof e&&null!==e&&"current"in e?e.current:e;return[t]}});return t}(ea),{getThumbStyle:ey,rootStyle:ek,trackStyle:ew,innerTrackStyle:eg}=(0,$.useMemo)(()=>{let e=ei.current,t=null!=eb?eb:{width:0,height:0};return function(e){let{orientation:t,thumbPercents:n,thumbRects:r,isReversed:i}=e,l="vertical"===t?r.reduce((e,t)=>s(e).height>s(t).height?e:t,u):r.reduce((e,t)=>s(e).width>s(t).width?e:t,u),a={position:"relative",touchAction:"none",WebkitTapHighlightColor:"rgba(0,0,0,0)",userSelect:"none",outline:0,...o({orientation:t,vertical:l?{paddingLeft:l.width/2,paddingRight:l.width/2}:{},horizontal:l?{paddingTop:l.height/2,paddingBottom:l.height/2}:{}})},c={position:"absolute",...o({orientation:t,vertical:{left:"50%",transform:"translateX(-50%)",height:"100%"},horizontal:{top:"50%",transform:"translateY(-50%)",width:"100%"}})},d=1===n.length,f=[0,i?100-n[0]:n[0]],h=d?f:n,v=h[0];!d&&i&&(v=100-v);let p=Math.abs(h[h.length-1]-h[0]),m={...c,...o({orientation:t,vertical:i?{height:`${p}%`,top:`${v}%`}:{height:`${p}%`,bottom:`${v}%`},horizontal:i?{width:`${p}%`,right:`${v}%`}:{width:`${p}%`,left:`${v}%`}})};return{trackStyle:c,innerTrackStyle:m,rootStyle:a,getThumbStyle:e=>{var i;let l=null!=(i=r[e])?i:u;return{position:"absolute",userSelect:"none",WebkitUserSelect:"none",MozUserSelect:"none",msUserSelect:"none",touchAction:"none",...o({orientation:t,vertical:{bottom:`calc(${n[e]}% - ${l.height/2}px)`},horizontal:{left:`calc(${n[e]}% - ${l.width/2}px)`}})}}}}({isReversed:F,orientation:e.orientation,thumbRects:[t],thumbPercents:[en]})},[F,eb,en,ei]),ex=(0,$.useCallback)(()=>{let e=ei.current;e.focusThumbOnChange&&setTimeout(()=>{var e;return null==(e=ea.current)?void 0:e.focus()})},[ei]);function eS(e){let t=ef(e);null!=t&&t!==ei.current.value&&D(t)}(0,q.r)(()=>{let e=ei.current;ex(),"keyboard"===e.eventSource&&(null==L||L(e.value))},[J,L]),function(e,t){let{onPan:n,onPanStart:r,onPanEnd:i,onPanSessionStart:l,onPanSessionEnd:a,threshold:o}=t,u=!!(n||r||i||l||a),s=(0,$.useRef)(null),c=I({onSessionStart:l,onSessionEnd:a,onStart:r,onMove:n,onEnd(e,t){s.current=null,null==i||i(e,t)}});(0,$.useEffect)(()=>{var e;null==(e=s.current)||e.updateHandlers(c.current)}),(0,$.useEffect)(()=>{let t=e.current;if(t&&u)return f(t,"pointerdown",function(e){s.current=new j(e,c.current,o)})},[e,u,c,o]),(0,$.useEffect)(()=>()=>{var e;null==(e=s.current)||e.end(),s.current=null},[])}(eo,{onPanSessionStart(e){let t=ei.current;t.isInteractive&&(K(!0),ex(),eS(e),null==M||M(t.value))},onPanSessionEnd(){let e=ei.current;e.isInteractive&&(K(!1),null==L||L(e.value))},onPan(e){let t=ei.current;t.isInteractive&&eS(e)}});let eE=(0,$.useCallback)((e={},t=null)=>({...e,...B,ref:(0,A.lq)(t,eo),tabIndex:-1,"aria-disabled":i(y),"data-focused":r(Z),style:{...e.style,...ek}}),[B,y,Z,ek]),eP=(0,$.useCallback)((e={},t=null)=>({...e,ref:(0,A.lq)(t,el),id:ed,"data-disabled":r(y),style:{...e.style,...ew}}),[y,ed,ew]),e_=(0,$.useCallback)((e={},t=null)=>({...e,ref:t,style:{...e.style,...eg}}),[eg]),eC=(0,$.useCallback)((e={},t=null)=>({...e,ref:(0,A.lq)(t,ea),role:"slider",tabIndex:V?0:void 0,id:ec,"data-active":r(H),"aria-valuetext":em,"aria-valuemin":n,"aria-valuemax":l,"aria-valuenow":J,"aria-orientation":m,"aria-disabled":i(y),"aria-readonly":i(k),"aria-label":P,"aria-labelledby":P?void 0:_,style:{...e.style,...ey(0)},onKeyDown:a(e.onKeyDown,ep),onFocus:a(e.onFocus,()=>Q(!0)),onBlur:a(e.onBlur,()=>Q(!1))}),[V,ec,H,em,n,l,J,m,y,k,P,_,ey,ep]),eN=(0,$.useCallback)((e,t=null)=>{let i=!(e.value<n||e.value>l),a=J>=e.value,o=(e.value-n)*100/(l-n),u={position:"absolute",pointerEvents:"none",...function(e){let{orientation:t,vertical:n,horizontal:r}=e;return"vertical"===t?n:r}({orientation:m,vertical:{bottom:F?`${100-o}%`:`${o}%`},horizontal:{left:F?`${100-o}%`:`${o}%`}})};return{...e,ref:t,role:"presentation","aria-hidden":!0,"data-disabled":r(y),"data-invalid":r(!i),"data-highlighted":r(a),style:{...e.style,...u}}},[y,F,l,n,m,J]),eB=(0,$.useCallback)((e={},t=null)=>({...e,ref:t,type:"hidden",value:J,name:C}),[C,J]);return{state:{value:J,isFocused:Z,isDragging:H},actions:ev,getRootProps:eE,getTrackProps:eP,getInnerTrackProps:e_,getThumbProps:eC,getMarkerProps:eN,getInputProps:eB}}(h),y=m(),k=p({},t);return(0,X.jsx)(J,{value:b,children:(0,X.jsx)(et,{value:d,children:(0,X.jsxs)(Y.m.div,{...y,className:l("chakra-slider",c.className),__css:d.container,children:[c.children,(0,X.jsx)("input",{...k})]})})})});er.displayName="Slider";var ei=(0,K.G)((e,t)=>{let{getThumbProps:n}=ee(),r=en(),i=n(e,t);return(0,X.jsx)(Y.m.div,{...i,className:l("chakra-slider__thumb",e.className),__css:r.thumb})});ei.displayName="SliderThumb";var el=(0,K.G)((e,t)=>{let{getTrackProps:n}=ee(),r=en(),i=n(e,t);return(0,X.jsx)(Y.m.div,{...i,className:l("chakra-slider__track",e.className),__css:r.track})});el.displayName="SliderTrack";var ea=(0,K.G)((e,t)=>{let{getInnerTrackProps:n}=ee(),r=en(),i=n(e,t);return(0,X.jsx)(Y.m.div,{...i,className:l("chakra-slider__filled-track",e.className),__css:r.filledTrack})});ea.displayName="SliderFilledTrack",(0,K.G)((e,t)=>{let{getMarkerProps:n}=ee(),r=en(),i=n(e,t);return(0,X.jsx)(Y.m.div,{...i,className:l("chakra-slider__marker",e.className),__css:r.mark})}).displayName="SliderMark"},22797:function(e,t,n){n.d(t,{r:function(){return d}});var r=n(8445),i=n(25432),l=n(16554),a=n(27440),o=n(33179),u=n(65548),s=n(67294),c=n(85893),d=(0,l.G)(function(e,t){let n=(0,a.jC)("Switch",e),{spacing:l="0.5rem",children:d,...f}=(0,o.Lr)(e),{getIndicatorProps:h,getInputProps:v,getCheckboxProps:p,getRootProps:m,getLabelProps:b}=(0,r.O)(f),y=(0,s.useMemo)(()=>({display:"inline-block",position:"relative",verticalAlign:"middle",lineHeight:0,...n.container}),[n.container]),k=(0,s.useMemo)(()=>({display:"inline-flex",flexShrink:0,justifyContent:"flex-start",boxSizing:"content-box",cursor:"pointer",...n.track}),[n.track]),w=(0,s.useMemo)(()=>({userSelect:"none",marginStart:l,...n.label}),[l,n.label]);return(0,c.jsxs)(u.m.label,{...m(),className:(0,i.cx)("chakra-switch",e.className),__css:y,children:[(0,c.jsx)("input",{className:"chakra-switch__input",...v({},t)}),(0,c.jsx)(u.m.span,{...p(),className:"chakra-switch__track",__css:k,children:(0,c.jsx)(u.m.span,{__css:n.thumb,className:"chakra-switch__thumb",...h()})}),d&&(0,c.jsx)(u.m.span,{className:"chakra-switch__label",...b(),__css:w,children:d})]})});d.displayName="Switch"},78879:function(e,t,n){n.d(t,{BT:function(){return b}});let r=()=>"undefined"!=typeof document,i=!1,l=null,a=!1,o=!1,u=new Set;function s(e,t){u.forEach(n=>n(e,t))}let c="undefined"!=typeof window&&null!=window.navigator&&/^Mac/.test(window.navigator.platform);function d(e){a=!0,e.metaKey||!c&&e.altKey||e.ctrlKey||"Control"===e.key||"Shift"===e.key||"Meta"===e.key||(l="keyboard",s("keyboard",e))}function f(e){if(l="pointer","mousedown"===e.type||"pointerdown"===e.type){a=!0;let t=e.composedPath?e.composedPath()[0]:e.target,n=!1;try{n=t.matches(":focus-visible")}catch{}n||s("pointer",e)}}function h(e){(0===e.mozInputSource&&e.isTrusted||0===e.detail&&!e.pointerType)&&(a=!0,l="virtual")}function v(e){e.target!==window&&e.target!==document&&(a||o||(l="virtual",s("virtual",e)),a=!1,o=!1)}function p(){a=!1,o=!0}function m(){return"pointer"!==l}function b(e){!function(){if(!r()||i)return;let{focus:e}=HTMLElement.prototype;HTMLElement.prototype.focus=function(...t){a=!0,e.apply(this,t)},document.addEventListener("keydown",d,!0),document.addEventListener("keyup",d,!0),document.addEventListener("click",h,!0),window.addEventListener("focus",v,!0),window.addEventListener("blur",p,!1),"undefined"!=typeof PointerEvent?(document.addEventListener("pointerdown",f,!0),document.addEventListener("pointermove",f,!0),document.addEventListener("pointerup",f,!0)):(document.addEventListener("mousedown",f,!0),document.addEventListener("mousemove",f,!0),document.addEventListener("mouseup",f,!0)),i=!0}(),e(m());let t=()=>e(m());return u.add(t),()=>{u.delete(t)}}}}]);