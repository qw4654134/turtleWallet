import{g as e,a as t,s as a,r as o,o as s,c as l,w as r,i as n,b as c,d as i,e as _}from"./index.0a4c0685.js";import{C as p}from"./config.56fe6dcf.js";import{P as d}from"./pin.df080574.js";import{_ as u}from"./wallet.802b5a15.js";import{_ as g}from"./_plugin-vue_export-helper.cdc0426e.js";import"./md5.c7cedf05.js";const f=g({data:()=>({setup_page_param:""}),methods:{},onLoad(e){console.log(e),e&&e.guest_mode&&(this.setup_page_param="?guest_mode=true")},onReady(){},onShow(){try{let a=p.block_chain_net.eth.net_list,o=e("storage_default_network");console.log(o);let l=0;o||(o=p.block_chain_net.eth.default_net);for(var s=0;s<a.length;s++)a[s].network==o&&(l=s,console.log("网络配置："+a[s].url));t().globalData.global_network_list=a,t().globalData.global_network_index=l,t().globalData.global_is_app_data_init=!0}catch(r){return void console.log("读取配置信息异常")}var l="/pages/setup-wallet/setup"+this.setup_page_param;try{const t=e("storage_wallet_list"),a=d.getPIN();t&&a&&(l="/pages/index/wallet")}catch(r){return void a({title:"Data exception, please contact admin",icon:"error"})}setTimeout((()=>{o({url:l})}),2e3)}},[["render",function(e,t,a,o,p,d){const g=n,f=_;return s(),l(g,{class:"container flex-column-center-center"},{default:r((()=>[c(g),c(g,{class:"icon-area flex-column-center-center"},{default:r((()=>[c(f,{class:"icon",src:u}),c(g,{class:"icon-text font-first-title"},{default:r((()=>[i("Turtle Wallet")])),_:1})])),_:1}),c(g)])),_:1})}],["__scopeId","data-v-24f37e72"]]);export{f as default};
