(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9150],{469:function(e,r,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/featured",function(){return s(27181)}])},33862:function(e,r,s){"use strict";s.d(r,{Z:function(){return k}});var t=s(85893),n=s(67294),l=s(62850),i=s(6089);class a extends n.Component{render(){return(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("div",{className:"sketchfab-embed-wrapper",children:(0,t.jsx)("iframe",{width:"100%",src:this.props.url,frameBorder:"0",allow:"autoplay; fullscreen; vr",allowFullScreen:!0})})})}}class o extends n.Component{render(){let e=this.props.url.replace("paused=true","paused=false");return(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("iframe",{width:"95%",frameBorder:"0",src:e,allowFullScreen:!0})})}}class c extends n.Component{render(){let e=this.props.url.replace("paused=true","paused=false");return(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("iframe",{height:"753px",src:e,seamless:!0})})}}class d extends n.Component{render(){let e=this.props.url.replace("paused=true","paused=false");return(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("iframe",{width:"95%",height:"100%",scrolling:"no",frameBorder:"no",allow:"autoplay",src:e})})}}class u extends n.Component{render(){let e=this.props.url.replace("paused=true","paused=false");return(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("iframe",{width:"95%",height:"256px",scrolling:"no",frameBorder:"no",allow:"autoplay",src:e})})}}class p extends n.Component{render(){return(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("iframe",{src:this.props.url,frameBorder:"0",scrolling:"no",width:"580",height:"326",allowFullScreen:!0})})}}class h extends n.Component{render(){return(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("iframe",{src:this.props.url,width:"800",height:"600",allowFullScreen:!0})})}}class m extends n.Component{render(){return(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("iframe",{width:"230",height:"285",src:this.props.url,frameBorder:"0",scrolling:"no",allowTransparency:!0})})}}class x extends n.Component{render(){return(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("iframe",{src:this.props.url,width:"100%",height:"400",allow:"encrypted-media"})})}}class f extends n.Component{render(){return(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("iframe",{frameBorder:"0",scrolling:"no",src:this.props.url,width:"100%",height:"400",allow:"encrypted-media"})})}}class g extends n.Component{render(){return(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("iframe",{className:"ytembed",src:this.props.url.split(" ")[0].trim().replace('"',"").replace("/watch?v=","/embed/"),width:"100%",height:"315",frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0})})}}class j extends n.Component{render(){return(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("iframe",{src:this.props.url,width:"100%",frameBorder:"0",allow:"autoplay; fullscreen; picture-in-picture",allowFullScreen:!0})})}}class w extends n.Component{render(){let e=this.props.url||"",r=e.replace("ipfs://","").split("?")[0].split("&")[0];return e.includes("ipfs://")&&(e="https://gateway.ipfs.io/ipfs/"+r,y(r)),e.includes("image-scale")&&(e+="&size=400"),(0,t.jsx)(t.Fragment,{children:e.includes("sketchfab.com/")?(0,t.jsx)(a,{url:e}):e.includes("shadertoy.com/")?(0,t.jsx)(o,{url:e}):e.includes("bandcamp.com/")?(0,t.jsx)(c,{url:e}):e.includes("soundcloud.com/")?(0,t.jsx)(d,{url:e}):e.includes("clyp.it/")?(0,t.jsx)(u,{url:e}):e.includes("sketchup.com/")?(0,t.jsx)(p,{url:e}):e.includes("clara.io/")?(0,t.jsx)(h,{url:e}):e.includes("myminifactory.com/")?(0,t.jsx)(m,{url:e}):e.includes("audius.co/")?(0,t.jsx)(x,{url:e}):e.includes("youtube.com")?(0,t.jsx)(g,{url:e}):e.includes("vimeo.com")?(0,t.jsx)(j,{url:e}):e.includes("ipfs.io")?(0,t.jsx)(i.E,{p:"20px",h:"100%",className:this.props.className+" "+r||"d-block w-100",src:e,width:"250px",maxWidth:"250px"}):e.includes("image-scaler.vercel")?(0,t.jsx)(i.E,{p:"20px",h:"100%",className:this.props.className||"d-block w-100",src:e,width:"250px",height:"300px"}):e.includes("/dynamic/")||e.includes("https://s3.amazonaws.com/")||e.includes("googleusercontent.com")||e.includes("ipfs.io")||e.includes("framed/")||e.includes(".png")||e.includes(".jpg")||e.includes(".jpeg")||e.includes(".gif")||e.includes(".svg")||e.includes("data:image")?(0,t.jsx)(i.E,{p:"20px",h:"100%",className:this.props.className||"d-block w-100",src:(0,l.yo)(e)?e:"https://raw.githubusercontent.com/EmblemCompany/Coval-Site/master/public/coval-logo.png",width:"250px",maxWidth:"250px"}):(0,t.jsx)(f,{url:e})})}}let y=async function(e){let r=await fetch("https://gateway.ipfs.io/ipfs/"+e,{method:"GET"}),s=await r.text();if(s.includes("data:image")){let r=document.querySelector("img."+e);r.src=s,console.log(s)}};var k=w},71114:function(e,r,s){"use strict";var t=s(85893);s(67294);var n=s(93717),l=s(71293),i=s(81136);r.Z=()=>(0,t.jsxs)(n.k,{pb:2,justify:"center",children:[(0,t.jsx)(l.x,{pr:2,children:"Refreshing "}),(0,t.jsx)(i.$,{})]})},74174:function(e,r,s){"use strict";var t=s(85893),n=s(67294),l=s(57747),i=s(6089),a=s(71293),o=s(32883),c=s(34292),d=s(48783),u=s(62850);class p extends n.Component{render(){let e=this.props.coin,r=this.props.mine,s=this.props.onRenew,n=this.props.hideAsset;return(0,t.jsxs)(c.U,{className:"img-stack",w:"300px",p:2,children:[(0,t.jsx)(l.xu,{className:"coin-image-container",w:"100%","min-width":"40px",children:e.image?(0,t.jsx)(i.E,{className:"NFT-image-small",width:"40px",src:e.image}):e.address&&(0,u.yo)("https://token-icons.s3.amazonaws.com/"+e.address+".png")?(0,t.jsx)(i.E,{width:"40px",src:"https://token-icons.s3.amazonaws.com/"+e.address+".png"}):e.coin&&(0,u.yo)("https://s3.amazonaws.com/token-icons/"+e.coin.toLowerCase()+".png")?(0,t.jsx)(i.E,{width:"40px",src:"https://s3.amazonaws.com/token-icons/"+e.coin.toLowerCase()+".png"}):(0,t.jsx)(l.Cd,{size:"40px",bg:"gray",color:"white",isTruncated:!0,children:e.symbol?e.symbol.toLowerCase():e.name})}),(0,t.jsxs)(d.g,{p:"10px",w:"100%",children:[(0,t.jsxs)(c.U,{w:"300px",children:[(0,t.jsx)(a.x,{float:"left",width:"50%",fontWeight:"bold",color:"dark"==this.props.colorMode?"white":"black",isTruncated:!0,mb:"unset",children:e.name}),(0,t.jsxs)(a.x,{float:"right",width:"40%",textAlign:"right",fontWeight:"bold",color:"dark"==this.props.colorMode?"lightgreen":"forestgreen",children:["$",e&&e.price&&e.price>0?Number(e.price.toFixed(2)).toLocaleString():0]})]}),(0,t.jsxs)(c.U,{w:"100%",mt:0,spacing:"4px",className:"coin-display-row",children:[(0,t.jsxs)(a.x,{position:"relative",fontSize:"xs",width:"50%",left:"-10px",color:"dark"==this.props.colorMode?"navajowhite":"gray",children:[e&&e.balance?Number(Number(e.balance).toFixed(3)).toLocaleString():null," ",(e.symbol?e.symbol:e.project?e.project:e.name)+" "]}),(0,t.jsxs)(a.x,{width:"45%",textAlign:"right",fontSize:"xs",right:"40px",children:[e.coin.toLowerCase()," chain"]})]}),(0,t.jsxs)(c.U,{width:"100%",children:["nft"==e.type&&e.external_url?(0,t.jsx)(o.r,{className:"view-nft-link",color:"dark"==this.props.colorMode?"navajowhite":"gray",href:e.external_url,isExternal:!0,mb:"unset",children:"View NFT"}):null,"nmc"==e.coin.toLowerCase()&&r&&"nft"==e.type?(0,t.jsx)(o.r,{className:"view-nft-link",color:"dark"==this.props.colorMode?"navajowhite":"gray",onClick:()=>{s(e.name)},children:"Renew"}):null]}),r&&!1!=n?(0,t.jsx)(o.r,{className:"view-nft-link",color:"dark"==this.props.colorMode?"navajowhite":"gray",onClick:()=>{n(e)},children:"Hide"}):null]})]},e.name)}}r.Z=p},27181:function(e,r,s){"use strict";s.r(r),s.d(r,{default:function(){return k}});var t=s(85893),n=s(45161),l=s(93717),i=s(71293),a=s(51343),o=s(32883),c=s(57747),d=s(70758),u=s.n(d),p=s(71114),h=s(11163),m=s(77044),x=s(67294),f=s(31238),g=s(74174),j=s(33862);function w(){let{query:e}=(0,h.useRouter)(),{account:r,chainId:s}=(0,m.Ge)(),[d,w]=(0,x.useState)([]),[y,k]=(0,x.useState)({loaded:!1}),[b,v]=(0,x.useState)(!1),[N,C]=(0,x.useState)(e.address),[S,E]=(0,x.useState)(e.experimental),{colorMode:F}=(0,n.If)(),_=async()=>{T();try{let e=await fetch(f.HP+"/featured/",{method:"GET",headers:{"Content-Type":"application/json",service:"evmetadata",chainId:s.toString()}}),r=await e.json();k({loaded:!0}),w(r),L(r),v(!1)}catch(e){}},T=()=>{let e=JSON.parse(localStorage.getItem((N||r)+"_"+s+"_featured"));e&&(k({loaded:!0}),w(e),v(!0))},L=e=>{localStorage.setItem((N||r)+"_"+s+"_featured",JSON.stringify(e))},[W,z]=(0,x.useState)("");(0,x.useEffect)(()=>{r&&W!=r&&(z(r),k({loaded:!1}),_())},[r,W]);let[A,B]=(0,x.useState)(s);return(0,x.useEffect)(()=>{s&&A!=s&&(B(s),k({loaded:!1}),_())},[s,A]),(0,x.useEffect)(()=>{d.length<1?_():k({loaded:!0})},[]),(0,t.jsxs)(u(),{loaded:y.loaded,children:[b?(0,t.jsx)(p.Z,{}):"",(0,t.jsx)(l.k,{w:"100%",justify:"center",flexWrap:"wrap",mt:10,children:d.length?d.map((e,r)=>{let s=location.pathname.split("/");s.pop();let n=location.origin+s.join("/")+"/nft?id="+e.tokenId,l={flex:"1",minW:"390px",maxW:"390px",borderWidth:"1px",color:"white",mx:"6",mb:"6",rounded:"lg",overflow:"hidden",borderColor:"claimed"==e.status?"green !important":"",cursor:"pointer"};return(0,t.jsxs)(c.xu,{className:"NFT",...l,onClick:function(){location.href=n},children:[(0,t.jsxs)(i.x,{fontWeight:"semibold",textAlign:"center",mt:2,children:[e.name,!e.private&&e.totalValue>0?": ~$"+e.totalValue:null]}),(0,t.jsx)(a.K,{align:"center",children:(0,t.jsx)(j.Z,{url:e.image})}),(0,t.jsx)(c.xu,{display:"flex",alignItems:"baseline",children:(0,t.jsx)(c.xu,{color:"gray.500",fontWeight:"semibold",letterSpacing:"wide",fontSize:"sm",ml:"2",children:e.private?(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(i.x,{children:"Contents hidden. Click to view the vault and unlock values."})}):e.values.length?e.values.map((e,r)=>r<4?(0,t.jsx)(a.K,{children:(0,t.jsx)(g.Z,{colorMode:F,coin:e,mine:!1,onRenew:()=>{},hideAsset:()=>{}})}):4==r?(0,t.jsx)(i.x,{fontWeight:"bold",mt:2,children:"... Click to see the rest ..."}):void 0):(0,t.jsxs)(i.x,{children:["Nothing in here! ",(0,t.jsx)("br",{}),"Click to fill 'er up!"]})})}),(0,t.jsx)(a.K,{align:"center",mt:3,children:"claimed"==e.status?(0,t.jsx)(i.x,{color:"green.500",children:"CLAIMED"}):null})]},r)}):(0,t.jsxs)(i.x,{children:["YOU DON'T SEEM TO HAVE ANY VAULTS."," ",(0,t.jsx)(o.r,{color:"#638cd8",href:"../create",children:"CREATE ONE HERE!"})]})})]})}var y=s(51704);function k(){return(0,t.jsx)(x.Suspense,{fallback:(0,t.jsx)("h1",{children:"Loading vaults..."}),children:(0,t.jsx)(y.Z,{fallback:(0,t.jsx)("h2",{children:"Oops! Something went wrong."}),children:(0,t.jsx)(w,{})})})}},34292:function(e,r,s){"use strict";s.d(r,{U:function(){return i}});var t=s(51343),n=s(16554),l=s(85893),i=(0,n.G)((e,r)=>(0,l.jsx)(t.K,{align:"center",...e,direction:"row",ref:r}));i.displayName="HStack"},32883:function(e,r,s){"use strict";s.d(r,{r:function(){return c}});var t=s(16554),n=s(27440),l=s(33179),i=s(65548),a=s(25432),o=s(85893),c=(0,t.G)(function(e,r){let s=(0,n.mq)("Link",e),{className:t,isExternal:c,...d}=(0,l.Lr)(e);return(0,o.jsx)(i.m.a,{target:c?"_blank":void 0,rel:c?"noopener":void 0,ref:r,className:(0,a.cx)("chakra-link",t),...d,__css:s})});c.displayName="Link"},48783:function(e,r,s){"use strict";s.d(r,{g:function(){return i}});var t=s(51343),n=s(16554),l=s(85893),i=(0,n.G)((e,r)=>(0,l.jsx)(t.K,{align:"center",...e,direction:"column",ref:r}));i.displayName="VStack"}},function(e){e.O(0,[758,9774,2888,179],function(){return e(e.s=469)}),_N_E=e.O()}]);