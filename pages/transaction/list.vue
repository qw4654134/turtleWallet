<template>
	<view>
		<view class="wallet-info ">
			<view class="flex-column-start-center">
				<image class="asset-icon"  src="/static/img/ETH.png"></image>
				<view class="asset-balance font-second-title">{{balance}}</view>
				<view class="asset-usd-worth font-desc-gray">$ {{usd_worth}}</view>
			</view>
			<view class="func-list flex-row-space-between-center">
				<navigator class="func-item flex-column-start-center" open-type="navigate" url="/pages/transfer/transfer">
					<image class="func-icon"  src="/static/img/doller-transfer.png"></image>
					<view class="font-desc-black-little">Transfer</view>
				</navigator>
				<navigator class="func-item flex-column-start-center" :url="'/pages/receive/receive?address='+current_wallet.address">
					<image class="func-icon"  src="/static//img/qr.png"></image>
					<view class="font-desc-black-little">Receive</view>
				</navigator>
			</view>
		</view>
		<view class="tx-list">
			<z-paging ref="paging" :refresher-enabled="false" :fixed="false" height="700rpx" :use-page-scroll="false" :loading-more-enabled="true" :default-page-size="20" :to-bottom-loading-more-enabled="true" :loading-more-default-text="load_more_default_text" :loading-more-loading-text="load_more_loading_text" :loading-more-no-more-text="load_more_no_more_text" :loading-more-fail-text="load_more_fail_text" v-model="tx_list" @query="loadTxData" >
			    <view class="tx-item " v-for="(item,index) in tx_list" @click="toTxDetail(item.hash,current_wallet.address)">
					<view v-if="item.decode_data && item.decode_data.name == 'transfer'" class="flex-row-space-between-center">
						<view class="tx-item-left flex-row-center-center">
							<image v-if="item.from.toLowerCase() == current_wallet.address.toLowerCase()" class="tx-icon"  src="/static/img/send.png"></image>
							<image v-else class="tx-icon"  src="/static/img/receive.png"></image>
							<view>
								<view v-if="item.from.toLowerCase() == current_wallet.address.toLowerCase()" class="font-desc-black">Send {{item.contract_info.symbol}}</view>
								<view v-else class="font-desc-black receive-color">Receive {{item.contract_info.symbol}}</view>
								<view class="font-desc-gray-little" style="margin-top: 5rpx;">{{item.humanize_time}}</view>
							</view>
						</view>
						<view class="tx-item-right flex-column-end-end">
							<view class="font-desc-black flex-row-center-center" :class="[item.from.toLowerCase() == current_wallet.address.toLowerCase() ? 'font-desc-black': 'receive-color']">
								<view v-if="item.from.toLowerCase() == current_wallet.address.toLowerCase()">-</view>
								<view v-else>+</view>
								<view>{{item.decode_data.args[1]}} {{item.contract_info.symbol}}</view>
							</view>
							<view class="font-desc-gray-little" style="margin-top: 5rpx;">{{item.tx_status}}</view>
						</view>
					</view>
					
					<view v-else class="flex-row-space-between-center">
						<view class="tx-item-left flex-row-center-center">
							<image v-if="item.from.toLowerCase() == current_wallet.address.toLowerCase()" class="tx-icon"  src="/static/img/send.png"></image>
							<image v-else class="tx-icon"  src="/static/img//receive.png"></image>
							<view>
								<view v-if="item.from.toLowerCase() == current_wallet.address.toLowerCase()" class="font-desc-black">Send ETH</view>
								<view v-else class="font-desc-black receive-color">Receive ETH</view>
								<view class="font-desc-gray-little" style="margin-top: 5rpx;">{{item.humanize_time}}</view>
							</view>
						</view>
						<view class="tx-item-right flex-column-end-end">
							<view class="font-desc-black flex-row-center-center" :class="[item.from.toLowerCase() == current_wallet.address.toLowerCase() ? 'font-desc-black': 'receive-color']">
								<view v-if="item.from.toLowerCase() == current_wallet.address.toLowerCase()">-</view>
								<view v-else>+</view>
								<view>{{item.eth_num}}ETH</view>
							</view>
							<view class="font-desc-gray-little" style="margin-top: 5rpx;">{{item.tx_status}}</view>
						</view>
					</view>
					
			    	<view v-if="item.txreceipt_status != 1" class="tx-progress flex-row-end-center">
						<view style="width: 65rpx;"></view>
							<progress :percent="'0'" activeColor="#10AEFF" stroke-width="3" />
					</view>
			    </view>
			</z-paging>
		</view>

	</view>
</template>

