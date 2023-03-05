import{a as e,s as t,X as a,a5 as s,j as l,H as r,I as o,M as n,o as c,c as i,w as d,i as _,b as f,d as u,t as m,p,q as w,F as x,e as g,a0 as h,y as b,S as k,v as y,a8 as C}from"./index.e3856387.js";import{_ as T}from"./z-paging.553b8709.js";import{r as v}from"./uni-app.es.039f777e.js";import{A as L}from"./app.39bb0535.js";import{W as j}from"./wallet.d7a37044.js";import{E as D,P as H,f as z,I as E}from"./etherApi.29d22b7c.js";import{T as F}from"./transaction.87575691.js";import{T as A}from"./token.bb23f639.js";import{_ as P}from"./ETH.9f110baa.js";import{_ as N,a as R}from"./qr.c827c99f.js";import{_ as S,a as W}from"./receive.ddf657b9.js";import{_ as $}from"./_plugin-vue_export-helper.cdc0426e.js";import"./md5.c7cedf05.js";import"./wallet.f064e6a3.js";import"./config.d9a5f6eb.js";const I=$({data:()=>({network_list:e().globalData.global_network_list,global_network_index:e().globalData.global_network_index,current_network:{network:"__",url:"",color:"#f6f6f6",etherscan_api:""},current_wallet:{address:"0x...........................",name:"my wallet",keystore:"",balance:"__",usd_worth:"__",tokens:[]},tx_list:[],filter_contract_address:"",filter_token:"",load_more_default_text:{en:"Pull up to load more","zh-Hans":"下拉加载更多"},load_more_loading_text:{en:"loading","zh-Hans":"加载中"},load_more_no_more_text:{en:"no more","zh-Hans":"没有了"},load_more_fail_text:{en:"Failed to load,try agin","zh-Hans":"加载失败,请重试"}}),onLoad(e){if(L.checkAppInit()){if(this.current_network=this.network_list[this.global_network_index],!e.address)return t({title:"Param exception",icon:"error"}),void a();this.current_wallet.address=e.address,this.filter_contract_address=e.contract_address?e.contract_address:"",this.filter_token=e.token?e.token:"",this.loadWalletData()}},onPullDownRefresh(){this.loadWalletData(),this.loadTxData(1,10),setTimeout((function(){s()}),2e3)},methods:{loadWalletData:async function(){let e=j.getWallet(this.current_wallet.address);if(!e)return l({title:"Data exception, please contact admin",showCancel:!1,confirmText:"Got it"}),console.log("读取钱包数据异常"),!1;this.current_wallet=e;let t=new D.etherApi(this.network_list[this.global_network_index]),a=await t.getBalance(this.current_wallet.address);if(!a)return this.current_wallet.balance="__",this.current_wallet.usd_worth="__",!1;this.current_wallet.balance=Number(a).toFixed(8);let s=await H.getPrice("ETHUSDT");return this.current_wallet.usd_worth=s?(Number(a)*Number(s)).toFixed(2):"__",!0},loadTxData:async function(e,t){r({});let a=[],s=F.getTxList(this.current_wallet.address);if([]==s)return o(),this.$refs.paging.complete([]),!1;if(!1===s)return this.$refs.paging.complete(!1),!1;let l=new D.etherApi(this.network_list[this.global_network_index]);for(let r of s){let e=await l.getTransactionReceipt(r.hash);if(e&&e.status&&1!=e.status&&(r.tx_status="Confirming",F.saveTx(r)),e&&e.status&&1==e.status&&(r.tx_status="Successful",r.txreceipt_status=1,r.gas_used=e.gasUsed,r.gas_price=e.gasPrice,r.gas_fee=Number(z(r.gas_used*r.gas_price)).toFixed(8),r.block_hash=e.blockHash,r.block_number=e.blockNumber,F.saveTx(r)),r.data&&"0x"!=r.data){let e=A.getToken(r.to);if(!e)continue;const t=new E(e.abi).parseTransaction({data:r.data,value:r.value});if("transfer"!=t.name){a.push(r);continue}r.decode_data=t,r.contract_info=e,r.to.toLowerCase()==this.filter_contract_address.toLowerCase()&&a.push(r)}else this.filter_contract_address||a.push(r)}let n=[],c=[];for(let r of a)1==r.txreceipt_status?c.push(r):n.push(r);return n.sort((function(e,t){return t.timestamp-e.timestamp})),c.sort((function(e,t){return t.timestamp-e.timestamp})),a=n.concat(c),o(),a.length?(this.$refs.paging.complete(a),this.tx_list=a,a):(this.$refs.paging.complete([]),[])},toTxDetail:function(e,t){n({url:"/pages/transaction/detail?tx_hash="+e+"&address="+t})}}},[["render",function(e,t,a,s,l,r){const o=g,n=_,L=h,j=C,D=v(b("z-paging"),T);return c(),i(n,null,{default:d((()=>[f(n,{class:"wallet-info"},{default:d((()=>[f(n,{class:"flex-column-start-center"},{default:d((()=>[f(o,{class:"asset-icon",src:P}),f(n,{class:"asset-balance font-second-title"},{default:d((()=>[u(m(l.current_wallet.balance),1)])),_:1}),f(n,{class:"asset-usd-worth font-desc-gray"},{default:d((()=>[u("$ "+m(l.current_wallet.usd_worth),1)])),_:1})])),_:1}),f(n,{class:"func-list flex-row-space-between-center"},{default:d((()=>[f(L,{class:"func-item flex-column-start-center","open-type":"navigate",url:"/pages/transfer/transfer"},{default:d((()=>[f(o,{class:"func-icon",src:N}),f(n,{class:"font-desc-black-little"},{default:d((()=>[u("Transfer")])),_:1})])),_:1}),f(L,{class:"func-item flex-column-start-center",url:"/pages/receive/receive?address="+l.current_wallet.address},{default:d((()=>[f(o,{class:"func-icon",src:R}),f(n,{class:"font-desc-black-little"},{default:d((()=>[u("Receive")])),_:1})])),_:1},8,["url"])])),_:1})])),_:1}),f(n,{class:"tx-list"},{default:d((()=>[f(D,{ref:"paging","refresher-enabled":!1,fixed:!1,height:"700rpx","use-page-scroll":!1,"loading-more-enabled":!0,"default-page-size":20,"to-bottom-loading-more-enabled":!0,"loading-more-default-text":l.load_more_default_text,"loading-more-loading-text":l.load_more_loading_text,"loading-more-no-more-text":l.load_more_no_more_text,"loading-more-fail-text":l.load_more_fail_text,modelValue:l.tx_list,"onUpdate:modelValue":t[0]||(t[0]=e=>l.tx_list=e),onQuery:r.loadTxData},{default:d((()=>[(c(!0),p(x,null,w(l.tx_list,((e,t)=>(c(),i(n,{class:"tx-item",onClick:t=>r.toTxDetail(e.hash,l.current_wallet.address)},{default:d((()=>[e.decode_data&&"transfer"==e.decode_data.name?(c(),i(n,{key:0,class:"flex-row-space-between-center"},{default:d((()=>[f(n,{class:"tx-item-left flex-row-center-center"},{default:d((()=>[e.from.toLowerCase()==l.current_wallet.address.toLowerCase()?(c(),i(o,{key:0,class:"tx-icon",src:S})):(c(),i(o,{key:1,class:"tx-icon",src:W})),f(n,null,{default:d((()=>[e.from.toLowerCase()==l.current_wallet.address.toLowerCase()?(c(),i(n,{key:0,class:"font-desc-black"},{default:d((()=>[u("Send "+m(e.contract_info.symbol),1)])),_:2},1024)):(c(),i(n,{key:1,class:"font-desc-black receive-color"},{default:d((()=>[u("Receive "+m(e.contract_info.symbol),1)])),_:2},1024)),f(n,{class:"font-desc-gray-little",style:{"margin-top":"5rpx"}},{default:d((()=>[u(m(e.humanize_time),1)])),_:2},1024)])),_:2},1024)])),_:2},1024),f(n,{class:"tx-item-right flex-column-end-end"},{default:d((()=>[f(n,{class:k(["font-desc-black flex-row-center-center",[e.from.toLowerCase()==l.current_wallet.address.toLowerCase()?"font-desc-black":"receive-color"]])},{default:d((()=>[e.from.toLowerCase()==l.current_wallet.address.toLowerCase()?(c(),i(n,{key:0},{default:d((()=>[u("-")])),_:1})):(c(),i(n,{key:1},{default:d((()=>[u("+")])),_:1})),f(n,null,{default:d((()=>[u(m(e.decode_data.args[1])+" "+m(e.contract_info.symbol),1)])),_:2},1024)])),_:2},1032,["class"]),f(n,{class:"font-desc-gray-little",style:{"margin-top":"5rpx"}},{default:d((()=>[u(m(e.tx_status),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)):(c(),i(n,{key:1,class:"flex-row-space-between-center"},{default:d((()=>[f(n,{class:"tx-item-left flex-row-center-center"},{default:d((()=>[e.from.toLowerCase()==l.current_wallet.address.toLowerCase()?(c(),i(o,{key:0,class:"tx-icon",src:S})):(c(),i(o,{key:1,class:"tx-icon",src:W})),f(n,null,{default:d((()=>[e.from.toLowerCase()==l.current_wallet.address.toLowerCase()?(c(),i(n,{key:0,class:"font-desc-black"},{default:d((()=>[u("Send ETH")])),_:1})):(c(),i(n,{key:1,class:"font-desc-black receive-color"},{default:d((()=>[u("Receive ETH")])),_:1})),f(n,{class:"font-desc-gray-little",style:{"margin-top":"5rpx"}},{default:d((()=>[u(m(e.humanize_time),1)])),_:2},1024)])),_:2},1024)])),_:2},1024),f(n,{class:"tx-item-right flex-column-end-end"},{default:d((()=>[f(n,{class:k(["font-desc-black flex-row-center-center",[e.from.toLowerCase()==l.current_wallet.address.toLowerCase()?"font-desc-black":"receive-color"]])},{default:d((()=>[e.from.toLowerCase()==l.current_wallet.address.toLowerCase()?(c(),i(n,{key:0},{default:d((()=>[u("-")])),_:1})):(c(),i(n,{key:1},{default:d((()=>[u("+")])),_:1})),f(n,null,{default:d((()=>[u(m(e.eth_num)+"ETH",1)])),_:2},1024)])),_:2},1032,["class"]),f(n,{class:"font-desc-gray-little",style:{"margin-top":"5rpx"}},{default:d((()=>[u(m(e.tx_status),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)),1!=e.txreceipt_status?(c(),i(n,{key:2,class:"tx-progress flex-row-end-center"},{default:d((()=>[f(n,{style:{width:"65rpx"}}),f(j,{percent:"0",activeColor:"#10AEFF","stroke-width":"3"})])),_:1})):y("",!0)])),_:2},1032,["onClick"])))),256))])),_:1},8,["loading-more-default-text","loading-more-loading-text","loading-more-no-more-text","loading-more-fail-text","modelValue","onQuery"])])),_:1})])),_:1})}],["__scopeId","data-v-adf88490"]]);export{I as default};
