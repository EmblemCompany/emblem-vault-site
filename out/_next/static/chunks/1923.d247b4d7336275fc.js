"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1923],{81923:function(e,n,s){s.r(n),s.d(n,{default:function(){return U}});var r=s(85893),i=s(67294),t=s(11163),c=s(77044),l=s(11987),o=s(45161),d=s(22602),a=s(7636),x=s(36390),h=s(46685),j=s(14e3),u=s(89693),m=s(89423),f=s(51343),p=s(22797),b=s(4046),g=s(93108),k=s(97878),w=s(32883),C=s(20640),y=s.n(C),T=s(62892),v=s(80902),K=s(93007);function U(e){let{isOpen:n,onClose:s}=e,{chainId:C}=(0,c.Ge)(),{colorMode:U,toggleColorMode:I}=(0,o.If)(),{pathname:z}=(0,t.useRouter)();(0,v.TL)("d",I);let[_,N]=(0,K.u2)(),[S,V]=(0,K.xZ)(),[E,H]=(0,K.kX)(),[P]=(0,K.GU)(),[R]=(0,K.HL)(),M=null;if("number"==typeof C&&(P||R)&&("/buy"===z||"/sell"===z)){let e={[T.nV.CHAIN]:C,..."/buy"===z?{...P?{[T.nV.OUTPUT]:P.address}:{},...R?{[T.nV.INPUT]:R.address}:{}}:{...P?{[T.nV.INPUT]:P.address}:{},...R?{[T.nV.OUTPUT]:R.address}:{}}};M=(0,l.resolve)("https://emblem.finance","".concat(z,"?").concat(Object.entries(e).map(e=>{let[n,s]=e;return"".concat(n,"=").concat(s)}).join("&")))}let[O,D]=(0,i.useState)(!1);return(0,i.useEffect)(()=>{if(O){let e=setTimeout(()=>{D(!1)},750);return()=>{clearTimeout(e)}}},[O]),(0,r.jsxs)(d.u_,{isOpen:n,onClose:s,isCentered:!0,children:[(0,r.jsx)(a.Z,{}),(0,r.jsxs)(x.h,{color:T.r$[U],children:[(0,r.jsx)(h.x,{children:(0,r.jsx)(j.x,{children:"Settings (Build #2021)"})}),(0,r.jsx)(u.o,{}),(0,r.jsx)(m.f,{children:(0,r.jsxs)(f.K,{direction:"column",children:[(0,r.jsxs)(f.K,{direction:"row",justify:"space-between",children:[(0,r.jsx)(j.x,{children:"Dark Mode"}),(0,r.jsx)(p.r,{isChecked:"dark"===U,onChange:I})]}),(0,r.jsxs)(f.K,{direction:"row",justify:"space-between",children:[(0,r.jsx)(j.x,{children:"Approve Max"}),(0,r.jsx)(p.r,{isChecked:_,onChange:N})]}),(0,r.jsxs)(f.K,{direction:"row",justify:"space-between",children:[(0,r.jsx)(j.x,{children:"Deadline"}),(0,r.jsxs)(f.K,{direction:"column",spacing:0,alignItems:"flex-end",w:"50%",flexShrink:0,children:[(0,r.jsxs)(b.iR,{min:60,max:3600,step:60,value:S,onChange:V,children:[(0,r.jsx)(b.Uj,{}),(0,r.jsx)(b.Ms,{}),(0,r.jsx)(b.gs,{})]}),(0,r.jsxs)(f.K,{direction:"row",minHeight:"1.5rem",children:[S!==T.fc&&(0,r.jsx)(g.z,{size:"xs",onClick:()=>{V(T.fc)},children:"Reset"}),(0,r.jsxs)(j.x,{children:[S/60," ",60===S?"minute":"minutes"]})]})]})]}),(0,r.jsxs)(f.K,{direction:"row",justify:"space-between",children:[(0,r.jsx)(j.x,{children:"Slippage Tolerance"}),(0,r.jsxs)(f.K,{direction:"column",spacing:0,alignItems:"flex-end",w:"50%",flexShrink:0,children:[(0,r.jsxs)(b.iR,{min:0,max:400,step:10,value:E,onChange:H,children:[(0,r.jsx)(b.Uj,{}),(0,r.jsx)(b.Ms,{}),(0,r.jsx)(b.gs,{})]}),(0,r.jsxs)(f.K,{direction:"row",minHeight:"1.5rem",children:[E!==T.zI&&(0,r.jsx)(g.z,{size:"xs",onClick:()=>{H(T.zI)},children:"Reset"}),(0,r.jsxs)(j.x,{children:[(E/100).toFixed(0===E?0:1),"%"]})]})]})]})]})}),(0,r.jsxs)(k.m,{justifyContent:"space-between",children:["string"==typeof M&&(0,r.jsx)(g.z,{variant:"link",isDisabled:O,color:"blue.500",width:"min-content",onClick:()=>{try{window.navigator.share({title:"Emblem Vault",url:M}).catch(()=>{})}catch(n){var e;e=M,y()(e),D(!0)}},children:O?"Copied":"Share Permalink"}),(0,r.jsx)(w.r,{href:"https://github.com/NoahZinsmeister/hypertext",target:"_blank",rel:"noopener noreferrer",color:"blue.500",children:"Based on Hypertext."}),(0,r.jsx)(w.r,{href:"https://github.com/EmblemCompany/emblem-vault-site/tree/".concat("master"),target:"_blank",rel:"noopener noreferrer",color:"blue.500",children:"master".slice(0,7)})]})]})]})}}}]);