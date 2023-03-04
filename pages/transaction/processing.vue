<template>
	<view>
		<view class="tx-list">
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
		</view>
		<view v-if="show_empty" class="empty_tip flex-row-center-center font-desc-gray"><view>No transactions in progress</view></view>
	</view>
</template>

<script>
	import AppJs from '@/common/app.js';
	import WALLET from "@/common/wallet.js";
	import ETHER_API from '@/common/etherApi.js';
	import Transaction from "@/common/transaction.js";
	import { ethers } from 'ethers';
	import TOKEN from "@/common/token.js";
	
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
				tx_list:[],
				show_empty:false
				
			}
		},
		onLoad(param) {
			if(!AppJs.checkAppInit()){
				return;
			}
			this.current_network = this.network_list[this.global_network_index];
			if(!param.address){
				uni.showToast({
					title:"Data exception",
					icon:"error"
				})
				uni.navigateBack();
				return;
			}
			this.current_wallet.address = param.address;
			this.loadTxData();
		},
		onPullDownRefresh(){
			this.loadTxData();
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 2000);
		},
		methods: {
			loadTxData: async function(){
				uni.showLoading({});
				let ether_api = new ETHER_API.etherApi(this.network_list[this.global_network_index]);
				let tx_list = Transaction.getProcessingTxList(this.current_wallet.address);
				if(!tx_list || 0 == tx_list.length){
					uni.hideLoading();
					this.show_empty = true;
					return false;
				}
				this.show_empty = false;
				for (let tx of tx_list) {
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
							continue;
						}
						tx.decode_data = decode;
						tx.contract_info = token;
					}
				}
				uni.hideLoading();
				this.tx_list = tx_list;
				return tx_list;
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

	.tx-list{
		padding: 0rpx 30rpx 30rpx 30rpx;
	}
	.z-paging-content{
		top: 0rpx !important;
	}
	.tx-item{
		padding: 30rpx 0rpx 30rpx 0rpx;
		border-bottom: 1rpx solid rgba(159, 159, 159, 0.1);
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
	.empty_tip{
		margin-top: 500rpx;
	}
</style>
