_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[60],{"/k+x":function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return oe}));var a=n("q1tI"),r=n.n(a),o=n("wx14"),c=n("Ff2n"),i=n("o0o1"),l=n.n(i),s=n("HaE+"),u=n("sK1y"),d=n("Weur"),f=n("Yn+B"),p=n("bQFp"),b=n("eJLp"),h=n("BMxC"),m=n("wCB1"),g=n("Y1ui"),v=n.n(g),y=n("Ute3"),O=n("nOHt"),j=n("Z6YE"),w=n("iBPG"),x=n("21eR"),S=n("N39q"),k=n("zIq6"),N=n("RD7I"),C=n("cNwE");var E=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object(N.a)(e,Object(o.a)({defaultTheme:C.a},t))},T=(n("17x9"),n("iuhU")),R=n("H2TA");var I=a.createContext(),H=a.forwardRef((function(e,t){var n=e.classes,r=e.className,i=e.component,l=void 0===i?"table":i,s=e.padding,u=void 0===s?"normal":s,d=e.size,f=void 0===d?"medium":d,p=e.stickyHeader,b=void 0!==p&&p,h=Object(c.a)(e,["classes","className","component","padding","size","stickyHeader"]),m=a.useMemo((function(){return{padding:u,size:f,stickyHeader:b}}),[u,f,b]);return a.createElement(I.Provider,{value:m},a.createElement(l,Object(o.a)({role:"table"===l?null:"table",ref:t,className:Object(T.a)(n.root,r,b&&n.stickyHeader)},h)))})),_=Object(R.a)((function(e){return{root:{display:"table",width:"100%",borderCollapse:"collapse",borderSpacing:0,"& caption":Object(o.a)({},e.typography.body2,{padding:e.spacing(2),color:e.palette.text.secondary,textAlign:"left",captionSide:"bottom"})},stickyHeader:{borderCollapse:"separate"}}}),{name:"MuiTable"})(H);var z=a.createContext(),P={variant:"body"},A=a.forwardRef((function(e,t){var n=e.classes,r=e.className,i=e.component,l=void 0===i?"tbody":i,s=Object(c.a)(e,["classes","className","component"]);return a.createElement(z.Provider,{value:P},a.createElement(l,Object(o.a)({className:Object(T.a)(n.root,r),ref:t,role:"tbody"===l?null:"rowgroup"},s)))})),M=Object(R.a)({root:{display:"table-row-group"}},{name:"MuiTableBody"})(A),B=n("NqtD"),q=n("ye/S"),D=a.forwardRef((function(e,t){var n,r,i=e.align,l=void 0===i?"inherit":i,s=e.classes,u=e.className,d=e.component,f=e.padding,p=e.scope,b=e.size,h=e.sortDirection,m=e.variant,g=Object(c.a)(e,["align","classes","className","component","padding","scope","size","sortDirection","variant"]),v=a.useContext(I),y=a.useContext(z),O=y&&"head"===y.variant;d?(r=d,n=O?"columnheader":"cell"):r=O?"th":"td";var j=p;!j&&O&&(j="col");var w=f||(v&&v.padding?v.padding:"normal"),x=b||(v&&v.size?v.size:"medium"),S=m||y&&y.variant,k=null;return h&&(k="asc"===h?"ascending":"descending"),a.createElement(r,Object(o.a)({ref:t,className:Object(T.a)(s.root,s[S],u,"inherit"!==l&&s["align".concat(Object(B.a)(l))],"normal"!==w&&s["padding".concat(Object(B.a)(w))],"medium"!==x&&s["size".concat(Object(B.a)(x))],"head"===S&&v&&v.stickyHeader&&s.stickyHeader),"aria-sort":k,role:n,scope:j},g))})),L=Object(R.a)((function(e){return{root:Object(o.a)({},e.typography.body2,{display:"table-cell",verticalAlign:"inherit",borderBottom:"1px solid\n    ".concat("light"===e.palette.type?Object(q.d)(Object(q.a)(e.palette.divider,1),.88):Object(q.b)(Object(q.a)(e.palette.divider,1),.68)),textAlign:"left",padding:16}),head:{color:e.palette.text.primary,lineHeight:e.typography.pxToRem(24),fontWeight:e.typography.fontWeightMedium},body:{color:e.palette.text.primary},footer:{color:e.palette.text.secondary,lineHeight:e.typography.pxToRem(21),fontSize:e.typography.pxToRem(12)},sizeSmall:{padding:"6px 24px 6px 16px","&:last-child":{paddingRight:16},"&$paddingCheckbox":{width:24,padding:"0 12px 0 16px","&:last-child":{paddingLeft:12,paddingRight:16},"& > *":{padding:0}}},paddingCheckbox:{width:48,padding:"0 0 0 4px","&:last-child":{paddingLeft:0,paddingRight:4}},paddingNone:{padding:0,"&:last-child":{padding:0}},alignLeft:{textAlign:"left"},alignCenter:{textAlign:"center"},alignRight:{textAlign:"right",flexDirection:"row-reverse"},alignJustify:{textAlign:"justify"},stickyHeader:{position:"sticky",top:0,left:0,zIndex:2,backgroundColor:e.palette.background.default}}}),{name:"MuiTableCell"})(D),W=a.forwardRef((function(e,t){var n=e.classes,r=e.className,i=e.component,l=void 0===i?"div":i,s=Object(c.a)(e,["classes","className","component"]);return a.createElement(l,Object(o.a)({ref:t,className:Object(T.a)(n.root,r)},s))})),F=Object(R.a)({root:{width:"100%",overflowX:"auto"}},{name:"MuiTableContainer"})(W),G={variant:"head"},J=a.forwardRef((function(e,t){var n=e.classes,r=e.className,i=e.component,l=void 0===i?"thead":i,s=Object(c.a)(e,["classes","className","component"]);return a.createElement(z.Provider,{value:G},a.createElement(l,Object(o.a)({className:Object(T.a)(n.root,r),ref:t,role:"thead"===l?null:"rowgroup"},s)))})),U=Object(R.a)({root:{display:"table-header-group"}},{name:"MuiTableHead"})(J),X=a.forwardRef((function(e,t){var n=e.classes,r=e.className,i=e.component,l=void 0===i?"tr":i,s=e.hover,u=void 0!==s&&s,d=e.selected,f=void 0!==d&&d,p=Object(c.a)(e,["classes","className","component","hover","selected"]),b=a.useContext(z);return a.createElement(l,Object(o.a)({ref:t,className:Object(T.a)(n.root,r,b&&{head:n.head,footer:n.footer}[b.variant],u&&n.hover,f&&n.selected),role:"tr"===l?null:"row"},p))})),V=Object(R.a)((function(e){return{root:{color:"inherit",display:"table-row",verticalAlign:"middle",outline:0,"&$hover:hover":{backgroundColor:e.palette.action.hover},"&$selected, &$selected:hover":{backgroundColor:Object(q.a)(e.palette.secondary.main,e.palette.action.selectedOpacity)}},selected:{},hover:{},head:{},footer:{}}}),{name:"MuiTableRow"})(X),Y=a.forwardRef((function(e,t){var n=e.classes,r=e.className,i=e.component,l=void 0===i?"div":i,s=e.square,u=void 0!==s&&s,d=e.elevation,f=void 0===d?1:d,p=e.variant,b=void 0===p?"elevation":p,h=Object(c.a)(e,["classes","className","component","square","elevation","variant"]);return a.createElement(l,Object(o.a)({className:Object(T.a)(n.root,r,"outlined"===b?n.outlined:n["elevation".concat(f)],!u&&n.rounded),ref:t},h))})),$=Object(R.a)((function(e){var t={};return e.shadows.forEach((function(e,n){t["elevation".concat(n)]={boxShadow:e}})),Object(o.a)({root:{backgroundColor:e.palette.background.paper,color:e.palette.text.primary,transition:e.transitions.create("box-shadow")},rounded:{borderRadius:e.shape.borderRadius},outlined:{border:"1px solid ".concat(e.palette.divider)}},t)}),{name:"MuiPaper"})(Y),Q=r.a.createElement,K=E({table:{minWidth:650}});function Z(e){var t=Object(j.b)().account,n=Object(a.useState)(!1),o=n[0],c=(n[1],Object(a.useState)(!1)),i=c[0],u=c[1],d=Object(a.useState)([]),f=d[0],p=d[1],b=Object(a.useState)(e.chainId),h=b[0],m=b[1],g=K();return r.a.useEffect((function(){console.log(h,e.chainId),h!==e.chainId&&(m(e.chainId),console.log("refresh data"),u(!1))})),!i&&function(e){v.apply(this,arguments)}((function(e){u(!0),p(e)})),Q(r.a.Fragment,null,Q(F,{component:$},Q(_,{className:g.table,"aria-label":"simple table"},Q(U,null,Q(V,null,Q(L,null,"Amount "),Q(L,{align:"right"},"For"),Q(L,{align:"left"},"Hash"),Q(L,{align:"right"},"To Chain"),Q(L,{align:"right"},"Status"))),Q(M,null,f.sort((function(e,t){return t.blockNumber>e.blockNumber?1:-1})).map((function(e){return Number(e.returnValues.amount)<2e14?Q(V,{className:t==e.returnValues.sender?"MyRow":"",key:e.name},Q(L,{component:"th",scope:"row"},Number(10*Object(w.g)(e.returnValues.amount,"gwei")).toLocaleString()),Q(L,{align:"right"},e.returnValues.sender),Q(L,{align:"left"},e.transactionHash),Q(L,{align:"right"},w.a[e.returnValues.chainId]),Q(L,{align:"right"},"true"==e.transferred?"Complete":"Pending")):null}))))));function v(){return(v=Object(s.a)(l.a.mark((function e(t){var n,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(S.g+"/web3/transfersOutDb?pending="+o,{method:"GET",headers:{"Content-Type":"application/json",chainid:h.toString(),service:"evmetadata"}});case 2:return n=e.sent,e.next=5,n.json();case 5:return a=e.sent,e.abrupt("return",t(a));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}var ee=["children"],te=r.a.createElement;function ne(){var e=Object(O.useRouter)().query,t=Object(j.b)(),n=t.account,i=t.chainId,g=Object(a.useState)({loaded:!1}),N=g[0],C=g[1],E=Object(a.useState)(!1),T=E[0],R=(E[1],Object(a.useState)(!1)),I=R[0],H=R[1],_=Object(a.useState)(!1),z=_[0],P=_[1],A=Object(a.useState)(null),M=A[0],B=A[1],q=Object(a.useState)(e.address),D=(q[0],q[1],Object(a.useState)(e.experimental)),L=(D[0],D[1],Object(a.useState)(null)),W=L[0],F=L[1],G=Object(a.useState)(null),J=G[0],U=G[1],X=Object(a.useState)(0),V=X[0],Y=(X[1],Object(a.useState)(0)),$=(Y[0],Y[1]),Q=Object(a.useState)(null),K=Q[0],ne=Q[1],ae=Object(a.useState)(0),re=ae[0],oe=(ae[1],Object(a.useState)(!1)),ce=oe[0],ie=(oe[1],Object(a.useState)(!0)),le=ie[0],se=(ie[1],Object(x.b)(S.r.vaultHandler[i],S.r.vaultHandlerAbi,!0)),ue=Object(x.b)(S.r.coval[i],S.r.covalAbi,!0),de=function(){var e=Object(s.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:P(!0),se.transferToChain(V,re.toString()).then((function(e){var t=e.hash;ne(t)})).catch((function(e){4001==(null===e||void 0===e?void 0:e.code)&&P(!1)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),fe=function(){var e=Object(s.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return ne(null),e.t0=F,e.next=4,ue.decimals();case 4:return e.t1=e.sent,(0,e.t0)(e.t1),e.t2=U,e.next=9,ue.allowance(n,S.r.vaultHandler[i]).then((function(e){return e.toString()}));case 9:return e.t3=e.sent,(0,e.t2)(e.t3),e.t4=B,e.next=14,ue.balanceOf(n).then((function(e){return e.toString()}));case 14:e.t5=e.sent,(0,e.t4)(e.t5),Number(J)>=Number(0)&&$(J),C({loaded:!0});case 18:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),pe=function(){var e=Object(s.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("getting logs"),fetch(S.g+"/web3/transfersOut",{method:"GET",headers:{"Content-Type":"application/json",service:"evmetadata",chainid:i.toString()}}).then(function(){var e=Object(s.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("getting logs"),fetch(S.g+"/web3/bridgeLogs?chainId="+i.toString(),{method:"GET",headers:{"Content-Type":"application/json",service:"evmetadata"}}).then(function(){var e=Object(s.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("trnsfer log",t),fetch(S.g+"/web3/bridgeTransfer",{method:"GET",headers:{"Content-Type":"application/json",service:"evmetadata"}}).then(function(){var e=Object(s.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("bridge transfer",t),fe();case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();function be(e){var t=e.children,n=Object(c.a)(e,ee);return te(u.a,Object(o.a)({fontSize:"2xl",lineHeight:1,py:"0.3rem"},n),t)}var he=Object(a.useState)(""),me=he[0],ge=he[1];Object(a.useEffect)((function(){n&&me!=n&&(ge(n),C({loaded:!1}),fe())}),[n,me]);var ve=Object(a.useState)(i),ye=ve[0],Oe=ve[1];return Object(a.useEffect)((function(){i&&ye!=i&&(Oe(i),C({loaded:!1}),fe())}),[i,ye]),Object(a.useEffect)((function(){n&&i&&C({loaded:!0})}),[]),te(v.a,{loaded:N.loaded},T?te(y.a,null):"",te(d.a,{w:"100%",justify:"center",mt:10},te(f.a,{align:"center"},te(r.a.Fragment,null,te(f.a,{direction:"row",align:"flex-start",spacing:"1rem",flexWrap:"wrap",shouldWrapChildren:!0},te(be,null,"I want to transfer "),te(be,null,"$Coval")),te(f.a,{direction:"row",align:"flex-start",spacing:"1rem",flexWrap:"wrap",shouldWrapChildren:!0},te(be,null,te(d.a,{width:"full",align:"center",justifyContent:"center",flexWrap:"wrap"},te(u.a,{float:"left"},"from ",137==i?"Polygon (Matic)":100==i?"xDai":56==i?"Binance Smart Chain":250==i?"Fantom":"Ethereum"," to"),te(p.a,{float:"left",margin:2,w:3,src:"./next.png"}))),0!=V&&re>0?te(b.a,{isDisabled:ce,onClick:de},ce?"Invalid Transfer Amount":"Transfer Now"):null)),0==J&&M>0&&!I?te(h.a,{mt:"2",ml:"4",lineHeight:"tight"},te(u.a,{mt:2,as:"h4",ml:"4",mr:"4",fontSize:"s",fontStyle:"italic"},te(b.a,{onClick:function(){H(!0),ue.approve(S.r.vaultHandler[i],1e7*Math.pow(10,+W)).then((function(e){var t=e.hash;ne(t)})).catch((function(e){4001==(null===e||void 0===e?void 0:e.code)&&H(!1)}))},type:"submit"},"Approve Transfer"))):0==M?te(h.a,{mt:"2",ml:"4",lineHeight:"tight"},te(u.a,{mt:2,as:"h4",ml:"4",mr:"4",fontSize:"s",fontStyle:"italic"},"You have no Coval to transfer")):I?null:te(h.a,{mt:"2",ml:"4",lineHeight:"tight"},te(u.a,{mt:2,as:"h4",ml:"4",mr:"4",fontSize:"s",fontStyle:"italic"},"Approved to transfer up to ",J*Math.pow(10,-W)," Coval. Note: Swaps between networks can take up to 25 minutes.")),te(m.f,null,te(m.c,{className:"TabList"},te(m.a,{className:"Tab"},"From ",w.a[i]),V>0?te(m.a,{className:"Tab"},"From ",w.a[V]):null),te(m.e,null,te(m.d,null,te(Z,{chainId:i})),te(m.d,null,V&&le?te(Z,{chainId:V}):null))))),K?te(k.a,{hash:K,onComplete:function(){z?(P(!1),pe()):(H(!1),fe())}}):null)}var ae=n("4WaP"),re=r.a.createElement;function oe(){return re(a.Suspense,{fallback:re("h1",null,"Loading vaults...")},re(ae.a,{fallback:re("h2",null,"Oops! Something went wrong.")},re(ne,null)))}},"1OyB":function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}n.d(t,"a",(function(){return a}))},"4WaP":function(e,t,n){"use strict";n.d(t,"a",(function(){return f}));var a=n("1OyB"),r=n("vuIU"),o=n("JX7q"),c=n("Ji7U"),i=n("md7G"),l=n("foSv"),s=n("rePB"),u=n("q1tI");function d(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=Object(l.a)(e);if(t){var r=Object(l.a)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return Object(i.a)(this,n)}}var f=function(e){Object(c.a)(n,e);var t=d(n);function n(){var e;Object(a.a)(this,n);for(var r=arguments.length,c=new Array(r),i=0;i<r;i++)c[i]=arguments[i];return e=t.call.apply(t,[this].concat(c)),Object(s.a)(Object(o.a)(e),"state",{hasError:!1,error:null}),e}return Object(r.a)(n,[{key:"render",value:function(){return this.state.hasError?this.props.fallback:this.props.children}}],[{key:"getDerivedStateFromError",value:function(e){return{hasError:!0,error:e}}}]),n}(u.Component)},"8I9S":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/swap-closed",function(){return n("/k+x")}])},Ji7U:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n("s4An");function r(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Object(a.a)(e,t)}},Ute3:function(e,t,n){"use strict";var a=n("q1tI"),r=n.n(a),o=n("Weur"),c=n("sK1y"),i=n("yI6m"),l=r.a.createElement;t.a=function(){return l(o.a,{pb:2,justify:"center"},l(c.a,{pr:2},"Refreshing "),l(i.a,null))}},cDf5:function(e,t){function n(t){return"function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?(e.exports=n=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=n=function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),n(t)}e.exports=n,e.exports.default=e.exports,e.exports.__esModule=!0},foSv:function(e,t,n){"use strict";function a(e){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}n.d(t,"a",(function(){return a}))},md7G:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n("cDf5"),r=n.n(a),o=n("JX7q");function c(e,t){if(t&&("object"===r()(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return Object(o.a)(e)}},zIq6:function(e,t,n){"use strict";n.d(t,"a",(function(){return b}));var a=n("ODXe"),r=n("q1tI"),o=n.n(r),c=n("IP4Q"),i=n("eJLp"),l=n("yI6m"),s=n("OQ2h"),u=n("Z6YE"),d=n("zmG3"),f=n("iBPG"),p=o.a.createElement;function b(e){var t=e.hash,n=e.onComplete,o=Object(u.b)(),b=o.library,h=o.chainId,m=Object(d.i)(),g=Object(a.a)(m,2)[1].removeTransaction,v=Object(r.useState)(),y=v[0],O=v[1];return Object(r.useEffect)((function(){if(b){var e=!0;return b.waitForTransaction(t).then((function(t){e&&(n&&n(),O(1===t.status))})),function(){e=!1}}}),[b,t]),p(c.a,{spacing:0},p(i.a,{as:"a",variantColor:"boolean"===typeof y?y?"green":"red":"blue",leftIcon:"boolean"===typeof y?y?"check-circle":"warning":function(){return p(l.a,{size:"sm",mr:"0.5rem",ml:"-0.25rem"})},rightIcon:"external-link",style:{borderTopRightRadius:0,borderBottomRightRadius:0},href:Object(f.f)(f.b.Transaction,[h,t]),target:"_blank",rel:"noopener noreferrer"},Object(f.l)(t,2)),p(s.a,{icon:"close",variantColor:"boolean"===typeof y?y?"green":"red":"blue","aria-label":"Close",style:{borderTopLeftRadius:0,borderBottomLeftRadius:0},borderLeft:"1px solid white",onClick:function(){g(h,t)}}))}}},[["8I9S",1,0,14,16,2,3,4,5,6,7,8,9,11,13,17,32]]]);