"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3264],{43264:function(e,t,n){n.d(t,{Z:function(){return ea}});var a=n(85893),l=n(7335),i=n(45161),s=n(57747),o=n(93717),r=n(51343),c=n(93108),d=n(71293),u=n(32883),h=n(36752),m=n(77458),g=n(35232),p=n(72047),x=n(37365),f=n(33090),j=n(78590),S=n(34292),w=n(74153),b=n(7405),y=n(6089),v=n(8161),C=n(9008),k=n.n(C),T=n(77044),A=n(67294),N=n(11163),O=n(71114),E=n(70758),H=n.n(E),I=n(5152),_=n.n(I),M=n(77294),q=n(64541),P=n(31238),V=n(80902),F=n(62850),z=n(81354),Z=n.n(z),D=n(30724),L=n.n(D),W=n(10043),G=n.n(W),K=n(33862),U=n(97903),B=n(74174),R=n(35649),J=n(18974),$=n(87070),X=n(38299);let Y=(e,t,n,a)=>new M.CH(e,t,n.getSigner(a).connectUnchecked());function Q(e){let{account:t,library:n}=(0,T.Ge)(),[l,i]=(0,A.useState)(!1),[s,r]=(0,A.useState)(null),[d,u]=(0,A.useState)(null),[h,m]=(0,A.useState)(null);return(0,A.useEffect)(()=>{var a;!h&&e.handler&&m(Y((a=e.handler).address,a.abi,n,t))}),(0,A.useEffect)(()=>{var a;!d&&e.spending&&u(Y((a=e.spending).address,a.abi,n,t))}),(0,A.useEffect)(()=>{var n,a,l;d&&(n=e.handler,e.spending,(l=e.amount)>0?d.decimals().then(e=>{r(e),d.allowance(t,n.address).then(t=>{i(t>=l*10**e)})}):d.isApprovedForAll(t,n.address).then(e=>{i(e)}))}),t&&!l?(0,a.jsx)(o.k,{w:"100%",flexWrap:"wrap",mt:3,children:(0,a.jsx)(c.z,{onClick:function(){return e.amount>0?void d.approve(e.handler.address,1e6*10**s).then(t=>{e.watcher(t.hash,e=>{1===e.status&&i(!0)})}):void d.setApprovalForAll(e.handler.address,!0).then(t=>{e.watcher(t.hash,e=>{1===e.status&&i(!0)})})},backgroundColor:"#02b402",color:"black !important",fontWeight:"bold !important",width:"100%",children:e.label})}):null}var ee=n(10063);let et=_()(()=>Promise.all([n.e(749),n.e(8159),n.e(6115),n.e(7414)]).then(n.bind(n,37414)),{loadableGenerated:{webpack:()=>[37414]}}),en=_()(()=>Promise.all([n.e(749),n.e(8159),n.e(1817)]).then(n.bind(n,81817)),{loadableGenerated:{webpack:()=>[81817]}});function ea(){let{account:e,chainId:t,library:n}=(0,T.Ge)(),{query:C}=(0,N.useRouter)(),[E,I]=(0,A.useState)("t"==C.cc),[_,z]=(0,A.useState)("true"==C.townHall),[D,W]=(0,A.useState)({to:[]}),[Y,ea]=(0,A.useState)(!1),[el,ei]=(0,A.useState)(C.key),[es,eo]=(0,A.useState)(C.offer||!1),[er,ec]=(0,A.useState)("true"==C.debug),[ed,eu]=(0,A.useState)(null),[eh,em]=(0,A.useState)(C.framed||!0),[eg,ep]=(0,A.useState)(C.id),[ex,ef]=(0,A.useState)(C.slideshowOnly||!1),[ej,eS]=(0,A.useState)(""),[ew,eb]=(0,A.useState)(""),[ey,ev]=(0,A.useState)(""),[eC,ek]=(0,A.useState)(""),[eT,eA]=(0,A.useState)(""),[eN,eO]=(0,A.useState)(""),[eE,eH]=(0,A.useState)(""),[eI,e_]=(0,A.useState)([]),[eM,eq]=(0,A.useState)(!1),[eP,eV]=(0,A.useState)([]),[eF,ez]=(0,A.useState)([]),[eZ,eD]=(0,A.useState)([]),[eL,eW]=(0,A.useState)(!1),[eG,eK]=(0,A.useState)(0),[eU,eB]=(0,A.useState)(null),[eR,eJ]=(0,A.useState)(null),[e$,eX]=(0,A.useState)(null),[eY,eQ]=(0,A.useState)(""),[e0,e1]=(0,A.useState)(""),[e7,e2]=(0,A.useState)({loaded:!1}),[e3,e4]=(0,A.useState)(!1),[e5,e8]=(0,A.useState)(!1),[e9,e6]=(0,A.useState)("claimed"),[te,tt]=(0,A.useState)(!1),[tn,ta]=(0,A.useState)(null),[tl,ti]=(0,A.useState)(""),[ts,to]=(0,A.useState)(""),[tr,tc]=(0,A.useState)(""),[td,tu]=(0,A.useState)([]),[th,tm]=(0,A.useState)(!1),[tg,tp]=(0,A.useState)(""),[tx,tf]=(0,A.useState)(!1),[tj,tS]=(0,A.useState)(""),[tw,tb]=(0,A.useState)(!1),[ty,tv]=(0,A.useState)(!1),[tC,tk]=(0,A.useState)(!1),[tT,tA]=(0,A.useState)(!1),[tN,tO]=(0,A.useState)(""),[tE,tH]=(0,A.useState)(!1),[tI,t_]=(0,A.useState)(!1),[tM,tq]=(0,A.useState)(!1),[tP,tV]=(0,A.useState)(null),[tF,tz]=(0,A.useState)(!1),[tZ,tD]=(0,A.useState)(!1),[tL,tW]=(0,A.useState)(null),[tG,tK]=(0,A.useState)(null),[tU,tB]=(0,A.useState)(null),[tR,tJ]=(0,A.useState)(null),[t$,tX]=(0,A.useState)(!1),[tY,tQ]=(0,A.useState)(!1),[t0,t1]=(0,A.useState)(!1),[t7,t2]=(0,A.useState)(!1),[t3,t4]=(0,A.useState)(null),[t5,t8]=(0,A.useState)({name:"",image:"",metadata:""}),[t9,t6]=(0,A.useState)({migrating:!1,name:"",chain:"",4:"",1:"",tokenId:{},serialNumber:{hex:""}}),[ne,nt]=(0,A.useState)({name:"",image:"",metadata:""}),[nn,na]=(0,A.useState)({name:"",chain:"",4:"",1:"",tokenId:{},serialNumber:{hex:""}}),[nl,ni]=(0,A.useState)(!1),[ns,no]=(0,A.useState)(!1),[nr,nc]=(0,A.useState)(null),[nd,nu]=(0,A.useState)(null),[nh,nm]=(0,A.useState)(null),[ng,np]=(0,A.useState)(null),[nx,nf]=(0,A.useState)(!1),[nj,nS]=(0,A.useState)(!1),[nw,nb]=(0,A.useState)({}),ny=(0,V.cq)(P.q7.vaultHandler[t],P.q7.vaultHandlerAbi,!0),nv=(0,V.cq)(P.q7.vaultHandlerV8[t],P.q7.vaultHandlerV8Abi,!0),nC=(0,V.cq)(P.q7.emblemVault[t],P.q7.emblemAbi,!0),nk=(0,V.cq)(P.q7.coval[t],P.q7.covalAbi,!0),{isOpen:nT,onOpen:nA,onClose:nN}=(0,l.q)(),{isOpen:nO,onOpen:nE,onClose:nH}=(0,l.q)(),{isOpen:nI,onToggle:n_}=(0,l.q)(),{isOpen:nM,onToggle:nq}=(0,l.q)(),{isOpen:nP,onToggle:nV}=(0,l.q)(),{colorMode:nF}=(0,i.If)(),nz=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return new M.CH(t,P.q7.erc1155Abi,n.getSigner(e).connectUnchecked())},nZ=(e,n)=>{fetch(P._z+"/liveliness",{method:"POST",headers:{"Content-Type":"application/json",service:"evmetadata",chainid:t.toString()},body:JSON.stringify({tokenId:e})}).then(async function(e){let t=await e.json();return tz(t.live),console.log("Liveliness check",t),n(t.live)})},nD=(t,n,a)=>{console.log("Delayed Minting"),tX(!1),tQ(!0),t1(!0);let l=eZ.filter(e=>"ETH"==e.coin)[0].address;console.log("--------------------------------------------------------Delayed Minting",e,eg,l,t,n,a),ny.buyWithSignature2(e,eg,l,t,n,a).then(e=>{let{hash:t}=e;setTimeout(()=>{eX(t),tQ(!1)},100)}).catch(e=>{console.log("AAAAAHHHHHH",e),tQ(!1)})},nL=()=>{console.log(el),tv(!0),nG(t=>{ny.transferWithCode(eg,el,e,t.nonce,t.signature).then(e=>{let{hash:t}=e;setTimeout(()=>{eX(t)},100)}).catch(e=>{tv(!1),(null==e?void 0:e.code)!==4001&&console.log("tx failed.",e)})})},nW=async()=>{let t=await fetch(P._z+"/meta/"+eg+"?experimental=true"+(E?"&_vercel_no_cache=1":""),{method:"GET",headers:{"Content-Type":"application/json",service:"evmetadata",cc:E?"t":""}}),n=await t.json(),a=await F.SZ.generateMigrateReport(e,!0);(a=Object.keys(a).map(e=>({...a[e],tokenId:e})).find(e=>e.tokenId==eg))&&a.to&&a.to.length>0&&(n.move=a),nb(n),nK(n),n.image_ipfs,n.collectionAddress&&(t2(!0),t4(n.collectionAddress)),n.name?(tm(!1),tb(!1)):(e2({loaded:!0}),tb(!0)),eL||eM||nB([],eg,e=>{e&&e_(e)})},nG=async e=>{let n=await fetch(P.HP+"/witness/"+eg,{method:"GET",headers:{"Content-Type":"application/json",cc:"t",service:"evmetadata",chainid:t.toString()}}),a=await n.json();return a.signature?(console.log("witness",a),e(a)):e(!1)},nK=e=>{if(eh&&e.image&&!e.image.includes("framed=")&&!e.image.includes("http")&&(e.image=e.image+"&framed="+eh),e.ciphertextV2&&ek(e.ciphertextV2),nS(e.mintLocked&&0==e.mintLockBlock),eS(e.name),eO(e.image),eH(e.ownedImage||null),eA(e.description),eK(e.totalValue||0),e.values&&e_(eI.concat(e.values)),e.attributes&&eV(e.attributes.filter(e=>"key"===e.trait_type)),e.attributes&&ez(e.attributes),eD(e.addresses),eb(e.ipfs||null),ev(e.image_ipfs||null),e.targetAsset&&t8(e.targetAsset),e.targetContract&&t6(e.targetContract),e.move_targetContract&&na(e.move_targetContract),e.move_targetAsset&&nt(e.move_targetAsset),"Migrated Vault"==e.name||e.targetContract&&e.targetContract[t]&&!e.targetContract.migrating)return location.href=location.origin+"/nft2?id="+eg,!1;tz(!1!=e.live),tW(e.nonce),tB(e.signature),tJ(e.to),eJ(e.network),eB("mainnet"==e.network?1:"rinkeby"==e.network?4:"mumbai"==e.network?80001:"matic"==e.network?137:"xdai"==e.network?100:"bsc"==e.network?56:"fantom"==e.network?250:"bitcoin"==e.network?0:"aurora"==e.network?1313161554:97),e6(e.status),"claimed"===e9&&ta(e.claimedBy),eW(e.addresses.filter(e=>e.address.includes("private:")).length>0),e.sealed?tt(!0):tt(!1),e.move&&e.move.to&&e.move.to.length>0&&W(e.move),e2({loaded:!0})},nU=async(e,t,n)=>{let a=await fetch(P.HP+"/vault/balance/"+t,{method:"GET",headers:{"Content-Type":"application/json",service:"evmetadata"}}),l=await a.json();return n((console.log("response",a,l),l.balances.length>0)?e.concat(l.balances):e)},nB=async(e,t,n)=>{if(eM)return n(!1);eq(!0);let a=await fetch(P.HP+"/vault/balance/"+t+"?live=true&_vercel_no_cache=1",{method:"GET",headers:{"Content-Type":"application/json",service:"evmetadata"}}),l=await a.json();return n((console.log("response",a,l),l.balances.length>0)?e.concat(l.balances):e)},nR=async(e,t,n,a)=>{let l=await fetch(P.HP+"/vault/balance/"+t+"/"+n,{method:"GET",headers:{"Content-Type":"application/json",service:"evmetadata"}}),i=await l.json();return a((console.log("response",l,i),i.balances.length>0)?e.concat(i.balances):e)},nJ=()=>{localStorage.setItem(e+"_"+t+"_"+eg+"_mintPassword",tN)},n$=()=>{let n=localStorage.getItem(e+"_"+t+"_"+eg+"_mintPassword");n&&tT&&ei(n)},nX=async(e,n,a)=>{var l=new Headers;l.append("chainid",t.toString()),l.append("Content-Type","application/json");var i=JSON.stringify({signature:e,tokenId:n});let s=await fetch(P.pU+"/sign",{method:"POST",headers:l,body:i,redirect:"follow"}),o=await s.json();return a(o)};async function nY(e,t,n){let a=new J.ZP({network:"mainnet"}),l=new $.ZP({enableOneKey:!0,network:"mainnet"}),{torusNodeEndpoints:i,torusIndexes:s}=await a.getNodeDetails({verifier:"tor-us-signer-vercel",verifierId:e}),{privKey:o}=await l.retrieveShares(i,s,"tor-us-signer-vercel",{verifier_id:e},t);return n({privateKey:o})}let nQ=async(e,n,a,l)=>{var i=new Headers;i.append("chainId",t.toString()),i.append("service","evmetadata"),i.append("Content-Type","application/json");var s=JSON.stringify({signature:e,coin:a});let o=await fetch(P.HP+"/address/"+n,{method:"POST",headers:i,body:s,redirect:"follow"}),r=await o.json();return l(r)},n0=async(e,n,a)=>{var l=new Headers;l.append("chainId",t.toString()),l.append("service","evmetadata"),l.append("Content-Type","application/json");var i=JSON.stringify({signature:e});let s=await fetch(P.HP+"/embed/"+n,{method:"POST",headers:l,body:i,redirect:"follow"}),o=await s.json();return a(o)},n1=async()=>{let n;console.log("Contract states");try{t9[t]&&!t9.migrating?(console.log("Checking owner wth targetContract"),nC=nz(t9[t]),n=await nC.getOwnerOfSerial(t9.serialNumber),console.log("--------------------------- owner",n,ns,e,P.q7.vaultHandlerV8[t])):n=tF||t9.migrating?await nC.ownerOf(eg):"0x0000000000000000000000000000000000000000",nc(await nk.decimals()),nu(await nk.allowance(e,P.q7.vaultHandler[t]).then(e=>e.toString())),nm(await nk.balanceOf(e).then(e=>e.toString())),np(await ny.price().then(e=>e.toString())),Number(nd)>=Number(ng)?ni(!0):ni(!1),a()}catch(e){n="0x0000000000000000000000000000000000000000",a()}async function a(){let a=await ny.getPreTransfer(eg);no(t9[t]?await nC.isApprovedForAll(e,P.q7.vaultHandlerV8[t]):await nC.isApprovedForAll(e,P.q7.vaultHandler[t])),tA("0x0000000000000000000000000000000000000000"!==a._from),tV(n),e4(n===e||tR===e&&"0x0000000000000000000000000000000000000000"===n),nf(tR===e&&"0x0000000000000000000000000000000000000000"===n),n$(),tP&&!1==tF&&!tZ&&(tD(!0),nZ(eg,()=>{}))}};(0,A.useEffect)(()=>{console.log("mine?",e3),console.log("claiming?",e5),console.log("accepting?",ty),console.log("acceptable",tT),console.log("qualified",D),console.log("owner",tP)}),(0,A.useEffect)(()=>{if(e&&t&&eU&&er&&tP){let n="DEBUG Report for ".concat(eg,":\n\n");n+="Props:\n   owner: ".concat(tP,"\n   mine: ").concat(e3,"\n   created by: ").concat(tR,"\n   account: ").concat(e,"\n   vaultChainId: ").concat(eU,"\n   chainId: ").concat(t,"\n   sealed: ").concat(te,"\n   approved: ").concat(ns,"\n   live: ").concat(tF,"\n   mineUnMinted: ").concat(nx,"\n   status: ").concat(e9,"\n   mintLockedForever: ").concat(nj,"\n")+"Can Unlock Before Mint: ".concat(eU===t&&nx&&"claimed"!=e9&&!nj,"\n")+"Can Claim: ".concat("claimed"!==e9&&e&&eU===t&&e3&&!te&&ns&&tF,"\n"),ec(!1),eu(n)}},[e,t,eU,er,tP]);let n7=e=>(console.log(e,eZ.filter(t=>t.coin==e).length>0),eZ.filter(t=>t.coin==e).length>0),n2=async a=>{n.getSigner(e).signMessage("Renew: "+eg).then(e=>{let n=eZ.filter(e=>"NMC"==e.coin)[0].address;console.log("signature",e,a),fetch(P.HP+"/nmc/renew/"+n,{method:"POST",headers:{"Content-Type":"application/json",service:"evmetadata",chainid:t.toString()},body:JSON.stringify({tokenId:eg,signature:e,name:a})}).then(async function(e){console.log("Requested Renew",await e.json())})})},n3=async()=>{let a;t9[t]&&(nC=nz(t9[t]),a=await nC.getSerial(t9.tokenId,0)),n.getSigner(e).signMessage("Claim: "+(t9[t]?a:eg)).then(e=>{e2({loaded:!1}),nx&&"claimed"!=e9&&!nj&&nS(!0),nX(e,eg,e=>{nY(eg,e.token,async e=>{try{var t=Z().AES.decrypt(eC,e.privateKey);let n=JSON.parse(t.toString(Z().enc.Utf8));tu(n.values),ti(n.phrase),eZ.forEach(async e=>{"STX"==e.coin?e.key=await n4(e,n.phrase):e.key=window.phrasePathToKey(n.phrase,e.path),"BTC"==e.coin&&to(e.key),"ETH"==e.coin&&tc(e.key)})}catch(e){alert(e),e2({loaded:!0})}e2({loaded:!0}),nE()})})})},n4=async(e,t)=>"contact emblem.team if you see this error",n5=async a=>{n.getSigner(e).signMessage("HideAsset: "+eg).then(e=>{!function(e,n,a,l,i,s){fetch(P.HP+"/hide/"+e,{method:"POST",headers:{"Content-Type":"application/json",service:"evmetadata",chainid:t.toString()},body:JSON.stringify({coin:n||null,address:a||null,name:l||null,signature:i||null})}).then(async function(t){console.log("-------",await t.json()),nU([],e,e=>(e_(e),s()))})}(eg,a.coin,a.address,a.name,e,()=>{console.log("Done hiding coin and getting new balances")})})},n8=async t=>{n.getSigner(e).signMessage("Address: "+eg).then(e=>{nQ(e,eg,t,e=>{nW()})})},n9=async()=>{n.getSigner(e).signMessage("Embed: "+eg).then(e=>{n0(e,eg,e=>{eO(e.ownedImage)})})},n6=async a=>{ea(!0),await (0,ee.mv)(eg);let l=D.to[a],i=await F.SZ.fetchCuratedContractByName(l);n.getSigner(e).signMessage("Move Vault: "+eg).then(n=>{fetch(P._z+"/move-vault/",{method:"POST",headers:{"Content-Type":"application/json",service:"evmetadata",chainid:t.toString()},body:JSON.stringify({chainId:1,from:e,sourceContract:{1:P.q7.emblemVault[eU]},targetContract:i,targetAsset:{name:eI[0].name},amount:1,tokenId:eg,signature:n})}).then(async function(e){let n=await e.json();n.sig&&(console.log(P.q7.emblemVault[eU]),console.log(P.q7.emblemVault[eU],i[t],eg,n.tokenId,n.nonce,n.sig,n.serial),nv.moveVault(P.q7.emblemVault[eU],i[t],eg,n.tokenId,n.nonce,n.sig,n.serial).then(async e=>{eX(e.hash),await (0,ee.mv)(eg)}).catch(e=>{nZ(eg,t=>{alert(e.message),t?location.href=location.href:location.href=location.origin+(t?"/nft?id=":"/nft2?id=")+eg})}))})}).catch(e=>{console.log(e),alert(e.message),ea(!1)})},ae=async()=>{t9[t]?nv.claim(t9[t],t9.tokenId).then(e=>{let{hash:t}=e;e8(!0),setTimeout(()=>{eX(t)},100)}).catch(e=>{alert(e.message),e8(!1)}):ny.claimOnChain(eg).then(e=>{let{hash:t}=e;e8(!0),setTimeout(()=>{eX(t)},100)}).catch(e=>{alert(e.message),e8(!1)})},at=async()=>{if(!tx){tf(!0);var e="abcdefghijklmnopqrstuvwxyz",t="Decrypting",n=t.length,a=0,l=0,i="",s="";!function o(r){setTimeout(function(){--r?o(r):tf(!1),function(o){for(var r=0;r<n-l;r++){var c=Math.floor(e.length*Math.random());i+=e.charAt(c)}7==a&&l++,8==a&&(s+=t.charAt(l-1),a=0),tp(s+i),i=""}(0),a+=1},5)}(8*n+1)}};function an(e){return(e?e.split("\n\n\n\n"):[" "])[0].trim()}return(0,A.useEffect)(()=>{nW()},[]),(0,A.useEffect)(()=>{(e&&t&&eU&&t==eU||C.noLayout&&"true"==C.noLayout||C.slideshowOnly&&"true"==C.slideshowOnly)&&n1()}),t3&&(nC=function(){let a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return new M.CH(a||P.q7.emblemVault[t],P.q7.emblemAbi,n.getSigner(e).connectUnchecked())}(t3||null)),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(k(),{children:[(0,a.jsx)("meta",{name:"twitter:card",content:"summary_large_image"}),(0,a.jsx)("meta",{name:"twitter:site",content:"Emblem.Finance"}),(0,a.jsx)("meta",{name:"twitter:title",content:ej}),(0,a.jsx)("meta",{name:"twitter:description",content:an(eT)}),(0,a.jsx)("meta",{name:"twitter:image",content:eN}),(0,a.jsx)("script",{dangerouslySetInnerHTML:{__html:'\n              // $(".NFT").tilt({    \n              //     maxTilt: 3\n              // });\n              $(".NFT").trigger(\'mouseenter\');\n              $(".NFT").trigger(\'mouseclick\'), \'.NFT\';\n              if (localStorage.getItem("darkMode") == \'false\') {\n                localStorage.setItem("darkMode","true"); location.href = location.href\n              }\n              '}})]}),(0,a.jsx)(et,{isOpen:nT,onClose:nN,addrCoin:eY,addrAddr:e0}),(0,a.jsx)(en,{isOpen:nO,onClose:nH,mnemonic:tl,privKeyBTC:ts,privKeyETH:tr,privValues:td,addresses:eZ}),(0,a.jsxs)(H(),{loaded:e7.loaded,children:[(0,a.jsx)(s.xu,{height:"40px"}),th?(0,a.jsx)(O.Z,{}):"",!e7.loaded||tw||ex?eI.length>0&&ex?(0,a.jsx)(r.K,{className:"NFT-content",align:"center",children:eI.length&&eI.filter(e=>"nft"==e.type).length>0?(0,a.jsx)(U.Z,{name:ej,image:eI[0].image,items:eI.filter(e=>e.image!==eI[0].image).map(e=>({image:e.image,description:e.description,name:e.name,type:e.type})),properties:{duration:3e3,canSwipe:!1}}):(0,a.jsx)(K.Z,{className:"d-block w-100 NFT-image",url:eN})}):tw?(0,a.jsxs)(r.K,{align:"center",children:[(0,a.jsx)(y.E,{width:"md",src:"https://starwarsblog.starwars.com/wp-content/uploads/2017/06/25-star-wars-quotes-obi-wan-kenobi-identification-tall.jpg"}),(0,a.jsxs)(d.x,{children:["THESE ARE NOT THE VAULTS YOU ARE LOOKING FOR"," ",(0,a.jsx)(u.r,{color:"#638cd8",href:"../create",children:"CREATE ONE HERE!"})]})]}):null:(0,a.jsx)(o.k,{width:"full",align:"center",justifyContent:"center",children:ed?(0,a.jsx)(s.xu,{as:"pre",style:{color:"white",opacity:1},children:ed}):(0,a.jsxs)(s.xu,{className:"NFT",maxW:"sm",borderWidth:"1px",borderColor:eU!=t?"orange.500":"claimed"==e9?"green.500":null,rounded:"lg",overflow:"hidden",alignItems:"center",minW:390,children:[(0,a.jsxs)(s.xu,{mt:"1",fontWeight:"semibold",as:"h3",lineHeight:"tight",p:2,textAlign:"center",textTransform:"uppercase",alignItems:"center",color:"blue.500",children:["Vault Network: ",F.zh[eU]]}),(0,a.jsxs)(s.xu,{mt:"1",fontWeight:"semibold",as:"h3",lineHeight:"tight",p:2,textAlign:"center",alignItems:"center",children:[ej,!eL&&eG>0?": ~$"+eG.toLocaleString():null]}),(0,a.jsxs)(r.K,{className:"NFT-content",align:"center",children:[eI.length&&eI.filter(e=>"nft"==e.type).length>0?(0,a.jsx)(U.Z,{name:ej,image:eN,items:eI.map(e=>({image:e.image,description:e.description,name:e.name,type:e.type})),properties:{duration:3e3,canSwipe:!1}}):(0,a.jsx)(K.Z,{className:"d-block w-100 NFT-image",url:eN}),e3&&eE?(0,a.jsx)(c.z,{onClick:()=>{n9()},children:"(OWNED) Show Full Embed"}):null]}),(0,a.jsx)(r.K,{align:"center",maxWidth:"400px",children:(0,a.jsx)(s.xu,{mt:"2",ml:"4",lineHeight:"tight",maxWidth:"400px",children:(0,a.jsxs)(r.K,{children:[(0,a.jsx)(d.x,{fontSize:"xs",children:eU==t?(0,a.jsxs)(u.r,{href:"./vaults?address="+tP,children:["Owner: ",tP]}):null}),(0,a.jsx)(d.x,{overflowWrap:"anywhere",mt:2,as:"h4",ml:"4",mr:"4",fontSize:"xs",fontStyle:"italic",className:"md",children:(0,a.jsx)(L(),{plugins:[G()],children:an(eT)})})]})})}),(0,a.jsxs)(s.xu,{p:"6",children:[(0,a.jsxs)(h.m,{isFitted:!0,variant:"enclosed",children:[(0,a.jsxs)(m.t,{mb:"1em",children:[(0,a.jsx)(g.O,{children:"Balances"}),(0,a.jsx)(g.O,{children:"Attributes"})]}),(0,a.jsxs)(p.n,{children:[(0,a.jsx)(x.x,{children:eL?(0,a.jsxs)(s.xu,{mb:5,children:[(0,a.jsx)(d.x,{pb:2,color:tg?"green.500":null,children:tg||"Contents hidden. Enter password to unlock."}),(0,a.jsx)(f.I,{type:"password",id:"vault-password",onChange:e=>(function(e){tj&&(e=tj),at(),console.log(eZ);let t=eZ[0].address.replace("private:","");try{var n,a=Z().AES.decrypt(t,e);JSON.parse(a.toString(Z().enc.Utf8)),eW(!1),tS(e),eD((n=e,eZ.forEach(e=>{if(e.address.includes("private")){let t=e.address.replace("private:","");e.address=JSON.parse(Z().AES.decrypt(t,n).toString(Z().enc.Utf8))}}),eZ));let l=eZ.filter(e=>"ETH"===e.coin)[0].address,i=eZ.filter(e=>"BTC"===e.coin)[0].address;console.log("SUCCESS",eZ),nR([],l,i,e=>{e_(e)})}catch(e){console.log("WTF",e)}})(e.target.value),"aria-describedby":"password-helper-text"})]}):(0,a.jsx)(s.xu,{display:"flex",backgroundColor:"light"==nF?"gray.100":"gray.700",alignItems:"baseline",className:"coin-balance-content",children:(0,a.jsxs)(s.xu,{color:"gray.500",letterSpacing:"wide",fontSize:"sm",ml:"2",children:[(0,a.jsxs)(d.x,{as:"div",mt:2,fontWeight:"semibold",children:["Current Contents:  ",(0,a.jsx)("button",{onClick:()=>{nB([],eg,e=>{eq(!1),e_(e)})},children:" [Refresh Balances]"})]}),(0,a.jsxs)(d.x,{as:"p",color:"dark"==nF?"lightgreen":"forestgreen",children:["$",Number(eG.toFixed(4)).toLocaleString()]}),eI.length?eI.map(t=>(0,a.jsx)(r.K,{children:(0,a.jsx)(B.Z,{colorMode:nF,coin:t,mine:"claimed"===e9&&tn===e||e3,onRenew:n2,hideAsset:n5})})):(0,a.jsx)(O.Z,{}),eP.length?eP.map(e=>(0,a.jsxs)(d.x,{children:["Data: ",e.attribute_key]})):eP.length||eI.length?null:(0,a.jsx)(d.x,{children:"Nothing in here! Fill 'er up!"})]})})}),(0,a.jsx)(x.x,{children:(0,a.jsx)(R.Z,{colorMode:nF,attributes:eF})})]})]}),eL?null:(0,a.jsx)(s.xu,{display:"flex",alignItems:"baseline",justifyContent:"space-between",mt:"4",children:(0,a.jsx)(j.h,{justifyContent:"space-between",spacing:6,children:(0,a.jsxs)(r.K,{children:[(0,a.jsx)(d.x,{children:"Deposit Addresses"}),(0,a.jsx)(o.k,{w:"340px",justify:"center",flexWrap:"wrap",children:eZ&&eZ.length>0?eZ.map(e=>(0,a.jsx)(c.z,{className:"address_nft_button",ml:2,mt:2,"font-weight":"100 !important",onClick:()=>{eQ(e.coin),e1(e.address),nA()},children:"ETH"==e.coin?e.coin+"/EVM":"BTC"==e.coin?e.coin+"/XCP/OMNI":"BCH"==e.coin?e.coin+"/SLP":"TAP"==e.coin?"TAPROOT":e.coin},e.address)):null}),(e3||"claimed"===e9)&&eZ.length<12?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("button",{className:"nft_button",onClick:()=>{nq()},children:"Manage Addresses"}),(0,a.jsx)(o.k,{w:"340px",justify:"center",flexWrap:"wrap",children:(0,a.jsxs)(v.Z,{isOpen:nM,children:[n7("DOGE")?null:(0,a.jsx)(c.z,{className:"nft_button",mr:2,mt:2,onClick:()=>{n8("DOGE")},children:"Add DOGE"}),n7("DGB")?null:(0,a.jsx)(c.z,{className:"nft_button",mr:2,mt:2,onClick:()=>{n8("DGB")},children:"Add Digibyte"}),n7("NMC")?null:(0,a.jsx)(c.z,{className:"nft_button",mr:2,mt:2,onClick:()=>{n8("NMC")},children:"Add Namecoin"}),n7("LTC")?null:(0,a.jsx)(c.z,{className:"nft_button",mr:2,mt:2,onClick:()=>{n8("LTC")},children:"Add Litecoin"}),n7("MONA")?null:(0,a.jsx)(c.z,{className:"nft_button",mr:2,mt:2,onClick:()=>{n8("MONA")},children:"Add Mona"}),n7("TEZOS")?null:(0,a.jsx)(c.z,{className:"nft_button",mr:2,mt:2,onClick:()=>{n8("TEZOS")},children:"Add Tezos"}),n7("SOLANA")?null:(0,a.jsx)(c.z,{className:"nft_button",mr:2,mt:2,onClick:()=>{n8("SOLANA")},children:"Add Solana"}),n7("STX")?null:(0,a.jsx)(c.z,{className:"nft_button",mr:2,mt:2,onClick:()=>{n8("STX")},children:"Add Stacks"}),n7("TAP")?null:(0,a.jsx)(c.z,{className:"nft_button",mr:2,mt:2,onClick:()=>{n8("TAP")},children:"Add Taproot"})]})})]}):null]})})}),nl&&!tF?(0,a.jsx)(r.K,{direction:"row",align:"flex-start",spacing:"0rem",flexWrap:"wrap",shouldWrapChildren:!0,children:(0,a.jsx)(s.xu,{maxW:"sm",borderWidth:"1px",p:1,rounded:"lg",overflow:"hidden",children:(0,a.jsxs)(d.x,{children:["Creating a vault spends ",ng*Math.pow(10,-nr)," Coval from your wallet"]})})}):null,(tE||el)&&tT?(0,a.jsxs)(s.xu,{children:[(0,a.jsx)(u.r,{href:location.protocol+"//"+location.host+"/nft?id="+eg+"&key="+(tN||el),children:"Copy Gift Link"}),(0,a.jsxs)(d.x,{children:["Password: ",tN||el]})]}):null,tT&&tn!==e?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(c.z,{mt:2,width:"100%",onClick:()=>{nL()},children:"Accept"}),(0,a.jsx)(f.I,{mt:2,type:"password",id:"mintPassword",minLength:3,maxLength:200,value:el||"",onChange:e=>{console.log("grrr",e.target.value,el),ei(e.target.value)},autoComplete:"off"})]}):null,!tF&&e3&&eU==t&&"claimed"!==e9&&!tY&&ns&&nl?(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(c.z,{width:"100%",mt:5,isDisabled:!eL&&eI.length<1||nj,onClick:()=>{n.getSigner(e).signMessage("Delayed Minting: "+eg).then(e=>{console.log("sig",e),fetch(P.HP+"/lazyMint",{method:"POST",headers:{"Content-Type":"application/json",service:"evmetadata",chainid:t.toString()},body:JSON.stringify({tokenId:eg,signature:e})}).then(async function(e){let t=await e.json();!t.error&&t.data?(tB(t.data.signature),tW(t.data.nonce),tK(t.data.block),tX(!0),setTimeout(()=>{nD(t.data.nonce,t.data.block,t.data.signature)},1500)):alert(t.error?t.msg:"unknown error")})})},children:nj?"Mint Locked - keys accessed before mint":!eL&&eI.length<1?"Please load the vault to mint":"Mint Vault"})}):null,"claimed"!==e9&&e&&eU===t&&e3&&!te&&ns&&tF?(0,a.jsx)(s.xu,{display:"flex",alignItems:"baseline",justifyContent:"space-between",mt:"4",children:(0,a.jsx)(c.z,{width:"100%",onClick:()=>{ae()},isDisabled:e5,children:e5?"Claiming ...":"Unlock Vault (Get Private Keys)"})}):eU===t&&("claimed"==e9||nj)&&(tn===e||e3)?(0,a.jsx)(s.xu,{display:"flex",alignItems:"baseline",justifyContent:"space-between",mt:"4",children:(0,a.jsx)(c.z,{width:"100%",onClick:n3,children:"Get Keys"})}):null,(0,a.jsx)(r.K,{mt:5,children:(0,a.jsxs)(a.Fragment,{children:[e3&&e7.loaded?(0,a.jsxs)(a.Fragment,{children:[nl?null:(0,a.jsx)(Q,{handler:{address:P.q7.vaultHandler[t],abi:P.q7.vaultHandlerAbi},spending:{address:P.q7.coval[t],abi:P.q7.covalAbi},amount:1e3,label:"Approve Spending Coval",watcher:eX}),ns?null:(0,a.jsx)(Q,{handler:{address:P.q7.vaultHandler[t],abi:P.q7.vaultHandlerAbi},spending:{address:P.q7.emblemVault[t],abi:P.q7.emblemAbi},amount:0,label:"Approve Creating / Burning Vaults",watcher:eX})]}):null,e&&e7.loaded?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("button",{className:"nft_button",onClick:()=>{nV()},children:"Advanced Operations"}),(0,a.jsx)(o.k,{w:"100%",justify:"center",flexWrap:"wrap",children:(0,a.jsxs)(v.Z,{width:"100%",isOpen:nP,children:[eU===t&&nx&&"claimed"!=e9&&!nj?(0,a.jsx)(s.xu,{display:"flex",alignItems:"baseline",justifyContent:"space-between",mt:"4",children:(0,a.jsx)(c.z,{width:"100%",onClick:n3,children:"Get Keys (Unlocking will prevent minting)"})}):null,e3&&_&&D&&D.to.length>0?(0,a.jsx)(a.Fragment,{children:D.to.map((e,t)=>(0,a.jsx)(s.xu,{display:"flex",alignItems:"baseline",justifyContent:"space-between",mt:"4",children:(0,a.jsx)(c.z,{width:"100%",onClick:()=>{n6(t)},isDisabled:Y,children:Y?"Migrating ...":"Migrate Vault to ".concat(e)})}))}):null,e3||tn==e?(0,a.jsx)(X.Z,{data:nw,filename:"EmblemVault-".concat(eg,".json")}):null,tF&&"claimed"!=e9||tR!=e||eU!=t||tY||!(eI.length<1)?null:(0,a.jsx)(c.z,{width:"100%",mt:5,onClick:()=>{n.getSigner(e).signMessage("Delete: "+eg).then(e=>{console.log("sig",e),fetch(P.HP+"/v2/delete",{method:"POST",headers:{"Content-Type":"application/json",service:"evmetadata"},body:JSON.stringify({tokenId:eg,signature:e,chainId:t.toString()})}).then(async function(){location.href=location.href.split("/")[0]+"/vaults"})})},children:"Delete Vault "})]})})]}):null]})})]}),ew?(0,a.jsxs)(S.U,{align:"center",children:[(0,a.jsx)(u.r,{target:"new",mb:2,ml:35,href:"https://gateway.ipfs.io/ipfs/"+ew,isExternal:!0,children:"View Metadata on IPFS "}),ey?(0,a.jsx)(u.r,{mb:2,href:"https://gateway.ipfs.io/ipfs/"+ey,isExternal:!0,children:"View Image on IPFS "}):null]}):null,te?(0,a.jsx)(s.xu,{display:"flex",mb:2,ml:35,alignItems:"baseline",justifyContent:"space-between",mt:"4",children:(0,a.jsx)(d.x,{children:"*This vault is sealed forever."})}):null,(0,a.jsx)(r.K,{direction:"column",align:"center",children:"claimed"==e9?(0,a.jsx)(d.x,{color:"green.500",children:"CLAIMED"}):null}),e$?(0,a.jsxs)(w.b,{status:"info",children:[(0,a.jsx)(b.z,{}),ty?"Accepting Your Gift Vault":e5?"Claiming your Vault ...":tC?"Handling Approval Flow ...":tM?"Transfering Vault ...":t0?"Minting Vault":"Validating transaction"]}):null]})}),e$?(0,a.jsx)(q.Z,{hash:e$,onComplete:()=>{Y?(ea(!1),location.href=location.origin+"/nft2?id="+eg):!e5||ty||tI?tI?(nJ(),tH(!0),t_(!1),eX(null)):ty?(tv(!1),nW(),eX(null)):tC?(tk(!1),nW(),eX(null),location.href=location.origin+"/nft?id="+eg):tM?(tq(!1),nW(),eX(null)):t0?nZ(eg,()=>{t1(!1),tz(!0),location.href=location.origin+"/nft?id="+eg}):location.href=location.origin+"/nft?id="+eg:(eX(null),e6("claimed"),e8(!1),ta(e),location.href=location.origin+"/nft?id="+eg)}}):null,(0,a.jsx)(s.xu,{height:"40px"})]})]})}},97903:function(e,t,n){var a=n(85893),l=n(67294),i=n(71963),s=n(10682),o=n(51343),r=n(57747),c=n(33862);class d extends l.Component{render(){let e=[{image:this.props.image,name:this.props.name,type:"nft"}];return console.log("items",e=(e=e.concat(this.props.items)).filter(e=>""!==e.image&&"nft"==e.type)),(0,a.jsx)(s.Z,{className:"p-3",children:(0,a.jsx)(i.Z,{children:e.map((e,t)=>(0,a.jsx)(i.Z.Item,{children:(0,a.jsxs)(o.K,{children:[(0,a.jsx)(r.xu,{children:(0,a.jsx)(c.Z,{className:"d-block w-100 NFT-image",url:e.image})}),(0,a.jsx)(r.xu,{children:(0,a.jsx)(i.Z.Caption,{children:(0,a.jsx)("h3",{children:e.name})})})]})},t))})})}}t.Z=d}}]);