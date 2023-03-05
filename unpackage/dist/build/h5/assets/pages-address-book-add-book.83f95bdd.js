import{y as e,o as s,c as t,w as a,T as l,b as o,d as c,t as r,v as i,p as d,F as n,q as p,i as f,e as m,s as u,X as _,R as h,A as b,a2 as y}from"./index.e3856387.js";import{_ as k}from"./uni-popup.b6a30396.js";import{r as g}from"./uni-app.es.039f777e.js";import{_ as x}from"./close.458bce50.js";import{_ as w}from"./ETH.9f110baa.js";import{_ as A}from"./right.af8a0f8e.js";import{_ as T}from"./_plugin-vue_export-helper.cdc0426e.js";import{A as j}from"./app.39bb0535.js";import{T as v}from"./token.bb23f639.js";import{A as C}from"./address-books.4288c25d.js";import{g as E}from"./graceChecker.21ec0954.js";import{_ as H}from"./expand.9dc4f4b7.js";import{_ as S}from"./scan.703693e7.js";const L=T({name:"choose-asset",emits:["change"],props:{pop_title:{type:String,required:!0},asset_list:{type:Array,default:[],required:!0},init_select:{type:String,required:!0}},data(){return{selected:this.init_select}},created(){},methods:{show(){this.$refs.asset_list_popup.open("bottom")},change(e){this.selected=e,this.close(),this.$emit("change",{contract_address:e})},close(){this.$refs.asset_list_popup.close()}}},[["render",function(u,_,h,b,y,T){const j=f,v=m,C=g(e("uni-popup"),k);return s(),t(j,{class:"alp-asset-list-popup"},{default:a((()=>[l(u.$slots,"default",{},void 0,!0),o(C,{ref:"asset_list_popup"},{default:a((()=>[o(j,{class:"alp-popup-container"},{default:a((()=>[o(j,{class:"alp-popup-top-area"},{default:a((()=>[o(j),o(j,{class:"alp-popup-title-area font-second-title"},{default:a((()=>[c(r(h.pop_title),1)])),_:1}),o(v,{class:"alp-popup-close-area",mode:"widthFix",src:x,onClick:T.close},null,8,["onClick"])])),_:1}),o(j,{class:"alp-popup-content-area"},{default:a((()=>[o(j,{class:"alp-asset-item",onClick:_[0]||(_[0]=e=>T.change("ETH"))},{default:a((()=>[o(j,{class:"alp-asset-name"},{default:a((()=>[o(v,{src:w}),o(j,{class:"alp-asset-text font-third-title"},{default:a((()=>[c("ETH")])),_:1})])),_:1}),o(j,null,{default:a((()=>["ETH"==y.selected?(s(),t(v,{key:0,class:"alp-selected-icon",src:A})):i("",!0)])),_:1})])),_:1}),(s(!0),d(n,null,p(h.asset_list,((e,l)=>(s(),t(j,{class:"alp-asset-item",onClick:s=>T.change(e.contract_address)},{default:a((()=>[o(j,{class:"alp-asset-name"},{default:a((()=>[o(j,{class:"alp-token-default-icon flex-row-center-center"},{default:a((()=>[c(r(e.symbol[0]),1)])),_:2},1024),o(j,{class:"alp-asset-text font-third-title"},{default:a((()=>[c(r(e.symbol),1)])),_:2},1024)])),_:2},1024),o(j,null,{default:a((()=>[e.contract_address==y.selected?(s(),t(v,{key:0,class:"alp-selected-icon",src:A})):i("",!0)])),_:2},1024)])),_:2},1032,["onClick"])))),256))])),_:1})])),_:1})])),_:1},512)])),_:3})}],["__scopeId","data-v-f8138f14"]]);const $=T({data:()=>({address_books:[],asset_list:[],selected_asset:{symbol:"ETH"}}),onLoad(e){j.checkAppInit()&&this.loadTokenList()},methods:{formSubmit(e){var s={address:e.detail.value.address,name:e.detail.value.name,desc:e.detail.value.desc,asset:this.selected_asset};return E.check(s,[{name:"address",checkType:"notnull",checkRule:"",errorMsg:"Please enter address"},{name:"address",checkType:"reg",checkRule:"^0x[0-9a-fA-F]{40}$",errorMsg:"Incorrect address"},{name:"name",checkType:"notnull",checkRule:"",errorMsg:"Please enter name"}])?C.save(s)?(u({title:"Added successfully",icon:"success"}),void _()):void u({title:"Failed to add",icon:"error"}):(u({title:E.error,icon:"none"}),!1)},loadTokenList(){let e=v.getList();Array.isArray(e)&&(this.asset_list=e)},showAssetListtPop(){this.$refs.asset_choose.show()},changeAsset(e){if("ETH"!=e.contract_address)for(let s of this.asset_list)e.contract_address==s.contract_address&&(this.selected_asset=s);else this.selected_asset={symbol:"ETH"}}}},[["render",function(l,i,d,n,p,u){const _=f,k=m,x=g(e("choose-asset"),L),A=h,T=b,j=y;return s(),t(_,{class:"container"},{default:a((()=>[o(j,{onSubmit:u.formSubmit},{default:a((()=>[o(_,{class:"form-item"},{default:a((()=>[o(_,{class:"form-item-title font-desc-black"},{default:a((()=>[c("Asset")])),_:1}),o(_,{class:"form-item-content"},{default:a((()=>[o(x,{ref:"asset_choose",pop_title:"Select Asset",asset_list:p.asset_list,init_select:"ETH",onChange:u.changeAsset},{default:a((()=>[o(_,{class:"asset-selector flex-row-space-between-center",onClick:u.showAssetListtPop},{default:a((()=>["ETH"==p.selected_asset.symbol?(s(),t(_,{key:0,class:"asset-info flex-row-start-center"},{default:a((()=>[o(k,{class:"asset-icon",src:w}),o(_,{class:"asset-name font-desc-black"},{default:a((()=>[c(r(p.selected_asset.symbol),1)])),_:1})])),_:1})):(s(),t(_,{key:1,class:"asset-info flex-row-start-center"},{default:a((()=>[o(_,{class:"token-default-icon flex-row-center-center"},{default:a((()=>[c(r(p.selected_asset.symbol[0]),1)])),_:1}),o(_,{class:"asset-name font-third-title",style:{"margin-left":"10rpx"}},{default:a((()=>[c(r(p.selected_asset.symbol),1)])),_:1})])),_:1})),o(k,{class:"form-icon",src:H})])),_:1},8,["onClick"])])),_:1},8,["asset_list","onChange"])])),_:1})])),_:1}),o(_,{class:"form-item"},{default:a((()=>[o(_,{class:"form-item-title font-desc-black"},{default:a((()=>[c("Address info")])),_:1}),o(_,{class:"form-item-content"},{default:a((()=>[o(_,{class:"sub-item sub-item-border flex-row-space-between-center"},{default:a((()=>[o(A,{class:"form-item-input",style:{width:"90%"},type:"text",name:"address",placeholder:"wallet address"}),o(k,{class:"form-icon",src:S})])),_:1}),o(_,{class:"sub-item sub-item-border"},{default:a((()=>[o(A,{class:"form-item-input",type:"text",name:"name",placeholder:"name"})])),_:1}),o(_,{class:"sub-item"},{default:a((()=>[o(A,{class:"form-item-input",type:"text",name:"desc",placeholder:"description (optional)"})])),_:1})])),_:1})])),_:1}),o(_,{class:"form-item"},{default:a((()=>[o(T,{"form-type":"submit",class:"form-btn",type:"primary"},{default:a((()=>[c("add")])),_:1})])),_:1})])),_:1},8,["onSubmit"])])),_:1})}],["__scopeId","data-v-5fccf8da"]]);export{$ as default};
