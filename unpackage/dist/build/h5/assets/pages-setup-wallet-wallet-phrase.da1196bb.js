import{Y as e,Z as s,$ as a,a1 as t,s as o,H as l,I as c,M as i,o as r,c as n,w as g,i as h,b as p,d as C,p as f,q as A,F as I,e as d,A as y,t as m}from"./index.00515032.js";import{A as Q}from"./app.20562bb2.js";import{W as J}from"./wallet.146457ab.js";import"./md5.c7cedf05.js";import{P as F}from"./pin.f85ff11e.js";import{c as _}from"./crypt.5bab9368.js";import{_ as u}from"./_plugin-vue_export-helper.cdc0426e.js";import"./wallet.f064e6a3.js";const E=u({data:()=>({pin_code:"",phrases:["____","____","____","____","____","____","____","____","____","____","____","____"],wallet_info:{}}),onLoad(){Q.checkAppInit()&&(e("pin_code_set",(e=>{console.dir(e),e&&e.pin&&(this.pin_code=e.pin)})),s("pin_code_set1",{msg:"页面更新"}),this.change())},onUnload(){a("pin_code_set"),a("new_wallet_info1")},onShow(){},methods:{copyPhrases(){t({data:this.phrases.join(" "),success:function(){o({title:"The phrases has been copied",icon:"none"})},fail:function(){o({title:"Failed to copy phrases"}),console.log("复制助记词失败")}})},change(){F.checkPinStatus()&&this.changePhrases()},changePhrases(){l({title:"creating"});let e=J.createWallet();console.log(this.pin_code),console.log(e.address),console.log(e.privateKey);let s=e.mnemonic.phrase.split(" ");for(var a=0;a<s.length;a++)this.phrases[a]=s[a];this.wallet_info.address=e.address,this.wallet_info.phrases=e.mnemonic.phrase,J.encryptWallet(e.privateKey,this.pin_code).then((e=>{c(),this.wallet_info.keystore=JSON.parse(e),console.dir(this.wallet_info)}),(e=>{c(),console.log("生成keystores error"),console.log(e)}))},toCheckPhrases(){try{var a=F.checkPinStatus();if(!a)return;JSON.stringify(this.wallet_info);var t=_.aesEncrypt(JSON.stringify(this.wallet_info),a);console.log(t),e("new_wallet_info1",(()=>{s("new_wallet_info",{new_wallet_info:t})})),i({url:"/pages/setup-wallet/check-phrase"})}catch(o){console.log("存储new_wallet_info失败"),console.log(o)}}}},[["render",function(e,s,a,t,o,l){const c=h,i=d,Q=y;return r(),n(c,{class:"container"},{default:g((()=>[p(c,{class:"secret-phrase-text"},{default:g((()=>[p(c,{class:"secret-phrase-title font-first-title"},{default:g((()=>[C("Your Secret Phrases")])),_:1}),p(c,{class:"secret-phrase-desc font-desc-black"},{default:g((()=>[C("Please save these phrases, or you will lose your assets")])),_:1})])),_:1}),p(c,{class:"secret-phrase-list"},{default:g((()=>[(r(!0),f(I,null,A(o.phrases,((e,s)=>(r(),n(c,{class:"phrase-item"},{default:g((()=>[p(c,{class:"phrase-item-index font-desc-gray"},{default:g((()=>[C(m(s+1),1)])),_:2},1024),p(c,{class:"phrase-word font-second-title"},{default:g((()=>[C(m(e),1)])),_:2},1024)])),_:2},1024)))),256))])),_:1}),p(c,{class:"func-area"},{default:g((()=>[p(c,{class:"func-item",onClick:l.copyPhrases},{default:g((()=>[p(i,{class:"func-icon",src:"data:image/png;base64,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"}),p(c,{class:"func-text font-desc-black"},{default:g((()=>[C("Copy")])),_:1})])),_:1},8,["onClick"]),p(c,{class:"func-item",onClick:l.change},{default:g((()=>[p(i,{class:"func-icon",src:"/assets/change.9fc161f8.png"}),p(c,{class:"func-text font-desc-black"},{default:g((()=>[C("Change")])),_:1})])),_:1},8,["onClick"])])),_:1}),p(c,{class:"secure-tip font-desc-gray"},{default:g((()=>[p(c,null,{default:g((()=>[C("Never share your phrases with anyone")])),_:1}),p(c,null,{default:g((()=>[C("Store it securely in offline")])),_:1})])),_:1}),p(c,{class:"get-start"},{default:g((()=>[p(Q,{class:"form-btn",type:"primary",onClick:l.toCheckPhrases},{default:g((()=>[C("Get started")])),_:1},8,["onClick"])])),_:1})])),_:1})}],["__scopeId","data-v-45f7d30e"]]);export{E as default};
