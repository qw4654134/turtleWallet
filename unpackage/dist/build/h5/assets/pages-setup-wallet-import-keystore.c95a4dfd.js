import{a as e,s as t,H as s,I as o,r,o as a,c as i,w as l,i as n,b as p,d,af as c,R as f,A as m,a2 as u,y as w}from"./index.0a4c0685.js";import{_ as y}from"./pin-popup.6457a9ca.js";import{r as _}from"./uni-app.es.c3027b2b.js";import{A as h}from"./app.0d53c675.js";import{P as b}from"./pin.df080574.js";import{E as k}from"./etherApi.1ad454b5.js";import{W as g}from"./wallet.d02e9b30.js";import{_ as j}from"./_plugin-vue_export-helper.cdc0426e.js";import"./pin-code-keyboard.99bc3a02.js";import"./uni-popup.08b8f0e9.js";import"./md5.c7cedf05.js";import"./close.458bce50.js";import"./config.56fe6dcf.js";import"./wallet.f064e6a3.js";const P=j({data:()=>({network_list:e().globalData.global_network_list,global_network_index:e().globalData.global_network_index,keystore:null,password:""}),onLoad(){h.checkAppInit()},onShow(){this.pin_code=b.checkPinStatus(),this.pin_code},methods:{showPinPopup(e){let s=null;try{s=JSON.parse(e.detail.value.keystore)}catch(o){return t({title:"Please enter keystore in json form",icon:"error"}),!1}return s?(this.keystore=s,this.password=e.detail.value.password,this.password?void this.$refs.pin_popup.show():(t({title:"Please enter password",icon:"error"}),!1)):(t({title:"Please enter keystore in json form",icon:"error"}),!1)},verifyPinCode(e){let s=e.ret;s?(this.$refs.pin_popup.closePopup(),this.importWallet(this.keystore,this.password,s)):t({title:"PIN error",icon:"none"})},async importWallet(e,a,i){s({title:"importing..."});let l=new k.etherApi(this.network_list[this.global_network_index],!1),n=await l.fromEncryptedJson(JSON.stringify(e),a);if(console.log(JSON.stringify(n)),!n)return o(),t({title:"Failed to import wallet,please try again",icon:"error"}),!1;let p=await g.encryptWallet(n.privateKey,i);if(!p)return o(),t({title:"Failed to import wallet,please try again",icon:"error"}),!1;let d={};return d.address=n.address,d.keystore=JSON.parse(p),g.saveWallet(d)?(g.setDefaultWallet(d.address),o(),t({title:"Import succeeded"}),setTimeout((()=>{r({url:"/pages/index/wallet"})}),1200),!0):(o(),t({title:"Failed to import wallet,please try again",icon:"error"}),!1)}}},[["render",function(e,t,s,o,r,h){const b=n,k=c,g=f,j=m,P=u,x=_(w("pin-popup"),y);return a(),i(b,{class:"container"},{default:l((()=>[p(P,{onSubmit:h.showPinPopup},{default:l((()=>[p(b,{class:"form-item"},{default:l((()=>[p(b,{class:"font-desc-black"},{default:l((()=>[d("Keystore")])),_:1}),p(k,{class:"keystore-text",name:"keystore",maxlength:"-1",cols:"30",rows:"10",placeholder:"Enter keystore,it's a json text"})])),_:1}),p(b,{class:"form-item"},{default:l((()=>[p(b,{class:"font-desc-black"},{default:l((()=>[d("Password")])),_:1}),p(g,{type:"safe-password",class:"password-input",name:"password"})])),_:1}),p(b,{class:"confirm-btn"},{default:l((()=>[p(j,{"form-type":"submit",class:"form-btn",type:"primary"},{default:l((()=>[d("confirm")])),_:1})])),_:1})])),_:1},8,["onSubmit"]),p(x,{ref:"pin_popup",pop_title:"Please enter PIN",onVerifyRet:h.verifyPinCode},null,8,["onVerifyRet"])])),_:1})}],["__scopeId","data-v-6f4a5b4f"]]);export{P as default};