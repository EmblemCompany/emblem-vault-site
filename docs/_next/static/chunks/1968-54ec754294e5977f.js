(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1968],{38299:function(e,t,n){"use strict";var a=n(85893),r=n(93108),o=n(57747);n(67294),t.Z=e=>{let{data:t,filename:n}=e;return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(o.xu,{display:"flex",alignItems:"baseline",justifyContent:"space-between",mt:"4",children:(0,a.jsx)(r.z,{id:"downloadLink",width:"100%",onClick:e=>{e.preventDefault();let a=JSON.stringify(t,null,2),r=new Blob([a],{type:"application/json"}),o=URL.createObjectURL(r),s=document.createElement("a");s.href=o,s.download=n,document.body.appendChild(s),s.click(),document.body.removeChild(s)},children:"Backup Vault"})})})}},43264:function(e,t,n){"use strict";n.d(t,{Z:function(){return ea}});var a=n(85893),r=n(7335),o=n(45161),s=n(57747),l=n(93717),i=n(51343),c=n(93108),d=n(71293),u=n(32883),m=n(36752),g=n(77458),h=n(35232),p=n(72047),f=n(37365),x=n(33090),b=n(78590),w=n(34292),j=n(74153),v=n(7405),S=n(6089),y=n(8161),k=n(9008),C=n.n(k),T=n(77044),N=n(67294),A=n(11163),I=n(71114),O=n(70758),E=n.n(O),_=n(5152),F=n.n(_),P=n(77294),q=n(64541),H=n(31238),V=n(80902),M=n(62850),z=n(81354),D=n.n(z),B=n(30724),Z=n.n(B),L=n(10043),G=n.n(L),K=n(33862),W=n(97903),U=n(74174),R=n(35649),J=n(18974),$=n(87070),X=n(38299);let Y=(e,t,n,a)=>new P.CH(e,t,n.getSigner(a).connectUnchecked());function Q(e){let{account:t,library:n}=(0,T.Ge)(),[r,o]=(0,N.useState)(!1),[s,i]=(0,N.useState)(null),[d,u]=(0,N.useState)(null),[m,g]=(0,N.useState)(null);return(0,N.useEffect)(()=>{var a;!m&&e.handler&&g(Y((a=e.handler).address,a.abi,n,t))}),(0,N.useEffect)(()=>{var a;!d&&e.spending&&u(Y((a=e.spending).address,a.abi,n,t))}),(0,N.useEffect)(()=>{var n,a,r;d&&(n=e.handler,e.spending,(r=e.amount)>0?d.decimals().then(e=>{i(e),d.allowance(t,n.address).then(t=>{o(t>=r*10**e)})}):d.isApprovedForAll(t,n.address).then(e=>{o(e)}))}),t&&!r?(0,a.jsx)(l.k,{w:"100%",flexWrap:"wrap",mt:3,children:(0,a.jsx)(c.z,{onClick:function(){return e.amount>0?void d.approve(e.handler.address,1e6*10**s).then(t=>{e.watcher(t.hash,e=>{1===e.status&&o(!0)})}):void d.setApprovalForAll(e.handler.address,!0).then(t=>{e.watcher(t.hash,e=>{1===e.status&&o(!0)})})},backgroundColor:"#02b402",color:"black !important",fontWeight:"bold !important",width:"100%",children:e.label})}):null}var ee=n(10063);let et=F()(()=>Promise.all([n.e(1793),n.e(8159),n.e(6115),n.e(7414)]).then(n.bind(n,37414)),{loadableGenerated:{webpack:()=>[37414]}}),en=F()(()=>Promise.all([n.e(1793),n.e(8159),n.e(1817)]).then(n.bind(n,81817)),{loadableGenerated:{webpack:()=>[81817]}});function ea(){let{account:e,chainId:t,library:n}=(0,T.Ge)(),{query:k}=(0,A.useRouter)(),[O,_]=(0,N.useState)("t"==k.cc),[F,z]=(0,N.useState)({to:[]}),[B,L]=(0,N.useState)(!1),[Y,ea]=(0,N.useState)(k.key),[er,eo]=(0,N.useState)(k.offer||!1),[es,el]=(0,N.useState)("true"==k.debug),[ei,ec]=(0,N.useState)(null),[ed,eu]=(0,N.useState)(k.framed||!0),[em,eg]=(0,N.useState)(k.id),[eh,ep]=(0,N.useState)(k.slideshowOnly||!1),[ef,ex]=(0,N.useState)(""),[eb,ew]=(0,N.useState)(""),[ej,ev]=(0,N.useState)(""),[eS,ey]=(0,N.useState)(""),[ek,eC]=(0,N.useState)(""),[eT,eN]=(0,N.useState)(""),[eA,eI]=(0,N.useState)(""),[eO,eE]=(0,N.useState)([]),[e_,eF]=(0,N.useState)(!1),[eP,eq]=(0,N.useState)([]),[eH,eV]=(0,N.useState)([]),[eM,ez]=(0,N.useState)([]),[eD,eB]=(0,N.useState)(!1),[eZ,eL]=(0,N.useState)(0),[eG,eK]=(0,N.useState)(null),[eW,eU]=(0,N.useState)(null),[eR,eJ]=(0,N.useState)(null),[e$,eX]=(0,N.useState)(""),[eY,eQ]=(0,N.useState)(""),[e0,e1]=(0,N.useState)({loaded:!1}),[e7,e2]=(0,N.useState)(!1),[e3,e4]=(0,N.useState)(!1),[e5,e8]=(0,N.useState)("claimed"),[e9,e6]=(0,N.useState)(!1),[te,tt]=(0,N.useState)(null),[tn,ta]=(0,N.useState)(""),[tr,to]=(0,N.useState)(""),[ts,tl]=(0,N.useState)(""),[ti,tc]=(0,N.useState)([]),[td,tu]=(0,N.useState)(!1),[tm,tg]=(0,N.useState)(""),[th,tp]=(0,N.useState)(!1),[tf,tx]=(0,N.useState)(""),[tb,tw]=(0,N.useState)(!1),[tj,tv]=(0,N.useState)(!1),[tS,ty]=(0,N.useState)(!1),[tk,tC]=(0,N.useState)(!1),[tT,tN]=(0,N.useState)(""),[tA,tI]=(0,N.useState)(!1),[tO,tE]=(0,N.useState)(!1),[t_,tF]=(0,N.useState)(!1),[tP,tq]=(0,N.useState)(null),[tH,tV]=(0,N.useState)(!1),[tM,tz]=(0,N.useState)(!1),[tD,tB]=(0,N.useState)(null),[tZ,tL]=(0,N.useState)(null),[tG,tK]=(0,N.useState)(null),[tW,tU]=(0,N.useState)(null),[tR,tJ]=(0,N.useState)(!1),[t$,tX]=(0,N.useState)(!1),[tY,tQ]=(0,N.useState)(!1),[t0,t1]=(0,N.useState)(!1),[t7,t2]=(0,N.useState)(null),[t3,t4]=(0,N.useState)({name:"",image:"",metadata:""}),[t5,t8]=(0,N.useState)({migrating:!1,name:"",chain:"",4:"",1:"",tokenId:{},serialNumber:{hex:""}}),[t9,t6]=(0,N.useState)({name:"",image:"",metadata:""}),[ne,nt]=(0,N.useState)({name:"",chain:"",4:"",1:"",tokenId:{},serialNumber:{hex:""}}),[nn,na]=(0,N.useState)(!1),[nr,no]=(0,N.useState)(!1),[ns,nl]=(0,N.useState)(null),[ni,nc]=(0,N.useState)(null),[nd,nu]=(0,N.useState)(null),[nm,ng]=(0,N.useState)(null),[nh,np]=(0,N.useState)(!1),[nf,nx]=(0,N.useState)(!1),[nb,nw]=(0,N.useState)({}),nj=(0,V.cq)(H.q7.vaultHandler[t],H.q7.vaultHandlerAbi,!0),nv=(0,V.cq)(H.q7.vaultHandlerV8[t],H.q7.vaultHandlerV8Abi,!0),nS=(0,V.cq)(H.q7.emblemVault[t],H.q7.emblemAbi,!0),ny=(0,V.cq)(H.q7.coval[t],H.q7.covalAbi,!0),{isOpen:nk,onOpen:nC,onClose:nT}=(0,r.q)(),{isOpen:nN,onOpen:nA,onClose:nI}=(0,r.q)(),{isOpen:nO,onToggle:nE}=(0,r.q)(),{isOpen:n_,onToggle:nF}=(0,r.q)(),{isOpen:nP,onToggle:nq}=(0,r.q)(),{colorMode:nH}=(0,o.If)(),nV=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return new P.CH(t,H.q7.erc1155Abi,n.getSigner(e).connectUnchecked())},nM=(e,n)=>{fetch(H._z+"/liveliness",{method:"POST",headers:{"Content-Type":"application/json",service:"evmetadata",chainid:t.toString()},body:JSON.stringify({tokenId:e})}).then(async function(e){let t=await e.json();return tV(t.live),console.log("Liveliness check",t),n(t.live)})},nz=()=>{ty(!0),nS.setApprovalForAll("0x23859b51117dbFBcdEf5b757028B18d7759a4460",!0).then(e=>{let{hash:t}=e;setTimeout(()=>{eJ(t)},100)}).catch(e=>{(null==e?void 0:e.code)!==4001?console.log("tx failed.",e):ty(!1)})},nD=async()=>{let t=await fetch(H._z+"/meta/"+em+"?experimental=true"+(O?"&_vercel_no_cache=1":""),{method:"GET",headers:{"Content-Type":"application/json",service:"evmetadata",cc:O?"t":""}}),n=await t.json(),a=await M.SZ.generateMigrateReport(e,!0);(a=Object.keys(a=Object.fromEntries(Object.entries(a).filter(e=>{let[t,n]=e;return!n.to.includes("Embels")}))).map(e=>({...a[e],tokenId:e})).find(e=>e.tokenId==em))&&a.to&&a.to.length>0&&(n.move=a),nw(n),nB(n),n.image_ipfs,n.collectionAddress&&(t1(!0),t2(n.collectionAddress)),n.name?(tu(!1),tw(!1)):(e1({loaded:!0}),tw(!0)),eD||e_||nL([],em,e=>{e&&eE(e)})},nB=e=>{if(ed&&e.image&&!e.image.includes("framed=")&&!e.image.includes("http")&&(e.image=e.image+"&framed="+ed),e.ciphertextV2&&ey(e.ciphertextV2),nx(e.mintLocked&&0==e.mintLockBlock),ex(e.name),eN(e.image),eI(e.ownedImage||null),eC(e.description),eL(e.totalValue||0),e.values&&eE(eO.concat(e.values)),e.attributes&&eq(e.attributes.filter(e=>"key"===e.trait_type)),e.attributes&&eV(e.attributes),ez(e.addresses),ew(e.ipfs||null),ev(e.image_ipfs||null),e.targetAsset&&t4(e.targetAsset),e.targetContract&&t8(e.targetContract),e.move_targetContract&&nt(e.move_targetContract),e.move_targetAsset&&t6(e.move_targetAsset),"Migrated Vault"==e.name||e.targetContract&&e.targetContract[t]&&!e.targetContract.migrating)return location.href=location.origin+"/nft2?id="+em,!1;tV(!1!=e.live),tB(e.nonce),tK(e.signature),tU(e.to),eU(e.network),eK("mainnet"==e.network?1:"rinkeby"==e.network?4:"mumbai"==e.network?80001:"matic"==e.network?137:"xdai"==e.network?100:"bsc"==e.network?56:"fantom"==e.network?250:"bitcoin"==e.network?0:"aurora"==e.network?1313161554:97),e8(e.status),"claimed"===e5&&tt(e.claimedBy),eB(e.addresses.filter(e=>e.address.includes("private:")).length>0),e.sealed?e6(!0):e6(!1),e.move&&e.move.to&&e.move.to.length>0&&z(e.move),e1({loaded:!0})},nZ=async(e,t,n)=>{let a=await fetch(H.HP+"/vault/balance/"+t,{method:"GET",headers:{"Content-Type":"application/json",service:"evmetadata"}}),r=await a.json();return n((console.log("response",a,r),r.balances.length>0)?e.concat(r.balances):e)},nL=async(e,t,n)=>{if(e_)return n(!1);eF(!0);let a=await fetch(H.HP+"/vault/balance/"+t+"?live=true&_vercel_no_cache=1",{method:"GET",headers:{"Content-Type":"application/json",service:"evmetadata"}}),r=await a.json();return n((console.log("response",a,r),r.balances.length>0)?e.concat(r.balances):e)},nG=async(e,t,n,a)=>{let r=await fetch(H.HP+"/vault/balance/"+t+"/"+n,{method:"GET",headers:{"Content-Type":"application/json",service:"evmetadata"}}),o=await r.json();return a((console.log("response",r,o),o.balances.length>0)?e.concat(o.balances):e)},nK=()=>{localStorage.setItem(e+"_"+t+"_"+em+"_mintPassword",tT)},nW=()=>{let n=localStorage.getItem(e+"_"+t+"_"+em+"_mintPassword");n&&tk&&ea(n)},nU=async(e,n,a)=>{var r=new Headers;r.append("chainid",t.toString()),r.append("Content-Type","application/json");var o=JSON.stringify({signature:e,tokenId:n});let s=await fetch(H.pU+"/sign",{method:"POST",headers:r,body:o,redirect:"follow"}),l=await s.json();return a(l)};async function nR(e,t,n){let a=new J.ZP({network:"mainnet"}),r=new $.ZP({enableOneKey:!0,network:"mainnet"}),{torusNodeEndpoints:o,torusIndexes:s}=await a.getNodeDetails({verifier:"tor-us-signer-vercel",verifierId:e}),{privKey:l}=await r.retrieveShares(o,s,"tor-us-signer-vercel",{verifier_id:e},t);return n({privateKey:l})}let nJ=async(e,n,a,r)=>{var o=new Headers;o.append("chainId",t.toString()),o.append("service","evmetadata"),o.append("Content-Type","application/json");var s=JSON.stringify({signature:e,coin:a});let l=await fetch(H.HP+"/address/"+n,{method:"POST",headers:o,body:s,redirect:"follow"}),i=await l.json();return r(i)},n$=async(e,n,a)=>{var r=new Headers;r.append("chainId",t.toString()),r.append("service","evmetadata"),r.append("Content-Type","application/json");var o=JSON.stringify({signature:e});let s=await fetch(H.HP+"/embed/"+n,{method:"POST",headers:r,body:o,redirect:"follow"}),l=await s.json();return a(l)},nX=async()=>{let n;console.log("Contract states");try{t5[t]&&!t5.migrating?(console.log("Checking owner wth targetContract"),nS=nV(t5[t]),n=await nS.getOwnerOfSerial(t5.serialNumber),console.log("--------------------------- owner",n,nr,e,H.q7.vaultHandlerV8[t])):n=tH||t5.migrating?await nS.ownerOf(em):"0x0000000000000000000000000000000000000000",nl(await ny.decimals()),nc(await ny.allowance(e,H.q7.vaultHandler[t]).then(e=>e.toString())),nu(await ny.balanceOf(e).then(e=>e.toString())),ng(await nj.price().then(e=>e.toString())),Number(ni)>=Number(nm)?na(!0):na(!1),a()}catch(e){n="0x0000000000000000000000000000000000000000",a()}async function a(){let a=await nj.getPreTransfer(em);no(await nS.isApprovedForAll(e,H.q7.vaultHandlerV8[t])),tC("0x0000000000000000000000000000000000000000"!==a._from),tq(n),e2(n===e||tW===e&&"0x0000000000000000000000000000000000000000"===n),np(tW===e&&"0x0000000000000000000000000000000000000000"===n),nW(),tP&&!1==tH&&!tM&&(tz(!0),nM(em,()=>{}))}};(0,N.useEffect)(()=>{console.log("mine?",e7),console.log("claiming?",e3),console.log("accepting?",tj),console.log("acceptable",tk),console.log("qualified",F),console.log("owner",tP)}),(0,N.useEffect)(()=>{if(e&&t&&eG&&es&&tP){let n="DEBUG Report for ".concat(em,":\n\n");n+="Props:\n   owner: ".concat(tP,"\n   mine: ").concat(e7,"\n   created by: ").concat(tW,"\n   account: ").concat(e,"\n   vaultChainId: ").concat(eG,"\n   chainId: ").concat(t,"\n   sealed: ").concat(e9,"\n   approved: ").concat(nr,"\n   live: ").concat(tH,"\n   mineUnMinted: ").concat(nh,"\n   status: ").concat(e5,"\n   mintLockedForever: ").concat(nf,"\n")+"Can Unlock Before Mint: ".concat(eG===t&&nh&&"claimed"!=e5&&!nf,"\n")+"Can Claim: ".concat("claimed"!==e5&&e&&eG===t&&e7&&!e9&&nr&&tH,"\n"),el(!1),ec(n)}},[e,t,eG,es,tP]);let nY=e=>(console.log(e,eM.filter(t=>t.coin==e).length>0),eM.filter(t=>t.coin==e).length>0),nQ=async a=>{n.getSigner(e).signMessage("Renew: "+em).then(e=>{let n=eM.filter(e=>"NMC"==e.coin)[0].address;console.log("signature",e,a),fetch(H.HP+"/nmc/renew/"+n,{method:"POST",headers:{"Content-Type":"application/json",service:"evmetadata",chainid:t.toString()},body:JSON.stringify({tokenId:em,signature:e,name:a})}).then(async function(e){console.log("Requested Renew",await e.json())})})},n0=async()=>{let a;t5[t]&&(nS=nV(t5[t]),a=await nS.getSerial(t5.tokenId,0)),n.getSigner(e).signMessage("Claim: "+(t5[t]?a:em)).then(e=>{e1({loaded:!1}),nh&&"claimed"!=e5&&!nf&&nx(!0),nU(e,em,e=>{nR(em,e.token,async e=>{try{var t=D().AES.decrypt(eS,e.privateKey);let n=JSON.parse(t.toString(D().enc.Utf8));tc(n.values),ta(n.phrase),eM.forEach(async e=>{"STX"==e.coin?e.key=await n1(e,n.phrase):e.key=window.phrasePathToKey(n.phrase,e.path),"BTC"==e.coin&&to(e.key),"ETH"==e.coin&&tl(e.key)})}catch(e){alert(e),e1({loaded:!0})}e1({loaded:!0}),nA()})})})},n1=async(e,t)=>"contact emblem.team if you see this error",n7=async a=>{n.getSigner(e).signMessage("HideAsset: "+em).then(e=>{!function(e,n,a,r,o,s){fetch(H.HP+"/hide/"+e,{method:"POST",headers:{"Content-Type":"application/json",service:"evmetadata",chainid:t.toString()},body:JSON.stringify({coin:n||null,address:a||null,name:r||null,signature:o||null})}).then(async function(t){console.log("-------",await t.json()),nZ([],e,e=>(eE(e),s()))})}(em,a.coin,a.address,a.name,e,()=>{console.log("Done hiding coin and getting new balances")})})},n2=async t=>{n.getSigner(e).signMessage("Address: "+em).then(e=>{nJ(e,em,t,e=>{nD()})})},n3=async()=>{n.getSigner(e).signMessage("Embed: "+em).then(e=>{n$(e,em,e=>{eN(e.ownedImage)})})},n4=async a=>{L(!0),await (0,ee.mv)(em);let r=F.to[a],o=await M.SZ.fetchCuratedContractByName(r);n.getSigner(e).signMessage("Move Vault: "+em).then(n=>{fetch(H._z+"/move-vault/",{method:"POST",headers:{"Content-Type":"application/json",service:"evmetadata",chainid:t.toString()},body:JSON.stringify({chainId:1,from:e,sourceContract:{1:H.q7.emblemVault[eG]},targetContract:o,targetAsset:{name:eO[0].name},amount:1,tokenId:em,signature:n})}).then(async function(e){let n=await e.json();n.sig&&(console.log(H.q7.emblemVault[eG]),console.log(H.q7.emblemVault[eG],o[t],em,n.tokenId,n.nonce,n.sig,n.serial),nv.moveVault(H.q7.emblemVault[eG],o[t],em,n.tokenId,n.nonce,n.sig,n.serial).then(async e=>{eJ(e.hash),await (0,ee.mv)(em)}).catch(e=>{nM(em,t=>{alert(e.message),t?location.href=location.href:location.href=location.origin+(t?"/nft?id=":"/nft2?id=")+em})}))})}).catch(e=>{console.log(e),alert(e.message),L(!1)})},n5=async()=>{t5[t]?nv.claim(t5[t],t5.tokenId).then(e=>{let{hash:t}=e;e4(!0),setTimeout(()=>{eJ(t)},100)}).catch(e=>{alert(e.message),e4(!1)}):nj.claimOnChain(em).then(e=>{let{hash:t}=e;e4(!0),setTimeout(()=>{eJ(t)},100)}).catch(e=>{alert(e.message),e4(!1)})},n8=async()=>{if(!th){tp(!0);var e="abcdefghijklmnopqrstuvwxyz",t="Decrypting",n=t.length,a=0,r=0,o="",s="";!function l(i){setTimeout(function(){--i?l(i):tp(!1),function(l){for(var i=0;i<n-r;i++){var c=Math.floor(e.length*Math.random());o+=e.charAt(c)}7==a&&r++,8==a&&(s+=t.charAt(r-1),a=0),tg(s+o),o=""}(0),a+=1},5)}(8*n+1)}};function n9(e){return(e?e.split("\n\n\n\n"):[" "])[0].trim()}return(0,N.useEffect)(()=>{nD()},[]),(0,N.useEffect)(()=>{(e&&t&&eG&&t==eG||k.noLayout&&"true"==k.noLayout||k.slideshowOnly&&"true"==k.slideshowOnly)&&nX()}),t7&&(nS=function(){let a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return new P.CH(a||H.q7.emblemVault[t],H.q7.emblemAbi,n.getSigner(e).connectUnchecked())}(t7||null)),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(C(),{children:[(0,a.jsx)("meta",{name:"twitter:card",content:"summary_large_image"}),(0,a.jsx)("meta",{name:"twitter:site",content:"Emblem.Finance"}),(0,a.jsx)("meta",{name:"twitter:title",content:ef}),(0,a.jsx)("meta",{name:"twitter:description",content:n9(ek)}),(0,a.jsx)("meta",{name:"twitter:image",content:eT}),(0,a.jsx)("script",{dangerouslySetInnerHTML:{__html:'\n              // $(".NFT").tilt({    \n              //     maxTilt: 3\n              // });\n              $(".NFT").trigger(\'mouseenter\');\n              $(".NFT").trigger(\'mouseclick\'), \'.NFT\';\n              if (localStorage.getItem("darkMode") == \'false\') {\n                localStorage.setItem("darkMode","true"); location.href = location.href\n              }\n              '}})]}),(0,a.jsx)(et,{isOpen:nk,onClose:nT,addrCoin:e$,addrAddr:eY}),(0,a.jsx)(en,{isOpen:nN,onClose:nI,mnemonic:tn,privKeyBTC:tr,privKeyETH:ts,privValues:ti,addresses:eM}),(0,a.jsxs)(E(),{loaded:e0.loaded,children:[(0,a.jsx)(s.xu,{height:"40px"}),td?(0,a.jsx)(I.Z,{}):"",!e0.loaded||tb||eh?eO.length>0&&eh?(0,a.jsx)(i.K,{className:"NFT-content",align:"center",children:eO.length&&eO.filter(e=>"nft"==e.type).length>0?(0,a.jsx)(W.Z,{name:ef,image:eO[0].image,items:eO.filter(e=>e.image!==eO[0].image).map(e=>({image:e.image,description:e.description,name:e.name,type:e.type})),properties:{duration:3e3,canSwipe:!1}}):(0,a.jsx)(K.Z,{className:"d-block w-100 NFT-image",url:eT})}):tb?(0,a.jsxs)(i.K,{align:"center",children:[(0,a.jsx)(S.E,{width:"md",src:"https://starwarsblog.starwars.com/wp-content/uploads/2017/06/25-star-wars-quotes-obi-wan-kenobi-identification-tall.jpg"}),(0,a.jsxs)(d.x,{children:["THESE ARE NOT THE VAULTS YOU ARE LOOKING FOR"," ",(0,a.jsx)(u.r,{color:"#638cd8",href:"../create",children:"CREATE ONE HERE!"})]})]}):null:(0,a.jsx)(l.k,{width:"full",align:"center",justifyContent:"center",children:ei?(0,a.jsx)(s.xu,{as:"pre",style:{color:"white",opacity:1},children:ei}):(0,a.jsxs)(s.xu,{className:"NFT",maxW:"sm",borderWidth:"1px",borderColor:eG!=t?"orange.500":"claimed"==e5?"green.500":null,rounded:"lg",overflow:"hidden",alignItems:"center",minW:390,children:[(0,a.jsxs)(s.xu,{mt:"1",fontWeight:"semibold",as:"h3",lineHeight:"tight",p:2,textAlign:"center",textTransform:"uppercase",alignItems:"center",color:"blue.500",children:["Vault Network: ",M.zh[eG]]}),(0,a.jsxs)(s.xu,{mt:"1",fontWeight:"semibold",as:"h3",lineHeight:"tight",p:2,textAlign:"center",alignItems:"center",children:[ef,!eD&&eZ>0?": ~$"+eZ.toLocaleString():null]}),(0,a.jsxs)(i.K,{className:"NFT-content",align:"center",children:[eO.length&&eO.filter(e=>"nft"==e.type).length>0?(0,a.jsx)(W.Z,{name:ef,image:eT,items:eO.map(e=>({image:e.image,description:e.description,name:e.name,type:e.type})),properties:{duration:3e3,canSwipe:!1}}):(0,a.jsx)(K.Z,{className:"d-block w-100 NFT-image",url:eT}),e7&&eA?(0,a.jsx)(c.z,{onClick:()=>{n3()},children:"(OWNED) Show Full Embed"}):null]}),(0,a.jsx)(i.K,{align:"center",maxWidth:"400px",children:(0,a.jsx)(s.xu,{mt:"2",ml:"4",lineHeight:"tight",maxWidth:"400px",children:(0,a.jsxs)(i.K,{children:[(0,a.jsx)(d.x,{fontSize:"xs",children:eG==t?(0,a.jsxs)(u.r,{href:"./vaults?address="+tP,children:["Owner: ",tP]}):null}),(0,a.jsx)(d.x,{overflowWrap:"anywhere",mt:2,as:"h4",ml:"4",mr:"4",fontSize:"xs",fontStyle:"italic",className:"md",children:(0,a.jsx)(Z(),{plugins:[G()],children:n9(ek)})})]})})}),(0,a.jsxs)(s.xu,{p:"6",children:[(0,a.jsxs)(m.m,{isFitted:!0,variant:"enclosed",children:[(0,a.jsxs)(g.t,{mb:"1em",children:[(0,a.jsx)(h.O,{children:"Balances"}),(0,a.jsx)(h.O,{children:"Attributes"})]}),(0,a.jsxs)(p.n,{children:[(0,a.jsx)(f.x,{children:eD?(0,a.jsxs)(s.xu,{mb:5,children:[(0,a.jsx)(d.x,{pb:2,color:tm?"green.500":null,children:tm||"Contents hidden. Enter password to unlock."}),(0,a.jsx)(x.I,{type:"password",id:"vault-password",onChange:e=>(function(e){tf&&(e=tf),n8(),console.log(eM);let t=eM[0].address.replace("private:","");try{var n,a=D().AES.decrypt(t,e);JSON.parse(a.toString(D().enc.Utf8)),eB(!1),tx(e),ez((n=e,eM.forEach(e=>{if(e.address.includes("private")){let t=e.address.replace("private:","");e.address=JSON.parse(D().AES.decrypt(t,n).toString(D().enc.Utf8))}}),eM));let r=eM.filter(e=>"ETH"===e.coin)[0].address,o=eM.filter(e=>"BTC"===e.coin)[0].address;console.log("SUCCESS",eM),nG([],r,o,e=>{eE(e)})}catch(e){console.log("WTF",e)}})(e.target.value),"aria-describedby":"password-helper-text"})]}):(0,a.jsx)(s.xu,{display:"flex",backgroundColor:"light"==nH?"gray.100":"gray.700",alignItems:"baseline",className:"coin-balance-content",children:(0,a.jsxs)(s.xu,{color:"gray.500",letterSpacing:"wide",fontSize:"sm",ml:"2",children:[(0,a.jsxs)(d.x,{as:"div",mt:2,fontWeight:"semibold",children:["Current Contents:  ",(0,a.jsx)("button",{onClick:()=>{nL([],em,e=>{eF(!1),eE(e)})},children:" [Refresh Balances]"})]}),(0,a.jsxs)(d.x,{as:"p",color:"dark"==nH?"lightgreen":"forestgreen",children:["$",Number(eZ.toFixed(4)).toLocaleString()]}),eO.length?eO.map(t=>(0,a.jsx)(i.K,{children:(0,a.jsx)(U.Z,{colorMode:nH,coin:t,mine:"claimed"===e5&&te===e||e7,onRenew:nQ,hideAsset:n7})})):(0,a.jsx)(I.Z,{}),eP.length?eP.map(e=>(0,a.jsxs)(d.x,{children:["Data: ",e.attribute_key]})):eP.length||eO.length?null:(0,a.jsx)(d.x,{children:"Nothing in here! Fill 'er up!"})]})})}),(0,a.jsx)(f.x,{children:(0,a.jsx)(R.Z,{colorMode:nH,attributes:eH})})]})]}),eD?null:(0,a.jsx)(s.xu,{display:"flex",alignItems:"baseline",justifyContent:"space-between",mt:"4",children:(0,a.jsx)(b.h,{justifyContent:"space-between",spacing:6,children:(0,a.jsxs)(i.K,{children:[(0,a.jsx)(d.x,{children:"Deposit Addresses"}),(0,a.jsx)(l.k,{w:"340px",justify:"center",flexWrap:"wrap",children:eM&&eM.length>0?eM.map(e=>(0,a.jsx)(c.z,{className:"address_nft_button",ml:2,mt:2,"font-weight":"100 !important",onClick:()=>{eX(e.coin),eQ(e.address),nC()},children:"ETH"==e.coin?e.coin+"/EVM":"BTC"==e.coin?e.coin+"/XCP/OMNI":"BCH"==e.coin?e.coin+"/SLP":"TAP"==e.coin?"TAPROOT":e.coin},e.address)):null}),(e7||"claimed"===e5)&&eM.length<12?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("button",{className:"nft_button",onClick:()=>{nF()},children:"Manage Addresses"}),(0,a.jsx)(l.k,{w:"340px",justify:"center",flexWrap:"wrap",children:(0,a.jsxs)(y.Z,{isOpen:n_,children:[nY("DOGE")?null:(0,a.jsx)(c.z,{className:"nft_button",mr:2,mt:2,onClick:()=>{n2("DOGE")},children:"Add DOGE"}),nY("DGB")?null:(0,a.jsx)(c.z,{className:"nft_button",mr:2,mt:2,onClick:()=>{n2("DGB")},children:"Add Digibyte"}),nY("NMC")?null:(0,a.jsx)(c.z,{className:"nft_button",mr:2,mt:2,onClick:()=>{n2("NMC")},children:"Add Namecoin"}),nY("LTC")?null:(0,a.jsx)(c.z,{className:"nft_button",mr:2,mt:2,onClick:()=>{n2("LTC")},children:"Add Litecoin"}),nY("MONA")?null:(0,a.jsx)(c.z,{className:"nft_button",mr:2,mt:2,onClick:()=>{n2("MONA")},children:"Add Mona"}),nY("TEZOS")?null:(0,a.jsx)(c.z,{className:"nft_button",mr:2,mt:2,onClick:()=>{n2("TEZOS")},children:"Add Tezos"}),nY("SOLANA")?null:(0,a.jsx)(c.z,{className:"nft_button",mr:2,mt:2,onClick:()=>{n2("SOLANA")},children:"Add Solana"}),nY("STX")?null:(0,a.jsx)(c.z,{className:"nft_button",mr:2,mt:2,onClick:()=>{n2("STX")},children:"Add Stacks"}),nY("TAP")?null:(0,a.jsx)(c.z,{className:"nft_button",mr:2,mt:2,onClick:()=>{n2("TAP")},children:"Add Taproot"})]})})]}):null]})})}),e7&&!nr?(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(s.xu,{display:"flex",alignItems:"baseline",justifyContent:"space-between",mt:"4",children:(0,a.jsx)(c.z,{backgroundColor:"#02b402",color:"black !important",fontWeight:"bold !important",className:"nft_button",width:"100%",onClick:()=>nz(),children:" Approve Minting"})})}):null,(tA||Y)&&tk?(0,a.jsxs)(s.xu,{children:[(0,a.jsx)(u.r,{href:location.protocol+"//"+location.host+"/nft?id="+em+"&key="+(tT||Y),children:"Copy Gift Link"}),(0,a.jsxs)(d.x,{children:["Password: ",tT||Y]})]}):null,"claimed"!==e5&&e&&eG===t&&e7&&!e9&&nr&&tH?(0,a.jsx)(s.xu,{display:"flex",alignItems:"baseline",justifyContent:"space-between",mt:"4",children:(0,a.jsx)(c.z,{width:"100%",onClick:()=>{n5()},isDisabled:e3,children:e3?"Claiming ...":"Unlock Vault (Get Private Keys)"})}):eG===t&&("claimed"==e5||nf)&&(te===e||e7)?(0,a.jsx)(s.xu,{display:"flex",alignItems:"baseline",justifyContent:"space-between",mt:"4",children:(0,a.jsx)(c.z,{width:"100%",onClick:n0,children:"Get Keys"})}):null,(0,a.jsx)(i.K,{mt:5,children:(0,a.jsxs)(a.Fragment,{children:[e7&&e0.loaded?(0,a.jsx)(Q,{handler:{address:H.q7.vaultHandler[t],abi:H.q7.vaultHandlerAbi},spending:{address:H.q7.emblemVault[t],abi:H.q7.emblemAbi},amount:0,label:"Approve Creating / Burning Vaults",watcher:eJ}):null,e&&e0.loaded?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("button",{className:"nft_button",onClick:()=>{nq()},children:"Advanced Operations"}),(0,a.jsx)(l.k,{w:"100%",justify:"center",flexWrap:"wrap",children:(0,a.jsxs)(y.Z,{width:"100%",isOpen:nP,children:[eG===t&&nh&&"claimed"!=e5&&!nf?(0,a.jsx)(s.xu,{display:"flex",alignItems:"baseline",justifyContent:"space-between",mt:"4",children:(0,a.jsx)(c.z,{width:"100%",onClick:n0,children:"Get Keys (Unlocking will prevent minting)"})}):null,e7&&F&&F.to.length>0?(0,a.jsx)(a.Fragment,{children:F.to.map((e,t)=>(0,a.jsx)(s.xu,{display:"flex",alignItems:"baseline",justifyContent:"space-between",mt:"4",children:(0,a.jsx)(c.z,{width:"100%",onClick:()=>{n4(t)},isDisabled:B,children:B?"Migrating ...":"Migrate Vault to ".concat(e)})}))}):null,e7||te==e?(0,a.jsx)(X.Z,{data:nb,filename:"EmblemVault-".concat(em,".json")}):null,tH&&"claimed"!=e5||tW!=e||eG!=t||t$||!(eO.length<1)?null:(0,a.jsx)(c.z,{width:"100%",mt:5,onClick:()=>{n.getSigner(e).signMessage("Delete: "+em).then(e=>{console.log("sig",e),fetch(H.HP+"/v2/delete",{method:"POST",headers:{"Content-Type":"application/json",service:"evmetadata"},body:JSON.stringify({tokenId:em,signature:e,chainId:t.toString()})}).then(async function(){location.href=location.href.split("/")[0]+"/vaults"})})},children:"Delete Vault "}),(0,a.jsx)(Q,{handler:{address:H.q7.vaultHandler[t],abi:H.q7.vaultHandlerAbi},spending:{address:H.q7.emblemVault[t],abi:H.q7.emblemAbi},amount:0,label:"Approve Creating / Burning Vaults",watcher:eJ})]})})]}):null]})})]}),eb?(0,a.jsxs)(w.U,{align:"center",children:[(0,a.jsx)(u.r,{target:"new",mb:2,ml:35,href:"https://gateway.ipfs.io/ipfs/"+eb,isExternal:!0,children:"View Metadata on IPFS "}),ej?(0,a.jsx)(u.r,{mb:2,href:"https://gateway.ipfs.io/ipfs/"+ej,isExternal:!0,children:"View Image on IPFS "}):null]}):null,e9?(0,a.jsx)(s.xu,{display:"flex",mb:2,ml:35,alignItems:"baseline",justifyContent:"space-between",mt:"4",children:(0,a.jsx)(d.x,{children:"*This vault is sealed forever."})}):null,(0,a.jsx)(i.K,{direction:"column",align:"center",children:"claimed"==e5?(0,a.jsx)(d.x,{color:"green.500",children:"CLAIMED"}):null}),eR?(0,a.jsxs)(j.b,{status:"info",children:[(0,a.jsx)(v.z,{}),tj?"Accepting Your Gift Vault":e3?"Claiming your Vault ...":tS?"Handling Approval Flow ...":t_?"Transfering Vault ...":tY?"Minting Vault":"Validating transaction"]}):null]})}),eR?(0,a.jsx)(q.Z,{hash:eR,onComplete:()=>{B?(L(!1),location.href=location.origin+"/nft2?id="+em):!e3||tj||tO?tO?(nK(),tI(!0),tE(!1),eJ(null)):tj?(tv(!1),nD(),eJ(null)):tS?(ty(!1),nD(),eJ(null),location.href=location.origin+"/nft?id="+em):t_?(tF(!1),nD(),eJ(null)):tY?nM(em,()=>{tQ(!1),tV(!0),location.href=location.origin+"/nft?id="+em}):location.href=location.origin+"/nft?id="+em:(eJ(null),e8("claimed"),e4(!1),tt(e),location.href=location.origin+"/nft?id="+em)}}):null,(0,a.jsx)(s.xu,{height:"40px"})]})]})}},97903:function(e,t,n){"use strict";var a=n(85893),r=n(67294),o=n(71963),s=n(10682),l=n(51343),i=n(57747),c=n(33862);class d extends r.Component{render(){let e=[{image:this.props.image,name:this.props.name,type:"nft"}];return console.log("items",e=(e=e.concat(this.props.items)).filter(e=>""!==e.image&&"nft"==e.type)),(0,a.jsx)(s.Z,{className:"p-3",children:(0,a.jsx)(o.Z,{children:e.map((e,t)=>(0,a.jsx)(o.Z.Item,{children:(0,a.jsxs)(l.K,{children:[(0,a.jsx)(i.xu,{children:(0,a.jsx)(c.Z,{className:"d-block w-100 NFT-image",url:e.image})}),(0,a.jsx)(i.xu,{children:(0,a.jsx)(o.Z.Caption,{children:(0,a.jsx)("h3",{children:e.name})})})]})},t))})})}}t.Z=d},35649:function(e,t,n){"use strict";var a=n(85893),r=n(67294),o=n(93717),s=n(57747),l=n(71293);class i extends r.Component{render(){this.props.colorMode;let e=this.props.attributes;return(0,a.jsx)(o.k,{w:"100%",flexWrap:"wrap",mt:3,children:e.map((e,t)=>(0,a.jsx)(s.xu,{mt:"2px",p:1,ml:"3px",minWidth:"45%",width:"48%",className:"NFT newest coin-balance-content",children:"string"==typeof e.value?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l.x,{ml:2,mr:Number.isInteger(t/2)?0:"4px",fontSize:".9em",textAlign:Number.isInteger(t/2)?"left":"right",fontWeight:"bold",overflow:"hidden",isTruncated:!0,children:e.trait_type}),(0,a.jsx)(l.x,{ml:2,mr:Number.isInteger(t/2)?0:"4px",fontSize:".7em",textAlign:Number.isInteger(t/2)?"left":"right",color:"dark"==this.props.colorMode?"navajowhite":"gray",children:e.value})]}):null},0))})}}t.Z=i},10063:function(e,t,n){"use strict";n.d(t,{Lj:function(){return r},Nj:function(){return s},ZO:function(){return o},_o:function(){return i},mv:function(){return c},pk:function(){return l}});let a=async()=>"indexedDB"in window?new Promise((e,t)=>{let n=indexedDB.open("MyDatabase",1);n.onerror=e=>{console.error("Database error:",e.target.error),t(e.target.error)},n.onsuccess=t=>{e(t.target.result)},n.onupgradeneeded=e=>{let t=e.target.result;t.objectStoreNames.contains("vaults")||t.createObjectStore("vaults",{keyPath:"tokenId"})}}):(console.error("IndexedDB is not supported by this browser."),null),r=async()=>new Promise((e,t)=>{let n=indexedDB.deleteDatabase("MyDatabase");n.onerror=e=>{console.error("Database error:",e.target.error),t(e.target.error)},n.onsuccess=()=>{e(!0)}}),o=async(e,t)=>{console.log("getVaults - start");let n=await a();if(!n)throw console.error("Failed to open database"),Error("Failed to open database");let r=n.transaction(["vaults"],"readonly"),o=r.objectStore("vaults"),s=o.getAll();return new Promise((n,a)=>{s.onsuccess=()=>{console.log("All vaults successfully retrieved from store");let a=s.result.filter(t=>{var n,a;return e===(null===(n=t.ownership)||void 0===n?void 0:n.status)||e===(null===(a=t.ownershipInfo)||void 0===a?void 0:a.status)}).filter(n=>{var a,r,o,s,l,i;return"claimed"==e?t===(null===(a=n.ownership)||void 0===a?void 0:a.claimedBy)||t===(null===(r=n.ownershipInfo)||void 0===r?void 0:r.claimedBy):"unminted"==e?(null===(o=n.ownership)||void 0===o?void 0:o.createdBy)===t||t===(null===(s=n.ownershipInfo)||void 0===s?void 0:s.createdBy):t===(null===(l=n.ownership)||void 0===l?void 0:l.owner)||t===(null===(i=n.ownershipInfo)||void 0===i?void 0:i.owner)});n(a)},s.onerror=e=>{console.error("Error retrieving vaults from store:",e.target.error),a(e.target.error)}})},s=async e=>{console.log("getVaults - start");let t=await a();if(!t)throw console.error("Failed to open database"),Error("Failed to open database");let n=t.transaction(["vaults"],"readonly"),r=n.objectStore("vaults"),o=r.get(e);return new Promise((e,t)=>{o.onsuccess=()=>{console.log("All vaults successfully retrieved from store"),e(o.result)},o.onerror=e=>{console.error("Error retrieving vaults from store:",e.target.error),t(e.target.error)}})},l=async e=>{console.log("useDB - start");let t=await a();if(!t)throw console.error("Failed to open database"),Error("Failed to open database");let n=t.transaction(["vaults"],"readwrite"),r=n.objectStore("vaults");return new Promise((a,o)=>{e.forEach((e,t)=>{if(console.log("Processing item ".concat(t),e),!e.tokenId){console.error("Item missing tokenId:",e);return}let n=r.get(e.tokenId);n.onsuccess=()=>{console.log("Got vault ".concat(e.tokenId," from store")),n.result||(console.error("Item missing tokenId:",e),a(d(r,e,t,o))),n&&n.result&&!n.result.addresses&&a(d(r,e,t,o))},n.onerror=n=>{console.error("Item missing tokenId:",e),a(d(r,e,t,o))}}),n.oncomplete=()=>{console.log("Transaction complete"),t.close(),a(!0)},n.onerror=e=>{console.error("Transaction error:",e.target.error),t.close(),o(e.target.error)}})},i=async e=>{console.log("useDB - start");let t=await a();if(!t)throw console.error("Failed to open database"),Error("Failed to open database");let n=t.transaction(["vaults"],"readwrite"),r=n.objectStore("vaults");return new Promise((a,o)=>{let s=r.put(e);s.onsuccess=()=>{console.log("Item ".concat(e.tokenId," successfully put into store"))},s.onerror=e=>{console.error("Error putting item ".concat(index," into store:"),e.target.error),o(e.target.error)},n.oncomplete=()=>{console.log("Transaction complete"),t.close(),a(!0)},n.onerror=e=>{console.error("Transaction error:",e.target.error),t.close(),o(e.target.error)}})},c=async e=>{console.log("deleteVaultFromDatabase - start");let t=await a();if(!t)throw console.error("Failed to open database"),Error("Failed to open database");let n=t.transaction(["vaults"],"readwrite"),r=n.objectStore("vaults");return new Promise((a,o)=>{(function(e,t,n,a){let r=e.delete(t);r.onsuccess=()=>{console.log("Item ".concat(n," successfully deleted from store"))},r.onerror=e=>{console.error("Error deleting item ".concat(n," from store:"),e.target.error),a(e.target.error)}})(r,e,e,o),n.oncomplete=()=>{console.log("Transaction complete"),t.close(),a(!0)},n.onerror=e=>{console.error("Transaction error:",e.target.error),t.close(),o(e.target.error)}})};function d(e,t,n,a){let r=e.put(t);return r.onsuccess=()=>{console.log("Item ".concat(n," successfully put into store"))},r.onerror=e=>{console.error("Error putting item ".concat(n," into store:"),e.target.error),a(e.target.error)},r}},4767:function(){},63018:function(){},42480:function(){},33523:function(){},11734:function(){},61575:function(){},67647:function(){},80390:function(){},55896:function(){}}]);