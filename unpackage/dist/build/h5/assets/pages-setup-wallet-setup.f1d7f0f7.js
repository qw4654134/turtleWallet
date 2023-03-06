import{x as e,o as t,c as s,w as o,b as l,S as a,d as i,t as n,T as c,u,i as p,R as r,M as d,j as f,e as m,y as _}from"./index.3b969e63.js";import{_ as h,a as g,b as x,c as y}from"./import_wallet.caf8d6f6.js";import{r as b}from"./uni-app.es.02f92043.js";import{m as w,p as T}from"./index.267ad268.js";import{_ as k}from"./_plugin-vue_export-helper.cdc0426e.js";import{_ as C}from"./uni-popup.b604bd36.js";import{A as v}from"./app.7b4b9720.js";import{_ as j}from"./wallet.802b5a15.js";import"./pin.68bc82e3.js";import"./md5.c7cedf05.js";import"./close.458bce50.js";const{t:S}=e(w);const I=k({name:"uniPopupDialog",mixins:[T],emits:["confirm","close"],props:{inputType:{type:String,default:"text"},value:{type:[String,Number],default:""},placeholder:{type:[String,Number],default:""},type:{type:String,default:"error"},mode:{type:String,default:"base"},title:{type:String,default:""},content:{type:String,default:""},beforeClose:{type:Boolean,default:!1},cancelText:{type:String,default:""},confirmText:{type:String,default:""}},data:()=>({dialogType:"error",focus:!1,val:""}),computed:{okText(){return this.confirmText||S("uni-popup.ok")},closeText(){return this.cancelText||S("uni-popup.cancel")},placeholderText(){return this.placeholder||S("uni-popup.placeholder")},titleText(){return this.title||S("uni-popup.title")}},watch:{type(e){this.dialogType=e},mode(e){"input"===e&&(this.dialogType="info")},value(e){this.val=e}},created(){this.popup.disableMask(),"input"===this.mode?(this.dialogType="info",this.val=this.value):this.dialogType=this.type},mounted(){this.focus=!0},methods:{onOk(){"input"===this.mode?this.$emit("confirm",this.val):this.$emit("confirm"),this.beforeClose||this.popup.close()},closeDialog(){this.$emit("close"),this.beforeClose||this.popup.close()},close(){this.popup.close()}}},[["render",function(e,d,f,m,_,h){const g=u,x=p,y=r;return t(),s(x,{class:"uni-popup-dialog"},{default:o((()=>[l(x,{class:"uni-dialog-title"},{default:o((()=>[l(g,{class:a(["uni-dialog-title-text",["uni-popup__"+_.dialogType]])},{default:o((()=>[i(n(h.titleText),1)])),_:1},8,["class"])])),_:1}),"base"===f.mode?(t(),s(x,{key:0,class:"uni-dialog-content"},{default:o((()=>[c(e.$slots,"default",{},(()=>[l(g,{class:"uni-dialog-content-text"},{default:o((()=>[i(n(f.content),1)])),_:1})]),!0)])),_:3})):(t(),s(x,{key:1,class:"uni-dialog-content"},{default:o((()=>[c(e.$slots,"default",{},(()=>[l(y,{class:"uni-dialog-input",modelValue:_.val,"onUpdate:modelValue":d[0]||(d[0]=e=>_.val=e),type:f.inputType,placeholder:h.placeholderText,focus:_.focus},null,8,["modelValue","type","placeholder","focus"])]),!0)])),_:3})),l(x,{class:"uni-dialog-button-group"},{default:o((()=>[l(x,{class:"uni-dialog-button",onClick:h.closeDialog},{default:o((()=>[l(g,{class:"uni-dialog-button-text"},{default:o((()=>[i(n(h.closeText),1)])),_:1})])),_:1},8,["onClick"]),l(x,{class:"uni-dialog-button uni-border-left",onClick:h.onOk},{default:o((()=>[l(g,{class:"uni-dialog-button-text uni-button-color"},{default:o((()=>[i(n(h.okText),1)])),_:1})])),_:1},8,["onClick"])])),_:1})])),_:3})}],["__scopeId","data-v-890d896d"]]);const $=k({data:()=>({auto_show_guest:!1,guest_url:"/pages/setup-wallet/create-pin?scene=guest-mode&input_time=1&tip=After creating PIN, you can start the experience"}),onLoad(e){v.checkAppInit()&&e&&e.guest_mode&&(this.auto_show_guest=!0)},onShow(){},onReady(){this.auto_show_guest&&this.$refs.expreience_dia.open()},methods:{createWallet:function(){d({url:"/pages/setup-wallet/create-pin?scene=create-wallet&input_time=1"})},showImportWalletPopup:function(){this.$refs.import_wallet_popup.show()},showGuestModePop:function(){f({content:"You'll experience this App with sample data in test network",confirmText:"Go on",success:function(e){e.confirm&&d({url:"/pages/setup-wallet/create-pin?scene=guest-mode&input_time=1&tip=After creating PIN, you can start the experience"})}})},expreienceDiaConfirm:function(){d({url:this.guest_url})},expreienceDiaClose:function(){this.$refs.expreience_dia.close()}}},[["render",function(e,a,n,c,u,r){const d=m,f=p,w=b(_("import-wallet"),y),T=b(_("uni-popup-dialog"),I),k=b(_("uni-popup"),C);return t(),s(f,{class:"container"},{default:o((()=>[l(f,{class:"icon-container"},{default:o((()=>[l(d,{class:"image",mode:"widthFix",src:j})])),_:1}),l(f,{class:"setup-container"},{default:o((()=>[l(f,{class:"setup-text"},{default:o((()=>[l(f,{class:"setup-text-title font-first-title"},{default:o((()=>[i("Set up ETH wallet")])),_:1}),l(f,{class:"setup-text-desc font-desc-black"},{default:o((()=>[i("Turtle Wallet currently only supports Ethereum tokens")])),_:1})])),_:1}),l(f,{class:"setup-func-list"},{default:o((()=>[l(f,{class:"setup-func setup-func-border",onClick:r.createWallet},{default:o((()=>[l(f,{class:"func-icon"},{default:o((()=>[l(d,{class:"image",src:h})])),_:1}),l(f,{class:"func-title-desc"},{default:o((()=>[l(f,{class:"func-title font-second-title"},{default:o((()=>[i("Create new crypto wallet")])),_:1}),l(f,{class:"func-desc font-desc-black"},{default:o((()=>[i("to store,send & receive")])),_:1})])),_:1})])),_:1},8,["onClick"]),l(w,{ref:"import_wallet_popup",pop_title:"Import ETH wallet"},{default:o((()=>[l(f,{class:"setup-func",onClick:r.showImportWalletPopup},{default:o((()=>[l(f,{class:"func-icon"},{default:o((()=>[l(d,{class:"image",src:g})])),_:1}),l(f,{class:"func-title-desc"},{default:o((()=>[l(f,{class:"func-title font-second-title"},{default:o((()=>[i("Import your wallet")])),_:1}),l(f,{class:"func-desc font-desc-black"},{default:o((()=>[i("by mnemonic,private key or keystore")])),_:1})])),_:1})])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1}),l(f,{class:"guest-mode"},{default:o((()=>[l(f,{class:"flex-row-center-center",onClick:r.showGuestModePop},{default:o((()=>[l(f,{class:"font-desc-gray"},{default:o((()=>[i("Experience mode")])),_:1}),l(d,{class:"guest-mode-into",src:x})])),_:1},8,["onClick"])])),_:1}),l(k,{ref:"expreience_dia",type:"dialog"},{default:o((()=>[l(T,{type:"info",cancelText:"不了",confirmText:"好的",title:"体验模式",content:"您由体验链接进入，建议进入体验模式，自动导入样本钱包，高效体验",onConfirm:r.expreienceDiaConfirm,onClose:r.expreienceDiaClose},null,8,["onConfirm","onClose"])])),_:1},512)])),_:1})}],["__scopeId","data-v-7f5083e0"]]);export{$ as default};
