_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[56],{"3PPc":function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return _}));var n=r("q1tI"),o=r.n(n),a=r("wx14"),c=r("o0o1"),i=r.n(c),u=r("HaE+"),s=r("mf32"),l=r("Yn+B"),d=r("eJLp"),f=r("Weur"),p=r("pboS"),v=r("BMxC"),b=r("sK1y"),O=r("Y1ui"),h=r.n(O),y=r("Ute3"),m=r("nOHt"),E=r("Z6YE"),R=r("N39q"),C=r("GgLZ"),j=r("PLxQ"),g=o.a.createElement;function T(){var e=Object(m.useRouter)().query,t=Object(n.useState)(Number(e.start)||0),r=(t[0],t[1],Object(E.b)()),c=r.account,O=r.chainId,T=Object(n.useState)([]),I=T[0],N=T[1],_=Object(n.useState)({loaded:!1}),A=_[0],w=_[1],x=Object(n.useState)(!1),P=x[0],S=x[1],D=Object(n.useState)(e.address),k=D[0],U=(D[1],Object(n.useState)(e.type||"unclaimed")),V=U[0],M=(U[1],Object(n.useState)(e.experimental)),F=(M[0],M[1],Object(s.c)().colorMode,Object(n.useState)(!1)),L=F[0],W=F[1],Y=Object(n.useState)(!1),q=Y[0],Z=Y[1],G=Object(n.useState)(0),H=G[0],J=G[1],z=function(){var e=Object(u.a)(i.a.mark((function e(){var t,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(R.g+"/nft/balance/"+(k||c)+"?start="+H+"&size=10&live=true",{method:"GET",headers:{"Content-Type":"application/json",service:"evmetadata",chainId:O.toString(),vaultType:V.toString()}});case 3:return t=e.sent,e.next=6,t.json();case 6:r=e.sent,N(I.concat(r.values)),w({loaded:!0}),S(!1),console.log("Records received",r.values.length),r.length<10&&Z(!1),e.next=16;break;case 14:e.prev=14,e.t0=e.catch(0);case 16:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(){return e.apply(this,arguments)}}(),K=function(){var e=Object(u.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log(H,10,H+10),J(H+10),W(!0);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),B=Object(n.useState)(""),Q=B[0],X=B[1];Object(n.useEffect)((function(){c&&Q!=c&&(X(c),w({loaded:!1}),z())}),[c,Q]);var $=Object(n.useState)(O),ee=$[0],te=$[1];Object(n.useEffect)((function(){O&&ee!=O&&(te(O),w({loaded:!1}),z())}),[O,ee]);var re=function(e){location.href=k?location.origin+"/vaults?address="+k+"&type="+e:location.origin+"/vaults?type="+e};return Object(n.useEffect)((function(){L&&(W(!1),z())}),[L]),g(o.a.Fragment,null,g(l.a,{pl:"10",spacing:0,direction:"row"},g(d.a,{isDisabled:!1,m:2,variant:"ghost",onClick:function(){re("unclaimed")}},"Unclaimed"),g(d.a,{isDisabled:!1,m:2,variant:"ghost",onClick:function(){re("claimed")}},"Claimed"),g(d.a,{isDisabled:!1,m:2,variant:"ghost",onClick:function(){re("unminted")}},"Not Minted"),g(d.a,{isDisabled:!1,m:2,variant:"ghost",onClick:function(){re("created")}},"Created by me"),g(d.a,{isDisabled:!0,m:2,variant:"ghost",onClick:function(){re("nfts")}},"Other NFT's")),g(h.a,{loaded:A.loaded},P?g(y.a,null):"",g(C.a,{className:"infinite-scroll",scrollableTarget:"shannon-container",dataLength:I.length,next:K,hasMore:q,loader:g(y.a,null),endMessage:g("p",{style:{textAlign:"center"}},g("b",null,"No more nfts to load."))},g(f.a,{w:"100%",justify:"center",flexWrap:"wrap",mt:10},I.length?I.map((function(e,t){var r=location.pathname.split("/");r.pop();var n=location.origin+r.join("/")+"/asset?id="+e.tokenId+"&contract="+e.address,o={flex:"1",minW:"200px",maxW:"200px",borderWidth:"1px",mx:"6",mb:"6",rounded:"lg",overflow:"hidden",borderColor:"claimed"==e.status?"green !important":"",cursor:"pointer"};return g(p.a,{href:n,className:"vaultLink"},g(v.a,Object(a.a)({className:"NFT myNft",key:t},o,{onClick:function(){S(!0),location.href=n}}),g(b.a,{fontWeight:"semibold",textAlign:"center",mt:2,pl:2,isTruncated:!0},e.name,!e.private&&e.totalValue>0?": ~$"+e.totalValue:null),g(l.a,{align:"center"},g(j.b,{className:"d-block w-100 NFT-newest-image",url:e.image})),g(v.a,{d:"flex",alignItems:"baseline"}),g(l.a,{align:"center",mt:3},"claimed"==e.status?g(b.a,{color:"green.500"},"CLAIMED"):null)))})):g(b.a,null,"YOU DON'T SEEM TO HAVE ANY VAULTS."," ",g(p.a,{color:"#638cd8",href:"../create"},"CREATE ONE HERE!"))))))}var I=r("4WaP"),N=o.a.createElement;function _(){return N(n.Suspense,{fallback:N("h1",null,"Loading vaults...")},N(I.a,{fallback:N("h2",null,"Oops! Something went wrong.")},N(T,null)))}},GZYz:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/nfts",function(){return r("3PPc")}])},Ute3:function(e,t,r){"use strict";var n=r("q1tI"),o=r.n(n),a=r("Weur"),c=r("sK1y"),i=r("yI6m"),u=o.a.createElement;t.a=function(){return u(a.a,{pb:2,justify:"center"},u(c.a,{pr:2},"Refreshing "),u(i.a,null))}},Z6YE:function(e,t,r){"use strict";r.d(t,"a",(function(){return I})),r.d(t,"b",(function(){return N}));var n=r("q1tI"),o=r.n(n),a=r("9R94"),c=r("b2e8"),i=r("VJ7P"),u=r("b1pR");function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function l(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,f(e,t)}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function p(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function v(e,t,r){return(v=p()?Reflect.construct:function(e,t,r){var n=[null];n.push.apply(n,t);var o=new(Function.bind.apply(e,n));return r&&f(o,r.prototype),o}).apply(null,arguments)}function b(e){var t="function"===typeof Map?new Map:void 0;return(b=function(e){if(null===e||(r=e,-1===Function.toString.call(r).indexOf("[native code]")))return e;var r;if("function"!==typeof e)throw new TypeError("Super expression must either be null or a function");if("undefined"!==typeof t){if(t.has(e))return t.get(e);t.set(e,n)}function n(){return v(e,arguments,d(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),f(n,e)})(e)}"undefined"!==typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!==typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));function O(e,t){try{var r=e()}catch(n){return t(n)}return r&&r.then?r.then(void 0,t):r}function h(e){if("string"===typeof e){e=e.replace(/^Ox/,"0x");var t=Number.parseInt(e,"0x"===e.trim().substring(0,2)?16:10);return Number.isNaN(t)&&Object(a.a)(!1),t}return Number.isInteger(e)||Object(a.a)(!1),e}function y(e){"string"===typeof e&&e.match(/^(0x)?[0-9a-fA-F]{40}$/)||Object(a.a)(!1);for(var t="0x"===e.substring(0,2)?e:"0x"+e,r=t.toLowerCase().substring(2).split(""),n=new Uint8Array(40),o=0;o<40;o++)n[o]=r[o].charCodeAt(0);for(var c=Object(i.a)(Object(u.a)(n)),s=0;s<40;s+=2)c[s>>1]>>4>=8&&(r[s]=r[s].toUpperCase()),(15&c[s>>1])>=8&&(r[s+1]=r[s+1].toUpperCase());var l="0x"+r.join("");return t.match(/([A-F].*[a-f])|([a-f].*[A-F])/)&&t!==l&&Object(a.a)(!1),l}var m,E=function(e,t){try{var r=function(r){return Promise.resolve(Promise.all([void 0===t.chainId?e.getChainId():t.chainId,void 0===t.account?e.getAccount():t.account])).then((function(t){var n=t[0],o=t[1],a=h(n);if(e.supportedChainIds&&!e.supportedChainIds.includes(a))throw new C(a,e.supportedChainIds);var c=null===o?o:y(o);return{provider:r,chainId:a,account:c}}))},n=void 0===t.provider;return Promise.resolve(n?Promise.resolve(e.getProvider()).then(r):r(t.provider))}catch(o){return Promise.reject(o)}},R=function(e){function t(){var t;return(t=e.call(this)||this).name=t.constructor.name,t}return l(t,e),t}(b(Error)),C=function(e){function t(t,r){var n;return(n=e.call(this)||this).name=n.constructor.name,n.message="Unsupported chain id: "+t+". Supported chain ids are: "+r+".",n}return l(t,e),t}(b(Error));function j(e,t){var r=t.type,n=t.payload;switch(r){case m.ACTIVATE_CONNECTOR:return{connector:n.connector,provider:n.provider,chainId:n.chainId,account:n.account,onError:n.onError};case m.UPDATE:var o=n.provider,a=n.chainId,c=n.account;return s({},e,void 0===o?{}:{provider:o},void 0===a?{}:{chainId:a},void 0===c?{}:{account:c});case m.UPDATE_FROM_ERROR:var i=n.provider,u=n.chainId,l=n.account;return s({},e,void 0===i?{}:{provider:i},void 0===u?{}:{chainId:u},void 0===l?{}:{account:l},{error:void 0});case m.ERROR:var d=n.error;return{connector:e.connector,error:d,onError:e.onError};case m.ERROR_FROM_ACTIVATION:return{connector:n.connector,error:n.error};case m.DEACTIVATE_CONNECTOR:return{}}}!function(e){e[e.ACTIVATE_CONNECTOR=0]="ACTIVATE_CONNECTOR",e[e.UPDATE=1]="UPDATE",e[e.UPDATE_FROM_ERROR=2]="UPDATE_FROM_ERROR",e[e.ERROR=3]="ERROR",e[e.ERROR_FROM_ACTIVATION=4]="ERROR_FROM_ACTIVATION",e[e.DEACTIVATE_CONNECTOR=5]="DEACTIVATE_CONNECTOR"}(m||(m={}));var g={};function T(e){g[e]&&Object(a.a)(!1),g[e]=Object(n.createContext)({activate:function(){try{return Object(a.a)(!1),Promise.resolve()}catch(e){return Promise.reject(e)}},setError:function(){Object(a.a)(!1)},deactivate:function(){Object(a.a)(!1)},active:!1}),g[e].displayName="Web3ReactContext - "+e;var t=g[e].Provider;return function(e){var r=e.getLibrary,a=e.children,i=function(){var e=Object(n.useReducer)(j,{}),t=e[0],r=e[1],o=t.connector,a=t.provider,i=t.chainId,u=t.account,l=t.onError,d=t.error,f=Object(n.useRef)(-1);f.current+=1;var p=Object(n.useCallback)((function(e,t,n){void 0===n&&(n=!1);try{var o=f.current,a=!1;return Promise.resolve(O((function(){return Promise.resolve(e.activate().then((function(e){return a=!0,e}))).then((function(n){return Promise.resolve(E(e,n)).then((function(n){if(f.current>o)throw new R;r({type:m.ACTIVATE_CONNECTOR,payload:s({connector:e},n,{onError:t})})}))}))}),(function(o){if(o instanceof R)a&&e.deactivate();else{if(n)throw a&&e.deactivate(),o;t?(a&&e.deactivate(),t(o)):r({type:m.ERROR_FROM_ACTIVATION,payload:{connector:e,error:o}})}})))}catch(c){return Promise.reject(c)}}),[]),v=Object(n.useCallback)((function(e){r({type:m.ERROR,payload:{error:e}})}),[]),b=Object(n.useCallback)((function(){r({type:m.DEACTIVATE_CONNECTOR})}),[]),g=Object(n.useCallback)((function(e){try{if(!o)throw Error("This should never happen, it's just so Typescript stops complaining");var t=f.current;return Promise.resolve(function(){if(d)return O((function(){return Promise.resolve(E(o,e)).then((function(e){if(f.current>t)throw new R;r({type:m.UPDATE_FROM_ERROR,payload:e})}))}),(function(e){e instanceof R||(l?l(e):r({type:m.ERROR,payload:{error:e}}))}));var n=void 0===e.chainId?void 0:h(e.chainId);if(void 0!==n&&o.supportedChainIds&&!o.supportedChainIds.includes(n)){var a=new C(n,o.supportedChainIds);l?l(a):r({type:m.ERROR,payload:{error:a}})}else{var c="string"===typeof e.account?y(e.account):e.account;r({type:m.UPDATE,payload:{provider:e.provider,chainId:n,account:c}})}}())}catch(n){return Promise.reject(n)}}),[o,d,l]),T=Object(n.useCallback)((function(e){l?l(e):r({type:m.ERROR,payload:{error:e}})}),[l]),I=Object(n.useCallback)((function(){r({type:m.DEACTIVATE_CONNECTOR})}),[]);return Object(n.useEffect)((function(){return function(){o&&o.deactivate()}}),[o]),Object(n.useEffect)((function(){return o&&o.on(c.a.Update,g).on(c.a.Error,T).on(c.a.Deactivate,I),function(){o&&o.off(c.a.Update,g).off(c.a.Error,T).off(c.a.Deactivate,I)}}),[o,g,T,I]),{connector:o,provider:a,chainId:i,account:u,activate:p,setError:v,deactivate:b,error:d}}(),u=i.connector,l=i.provider,d=i.chainId,f=i.account,p=i.activate,v=i.setError,b=i.deactivate,g=i.error,T=void 0!==u&&void 0!==d&&void 0!==f&&!g,I=Object(n.useMemo)((function(){return T&&void 0!==d&&Number.isInteger(d)&&u?r(l,u):void 0}),[T,r,l,u,d]),N={connector:u,library:I,chainId:d,account:f,activate:p,setError:v,deactivate:b,active:T,error:g};return o.a.createElement(t,{value:N},a)}}var I=T("primary");function N(e){return Object(n.useContext)(function(e){return void 0===e&&(e="primary"),Object.keys(g).includes(e)||Object(a.a)(!1),g[e]}(e))}},b2e8:function(e,t,r){"use strict";var n;r.d(t,"a",(function(){return n})),function(e){e.Update="Web3ReactUpdate",e.Error="Web3ReactError",e.Deactivate="Web3ReactDeactivate"}(n||(n={}))},pboS:function(e,t,r){"use strict";var n=r("pVnL"),o=r.n(n),a=r("8OQS"),c=r.n(a),i=r("qKvR"),u=r("+Cyc"),s=r("q1tI"),l={transition:"all 0.15s ease-out",cursor:"pointer",textDecoration:"none",outline:"none",_focus:{boxShadow:"outline"},_disabled:{opacity:"0.4",cursor:"not-allowed",textDecoration:"none"}},d=Object(s.forwardRef)((function(e,t){var r=e.isDisabled,n=e.isExternal,a=e.onClick,s=c()(e,["isDisabled","isExternal","onClick"]),d=n?{target:"_blank",rel:"noopener noreferrer"}:null;return Object(i.d)(u.a,o()({as:"a",ref:t,tabIndex:r?-1:void 0,"aria-disabled":r,onClick:r?function(e){return e.preventDefault()}:a,_hover:{textDecoration:"underline"}},d,l,s))}));d.displayName="Link",t.a=d}},[["GZYz",1,0,2,4,3,5,6,7,8,9,23]]]);