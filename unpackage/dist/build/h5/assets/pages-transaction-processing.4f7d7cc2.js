import{a as e,s as t,X as a,a5 as s,H as r,I as l,M as o,o as c,c as n,w as d,i,b as f,p as _,q as u,F as w,d as m,v as x,t as p,S as k,e as h,a8 as b}from"./index.3b969e63.js";import{A as g}from"./app.7b4b9720.js";import"./md5.c7cedf05.js";import{E as y,f as C,I as L}from"./etherApi.0507bc32.js";import{T}from"./transaction.34cd50cf.js";import{T as v}from"./token.0e0bad13.js";import{_ as j,a as D}from"./receive.ddf657b9.js";import{_ as A}from"./_plugin-vue_export-helper.cdc0426e.js";import"./config.d9a5f6eb.js";import"./wallet.f064e6a3.js";const E=A({data:()=>({network_list:e().globalData.global_network_list,global_network_index:e().globalData.global_network_index,current_network:{network:"__",url:"",color:"#f6f6f6",etherscan_api:""},current_wallet:{address:"0x...........................",name:"my wallet",keystore:"",balance:"__",usd_worth:"__",tokens:[]},tx_list:[],show_empty:!1}),onLoad(e){if(g.checkAppInit()){if(this.current_network=this.network_list[this.global_network_index],!e.address)return t({title:"Data exception",icon:"error"}),void a();this.current_wallet.address=e.address,this.loadTxData()}},onPullDownRefresh(){this.loadTxData(),setTimeout((function(){s()}),2e3)},methods:{loadTxData:async function(){r({});let e=new y.etherApi(this.network_list[this.global_network_index]),t=T.getProcessingTxList(this.current_wallet.address);if(!t||0==t.length)return l(),this.show_empty=!0,!1;this.show_empty=!1;for(let a of t){let t=await e.getTransactionReceipt(a.hash);if(t&&t.status&&1!=t.status&&(a.tx_status="Confirming",T.saveTx(a)),t&&t.status&&1==t.status&&(a.tx_status="Successful",a.txreceipt_status=1,a.gas_used=t.gasUsed,a.gas_price=t.gasPrice,a.gas_fee=Number(C(a.gas_used*a.gas_price)).toFixed(8),a.block_hash=t.blockHash,a.block_number=t.blockNumber,T.saveTx(a)),a.data&&"0x"!=a.data){let e=v.getToken(a.to);if(!e)continue;const t=new L(e.abi).parseTransaction({data:a.data,value:a.value});if("transfer"!=t.name)continue;a.decode_data=t,a.contract_info=e}}return l(),this.tx_list=t,t},toTxDetail:function(e,t){o({url:"/pages/transaction/detail?tx_hash="+e+"&address="+t})}}},[["render",function(e,t,a,s,r,l){const o=h,g=i,y=b;return c(),n(g,null,{default:d((()=>[f(g,{class:"tx-list"},{default:d((()=>[(c(!0),_(w,null,u(r.tx_list,((e,t)=>(c(),n(g,{class:"tx-item",onClick:t=>l.toTxDetail(e.hash,r.current_wallet.address)},{default:d((()=>[e.decode_data&&"transfer"==e.decode_data.name?(c(),n(g,{key:0,class:"flex-row-space-between-center"},{default:d((()=>[f(g,{class:"tx-item-left flex-row-center-center"},{default:d((()=>[e.from.toLowerCase()==r.current_wallet.address.toLowerCase()?(c(),n(o,{key:0,class:"tx-icon",src:j})):(c(),n(o,{key:1,class:"tx-icon",src:D})),f(g,null,{default:d((()=>[e.from.toLowerCase()==r.current_wallet.address.toLowerCase()?(c(),n(g,{key:0,class:"font-desc-black"},{default:d((()=>[m("Send "+p(e.contract_info.symbol),1)])),_:2},1024)):(c(),n(g,{key:1,class:"font-desc-black receive-color"},{default:d((()=>[m("Receive "+p(e.contract_info.symbol),1)])),_:2},1024)),f(g,{class:"font-desc-gray-little",style:{"margin-top":"5rpx"}},{default:d((()=>[m(p(e.humanize_time),1)])),_:2},1024)])),_:2},1024)])),_:2},1024),f(g,{class:"tx-item-right flex-column-end-end"},{default:d((()=>[f(g,{class:k(["font-desc-black flex-row-center-center",[e.from.toLowerCase()==r.current_wallet.address.toLowerCase()?"font-desc-black":"receive-color"]])},{default:d((()=>[e.from.toLowerCase()==r.current_wallet.address.toLowerCase()?(c(),n(g,{key:0},{default:d((()=>[m("-")])),_:1})):(c(),n(g,{key:1},{default:d((()=>[m("+")])),_:1})),f(g,null,{default:d((()=>[m(p(e.decode_data.args[1])+" "+p(e.contract_info.symbol),1)])),_:2},1024)])),_:2},1032,["class"]),f(g,{class:"font-desc-gray-little",style:{"margin-top":"5rpx"}},{default:d((()=>[m(p(e.tx_status),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)):(c(),n(g,{key:1,class:"flex-row-space-between-center"},{default:d((()=>[f(g,{class:"tx-item-left flex-row-center-center"},{default:d((()=>[e.from.toLowerCase()==r.current_wallet.address.toLowerCase()?(c(),n(o,{key:0,class:"tx-icon",src:j})):(c(),n(o,{key:1,class:"tx-icon",src:D})),f(g,null,{default:d((()=>[e.from.toLowerCase()==r.current_wallet.address.toLowerCase()?(c(),n(g,{key:0,class:"font-desc-black"},{default:d((()=>[m("Send ETH")])),_:1})):(c(),n(g,{key:1,class:"font-desc-black receive-color"},{default:d((()=>[m("Receive ETH")])),_:1})),f(g,{class:"font-desc-gray-little",style:{"margin-top":"5rpx"}},{default:d((()=>[m(p(e.humanize_time),1)])),_:2},1024)])),_:2},1024)])),_:2},1024),f(g,{class:"tx-item-right flex-column-end-end"},{default:d((()=>[f(g,{class:k(["font-desc-black flex-row-center-center",[e.from.toLowerCase()==r.current_wallet.address.toLowerCase()?"font-desc-black":"receive-color"]])},{default:d((()=>[e.from.toLowerCase()==r.current_wallet.address.toLowerCase()?(c(),n(g,{key:0},{default:d((()=>[m("-")])),_:1})):(c(),n(g,{key:1},{default:d((()=>[m("+")])),_:1})),f(g,null,{default:d((()=>[m(p(e.eth_num)+"ETH",1)])),_:2},1024)])),_:2},1032,["class"]),f(g,{class:"font-desc-gray-little",style:{"margin-top":"5rpx"}},{default:d((()=>[m(p(e.tx_status),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)),1!=e.txreceipt_status?(c(),n(g,{key:2,class:"tx-progress flex-row-end-center"},{default:d((()=>[f(g,{style:{width:"65rpx"}}),f(y,{percent:"0",activeColor:"#10AEFF","stroke-width":"3"})])),_:1})):x("",!0)])),_:2},1032,["onClick"])))),256))])),_:1}),r.show_empty?(c(),n(g,{key:0,class:"empty_tip flex-row-center-center font-desc-gray"},{default:d((()=>[f(g,null,{default:d((()=>[m("No transactions in progress")])),_:1})])),_:1})):x("",!0)])),_:1})}],["__scopeId","data-v-d8fea80c"]]);export{E as default};
