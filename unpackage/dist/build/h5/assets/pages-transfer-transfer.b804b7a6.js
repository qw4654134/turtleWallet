import{y as e,o as t,c as s,w as a,T as i,b as o,d as l,t as n,p as r,F as c,q as d,i as u,e as m,k as _,x as f,V as p,a7 as A,v as h,u as g,S as y,a as w,j as b,s as x,U as k,H as C,I as v,Z as I,r as M,R as T,A as R,a2 as z}from"./index.00515032.js";import{_ as D,a as E}from"./expand.c47b425a.js";import{r as G}from"./uni-app.es.a8702ba9.js";import{_ as j}from"./uni-popup.bd409adf.js";import{_ as J}from"./close.79b28ceb.js";import{_ as B}from"./ETH.9f110baa.js";import{_ as S}from"./_plugin-vue_export-helper.cdc0426e.js";import{_ as H}from"./pin-popup.f9026ce7.js";import{A as P}from"./app.20562bb2.js";import{W}from"./wallet.146457ab.js";import{E as Q,p as N,a as F,f as Z,U as L,P as V}from"./etherApi.cd83fec6.js";import{g as Y}from"./graceChecker.21ec0954.js";import"./md5.c7cedf05.js";import{T as X}from"./transaction.df10ee41.js";import{T as U}from"./token.fc003255.js";import"./import_wallet.2133ddc7.js";import"./pin.f85ff11e.js";import"./pin-code-keyboard.2a21a0ad.js";import"./wallet.f064e6a3.js";import"./config.d9a5f6eb.js";const O=S({name:"choose-token",emits:["change"],props:{pop_title:{type:String,required:!0},wallet:{type:Object,default:[],required:!0}},data:()=>({}),methods:{show(){this.$refs.token_list_popup.open("bottom")},change(e){this.close(),this.$emit("change",{contract_address:e})},close(){this.$refs.token_list_popup.close()}}},[["render",function(_,f,p,A,h,g){const y=u,w=m,b=G(e("uni-popup"),j);return t(),s(y,{class:"tlp-token-list-popup"},{default:a((()=>[i(_.$slots,"default",{},void 0,!0),o(b,{ref:"token_list_popup"},{default:a((()=>[o(y,{class:"tlp-popup-container"},{default:a((()=>[o(y,{class:"tlp-popup-top-area"},{default:a((()=>[o(y),o(y,{class:"tlp-popup-title-area font-second-title"},{default:a((()=>[l(n(p.pop_title),1)])),_:1}),o(w,{class:"tlp-popup-close-area",mode:"widthFix",src:J,onClick:g.close},null,8,["onClick"])])),_:1}),o(y,{class:"tlp-popup-content-area"},{default:a((()=>[o(y,{class:"tlp-asset-item",onClick:f[0]||(f[0]=e=>g.change("ETH"))},{default:a((()=>[o(y,{class:"tlp-asset-name"},{default:a((()=>[o(w,{src:B}),o(y,{class:"tlp-asset-text font-third-title"},{default:a((()=>[l("ETH")])),_:1})])),_:1}),o(y,{class:"tlp-asset-bal"},{default:a((()=>[o(y,{class:"tlp-asset-bal-num font-third-title"},{default:a((()=>[l(n(p.wallet.balance),1)])),_:1}),o(y,{class:"tlp-asset-bal-worth font-desc-gray"},{default:a((()=>[l("$ "+n(p.wallet.usd_worth),1)])),_:1})])),_:1})])),_:1}),(t(!0),r(c,null,d(p.wallet.tokens,((e,i)=>(t(),s(y,{class:"tlp-asset-item",onClick:t=>g.change(e.contract_address)},{default:a((()=>[o(y,{class:"tlp-asset-name"},{default:a((()=>[o(y,{class:"tlp-token-default-icon flex-row-center-center"},{default:a((()=>[l(n(e.symbol[0]),1)])),_:2},1024),o(y,{class:"tlp-asset-text font-third-title"},{default:a((()=>[l(n(e.symbol),1)])),_:2},1024)])),_:2},1024),o(y,{class:"tlp-asset-bal"},{default:a((()=>[o(y,{class:"tlp-asset-bal-num font-third-title"},{default:a((()=>[l(n(e.balance),1)])),_:2},1024),o(y,{class:"tlp-asset-bal-worth font-desc-gray"},{default:a((()=>[l("$ "+n(e.usd_worth),1)])),_:2},1024)])),_:2},1024)])),_:2},1032,["onClick"])))),256))])),_:1})])),_:1})])),_:1},512)])),_:3})}],["__scopeId","data-v-02276b1b"]]),K={en:{"uni-load-more.contentdown":"Pull up to show more","uni-load-more.contentrefresh":"loading...","uni-load-more.contentnomore":"No more data"},"zh-Hans":{"uni-load-more.contentdown":"上拉显示更多","uni-load-more.contentrefresh":"正在加载...","uni-load-more.contentnomore":"没有更多数据了"},"zh-Hant":{"uni-load-more.contentdown":"上拉顯示更多","uni-load-more.contentrefresh":"正在加載...","uni-load-more.contentnomore":"沒有更多數據了"}};let q;setTimeout((()=>{q=_().platform}),16);const{t:$}=f(K);const ee=S({name:"UniLoadMore",emits:["clickLoadMore"],props:{status:{type:String,default:"more"},showIcon:{type:Boolean,default:!0},iconType:{type:String,default:"auto"},iconSize:{type:Number,default:24},color:{type:String,default:"#777777"},contentText:{type:Object,default:()=>({contentdown:"",contentrefresh:"",contentnomore:""})},showText:{type:Boolean,default:!0}},data:()=>({webviewHide:!1,platform:q,imgBase64:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzlBMzU3OTlEOUM0MTFFOUI0NTZDNERBQURBQzI4RkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzlBMzU3OUFEOUM0MTFFOUI0NTZDNERBQURBQzI4RkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDOUEzNTc5N0Q5QzQxMUU5QjQ1NkM0REFBREFDMjhGRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDOUEzNTc5OEQ5QzQxMUU5QjQ1NkM0REFBREFDMjhGRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt+ALSwAAA6CSURBVHja1FsLkFZV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"}),computed:{iconSnowWidth(){return 2*(Math.floor(this.iconSize/24)||1)},contentdownText(){return this.contentText.contentdown||$("uni-load-more.contentdown")},contentrefreshText(){return this.contentText.contentrefresh||$("uni-load-more.contentrefresh")},contentnomoreText(){return this.contentText.contentnomore||$("uni-load-more.contentnomore")}},mounted(){},methods:{onClick(){this.$emit("clickLoadMore",{detail:{status:this.status}})}}},[["render",function(e,i,c,d,_,f){const y=m,w=u,b=g;return t(),s(w,{class:"uni-load-more",onClick:f.onClick},{default:a((()=>[!_.webviewHide&&("circle"===c.iconType||"auto"===c.iconType&&"android"===_.platform)&&"loading"===c.status&&c.showIcon?(t(),r("svg",{key:0,width:"24",height:"24",viewBox:"25 25 50 50",style:p({width:c.iconSize+"px",height:c.iconSize+"px"}),class:"uni-load-more__img uni-load-more__img--android-H5"},[A("circle",{cx:"50",cy:"50",r:"20",fill:"none",style:p({color:c.color}),"stroke-width":3},null,4)],4)):!_.webviewHide&&"loading"===c.status&&c.showIcon?(t(),s(w,{key:1,style:p({width:c.iconSize+"px",height:c.iconSize+"px"}),class:"uni-load-more__img uni-load-more__img--ios-H5"},{default:a((()=>[o(y,{src:_.imgBase64,mode:"widthFix"},null,8,["src"])])),_:1},8,["style"])):h("",!0),c.showText?(t(),s(b,{key:2,class:"uni-load-more__text",style:p({color:c.color})},{default:a((()=>[l(n("more"===c.status?f.contentdownText:"loading"===c.status?f.contentrefreshText:f.contentnomoreText),1)])),_:1},8,["style"])):h("",!0)])),_:1},8,["onClick"])}],["__scopeId","data-v-d82f3750"]]);const te=S({name:"UniSegmentedControl",emits:["clickItem"],props:{current:{type:Number,default:0},values:{type:Array,default:()=>[]},activeColor:{type:String,default:"#2979FF"},styleType:{type:String,default:"button"}},data:()=>({currentIndex:0}),watch:{current(e){e!==this.currentIndex&&(this.currentIndex=e)}},created(){this.currentIndex=this.current},methods:{_onClick(e){this.currentIndex!==e&&(this.currentIndex=e,this.$emit("clickItem",{currentIndex:e}))}}},[["render",function(e,i,m,_,f,A){const h=g,w=u;return t(),s(w,{class:y([["text"===m.styleType?"segmented-control--text":"segmented-control--button"],"segmented-control"]),style:p({borderColor:"text"===m.styleType?"":m.activeColor})},{default:a((()=>[(t(!0),r(c,null,d(m.values,((e,i)=>(t(),s(w,{class:y([["text"===m.styleType?"":"segmented-control__item--button",i===f.currentIndex&&"button"===m.styleType?"segmented-control__item--button--active":"",0===i&&"button"===m.styleType?"segmented-control__item--button--first":"",i===m.values.length-1&&"button"===m.styleType?"segmented-control__item--button--last":""],"segmented-control__item"]),key:i,style:p({backgroundColor:i===f.currentIndex&&"button"===m.styleType?m.activeColor:"",borderColor:i===f.currentIndex&&"text"===m.styleType||"button"===m.styleType?m.activeColor:"transparent"}),onClick:e=>A._onClick(i)},{default:a((()=>[o(w,null,{default:a((()=>[o(h,{style:p({color:i===f.currentIndex?"text"===m.styleType?m.activeColor:"#fff":"text"===m.styleType?"#000":m.activeColor}),class:y(["segmented-control__text","text"===m.styleType&&i===f.currentIndex?"segmented-control__item--text":""])},{default:a((()=>[l(n(e),1)])),_:2},1032,["style","class"])])),_:2},1024)])),_:2},1032,["class","style","onClick"])))),128))])),_:1},8,["class","style"])}],["__scopeId","data-v-aa4ade3a"]]);const se=S({data:()=>({ether_api:null,network_list:w().globalData.global_network_list,global_network_index:w().globalData.global_network_index,wallet_list:[],current_wallet:{address:"____________________________________",name:"______",keystore:"",balance:"_",usd_worth:"_",tokens:[]},current_network:{network:"__",url:"",color:"#f6f6f6",etherscan_api:""},selected_asset:{symbol:"ETH",balance:0},current_tab_index:0,tab_list:["Set priority","Customize"],gas_priority:[{level:"Fastest",max_fee:"_",time:"_ Min",cost_usd:"_",cost:"_",gas:"21000",eth_price:"0"},{level:"Standard",max_fee:"_",time:"_ Min",cost_usd:"_",cost:"_",gas:"21000",eth_price:"0"},{level:"Low",max_fee:"_",time:"_ Min",cost_usd:"_",cost:"_",gas:"21000",eth_price:"0"}],gas_price:0,gas_limit:0,current_priority_index:1,customize_set_max_fee:0,customize_max_priority_fee:0,customize_gas:21e3,gas_fee_usd:"_",gas_fee:"_",transfer_data:{},gas_status_tip:{contentdown:" ",contentrefresh:"Refreshing...",contentnomore:" "},gas_estimate_status:"more",refrush_timer:0,refrush_gas_countdown:0,refrush_gas_last_time:0,refrush_gas_gap:10,gas_fee_item_animation:{}}),onLoad(){this.refrush_timer=setInterval((()=>{if("loading"==this.gas_estimate_status)return;return(new Date).getTime()-this.refrush_gas_last_time>1e3*this.refrush_gas_gap?(this.gas_estimate_status="loading",void this.getGasInfo().then((e=>{this.gas_estimate_status="more",this.refrush_gas_last_time=(new Date).getTime()}),(e=>{console.log(e),this.refrush_gas_last_time=(new Date).getTime(),this.gas_estimate_status="more"}))):void 0}),1e3)},onUnload(){clearInterval(this.refrush_timer)},onShow(){if(P.checkAppInit()){if(this.current_network=this.network_list[this.global_network_index],this.wallet_list=W.getWalletList(),!(this.wallet_list&&this.wallet_list instanceof Array&&0!=this.wallet_list.length))return b({title:"Data exception, please contact admin",showCancel:!1,confirmText:"Got it"}),void console.log("读取钱包列表异常");if(this.current_wallet=W.getDefaultWallet(),console.log(this.current_wallet),!this.current_wallet)return b({title:"Data exception, please contact admin",showCancel:!1,confirmText:"Got it"}),void console.log("读取钱包数据异常");this.ether_api=new Q.etherApi(this.network_list[this.global_network_index]),this.getBalance(),this.loadTokens()}},methods:{showWalletListPop(){this.$refs.wallet_list_pop.show()},changeWallet(e){var t=W.setDefaultWallet(e.address);return t?e.address==this.current_wallet.address||(this.current_wallet=t,this.getBalance(),void this.loadTokens()):(x({title:"Failed to change wallet",icon:"error"}),!1)},getBalance(){new Q.etherApi(this.network_list[this.global_network_index]).getBalance(this.current_wallet.address).then((e=>{console.log("balance:"+e),this.current_wallet.balance=void 0===e?"__":Number(e).toFixed(8),"ETH"==this.selected_asset.symbol&&(this.selected_asset.balance=this.current_wallet.balance)}),(e=>{}))},async getGasInfo(){let e=new Q.etherApi(this.network_list[this.global_network_index]),t=await e.getGasAndTimeOracle();if(t){if(this.gas_priority=t,0==this.current_tab_index){this.gas_price=this.gas_priority[this.current_priority_index].max_fee,this.gas_limit=this.gas_priority[this.current_priority_index].gas,this.gas_fee=this.gas_priority[this.current_priority_index].cost,this.gas_fee_usd=this.gas_priority[this.current_priority_index].cost_usd;var s=k({duration:1e3,timingFunction:"ease"});s.opacity(.3).step().opacity(1).step(),this.gas_fee_item_animation=s.export()}return this.gas_priority}return!1},showGasPopup(){this.$refs.set_gas_popup.open("bottom")},closeGasPopup(){this.$refs.set_gas_popup.close()},showConfirmPaymentPopup(){this.$refs.confirm_payment_popup.open("bottom")},closeConfirmPaymentPopup(){this.$refs.confirm_payment_popup.close()},formSubmit(e){var t={};t.to_address=e.detail.value.to_address,t.amount=e.detail.value.amount,t.gas_price=this.gas_price,t.gas=this.gas_limit;return Y.check(t,[{name:"to_address",checkType:"notnull",checkRule:"",errorMsg:"Please enter wallet address"},{name:"to_address",checkType:"reg",checkRule:"^0x[0-9a-fA-F]{40}$",errorMsg:"Incorrect wallet address"},{name:"amount",checkType:"notnull",checkRule:"",errorMsg:"Please enter amount"},{name:"amount",checkType:"number",checkRule:"1,20",errorMsg:"Please enter a amount"},{name:"gas_price",checkType:"notnull",checkRule:"",errorMsg:"Please set gas price"},{name:"gas",checkType:"notnull",checkRule:"",errorMsg:"Please set gas limit"}])?(t.eth_amount=e.detail.value.amount,t.gas_price=N(t.gas_price,"gwei"),t.amount=F(t.amount),t.gas_fee=Number(Z(BigInt(t.gas_price)*BigInt(t.gas))).toFixed(8),this.transfer_data=t,this.transfer_data.contract_info=null,"ETH"!=this.selected_asset.symbol&&(this.transfer_data.contract_info=this.selected_asset,this.transfer_data.amount=N(e.detail.value.amount,this.selected_asset.decimal)),console.log(this.transfer_data),this.showConfirmPaymentPopup(),this.transfer_data):(x({title:Y.error,icon:"none"}),!1)},async sendTransaction(e){if(!e)return!1;let t=await W.getPrivateKey(this.current_wallet.address,e);if(void 0===t.privateKey)return x({title:"Failed to decrypt wallet , please try again",icon:"error"}),!1;C({title:"Sending transcation..."});let s=new Q.etherApi(this.network_list[this.global_network_index]);var a=await s.transfer(this.current_wallet.address,this.transfer_data.to_address,this.transfer_data.amount,t.privateKey,this.transfer_data.gas_price,this.transfer_data.gas,this.transfer_data.contract_info);if(v(),!a.ret)return b({title:a.msg,showCancel:!1,confirmText:"Got it"}),!1;let i={};return i.type=a.data.type,i.txreceipt_status=0,i.tx_status=1==i.txreceipt_status?"Successful":"Pending",i.block_number=a.data.blockNumber,i.timestamp=(new Date).getTime(),i.humanize_time=L.dateUtils.formtTimastamp(i.timestamp),i.hash=a.data.hash,i.block_hash=a.data.blockHash,i.from=a.data.from,i.to=a.data.to,i.value=a.data.value.toString(),i.eth_num=Number(Z(BigInt(i.value))).toFixed(6),i.gas=a.data.gasLimit.toString(),i.gas_used=null,i.gas_price=this.transfer_data.gas_price.toString(),i.confirmations=null,i.humanize_confirm=null,i.data=a.data.data,X.saveTx(i),I("home_notify",{title:"Transaction submitted,tap to check it",url:"/pages/transaction/processing?address="+i.from}),x({title:"Successfully sent the transcation",icon:"success",duration:2500}),M({url:"/pages/index/wallet"}),!0},onClickTabItem(e){this.current_tab_index!==e.currentIndex&&(this.current_tab_index=e.currentIndex),1==this.current_tab_index&&("_"==this.gas_priority[this.current_priority_index].max_fee&&(this.gas_priority[this.current_priority_index].max_fee="0"),this.customize_set_max_fee=this.gas_priority[this.current_priority_index].max_fee)},selectPriority(e){this.current_priority_index=e,"_"==this.gas_priority[this.current_priority_index].max_fee&&(this.gas_priority[this.current_priority_index].max_fee="0"),this.gas_price=this.gas_priority[this.current_priority_index].max_fee,this.gas_limit=this.gas_priority[this.current_priority_index].gas,this.gas_fee=this.gas_priority[this.current_priority_index].cost,this.gas_fee_usd=this.gas_priority[this.current_priority_index].cost_usd,this.closeGasPopup()},setCustomizeGas(e){var t=e.detail.value;Y.check(t,[{name:"customize_set_max_fee",checkType:"notnull",checkRule:"",errorMsg:"Please enter max fee"},{name:"customize_set_max_fee",checkType:"number",checkRule:"1,20",errorMsg:"Please enter a valid max fee"},{name:"customize_max_priority_fee",checkType:"number",checkRule:"1,20",errorMsg:"Please enter a valid max priority fee"},{name:"customize_gas",checkType:"notnull",checkRule:"",errorMsg:"Please enter gas"},{name:"customize_gas",checkType:"number",checkRule:"1,20",errorMsg:"Please enter a valid gas"}])?(this.gas_price=(Number(e.detail.value.customize_set_max_fee)+Number(e.detail.value.customize_max_priority_fee)).toString(),this.gas_limit=this.customize_gas):x({title:Y.error,icon:"none"})},showPinPopup(){this.closeConfirmPaymentPopup(),this.$refs.pin_popup.show()},verifyPinCode(e){let t=e.ret;t?(this.$refs.pin_popup.closePopup(),this.sendTransaction(t)):x({title:"PIN error",icon:"none"})},async loadTokens(){let e=U.getList();if(!Array.isArray(e))return!1;let t=new Q.etherApi(this.current_network);for(let s of e){let e=await t.getContractAssetBalance(s.contract_address,s.abi,this.current_wallet.address,s.decimal);if(e){s.balance=Number(e).toFixed(8);let t=await V.getPrice(s.symbol+"USDT");if(!t)continue;s.usd_worth=(Number(s.balance)*Number(t)).toFixed(2)}else s.balance="__",s.usd_worth="__"}this.current_wallet.tokens=e,W.saveWallet(this.current_wallet)},showTokenChoose(){this.$refs.token_choose.show()},changeAsset(e){if("ETH"!=e.contract_address)for(let t of this.current_wallet.tokens)e.contract_address==t.contract_address&&(this.selected_asset=t);else this.selected_asset={symbol:"ETH",balance:this.current_wallet.balance}}}},[["render",function(i,_,f,p,A,g){const w=u,b=m,x=G(e("wallet-list-popup"),E),k=T,C=G(e("choose-token"),O),v=G(e("uni-load-more"),ee),I=R,M=z,S=G(e("uni-segmented-control"),te),P=G(e("uni-popup"),j),W=G(e("pin-popup"),H);return t(),s(w,{class:"container"},{default:a((()=>[o(M,{onSubmit:g.formSubmit},{default:a((()=>[o(w,{class:"form-item"},{default:a((()=>[o(w,{class:"form-item-title font-desc-black"},{default:a((()=>[l("From")])),_:1}),o(x,{ref:"wallet_list_pop",pop_title:"Choose account",wallet_list:A.wallet_list,selected_address:A.current_wallet.address,show_setup_btn:!1,onChange:g.changeWallet},{default:a((()=>[o(w,{class:"transfer-form-item from-address-selector",onClick:g.showWalletListPop},{default:a((()=>[o(w,{class:"from-address-info"},{default:a((()=>[o(w,{class:"from-address-name font-desc-gray"},{default:a((()=>[l(n(A.current_wallet.name),1)])),_:1}),o(w,{class:"from-address font-desc-black"},{default:a((()=>[l(n(A.current_wallet.address),1)])),_:1})])),_:1}),o(b,{class:"form-icon",src:D})])),_:1},8,["onClick"])])),_:1},8,["wallet_list","selected_address","onChange"])])),_:1}),o(w,{class:"form-item"},{default:a((()=>[o(w,{class:"form-item-title font-desc-black"},{default:a((()=>[l("To")])),_:1}),o(w,{class:"transfer-form-item to-address"},{default:a((()=>[o(k,{class:"to-address-input",type:"text",name:"to_address"}),o(w,{class:"to-address-func-list"},{default:a((()=>[o(b,{class:"form-icon",src:"/assets/contact.529ed160.png"}),o(b,{class:"form-icon",src:"data:image/png;base64,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"})])),_:1})])),_:1})])),_:1}),o(w,{class:"form-item"},{default:a((()=>[o(w,{class:"form-item-title font-desc-black"},{default:a((()=>[l("Asset")])),_:1}),o(C,{ref:"token_choose",pop_title:"Select Asset",wallet:A.current_wallet,onChange:g.changeAsset},{default:a((()=>[o(w,{class:"transfer-form-item asset-selector",onClick:g.showTokenChoose},{default:a((()=>["ETH"==A.selected_asset.symbol?(t(),s(w,{key:0,class:"asset-info"},{default:a((()=>[o(b,{class:"asset-icon",src:B}),o(w,{class:"asset-name font-desc-black"},{default:a((()=>[l(n(A.selected_asset.symbol),1)])),_:1})])),_:1})):(t(),s(w,{key:1,class:"asset-info"},{default:a((()=>[o(w,{class:"token-default-icon flex-row-center-center"},{default:a((()=>[l(n(A.selected_asset.symbol[0]),1)])),_:1}),o(w,{class:"asset-name font-third-title",style:{"margin-left":"10rpx"}},{default:a((()=>[l(n(A.selected_asset.symbol),1)])),_:1})])),_:1})),o(b,{class:"form-icon",src:D})])),_:1},8,["onClick"])])),_:1},8,["wallet","onChange"])])),_:1}),o(w,{class:"form-item"},{default:a((()=>[o(w,{class:"form-item-title font-desc-black flex-row-space-between-center"},{default:a((()=>[o(w,null,{default:a((()=>[l("Amount")])),_:1}),o(w,{class:"balance font-desc-gray-little",style:{"font-weight":"500"}},{default:a((()=>[l("Balance : "+n(A.selected_asset.balance)+n(A.selected_asset.symbol),1)])),_:1})])),_:1}),o(w,{class:"transfer-form-item amount-input-part"},{default:a((()=>[o(k,{class:"amount-input",type:"digit",name:"amount"}),o(w,{class:"amount-input-right"},{default:a((()=>[o(w,{class:"font-desc-gray"},{default:a((()=>[l(n(A.selected_asset.symbol),1)])),_:1})])),_:1})])),_:1})])),_:1}),o(w,{class:"form-item"},{default:a((()=>[o(w,{class:"form-item-title font-desc-black flex-row-space-between-center"},{default:a((()=>[o(w,null,{default:a((()=>[l("Gas Fee (Estimated)")])),_:1}),o(w,{class:"font-desc-gray-little",style:{"font-weight":"500"}},{default:a((()=>[o(v,{status:A.gas_estimate_status,contentText:A.gas_status_tip,iconSize:18},null,8,["status","contentText"])])),_:1})])),_:1}),o(w,{class:"transfer-form-item gas-fee-selector",onClick:g.showGasPopup,animation:A.gas_fee_item_animation},{default:a((()=>[o(w,{class:"gas-fee-left"},{default:a((()=>[o(w,{class:"gas-fee-usd-worth font-desc-black"},{default:a((()=>[l("$ "+n(A.gas_priority[A.current_priority_index].cost_usd),1)])),_:1}),o(w,{class:"gas-fee-asset-worth font-desc-gray"},{default:a((()=>[l(n(A.gas_priority[A.current_priority_index].cost)+" ETH",1)])),_:1})])),_:1}),o(w,{class:"gas-fee-right"},{default:a((()=>[o(w,{class:"estimated-time font-desc-black"},{default:a((()=>[l(n(A.gas_priority[A.current_priority_index].time),1)])),_:1}),o(b,{class:"form-icon",src:D})])),_:1})])),_:1},8,["onClick","animation"])])),_:1}),o(w,{class:"next-btn"},{default:a((()=>[o(I,{"form-type":"submit",class:"form-btn",type:"primary"},{default:a((()=>[l("Next")])),_:1})])),_:1})])),_:1},8,["onSubmit"]),o(w,null,{default:a((()=>[o(P,{ref:"set_gas_popup"},{default:a((()=>[o(w,{class:"popup-container"},{default:a((()=>[o(w,{class:"popup-top-area"},{default:a((()=>[o(w),o(w,{class:"popup-title-area font-second-title"},{default:a((()=>[l("Set Gas Fee")])),_:1}),o(b,{class:"popup-close-area",src:J,onClick:g.closeGasPopup},null,8,["onClick"])])),_:1}),o(w,{class:"popup-content-area"},{default:a((()=>[o(w,{class:"gas-fee-overview"},{default:a((()=>[o(w,{class:"gas-fee-overview-line"},{default:a((()=>[o(w,{class:"font-third-title"},{default:a((()=>[l("Gas Fee")])),_:1}),o(w,{class:"font-third-title",style:{"margin-top":"10rpx"},animation:A.gas_fee_item_animation},{default:a((()=>[l("$ "+n(A.gas_fee_usd),1)])),_:1},8,["animation"])])),_:1}),o(w,{class:"gas-fee-overview-line"},{default:a((()=>[o(w),o(w,{class:"font-desc-gray",animation:A.gas_fee_item_animation},{default:a((()=>[l(n(A.gas_fee)+" ETH",1)])),_:1},8,["animation"])])),_:1})])),_:1}),o(w,{class:"tab-swiper"},{default:a((()=>[o(w,null,{default:a((()=>[o(S,{current:A.current_tab_index,values:A.tab_list,"style-type":"button","active-color":"#1196db",onClickItem:g.onClickTabItem},null,8,["current","values","onClickItem"])])),_:1})])),_:1}),o(w,{class:"tab-content"},{default:a((()=>[0==A.current_tab_index?(t(),s(w,{key:0,class:"tab-content-set-priority",animation:A.gas_fee_item_animation},{default:a((()=>[(t(!0),r(c,null,d(A.gas_priority,((e,i)=>(t(),s(w,{class:y(["priority-item flex-row-start-center",[2==i?"last-priority-item":""]]),onClick:e=>g.selectPriority(i)},{default:a((()=>[o(w,{class:"priority-item-radio"},{default:a((()=>[o(w,{class:"radio-border flex-row-center-center"},{default:a((()=>[o(w,{class:y([A.current_priority_index==i?"priority-item-radio-active":"priority-item-radio-inactive"])},null,8,["class"])])),_:2},1024)])),_:2},1024),o(w,{class:"priority-item-detail"},{default:a((()=>[o(w,{class:"flex-row-space-between-center"},{default:a((()=>[o(w,{class:"font-desc-black"},{default:a((()=>[l(n(e.level),1)])),_:2},1024),o(w,{class:"font-desc-gray-little"},{default:a((()=>[l(n(e.time),1)])),_:2},1024)])),_:2},1024),o(w,{class:"font-desc-gray-little"},{default:a((()=>[l("MaxFee: "+n(e.max_fee)+" GWEI",1)])),_:2},1024)])),_:2},1024)])),_:2},1032,["onClick","class"])))),256)),o(v,{status:A.gas_estimate_status,contentText:A.gas_status_tip,iconSize:18},null,8,["status","contentText"])])),_:1},8,["animation"])):h("",!0),1==A.current_tab_index?(t(),s(w,{key:1,class:"tab-content-customize"},{default:a((()=>[o(M,{onSubmit:g.setCustomizeGas},{default:a((()=>[o(w,{class:"customize-gas-item"},{default:a((()=>[o(w,{class:"font-desc-gray"},{default:a((()=>[l("MaxFee")])),_:1}),o(w,{class:"customize-gas-item-input flex-row-space-between-center"},{default:a((()=>[o(k,{type:"digit",value:A.customize_set_max_fee,name:"customize_set_max_fee"},null,8,["value"]),o(w,{class:"font-desc-gray"},{default:a((()=>[l("GWEI")])),_:1})])),_:1})])),_:1}),o(w,{class:"customize-gas-item"},{default:a((()=>[o(w,{class:"font-desc-gray"},{default:a((()=>[l("MaxPriorityFee")])),_:1}),o(w,{class:"customize-gas-item-input flex-row-space-between-center"},{default:a((()=>[o(k,{type:"digit",value:A.customize_max_priority_fee,name:"customize_max_priority_fee"},null,8,["value"]),o(w,{class:"font-desc-gray"},{default:a((()=>[l("GWEI")])),_:1})])),_:1})])),_:1}),o(w,{class:"customize-gas-item"},{default:a((()=>[o(w,{class:"font-desc-gray"},{default:a((()=>[l("Gas")])),_:1}),o(w,{class:"customize-gas-item-input"},{default:a((()=>[o(k,{type:"digit",value:A.customize_gas,name:"customize_gas"},null,8,["value"])])),_:1})])),_:1}),o(w,{style:{"margin-top":"40rpx"}},{default:a((()=>[o(I,{"form-type":"submit",class:"form-btn",type:"primary"},{default:a((()=>[l("Set")])),_:1})])),_:1})])),_:1},8,["onSubmit"])])),_:1})):h("",!0)])),_:1})])),_:1})])),_:1})])),_:1},512),o(P,{ref:"confirm_payment_popup"},{default:a((()=>[o(w,{class:"popup-container"},{default:a((()=>[o(w,{class:"popup-top-area"},{default:a((()=>[o(w),o(w,{class:"popup-title-area font-second-title"},{default:a((()=>[l("Payment Detail")])),_:1}),o(b,{class:"popup-close-area",src:J,onClick:g.closeConfirmPaymentPopup},null,8,["onClick"])])),_:1}),o(w,{class:"popup-content-area"},{default:a((()=>[o(w,{class:"payment-amount flex-row-center-center"},{default:a((()=>[o(w,{class:"font-second-title"},{default:a((()=>[l(n(A.transfer_data.eth_amount)+" "+n(A.selected_asset.symbol),1)])),_:1})])),_:1}),o(w,{class:"payment-item flex-row-start-start payment-item-border"},{default:a((()=>[o(w,{class:"payment-title font-desc-gray-little"},{default:a((()=>[l("Payment type")])),_:1}),o(w,{class:"payment-content font-desc-black-little"},{default:a((()=>[l(n(A.selected_asset.symbol)+" Transfer",1)])),_:1})])),_:1}),o(w,{class:"payment-item flex-row-start-start payment-item-border"},{default:a((()=>[o(w,{class:"payment-title font-desc-gray-little"},{default:a((()=>[l("To")])),_:1}),o(w,{class:"payment-content font-desc-black-little"},{default:a((()=>[l(n(A.transfer_data.to_address),1)])),_:1})])),_:1}),o(w,{class:"payment-item flex-row-start-start payment-item-border"},{default:a((()=>[o(w,{class:"payment-title font-desc-gray-little"},{default:a((()=>[l("From")])),_:1}),o(w,{class:"payment-content font-desc-black-little"},{default:a((()=>[l(n(A.current_wallet.address),1)])),_:1})])),_:1}),o(w,{class:"payment-item flex-row-start-start"},{default:a((()=>[o(w,{class:"payment-title font-desc-gray-little"},{default:a((()=>[l("Gas Fee")])),_:1}),o(w,{class:"payment-content font-desc-black-little"},{default:a((()=>[l(n(A.transfer_data.gas_fee)+" ETH",1)])),_:1})])),_:1}),o(w,{style:{"margin-top":"40rpx"}},{default:a((()=>[o(I,{class:"form-btn",type:"primary",onClick:g.showPinPopup},{default:a((()=>[l("Next")])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1})])),_:1},512),o(W,{ref:"pin_popup",pop_title:"Please enter PIN",onVerifyRet:g.verifyPinCode},null,8,["onVerifyRet"])])),_:1})])),_:1})}],["__scopeId","data-v-b1d189c8"]]);export{se as default};