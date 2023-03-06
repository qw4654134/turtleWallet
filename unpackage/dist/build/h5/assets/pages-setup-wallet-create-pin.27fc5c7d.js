import{j as e,X as t,$ as n,s as a,Y as i,Z as s,M as p,r as o,I as r,H as l,a as d,_ as y,o as u,c,w as m,i as b,b as f,d as _,t as T,v as h,y as w,a0 as g}from"./index.3b969e63.js";import{_ as v}from"./pin-code-keyboard.f118656f.js";import{r as k}from"./uni-app.es.02f92043.js";import{_ as x}from"./uni-icons.bd8991b1.js";import{A as M}from"./app.7b4b9720.js";import"./md5.c7cedf05.js";import{P as A}from"./pin.68bc82e3.js";import{C}from"./config.d9a5f6eb.js";import{W as D}from"./wallet.af230502.js";import{T as P}from"./token.0e0bad13.js";import{A as S}from"./address-books.6de1cf90.js";import{_ as j}from"./_plugin-vue_export-helper.cdc0426e.js";import"./wallet.f064e6a3.js";const I=j({data:()=>({scene:"",method:"",input_time:"",create_pin_title:"Create a PIN",create_pin_desc:"This PIN will unlock your wallet only on this device",init_pin_code:"",pin_code:"",show_recreate:!1,sample_wallets:[{address:"0x03b5b0221fd758c16ced3c3402f830234cf73bb8",private_key:"0x660838b83ce4a086dda8c18724e18265dacd7e5591bb0f86631f7b8e7dccda55"},{address:"0x6A01aaa2edA6f55DB4b4906e807837CBA2dfBc80",private_key:"0x0448beb6c9bcb366932944f711cdd148172c6c54dc5fccc96f92bb740862ea48"}],sample_contract:{symbol:"UNI",contract_address:"0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",decimal:18,total_supply:"1000000000",abi:[{inputs:[{internalType:"address",name:"account",type:"address"},{internalType:"address",name:"minter_",type:"address"},{internalType:"uint256",name:"mintingAllowedAfter_",type:"uint256"}],payable:!1,stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"address",name:"spender",type:"address"},{indexed:!1,internalType:"uint256",name:"amount",type:"uint256"}],name:"Approval",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"delegator",type:"address"},{indexed:!0,internalType:"address",name:"fromDelegate",type:"address"},{indexed:!0,internalType:"address",name:"toDelegate",type:"address"}],name:"DelegateChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"delegate",type:"address"},{indexed:!1,internalType:"uint256",name:"previousBalance",type:"uint256"},{indexed:!1,internalType:"uint256",name:"newBalance",type:"uint256"}],name:"DelegateVotesChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"address",name:"minter",type:"address"},{indexed:!1,internalType:"address",name:"newMinter",type:"address"}],name:"MinterChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!1,internalType:"uint256",name:"amount",type:"uint256"}],name:"Transfer",type:"event"},{constant:!0,inputs:[],name:"DELEGATION_TYPEHASH",outputs:[{internalType:"bytes32",name:"",type:"bytes32"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"DOMAIN_TYPEHASH",outputs:[{internalType:"bytes32",name:"",type:"bytes32"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"PERMIT_TYPEHASH",outputs:[{internalType:"bytes32",name:"",type:"bytes32"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{internalType:"address",name:"account",type:"address"},{internalType:"address",name:"spender",type:"address"}],name:"allowance",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"rawAmount",type:"uint256"}],name:"approve",outputs:[{internalType:"bool",name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{internalType:"address",name:"account",type:"address"}],name:"balanceOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{internalType:"address",name:"",type:"address"},{internalType:"uint32",name:"",type:"uint32"}],name:"checkpoints",outputs:[{internalType:"uint32",name:"fromBlock",type:"uint32"},{internalType:"uint96",name:"votes",type:"uint96"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"decimals",outputs:[{internalType:"uint8",name:"",type:"uint8"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{internalType:"address",name:"delegatee",type:"address"}],name:"delegate",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{internalType:"address",name:"delegatee",type:"address"},{internalType:"uint256",name:"nonce",type:"uint256"},{internalType:"uint256",name:"expiry",type:"uint256"},{internalType:"uint8",name:"v",type:"uint8"},{internalType:"bytes32",name:"r",type:"bytes32"},{internalType:"bytes32",name:"s",type:"bytes32"}],name:"delegateBySig",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{internalType:"address",name:"",type:"address"}],name:"delegates",outputs:[{internalType:"address",name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{internalType:"address",name:"account",type:"address"}],name:"getCurrentVotes",outputs:[{internalType:"uint96",name:"",type:"uint96"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{internalType:"address",name:"account",type:"address"},{internalType:"uint256",name:"blockNumber",type:"uint256"}],name:"getPriorVotes",outputs:[{internalType:"uint96",name:"",type:"uint96"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"minimumTimeBetweenMints",outputs:[{internalType:"uint32",name:"",type:"uint32"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{internalType:"address",name:"dst",type:"address"},{internalType:"uint256",name:"rawAmount",type:"uint256"}],name:"mint",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"mintCap",outputs:[{internalType:"uint8",name:"",type:"uint8"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"minter",outputs:[{internalType:"address",name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"mintingAllowedAfter",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"name",outputs:[{internalType:"string",name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{internalType:"address",name:"",type:"address"}],name:"nonces",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{internalType:"address",name:"",type:"address"}],name:"numCheckpoints",outputs:[{internalType:"uint32",name:"",type:"uint32"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{internalType:"address",name:"owner",type:"address"},{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"rawAmount",type:"uint256"},{internalType:"uint256",name:"deadline",type:"uint256"},{internalType:"uint8",name:"v",type:"uint8"},{internalType:"bytes32",name:"r",type:"bytes32"},{internalType:"bytes32",name:"s",type:"bytes32"}],name:"permit",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{internalType:"address",name:"minter_",type:"address"}],name:"setMinter",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"symbol",outputs:[{internalType:"string",name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"totalSupply",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{internalType:"address",name:"dst",type:"address"},{internalType:"uint256",name:"rawAmount",type:"uint256"}],name:"transfer",outputs:[{internalType:"bool",name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{internalType:"address",name:"src",type:"address"},{internalType:"address",name:"dst",type:"address"},{internalType:"uint256",name:"rawAmount",type:"uint256"}],name:"transferFrom",outputs:[{internalType:"bool",name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"}]},sample_book:{address:"0xb0714705DaBF9425727De7d7f10301E085FFcC05",name:"admin's address",desc:"",asset:{symbol:"ETH"}},tip:""}),onLoad(n){if(M.checkAppInit()){if(!n.scene||!n.input_time||String("|create-wallet|import-wallet|guest-mode|").indexOf(n.scene)<0||String("|1|2|").indexOf(String(n.input_time))<0||"import-wallet"==n.scene&&String("|mnemonic|private-key|keystore|").indexOf(n.method)<0)return e({title:"Data exception, please contact admin",showCancel:!1,confirmText:"Got it",success(){t()}}),console.log("进入create-pin页面的参数异常"),!1;n&&n.tip&&(this.tip=n.tip),this.scene=n.scene,this.method=n.method,this.input_time=n.input_time,1==this.input_time?(this.create_pin_title="Create a PIN",this.create_pin_desc="This PIN will unlock your wallet only on this device"):(this.create_pin_title="Type your PIN again",this.create_pin_desc="Make sure remember it all time")}},onUnload(){n("pin_code_set1")},onShow(){if(1==this.input_time)try{this.$refs.pin_code_keyboard.clear()}catch(e){console.log(e)}},methods:{pinChange:function(e){},pinFinish:function(e){if(e.pin_code)switch(this.pin_code=e.pin_code,this.input_time){case"1":A.setPIN(this.pin_code);let e="/pages/setup-wallet/create-pin?scene="+this.scene+"&input_time=2";"import-wallet"==this.scene&&(e="/pages/setup-wallet/create-pin?scene="+this.scene+"&method="+this.method+"&input_time=2"),p({url:e});break;case"2":if(!A.compare(this.pin_code))return a({title:"The two inputs are inconsistent",icon:"error",duration:2e3}),void(this.show_recreate=!0);if("create-wallet"==this.scene)i("pin_code_set1",(()=>{s("pin_code_set",{pin:this.pin_code})})),p({url:"/pages/setup-wallet/wallet-phrase"});else if("import-wallet"==this.scene){let e="";"mnemonic"==this.method&&(e="/pages/setup-wallet/import-mnemonic"),"private-key"==this.method&&(e="/pages/setup-wallet/import-private"),"keystore"==this.method&&(e="/pages/setup-wallet/import-keystore"),e||console.log("参数错误"),o({url:e})}else"guest-mode"==this.scene&&(a({title:"The sample data has been loaded",icon:"none"}),this.loadSampleWallet(this.pin_code),this.loadSampleContract(),this.loadAddressBook(),r(),setTimeout((()=>{o({url:"/pages/index/wallet",success(){},fail(){o({url:"/pages/start/start-up"})}})}),1e3))}},reEnterPinError:function(e){this.$refs.pin_code_keyboard.clear(),console.log("clear")},loadSampleWallet:async function(e){l({title:"Loading sample wallet"});for(let t of this.sample_wallets){let n=await D.encryptWallet(t.private_key,e);if(!n){a({title:"Failed to load sample wallet",icon:"error"});continue}let i={};i.address=t.address,i.keystore=JSON.parse(n),D.saveWallet(i)||a({title:"Failed to load sample wallet",icon:"error"})}d().globalData.global_network_index=1,y({key:"storage_default_network",data:C.block_chain_net.eth.net_list[d().globalData.global_network_index].network,success:function(){console.log("已切换至 test network")}})},loadSampleContract(){P.saveTokenInfo(this.sample_contract)},loadAddressBook(){S.save(this.sample_book)}}},[["render",function(e,t,n,a,i,s){const p=b,o=k(w("pin-code-keyboard"),v),r=k(w("uni-icons"),x),l=g;return u(),c(p,{class:"container"},{default:m((()=>[f(p,{class:"create-pin-text"},{default:m((()=>[f(p,{class:"create-pin-title font-first-title"},{default:m((()=>[_(T(i.create_pin_title),1)])),_:1}),f(p,{class:"create-pin-desc font-desc-black"},{default:m((()=>[_(T(i.create_pin_desc),1)])),_:1})])),_:1}),f(o,{ref:"pin_code_keyboard",init_pin_code:i.init_pin_code,onChange:s.pinChange,onFinish:s.pinFinish,codePaddingTop:"150rpx",keyboardPaddingTop:"100rpx"},null,8,["init_pin_code","onChange","onFinish"]),i.show_recreate?(u(),c(l,{key:0,class:"reset-pin flex-row-center-center","open-type":"navigateBack"},{default:m((()=>[f(p,{class:"font-desc-black"},{default:m((()=>[_("Recreate")])),_:1}),f(r,{type:"forward"})])),_:1})):h("",!0),""!=i.tip?(u(),c(p,{key:1,class:"tip flex-row-center-center font-desc-gray"},{default:m((()=>[f(p,{style:{width:"80%"}},{default:m((()=>[_(T(i.tip),1)])),_:1})])),_:1})):h("",!0)])),_:1})}],["__scopeId","data-v-bc7f3b78"]]);export{I as default};
