import{s as e,X as t,j as a,o as s,c as l,w as r,i as c,b as o,d,t as n,y as i}from"./index.e3856387.js";import{_ as f}from"./uni-icons.c040caaf.js";import{r as u}from"./uni-app.es.039f777e.js";import{A as m}from"./app.39bb0535.js";import{W as _}from"./wallet.d7a37044.js";import{_ as p}from"./_plugin-vue_export-helper.cdc0426e.js";import"./md5.c7cedf05.js";import"./wallet.f064e6a3.js";const w=p({data:()=>({current_wallet:{address:"0x...........................",name:"ETH Wallet",keystore:"",balance:"__",usd_worth:"__",tokens:[]}}),onLoad(a){if(m.checkAppInit()){if(!a.address)return e({title:"Data exception",icon:"error"}),void t();this.current_wallet.address=a.address,this.loadWalletData()}},methods:{loadWalletData:function(){let e=_.getWallet(this.current_wallet.address);if(!e)return a({title:"Data exception, please contact admin",showCancel:!1,confirmText:"Got it"}),console.log("读取钱包数据异常"),!1;this.current_wallet=e}}},[["render",function(e,t,a,m,_,p){const w=c,b=u(i("uni-icons"),f);return s(),l(w,null,{default:r((()=>[o(w,{class:"group"},{default:r((()=>[o(w,{class:"item item-border"},{default:r((()=>[o(w,{class:"item-title font-desc-black"},{default:r((()=>[d("Wallet Address")])),_:1}),o(w,{class:"item-desc font-desc-gray-little"},{default:r((()=>[d(n(_.current_wallet.address),1)])),_:1})])),_:1}),o(w,{class:"item flex-row-space-between-center"},{default:r((()=>[o(w,{class:"item-title font-desc-black"},{default:r((()=>[d("Wallet Name")])),_:1}),o(w,{class:"flex-row-center-center"},{default:r((()=>[o(w,{class:"font-desc-black",style:{"margin-right":"15rpx"}},{default:r((()=>[d(n(_.current_wallet.name),1)])),_:1}),o(b,{type:"forward"})])),_:1})])),_:1})])),_:1}),o(w,{class:"group"},{default:r((()=>[o(w,{class:"item flex-row-space-between-center"},{default:r((()=>[o(w,{class:"item-title font-desc-black"},{default:r((()=>[d("Backup wallet")])),_:1}),o(b,{type:"forward"})])),_:1})])),_:1}),o(w,{class:"group"},{default:r((()=>[o(w,{class:"item flex-row-center-center"},{default:r((()=>[o(w,{class:"item-title font-desc-black",style:{color:"red"}},{default:r((()=>[d("Delete wallet")])),_:1})])),_:1})])),_:1})])),_:1})}],["__scopeId","data-v-99130363"]]);export{w as default};
