_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[37],{"0kfr":function(e,t,n){"use strict";var r=n("pVnL"),a=n.n(r),o=n("8OQS"),i=n.n(o),c=n("qKvR"),l=n("uzN5"),u=n("q1tI"),s=n("BMxC"),d=n("D7Da"),f=Object(u.forwardRef)((function(e,t){var n=e.onChange,r=e.name,o=e.variantColor,f=e.size,p=e.defaultValue,b=e.isInline,h=e.value,v=e.spacing,m=void 0===v?2:v,O=e.children,g=i()(e,["onChange","name","variantColor","size","defaultValue","isInline","value","spacing","children"]),y=Object(u.useRef)(null!=h).current,j=Object(u.useState)(p||null),w=j[0],x=j[1],C=y?h:w,S=Object(u.useRef)(),k=function(e){y||x(e.target.value),n&&n(e,e.target.value)},P="radio-"+Object(l.a)(),R=r||P,D=Object(d.b)(O),E=D.map((function(e,t){var n=D.length===t+1,r=b?{mr:m}:{mb:m};return Object(c.d)(s.a,a()({key:t,display:b?"inline-block":"block"},!n&&r),Object(u.cloneElement)(e,{size:e.props.size||f,variantColor:e.props.variantColor||o,name:R,onChange:k,isChecked:e.props.value===C}))}));return Object(u.useImperativeHandle)(t,(function(){return{focus:function(){var e=S.current.querySelector("input:not(:disabled):checked");e||(e=S.current.querySelector("input:not(:disabled)")),e&&e.focus()}}}),[]),Object(c.d)(s.a,a()({ref:S,role:"radiogroup"},g),E)}));f.displayName="RadioGroup",t.a=f},"6tc4":function(e,t,n){"use strict";var r=n("lSNA"),a=n.n(r),o=n("5D9J"),i=n("JJlO"),c=n("BMxC"),l=n("QdyT");function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var s=Object(o.a)(c.a)((function(e){var t,n=e.type,r=void 0===n?"checkbox":n,o=e._hover,c=e._invalid,s=e._disabled,d=e._focus,f=e._checked,p=e._child,b=void 0===p?{opacity:0}:p,h=e._checkedAndChild,v=void 0===h?{opacity:1}:h,m=e._checkedAndDisabled,O=e._checkedAndFocus,g=e._checkedAndHover,y="input[type="+r+"]:checked:disabled + &, input[type="+r+"][aria-checked=mixed]:disabled + &",j="input[type="+r+"]:checked:hover:not(:disabled) + &, input[type="+r+"][aria-checked=mixed]:hover:not(:disabled) + &",w="input[type="+r+"]:checked:focus + &, input[type="+r+"][aria-checked=mixed]:focus + &",x="input[type="+r+"]:disabled + &",C="input[type="+r+"]:focus + &",S="input[type="+r+"]:hover:not(:disabled):not(:checked) + &",k="input[type="+r+"]:checked + &, input[type="+r+"][aria-checked=mixed] + &",P="input[type="+r+"][aria-invalid=true] + &";return Object(i.a)(((t={})[C]=Object(l.b)(d),t[S]=Object(l.b)(o),t[x]=Object(l.b)(s),t[P]=Object(l.b)(c),t[y]=Object(l.b)(m),t[w]=Object(l.b)(O),t[j]=Object(l.b)(g),t["& > *"]=Object(l.b)(b),t[k]=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(n,!0).forEach((function(t){a()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},Object(l.b)(f),{"& > *":Object(l.b)(v)}),t))}));s.displayName="ControlBox",s.defaultProps={display:"inline-flex",alignItems:"center",justifyContent:"center",transition:"all 120ms",flexShrink:"0","aria-hidden":"true"},t.a=s},"81Wl":function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return Pe}));var r=n("q1tI"),a=n.n(r),o=n("wx14"),i=n("o0o1"),c=n.n(i),l=n("HaE+"),u=n("rePB"),s=n("XZ7F"),d=n("Weur"),f=n("BMxC"),p=n("wCB1"),b=n("Yn+B"),h=n("we/t"),v=n("jgTY"),m=n("FpzS"),O=n("r5ed"),g=n("pVnL"),y=n.n(g),j=n("8OQS"),w=n.n(j),x=n("qKvR"),C=n("mf32"),S=n("w0db"),k=n("sK1y"),P=Object(r.forwardRef)((function(e,t){var n=e.children,r=e.icon,a=w()(e,["children","icon"]),o=Object(C.c)().colorMode,i=Object(h.b)(a);return i.isInvalid?Object(x.d)(d.a,y()({ref:t,color:{light:"red.500",dark:"red.300"}[o],id:i.id?i.id+"-error-message":null,mt:2,fontSize:"sm",align:"center"},a),Object(x.d)(S.a,{"aria-hidden":!0,name:r||"warning",mr:"0.5em"}),Object(x.d)(k.a,{lineHeight:"normal"},n)):null}));P.displayName="FormErrorMessage";var R=P,D=n("0kfr"),E=n("NWnA"),I=n("eJLp"),L=Object(r.forwardRef)((function(e,t){return Object(x.d)(m.a,y()({py:"8px",minHeight:"80px",lineHeight:"short",ref:t,as:"textarea"},e))}));L.displayName="Textarea";var W=L;Object(r.forwardRef)((function(e,t){var n=e.minHeight,a=void 0===n?"39px":n,o=e.onInput,i=w()(e,["minHeight","onInput"]),c=Object(r.useState)(0),l=c[0],u=c[1],s=Object(r.useRef)(),d=t||s;Object(r.useLayoutEffect)((function(){d.current&&u(d.current.scrollHeight)}),[d]);return Object(x.d)(L,y()({rows:"1",onInput:function(e){d.current&&setTimeout((function(){u("auto"),u(d.current.scrollHeight)}),0),o&&o(e)},css:{height:l,resize:"none",overflow:"hidden",minHeight:a},ref:d},i))})).displayName="ExpandingTextarea";var N=n("MKZ1"),B=n("IP4Q"),T=n("KEox"),F=n("CoEt"),_=n("LqLE"),z=n("Y1ui"),A=n.n(z),M=n("Z6YE"),H=n("nOHt"),q=n("zIq6"),V=n("N39q"),K=n("21eR"),U=n("iBPG"),G=n("PLxQ"),J=n("1OyB"),Q=n("vuIU"),Y=n("Ji7U"),X=n("md7G"),Z=n("foSv"),$=n("a61B"),ee=n("ODXe"),te=function(e){return/^on[A-Z]/.test(e)},ne=function(e){return e.substr(2).toLowerCase()},re=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;(e.unsubs||[]).filter((function(e){var n=Object(ee.a)(e,1)[0];return!t||t.includes(n)})).forEach((function(e){return(0,Object(ee.a)(e,2)[1])()}))},ae=function(e,t){re(e,function(e){return Object.keys(e).filter(te).map(ne)}(t)),e.unsubs=Object.keys(t).filter(te).map((function(n){var r=ne(n);return[r,e.editor.on(r,t[n])]}))};function oe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ie(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?oe(Object(n),!0).forEach((function(t){Object(u.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):oe(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function ce(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(Z.a)(e);if(t){var a=Object(Z.a)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return Object(X.a)(this,n)}}a.a.Component;function le(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ue(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?le(Object(n),!0).forEach((function(t){Object(u.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):le(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function se(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(Z.a)(e);if(t){var a=Object(Z.a)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return Object(X.a)(this,n)}}var de=function(e){Object(Y.a)(n,e);var t=se(n);function n(e){var r;return Object(J.a)(this,n),(r=t.call(this,e)).editor=void 0,r.el=document.createElement("div"),r}return Object(Q.a)(n,[{key:"componentDidMount",value:function(){document.body.appendChild(this.el),this.el.className=this.props.className;var e=ue({},this.props);this.editor=Object($.g)(e,this.el),ae(this,e)}},{key:"componentDidUpdate",value:function(){var e=ue({},this.props);Object.assign(this.editor,e),ae(this,e)}},{key:"componentWillUnmount",value:function(){document.body.removeChild(this.el),this.editor&&(re(this),this.editor=void 0)}},{key:"show",value:function(){this.editor.show()}},{key:"hide",value:function(){this.editor.hide()}},{key:"render",value:function(){return null}}]),n}(a.a.Component);function fe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function pe(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?fe(Object(n),!0).forEach((function(t){Object(u.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):fe(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function be(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(Z.a)(e);if(t){var a=Object(Z.a)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return Object(X.a)(this,n)}}a.a.Component;var he=n("Q/0U"),ve=n.n(he),me=a.a.createElement;function Oe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ge(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Oe(Object(n),!0).forEach((function(t){Object(u.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Oe(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}Object($.s)($.k,$.p,$.m,$.i);var ye,je,we,xe=ge(ge(ge(ge({imageReader:Object($.b)(),imageWriter:Object($.c)()},$.q),$.n),$.e),{},{locale:ge(ge(ge(ge(ge(ge({},$.d),$.l),$.r),$.o),$.j),$.f)}),Ce=null;function Se(e){var t,n=Object(r.useState)(!1),i=n[0],u=n[1],g=Object(r.useState)(""),y=g[0],j=g[1],w=Object(r.useState)(!0),x=w[0],C=w[1],S=Object(s.a)(),P=S.isOpen,L=S.onToggle,z=(Object(H.useRouter)().query,Object(r.useState)(0)),J=z[0],Q=z[1],Y=Object(M.b)(),X=Y.account,Z=Y.chainId,$=Object(r.useState)(X||""),ee=$[0],te=$[1],ne=Object(r.useState)("Public"),re=(ne[0],ne[1]),ae=Object(r.useState)(""),oe=ae[0],ie=ae[1],ce=Object(r.useState)(""),le=ce[0],ue=ce[1],se=Object(r.useState)(""),fe=se[0],pe=se[1],be=Object(r.useState)(""),he=be[0],Oe=be[1],ge=Object(r.useState)(""),Se=ge[0],ke=ge[1],Pe=Object(r.useState)(!1),Re=Pe[0],De=Pe[1],Ee=Object(r.useState)({loaded:!0,private:!1}),Ie=Ee[0],Le=Ee[1],We=Object(r.useState)(null),Ne=We[0],Be=We[1],Te=Object(r.useState)(!0),Fe=Te[0],_e=(Te[1],Object(r.useState)(!1)),ze=_e[0],Ae=_e[1],Me=Object(r.useState)(!1),He=Me[0],qe=Me[1],Ve=Object(r.useState)(null),Ke=Ve[0],Ue=Ve[1],Ge=Object(r.useState)(null),Je=Ge[0],Qe=Ge[1],Ye=Object(r.useState)(null),Xe=Ye[0],Ze=Ye[1],$e=Object(r.useState)(null),et=$e[0],tt=$e[1],nt=Object(r.useState)(!1),rt=nt[0],at=nt[1],ot=Object(r.useState)(!1),it=ot[0],ct=ot[1],lt=Object(r.useState)(""),ut=lt[0],st=lt[1],dt=Object(r.useState)(""),ft=dt[0],pt=dt[1],bt=Object(r.useState)("upload"),ht=bt[0],vt=bt[1],mt=Object(r.useState)(!1),Ot=mt[0],gt=mt[1],yt=Object(K.b)(V.o.vaultHandler[Z],V.o.vaultHandlerAbi,!0),jt=Object(K.b)(V.o.coval[Z],V.o.covalAbi,!0),wt=function(){var e=Object(l.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=Ue,e.next=3,jt.decimals();case 3:return e.t1=e.sent,(0,e.t0)(e.t1),e.t2=Qe,e.next=8,jt.allowance(X,V.o.vaultHandler[Z]).then((function(e){return e.toString()}));case 8:return e.t3=e.sent,(0,e.t2)(e.t3),e.t4=Ze,e.next=13,jt.balanceOf(X).then((function(e){return e.toString()}));case 13:return e.t5=e.sent,(0,e.t4)(e.t5),e.t6=tt,e.next=18,yt.price().then((function(e){return e.toString()}));case 18:e.t7=e.sent,(0,e.t6)(e.t7),Number(Je)>=Number(et)?De(!0):De(!1);case 21:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),xt=function(e,t){return fetch(V.g+"/liveliness?cc=t",{method:"POST",headers:{"Content-Type":"application/json",service:"evmetadata",chainid:Z.toString()},body:JSON.stringify({tokenId:e})}).then(function(){var e=Object(l.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:n=e.sent,console.log("Liveliness check",n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),t()};var Ct=Object(r.useState)(""),St=Ct[0],kt=Ct[1];return Object(r.useEffect)((function(){X&&St!=X&&(kt(X),te(X))}),[X,St]),Object(r.useEffect)((function(){X&&Z&&wt()})),me(A.a,{loaded:Ie.loaded},me(d.a,{width:"full",align:"center",justifyContent:"center"},me(f.a,{maxW:"sm",borderWidth:"1px",rounded:"lg",overflow:"hidden"},me(p.f,{defaultIndex:0,index:J,onChange:function(e){return Q(e)}},me(p.c,null,me(p.a,null,"Make"),me(p.a,null,"My"),me(p.a,null,"Vault")),me(p.e,null,me(p.d,null,me(b.a,{direction:"column",align:"center",spacing:"2rem",flexGrow:1,justifyContent:"center",px:"2rem",py:"2rem",shouldWrapChildren:!0},me(b.a,{direction:"row",align:"flex-start",spacing:"0rem",flexWrap:"wrap",shouldWrapChildren:!0},me(h.a,{isRequired:!0,isInvalid:ee&&!Object(U.k)(ee)},me(v.a,{htmlFor:"owner-address"},"Vault Owner Address"),me(m.a,{type:"text",id:"owner-address","aria-describedby":"owner-helper-text",placeholder:"0xdeadbeef",maxLength:42,value:ee,onChange:function(e){return te(e.target.value)}}),me(O.a,{id:"owner-helper-text"},"What is the address of the first owner of this vault? Pro tip: When you connect a web3 wallet, this will populate automagically with your address."),me(R,null,"Address is not a valid ETH address"))),me(b.a,{direction:"row",align:"flex-start",spacing:"0rem",flexWrap:"wrap",shouldWrapChildren:!0},me(h.a,{as:"fieldset",isRequired:!0},me(v.a,null,"Public or Private?"),me(D.a,{id:"pubpriv",defaultValue:"Public",onChange:function(e){re(e.target.value),Le({loaded:Ie.loaded,private:"Private"===e.target.value})}},me(E.a,{value:"Public"},"Public"),me(E.a,{value:"Private"},"Private")),me(O.a,{id:"email-helper-text"},"Do you want the contents and addresses to be password protected?")),Ie.private?me(h.a,{isRequired:!0},me(v.a,null,"Password"),me(m.a,{type:"password",id:"vault-password",onChange:function(e){return ke(e.target.value)},"aria-describedby":"password-helper-text",autoComplete:"off"}),me(O.a,{id:"password-helper-text"},"Used to encrypt/decrypt")):""),me(b.a,{direction:"row",align:"flex-start",spacing:"0rem",flexWrap:"wrap",shouldWrapChildren:!0},me(I.a,{onClick:function(){return Q(1)}},"Next")))),me(p.d,null,me(b.a,{direction:"column",align:"center",spacing:"2rem",flexGrow:1,justifyContent:"center",px:"2rem",py:"2rem",shouldWrapChildren:!0},me(b.a,{direction:"row",align:"flex-start",spacing:"0rem",flexWrap:"wrap",shouldWrapChildren:!0},me(h.a,{isRequired:!0,isInvalid:oe&&oe.length<3&&oe.length>200},me(v.a,{htmlFor:"vault-name"},"Vault Name"),me(m.a,{type:"text",id:"vault-name","aria-describedby":"vault-name-text",minLength:3,maxLength:200,value:oe,onChange:function(e){return ie(e.target.value)},autoComplete:"off"}),me(O.a,{id:"vault-name-text"},"Give it some love so you can find it later."),me(R,null,"Name needs at least 3 characters. 200 is max."))),me(b.a,{direction:"row",align:"flex-start",spacing:"0rem",flexWrap:"wrap",shouldWrapChildren:!0},me(h.a,{isRequired:!0,isInvalid:le&&le.length<3&&le.length>1024},me(v.a,{htmlFor:"vault-desc"},"Vault Description"),me(W,{id:"vault-desc",size:"lg","aria-describedby":"vault-desc-text",minLength:3,maxLength:1024,value:le,onChange:function(e){return ue(e.target.value)},autoComplete:"off"}),me(O.a,{id:"vault-desc-text"},"Add some fluffy text to tell people what the point is!"),me(R,null,"Description needs to be at least 3 characters. 1024 is max."))),me(I.a,{onClick:L},"Include Encrypted Text In Vault"),me(N.a,{isOpen:P},Fe?me(b.a,{direction:"row",align:"flex-start",spacing:"0rem",flexWrap:"wrap",shouldWrapChildren:!0},me(h.a,null,me(v.a,{htmlFor:"vault-key"},"Key"),me(m.a,{type:"text",id:"vault-key","aria-describedby":"vault-key-text",maxLength:200,value:ut,onChange:function(e){return st(e.target.value)},autoComplete:"off"}),me(O.a,{id:"vault-key-text"},"Key Name (Public)"),me(R,null,"---Some Error")),me(h.a,null,me(v.a,{htmlFor:"vault-value"},"Value"),me(m.a,{type:"password",id:"vault-value","aria-describedby":"vault-value-text",maxLength:200,value:ft,onChange:function(e){return pt(e.target.value)},autoComplete:"off"}),me(O.a,{id:"vault-value-text"},"Key Value (Encrypted)"),me(R,null,"---Some Error"))):null),me(b.a,{direction:"row",align:"flex-start",spacing:"0rem",flexWrap:"wrap",shouldWrapChildren:!0},me(B.a,{spacing:4},me(I.a,{onClick:function(){return Q(0)}},"Back"),me(I.a,{onClick:function(){return Q(2)}},"Next"))))),me(p.d,null,me(b.a,{direction:"column",align:"center",spacing:"2rem",flexGrow:1,justifyContent:"center",px:"2rem",py:"2rem",shouldWrapChildren:!0},me(b.a,{direction:"row",align:"flex-start",spacing:"0rem",flexWrap:"wrap",shouldWrapChildren:!0},me(h.a,null,me(f.a,{p:1,rounded:"lg",overflow:"hidden"},me(b.a,{align:"center",p:1},"upload"!==ht?me(a.a.Fragment,null,me(v.a,{htmlFor:"vault-image-url"},"Embed Display URL"),me(m.a,{type:"text",id:"vault-image-url","aria-describedby":"vault-image-url-text",minLength:3,maxLength:200,value:fe,defaultValue:"http://",onChange:function(e){pe(e.target.value),gt(!0),console.log("showEmbed",Ot)},autoComplete:"off",w:300}),me("hr",null),me(v.a,{mt:3,htmlFor:"owned-url"},"Optional URL For Vault Owner *"),me(m.a,{type:"text",id:"owned-url","aria-describedby":"owned-url-text",minLength:3,maxLength:200,value:he,defaultValue:"http://",onChange:function(e){Oe(e.target.value)},autoComplete:"off",w:300})):me(a.a.Fragment,null,me(v.a,{htmlFor:"vault-img"},"Vault Image"),me("input",{type:"file",onChange:function(){return function(){var e=document.querySelector("#preview"),t=document.querySelector("input[type=file]"),n=new FileReader;if(t.files[0].size>5e6)return delete t.files,alert("File too large");n.addEventListener("load",(function(){var t;e&&(e.src=(null===(t=n.result)||void 0===t?void 0:t.toString())||""),e&&pe(e.src),C(!0),j("")}),!1),t.files&&n.readAsDataURL(t.files[0])}()}}),me(T.a,null)),me(T.a,null),me(v.a,{htmlFor:"type-selector"},"Display Type"),me(F.a,{id:"type-selector",w:"100%",value:ht,onChange:function(e){vt(e.target.value),console.log("type",ht)}},me("option",{value:"embed"},"Embed (url)"),me("option",{value:"upload"},"Image (upload)")),"upload"==ht?me(a.a.Fragment,null,me("img",{id:"preview",src:y,width:"250","margin-top":"6"}),i&&me(de,Object(o.a)({},xe,{src:fe,onLoad:function(e){return console.log("load modal image",e)},onHide:function(){return u(!1)},onProcess:function(e){var t=e.dest,n=new FileReader;n.readAsDataURL(t),n.onloadend=function(){var e,r=null===(e=n.result)||void 0===e?void 0:e.toString();pe(r),j(URL.createObjectURL(t)),C(!1)}}})),x&&fe?me(I.a,{mt:2,onClick:function(){return u(!0)}},"Edit Image"):null):1==Ot?me(a.a.Fragment,null,me(G.b,{url:fe})):null)))),Re?me(b.a,{direction:"row",align:"flex-start",spacing:"0rem",flexWrap:"wrap",shouldWrapChildren:!0},me(f.a,{maxW:"sm",borderWidth:"1px",p:1,rounded:"lg",overflow:"hidden"},me(k.a,null,"Creating a vault spends ",et*Math.pow(10,-Ke)," Coval from your wallet"))):null,Number(Xe)<Number(et)?me(f.a,{d:"flex",alignItems:"baseline",justifyContent:"space-between",mt:"2"},me(I.a,{width:"100%",onClick:function(){var e,n;e=ee,n="COVAL",(t=new ve.a({apiKey:"e8bed1bd-6844-4eb1-973a-7a11a48fafab",environment:"PRODUCTION",defaultCryptoCurrency:n||"ETH",walletAddress:e||"",themeColor:"000000",fiatCurrency:"USD",email:"",redirectURL:"",hostURL:window.location.origin,widgetHeight:"550px",widgetWidth:"450px"})).on(t.ALL_EVENTS,(function(e){console.log(e)})),t.on(t.EVENTS.TRANSAK_ORDER_SUCCESSFUL,(function(e){console.log(e),t.close()})),t.init()}},"Buy $Coval")):null,me(b.a,{direction:"row",align:"flex-start",spacing:"0rem",flexWrap:"wrap",shouldWrapChildren:!0},me(B.a,{spacing:4},me(I.a,{onClick:function(){return Q(1)}},"Back"),X?!ee||!Object(U.k)(ee)||!oe||oe.length<3||!le||le.length<3||!fe?me(I.a,{isDisabled:!0,type:"submit"},"Check Fields!"):Re||it?!Re&&it?me(I.a,{isDisabled:!0,type:"submit"},"Approving ..."):Number(Xe)<Number(et)?me(I.a,{isDisabled:!0,type:"submit"},"Insufficient Balance"):Ne||rt||ze||He?me(I.a,{isDisabled:!0,type:"submit"},"Making Vault ..."):me(I.a,{onClick:function(e){!function(e){e.preventDefault(),Le({loaded:!1,private:Ie.private});var t={fromAddress:X,toAddress:ee,description:le,name:oe,ownedImage:he,image:fe,chainId:Z,private:Ie.private,password:Se||"",values:[],experimental:!0};ut&&ft&&t.values.push({key:ut,value:ft}),console.log(JSON.stringify(t)),fetch(V.g+"/mint3",{method:"POST",headers:{"Content-Type":"application/json",service:"evmetadata"},body:JSON.stringify(t)}).then(function(){var e=Object(l.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Le({loaded:!0,private:Ie.private}),e.next=3,t.json();case 3:n=e.sent,ye=n.data.tokenId,we=n.data.nonce,Ce=n.data.signature,je=n.data.cipherTextHash,Ae(!1),setTimeout((function(){xt(ye,(function(){location.href=location.origin+"/nft?id="+ye}))}),500);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}(e),console.log("test")},type:"submit"},"Create Vault"):me(I.a,{onClick:function(){ct(!0),jt.approve(V.o.vaultHandler[Z],"100000000000000").then((function(e){var t=e.hash;Be(t)})).catch((function(e){4001==(null===e||void 0===e?void 0:e.code)&&ct(!1)}))},type:"submit"},"Approve Coval"):me(I.a,{isDisabled:!0,type:"submit"},"No Wallet Connected!")))),ze?me(_.a,{status:"info"},me(_.b,null),"Talking to contract ..."):null,He?me(_.a,{status:"info"},me(_.b,null),"Making vault ... one moment"):null,it?me(_.a,{status:"info"},me(_.b,null),"Handling approval flow ..."):null))))),Ne?me(q.a,{hash:Ne,onComplete:function(){Be(null),rt?setTimeout((function(){qe(!1),xt(ye,(function(){location.href=location.origin+"/nft?id="+ye}))}),500):it?ct(!1):(console.log("fire?"),at(!0),yt.buyWithSignature(ee,ye,je,we,Ce).then((function(e){var t=e.hash;setTimeout((function(){Be(t),qe(!0)}),100)})).catch((function(e){at(!1),Ae(!1),xt(ye,(function(){location.href=location.origin+"/nft?id="+ye}))})),Ae(!1))}}):null)}var ke=a.a.createElement;function Pe(){return ke(Se,null)}},CoEt:function(e,t,n){"use strict";var r=n("8OQS"),a=n.n(r),o=n("pVnL"),i=n.n(o),c=n("qKvR"),l=n("q1tI"),u=n("FpzS"),s=n("mf32"),d=n("BMxC"),f=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginBottom","marginLeft","marginRight","marginY","marginX","flex","flexBasis","width","minWidth","maxWidth","maxW","minW","w","zIndex","top","right","bottom","left","position","pos"],p=function(e){var t={},n={};for(var r in e)f.includes(r)?t[r]=e[r]:n[r]=e[r];return[t,n]},b=n("w0db"),h=function(e){var t=e.icon,n=a()(e,["icon"]);return"string"===typeof t?Object(c.d)(b.a,i()({focusable:"false",name:t,color:"currentColor"},n)):Object(c.d)(d.a,i()({as:t,"data-custom-icon":!0,focusable:"false",color:"currentColor"},n))},v=Object(l.forwardRef)((function(e,t){return Object(c.d)(d.a,i()({ref:t,position:"absolute",display:"inline-flex",width:"1.5rem",height:"100%",alignItems:"center",justifyContent:"center",right:"0.5rem",top:"50%",pointerEvents:"none",zIndex:2,transform:"translateY(-50%)"},e))})),m=Object(l.forwardRef)((function(e,t){var n=e.placeholder,r=e.children,o=a()(e,["placeholder","children"]);return Object(c.d)(u.a,i()({as:"select",appearance:"none",ref:t,pr:"2rem",pb:"px",lineHeight:"normal"},o),n&&Object(c.d)("option",{value:""},n),r)})),O=Object(l.forwardRef)((function(e,t){var n=e.rootProps,r=e.icon,o=e.iconSize,l=void 0===o?5:o,u=e.iconColor,f=a()(e,["rootProps","icon","iconSize","iconColor"]),b="dark"===Object(s.c)().colorMode?"whiteAlpha.800":"inherit",O=f.isReadOnly||f.isDisabled?.5:null,g=p(f),y=g[0],j=g[1];return Object(c.d)(d.a,i()({position:"relative",width:"100%"},y,n),Object(c.d)(m,i()({ref:t,color:b},j)),Object(c.d)(v,{opacity:O,color:u||j.color||b},Object(c.d)(h,{focusable:"false","aria-hidden":"true",icon:r||"chevron-down",size:l})))}));O.displayName="Select";t.a=O},D7GH:function(e,t,n){"use strict";var r=n("lSNA"),a=n.n(r),o=n("8hg0");function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var c={userSelect:"none",border:"2px",rounded:"md",borderColor:"inherit",transition:"background-color 120ms, box-shadow 250ms"};t.a=function(e){var t={lg:5,md:4,sm:"radio"===e.type?3:"auto"};return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(n,!0).forEach((function(t){a()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},c,{},e.size&&{rounded:"sm"},{},function(e){var t=e.color,n="dark"===e.colorMode,r=n?200:500;return{color:"white",_checked:{bg:Object(o.d)(t,r),borderColor:Object(o.d)(t,r),color:n?"gray.900":void 0},_checkedAndDisabled:{borderColor:n?"transparent":"gray.200",bg:n?"whiteAlpha.300":"gray.200",color:n?"whiteAlpha.500":"gray.500"},_disabled:{bg:n?"whiteAlpha.100":"gray.100",borderColor:n?"transparent":"gray.100"},_focus:{boxShadow:"outline"},_invalid:{borderColor:n?"red.300":"red.500"}}}(e),{size:t[e.size]})}},KEox:function(e,t,n){"use strict";var r=n("pVnL"),a=n.n(r),o=n("8OQS"),i=n.n(o),c=n("qKvR"),l=n("BMxC"),u=n("q1tI"),s=Object(u.forwardRef)((function(e,t){var n=e.orientation,r=i()(e,["orientation"]),o="vertical"===n?{borderLeft:"0.0625rem solid",height:"auto",mx:2}:{borderBottom:"0.0625rem solid",width:"auto",my:2};return Object(c.d)(l.a,a()({ref:t,as:"hr","aria-orientation":n,border:"0",opacity:"0.6"},o,{borderColor:"inherit"},r))}));t.a=s},NWnA:function(e,t,n){"use strict";var r=n("pVnL"),a=n.n(r),o=n("8OQS"),i=n.n(o),c=n("qKvR"),l=n("q1tI"),u=n("6tc4"),s=n("mf32"),d=n("+Z5E"),f=n("D7GH"),p=n("BMxC"),b=n("D7Da"),h=Object(l.forwardRef)((function(e,t){var n=e.id,r=e.name,o=e.value,l=e["aria-label"],h=e["aria-labelledby"],v=e.variantColor,m=void 0===v?"blue":v,O=e.defaultIsChecked,g=e.isChecked,y=e.isFullWidth,j=e.size,w=void 0===j?"md":j,x=e.isDisabled,C=e.isInvalid,S=e.onChange,k=e.onBlur,P=e.onFocus,R=e.children,D=i()(e,["id","name","value","aria-label","aria-labelledby","variantColor","defaultIsChecked","isChecked","isFullWidth","size","isDisabled","isInvalid","onChange","onBlur","onFocus","children"]);Object(b.g)("Radio",m);var E=Object(s.c)().colorMode,I=Object(f.a)({color:m,size:w,colorMode:E,type:"radio"});return Object(c.d)(p.a,a()({as:"label",display:"inline-flex",verticalAlign:"top",htmlFor:n,alignItems:"center",width:y?"full":void 0,cursor:x?"not-allowed":"pointer"},D),Object(c.d)(d.a,{as:"input",type:"radio","aria-label":l,"aria-labelledby":h,id:n,ref:t,name:r,value:o,"aria-invalid":C,defaultChecked:O,onChange:S,onBlur:k,onFocus:P,checked:g,disabled:x}),Object(c.d)(u.a,a()({},I,{type:"radio",rounded:"full"}),Object(c.d)(p.a,{bg:"currentColor",as:"span",rounded:"full",size:"50%"})),R&&Object(c.d)(p.a,{ml:2,fontSize:w,userSelect:"none",opacity:x?.32:1},R))}));h.displayName="Radio",t.a=h},T5bk:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n("DSFK"),a=n("25BE"),o=n("BsWD"),i=n("PYwp");function c(e){return Object(r.a)(e)||Object(a.a)(e)||Object(o.a)(e)||Object(i.a)()}},bLGy:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/create",function(){return n("81Wl")}])},kHIg:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n("foSv"),a=n("s4An");function o(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function i(e,t,n){return(i=o()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var o=new(Function.bind.apply(e,r));return n&&Object(a.a)(o,n.prototype),o}).apply(null,arguments)}function c(e){var t="function"===typeof Map?new Map:void 0;return(c=function(e){if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;var n;if("function"!==typeof e)throw new TypeError("Super expression must either be null or a function");if("undefined"!==typeof t){if(t.has(e))return t.get(e);t.set(e,o)}function o(){return i(e,arguments,Object(r.a)(this).constructor)}return o.prototype=Object.create(e.prototype,{constructor:{value:o,enumerable:!1,writable:!0,configurable:!0}}),Object(a.a)(o,e)})(e)}},r5ed:function(e,t,n){"use strict";var r=n("pVnL"),a=n.n(r),o=n("qKvR"),i=n("q1tI"),c=n("we/t"),l=n("mf32"),u=n("sK1y"),s=Object(i.forwardRef)((function(e,t){var n=Object(l.c)().colorMode,r=Object(c.b)(e);return Object(o.d)(u.a,a()({mt:2,ref:t,id:r.id?r.id+"-help-text":null,color:{light:"gray.500",dark:"whiteAlpha.600"}[n],lineHeight:"normal",fontSize:"sm"},e))}));s.displayName="FormHelperText",t.a=s},wCB1:function(e,t,n){"use strict";n.d(t,"b",(function(){return D})),n.d(t,"c",(function(){return k})),n.d(t,"a",(function(){return S})),n.d(t,"d",(function(){return P})),n.d(t,"e",(function(){return R}));var r=n("pVnL"),a=n.n(r),o=n("8OQS"),i=n.n(o),c=n("qKvR"),l=n("uzN5"),u=n("q1tI"),s=n("BMxC"),d=n("Weur"),f=n("+Cyc"),p=n("D7Da"),b=n("lSNA"),h=n.n(b),v=n("mf32"),m=n("CjxU");function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(n,!0).forEach((function(t){h()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var y={display:"flex",cursor:"pointer",alignItems:"center",justifyContent:"center",transition:"all 0.2s",_focus:{zIndex:"1",boxShadow:"outline"}},j={_disabled:{opacity:.4,cursor:"not-allowed"}},w=function(e){switch(e.variant){case"line":return function(e){var t=e.color;return{tabList:{borderBottom:"2px",borderColor:"inherit"},tab:{borderBottom:"2px",borderColor:"transparent",mb:"-2px",_selected:{color:{light:t+".600",dark:t+".300"}[e.colorMode],borderColor:"currentColor"},_active:{bg:"gray.200"},_disabled:{opacity:.4,cursor:"not-allowed"}}}}(e);case"enclosed":return function(e){var t=e.color,n=e.colorMode,r={light:t+".600",dark:t+".300"},a={light:"#fff",dark:e.theme.colors.gray[800]};return{tab:{roundedTop:"md",border:"1px",borderColor:"transparent",mb:"-1px",_selected:{color:r[n],borderColor:"inherit",borderBottomColor:a[n]}},tabList:{mb:"-1px",borderBottom:"1px",borderColor:"inherit"}}}(e);case"enclosed-colored":return function(e){var t=e.color,n=e.colorMode;return{tab:{border:"1px",borderColor:"inherit",bg:{light:"gray.50",dark:"whiteAlpha.50"}[n],mb:"-1px",_notLast:{mr:"-1px"},_selected:{bg:{light:"#fff",dark:"gray.800"}[n],color:{light:t+".600",dark:t+".300"}[n],borderColor:"inherit",borderTopColor:"currentColor",borderBottomColor:"transparent"}},tabList:{mb:"-1px",borderBottom:"1px",borderColor:"inherit"}}}(e);case"soft-rounded":return function(e){var t=e.color;return{tab:{rounded:"full",fontWeight:"semibold",color:"gray.600",_selected:{color:t+".700",bg:t+".100"}},tabList:{}}}(e);case"solid-rounded":return function(e){var t=e.color,n=e.colorMode;return{tab:{rounded:"full",fontWeight:"semibold",color:{light:"gray.600",dark:"inherit"}[n],_selected:{color:{light:"#fff",dark:"gray.800"}[n],bg:{light:t+".600",dark:t+".300"}[n]}},tabList:{}}}(e);case"unstyled":return{}}},x=function(e){var t,n,r=e.align,a=e.orientation;return"horizontal"===a&&(t={alignItems:"center",justifyContent:{end:"flex-end",center:"center",start:"flex-start"}[r],maxWidth:"full"},n={height:"100%"}),"vertical"===a&&(t={flexDirection:"column"},n={width:"100%"}),{tabList:t,tab:n}},C={sm:{padding:"0.25rem 1rem",fontSize:"0.85rem"},md:{fontSize:"1rem",padding:"0.5rem 1rem"},lg:{fontSize:"1.15rem",padding:"0.75rem 1rem"}},S=Object(u.forwardRef)((function(e,t){var n=e.isSelected,r=e.isDisabled,o=e.id,l=(e.size,i()(e,["isSelected","isDisabled","id","size"])),s=function(){var e=Object(m.b)(),t=Object(u.useContext)(D),n=t.variant,r=t.color,a=t.size,o=t.isFitted,i=t.orientation,c=Object(v.c)().colorMode,l=w({variant:n,color:r,theme:e,colorMode:c}),s=x({orientation:i});return g({},y,{},j,{},C[a],{},l&&l.tab,{},s&&s.tab,{},o&&{flex:1})}();return Object(c.d)(f.a,a()({ref:t,role:"tab",tabIndex:n?0:-1,id:"tab:"+o,outline:"none",as:"button",type:"button",disabled:r,"aria-selected":n,"aria-disabled":r,"aria-controls":"panel:"+o},s,l))}));S.displayName="Tab";var k=Object(u.forwardRef)((function(e,t){var n=e.children,r=e.onKeyDown,o=(e.onClick,i()(e,["children","onKeyDown","onClick"])),l=Object(u.useContext)(D),s=l.id,f=l.index,b=l.manualIndex,h=l.onManualTabChange,v=l.isManual,O=l.onChangeTab,y=l.onFocusPanel,j=l.orientation,C=function(){var e=Object(m.b)(),t=Object(u.useContext)(D),n=t.variant,r=t.align,a=t.orientation,o=w({variant:n,theme:e}),i=x({align:r,orientation:a});return g({},o&&o.tabList,{},i&&i.tabList)}(),S=Object(u.useRef)([]),k=Object(p.b)(n),P=k.map((function(e,t){return!0===e.props.isDisabled?null:t})).filter((function(e){return null!=e})),R=P.indexOf(f),E=P.length,I=function(e){var t=P[e];S.current[t].focus(),O&&O(t)},L=k.map((function(e,t){var n=v?t===b:t===f;return Object(u.cloneElement)(e,{ref:function(e){return S.current[t]=e},isSelected:n,onClick:function(n){S.current[t].focus(),h(t),O(t),e.props.onClick&&e.props.onClick(n)},id:s+"-"+t})}));return Object(c.d)(d.a,a()({onKeyDown:function(e){"ArrowRight"===e.key&&(e.preventDefault(),I((R+1)%E));"ArrowLeft"!==e.key&&"ArrowUp"!==e.key||(e.preventDefault(),I((R-1+E)%E));"Home"===e.key&&(e.preventDefault(),I(0)),"End"===e.key&&(e.preventDefault(),I(E-1)),"ArrowDown"===e.key&&(e.preventDefault(),y&&y()),r&&r(e)},ref:t,role:"tablist","aria-orientation":j},C,o),L)}));k.displayName="TabList";var P=Object(u.forwardRef)((function(e,t){var n=e.children,r=e.isSelected,o=e.selectedPanelRef,l=e.id,u=i()(e,["children","isSelected","selectedPanelRef","id"]);return Object(c.d)(s.a,a()({ref:function(e){r&&Object(p.a)(o,e),Object(p.a)(t,e)},role:"tabpanel",tabIndex:-1,"aria-labelledby":"tab:"+l,hidden:!r,id:"panel:"+l,outline:0},u),n)}));P.displayName="TabPanel";var R=Object(u.forwardRef)((function(e,t){var n=e.children,r=i()(e,["children"]),o=Object(u.useContext)(D),l=o.index,d=o.selectedPanelRef,f=o.id,b=o.isManual,h=o.manualIndex,v=Object(p.b)(n).map((function(e,t){return Object(u.cloneElement)(e,{isSelected:b?t===h:t===l,selectedPanelRef:d,id:f+"-"+t})}));return Object(c.d)(s.a,a()({tabIndex:"-1",ref:t},r),v)}));R.displayName="TabPanels";var D=Object(u.createContext)(),E=Object(u.forwardRef)((function(e,t){var n=e.children,r=e.onChange,o=e.index,d=e.defaultIndex,f=e.isManual,b=e.variant,h=void 0===b?"line":b,v=e.variantColor,m=void 0===v?"blue":v,O=e.align,g=void 0===O?"start":O,y=e.size,j=void 0===y?"md":y,w=e.orientation,x=void 0===w?"horizontal":w,C=e.isFitted,S=i()(e,["children","onChange","index","defaultIndex","isManual","variant","variantColor","align","size","orientation","isFitted"]);Object(p.g)("Tabs",m);var k=Object(u.useRef)(null!=o).current,P=Object(u.useRef)(),R=Object(u.useState)((function(){return f?o||d||0:d||0})),E=R[0],I=R[1],L=Object(u.useState)(o||d||0),W=L[0],N=L[1],B=f?E:k?o:E,T=k?o:W,F={id:Object(l.a)(),index:B,manualIndex:T,onManualTabChange:function(e){k||N(e),f&&r&&r(e)},isManual:f,onChangeTab:function(e){k||I(e),k&&f&&I(e),f||r&&r(e)},selectedPanelRef:P,onFocusPanel:function(){P.current&&P.current.focus()},color:m,size:j,align:g,variant:h,isFitted:C,orientation:x};return Object(c.d)(D.Provider,{value:F},Object(c.d)(s.a,a()({ref:t},S),n))}));E.displayName="Tabs";t.f=E}},[["bLGy",1,0,12,14,29,2,3,4,5,6,8,7,9,10,11,13,15,19,21]]]);