<script>
	import AppJs from '@/common/app.js';
	import WALLET from "@/common/wallet.js";
	import ETHER_API from '@/common/etherApi.js';
	import PRICEQUERY from '@/common/priceQuery.js';
	import Transaction from "@/common/transaction.js";
	import TOKEN from "@/common/token.js";
	import { ethers } from 'ethers';
	
	export default {
		data() {
			return {
				network_list : getApp().globalData.global_network_list,
				global_network_index : getApp().globalData.global_network_index,
				current_network:{
					network:"__",
					url:"",
					color:"#f6f6f6",
					etherscan_api:""
				},
				current_wallet:{
					"address":"0x...........................",
					"name":"my wallet",
					"keystore":"",
					"balance": "__",
					"usd_worth":"__",
					"tokens":[]
				},
				balance:"__",
				usd_worth:"__",
				token_info : {balance: "__",usd_worth: "__"},
				tx_list:[],
				filter_contract_address:"",
				filter_token:"",
				load_more_default_text:{'en':'Pull up to load more','zh-Hans':'下拉加载更多'},
				load_more_loading_text:{'en':'loading','zh-Hans':'加载中'},
				load_more_no_more_text:{'en':'no more','zh-Hans':'没有了'},
				load_more_fail_text	:{'en':'Failed to load,try agin','zh-Hans':'加载失败,请重试'}
				
			}
		},
		onLoad(param) {
			if(!AppJs.checkAppInit()){
				return;
			}
			this.current_network = this.network_list[this.global_network_index];
			
			if(!param.address){
				uni.showToast({
					title:"Param exception",
					icon:"error"
				})
				uni.navigateBack();
				return;
			}
			this.current_wallet.address = param.address;
			this.filter_contract_address = param.contract_address ? param.contract_address :"";
			this.filter_token = param.token ? param.token :"";
			this.loadWalletData();
			
		},
		onPullDownRefresh(){
			this.loadWalletData();
			this.loadTxData(1,10);
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 2000);
		},
		
		methods: {
			loadWalletData: async function(){
				let wallet = WALLET.getWallet(this.current_wallet.address);
				if(!wallet){
					uni.showModal({
						title:"Data exception, please contact admin",
						showCancel:false,
						confirmText:'Got it'
					});
					console.log("读取钱包数据异常");
					return false;
				}
				this.current_wallet = wallet;
				
				if(!this.filter_contract_address){
					this.loadEthBal();
				}else{
					this.loadTokenBal();
				}
				
				
			},
			loadEthBal : async function(){
				//获取链上资产信息
				let ether_api = new ETHER_API.etherApi(this.current_network);
				let bal = await ether_api.getBalance(this.current_wallet.address);
				if(bal){
					this.current_network.balance = Number(bal).toFixed(8);
					let price = await PRICEQUERY.getPrice("ETHUSDT");
					if(!price){
						this.current_network.usd_worth = "__";
					}else{
						this.current_network.usd_worth = (Number(this.current_network.balance) * Number(price)).toFixed(2);
					}
				}else{
					this.current_network.balance = "__";
					this.current_network.usd_worth = "__";
				}
				this.balance = this.current_network.balance;
				this.usd_worth = this.current_network.usd_worth;
				return true;
			},
			loadTokenBal : async function(){
				//获取链上资产信息
				let token = TOKEN.getToken(this.filter_contract_address);
				if(!token){
					return false;
				}
				let ether_api = new ETHER_API.etherApi(this.current_network);
				
				let bal = await ether_api.getContractAssetBalance(token.contract_address,token.abi,this.current_wallet.address,token.decimal);
				if(bal){
					token.balance = Number(bal).toFixed(8);
					let price = await PRICEQUERY.getPrice(token.symbol+"USDT");
					if(!price){
						token.usd_worth = "__";
					}else{
						token.usd_worth = (Number(token.balance) * Number(price)).toFixed(2);
					}
				}else{
					token.balance = "__";
					token.usd_worth = "__";
				}
				this.balance = token.balance;
				this.usd_worth = token.usd_worth;
				this.token_info = token;
				return true;
			},
			loadTxData: async function(page,page_size){
				uni.showLoading({});
				let ret_list = [];
				
				//本地订单
				let local_tx_list = Transaction.getTxList(this.current_wallet.address);
				if([] == local_tx_list){
					uni.hideLoading();
					this.$refs.paging.complete([]);
					return false;
				}
				if(false === local_tx_list){
					this.$refs.paging.complete(false);
					return false;
				}
				let ether_api = new ETHER_API.etherApi(this.network_list[this.global_network_index]);
				/*
				//链上订单
				let online_tx_list = await ether_api.getTxHistory(this.current_wallet.address,page,page_size);
				
				//将本地账单更新或者插入
				if(Array.isArray(local_tx_list) && local_tx_list.length){
					if((Array.isArray(online_tx_list) && online_tx_list.length == 0) || !online_tx_list){
						ret_list = local_tx_list;
					}else{
						for (let ltx of local_tx_list) {
							//如果链上已经有本地的账单了，就更新，否则插入到列表中
							let is_update = false;
							for (let otx of online_tx_list) {
								if(ltx.hash != otx.hash){
									continue;
								}
								is_update = otx;
							}
							if(is_update){
								Transaction.saveTx(is_update);
								continue;
							}
							if(ltx.timestamp <= online_tx_list[0].timestamp && ltx.timestamp >= online_tx_list[online_tx_list.length-1].timestamp){
								ret_list.push(ltx);
							}
							if(1 == page && ltx.timestamp > online_tx_list[0].timestamp){
								ret_list.push(ltx);
							}
						}
						
					}
				}
				*/
				//筛选
				for (let tx of local_tx_list) {
					//获取账单最新状态
					let tr = await ether_api.getTransactionReceipt(tx.hash);
					if(tr && tr.status && 1 != tr.status){
						tx.tx_status = "Confirming";
						Transaction.saveTx(tx);
					}
					if(tr && tr.status && 1 == tr.status){
						tx.tx_status = "Successful";
						tx.txreceipt_status = 1;
						tx.gas_used = tr.gasUsed;
						tx.gas_price = tr.gasPrice;
						tx.gas_fee = Number(ethers.formatEther(tx.gas_used * tx.gas_price)).toFixed(8);
						tx.block_hash = tr.blockHash;
						tx.block_number = tr.blockNumber;
						Transaction.saveTx(tx);
					}
					//解析账单中的data
					if(tx.data && tx.data!="0x"){
						let token = TOKEN.getToken(tx.to);
						if(!token){
							continue;
						}
						const inter = new ethers.Interface(token.abi);
						const decode = inter.parseTransaction({data:tx.data,value:tx.value});
						if(decode.name != "transfer"){
							ret_list.push(tx);
							continue;
						}
						tx.decode_data = decode;
						tx.contract_info = token;
						if(tx.to.toLowerCase() == this.filter_contract_address.toLowerCase()){
							ret_list.push(tx);
						}
						continue;
					}
					if(!this.filter_contract_address){
						ret_list.push(tx);
					}
				}
				
				
				//排序，先把未确认完成的订单排前面，再按时间降序排列
				let unfinish_list = [];
				let finish_list = [];
				for (let r of ret_list) {
					if(1 == r.txreceipt_status){
						finish_list.push(r);
					}else{
						unfinish_list.push(r);
					}
				}
				unfinish_list.sort(function(a,b){
					return b.timestamp - a.timestamp;
				});
				finish_list.sort(function(a,b){
					return b.timestamp - a.timestamp;
				});
				ret_list = unfinish_list.concat(finish_list);

				uni.hideLoading();
				if(ret_list.length){
					this.$refs.paging.complete(ret_list);
					this.tx_list = ret_list;
					return ret_list;
				}
				this.$refs.paging.complete([]);
				return [];
			},
			toTxDetail: function(tx_hash,address){
				uni.navigateTo({
					url:"/pages/transaction/detail?tx_hash="+tx_hash+"&address="+address
				})
			}
		}
	}
</script>

<style>
	.wallet-info{
		padding: 60rpx 30rpx 30rpx 30rpx;
		background-color: #f6f6f6;
	}
	.asset-icon{
		width: 80rpx;
		height: 80rpx;
	}
	.asset-balance{
		margin: 20rpx 0rpx 5rpx 0rpx;
	}
	.func-list{
		margin-top: 50rpx;
		background-color: white;
		padding: 15rpx 15% 15rpx 15%;
		border-radius: 15rpx;
	}
	.func-item{
		margin: 0rpx 10% 0rpx 10%;
	}
	.func-icon{
		width: 45rpx;
		height: 45rpx;
	}
	.tx-list{
		padding: 0rpx 30rpx 0rpx 30rpx;
	}
	.z-paging-content{
		top: 0rpx !important;
	}
	.tx-item{
		padding: 30rpx 0rpx 30rpx 0rpx;
		border-bottom: 1rpx solid rgba(159, 159, 159, 0.2);
	}
	.tx-icon{
		width: 45rpx;
		height: 45rpx;
		margin-right: 15rpx;
	}
	.receive-color{
		color: #1196db;
	}
	.tx-progress{
		margin-top:20rpx;
	}	
</style>
