import{a as e,s as t,H as a,I as r,r as i,o,c as s,w as l,i as p,b as n,d,af as f,A as m,a2 as c,y as u}from"./index.00515032.js";import{_}from"./pin-popup.f9026ce7.js";import{r as y}from"./uni-app.es.a8702ba9.js";import{A as b}from"./app.20562bb2.js";import"./md5.c7cedf05.js";import{E as k}from"./etherApi.cd83fec6.js";import{W as w}from"./wallet.146457ab.js";import{_ as h}from"./_plugin-vue_export-helper.cdc0426e.js";import"./pin-code-keyboard.2a21a0ad.js";import"./uni-popup.bd409adf.js";import"./pin.f85ff11e.js";import"./close.79b28ceb.js";import"./config.d9a5f6eb.js";import"./wallet.f064e6a3.js";const v=h({data:()=>({network_list:e().globalData.global_network_list,global_network_index:e().globalData.global_network_index,private_key:""}),onLoad(){b.checkAppInit()},onShow(){},methods:{showPinPopup(e){if(this.private_key=e.detail.value.private_key,!this.private_key)return t({title:"Please enter private key",icon:"error"}),!1;this.$refs.pin_popup.show()},verifyPinCode(e){let a=e.ret;a?(this.$refs.pin_popup.closePopup(),this.importWallet(this.private_key,a)):t({title:"PIN error",icon:"none"})},async importWallet(e,o){a({title:"importing..."});let s=new k.etherApi(this.network_list[this.global_network_index],!1).fromPrivateKey(e);if(console.log(JSON.stringify(s)),!s)return r(),t({title:"Failed to import wallet,please try again",icon:"error"}),!1;let l=await w.encryptWallet(s.privateKey,o);if(!l)return r(),t({title:"Failed to import wallet,please try again",icon:"error"}),!1;let p={};return p.address=s.address,p.keystore=JSON.parse(l),w.saveWallet(p)?(w.setDefaultWallet(p.address),r(),t({title:"Import succeeded"}),setTimeout((()=>{i({url:"/pages/index/wallet"})}),1200),!0):(r(),t({title:"Failed to import wallet,please try again",icon:"error"}),!1)}}},[["render",function(e,t,a,r,i,b){const k=p,w=f,h=m,v=c,g=y(u("pin-popup"),_);return o(),s(k,{class:"container"},{default:l((()=>[n(v,{onSubmit:b.showPinPopup},{default:l((()=>[n(k,{class:"form-item"},{default:l((()=>[n(k,{class:"font-desc-black"},{default:l((()=>[d("Private key")])),_:1}),n(w,{class:"private-key-text",name:"private_key",maxlength:"200",cols:"30",rows:"10",placeholder:"Enter private key"})])),_:1}),n(k,{class:"confirm-btn"},{default:l((()=>[n(h,{"form-type":"submit",class:"form-btn",type:"primary"},{default:l((()=>[d("Next")])),_:1})])),_:1})])),_:1},8,["onSubmit"]),n(g,{ref:"pin_popup",pop_title:"Please enter PIN",onVerifyRet:b.verifyPinCode},null,8,["onVerifyRet"])])),_:1})}],["__scopeId","data-v-326c4ef1"]]);export{v as default};
