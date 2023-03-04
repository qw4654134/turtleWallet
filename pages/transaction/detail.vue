<template>
	<view class="container">
		<view class="tx-status-area flex-column-start-center">
			<image class="status-icon"  :src="'/static/img/'+transaction.tx_status+'.png'"></image>
			<view class="status-text font-third-title" :class="['tx-status-'+transaction.tx_status]">{{transaction.tx_status}}</view>
			<view class="tx-time"></view>
		</view>
		<view class="detail-part detail-part1">
			<view class="detail-line flex-row-start-start detail-line-border">
				<view class="line-title font-desc-black">Detail</view>
				<view class="line-content">
					<view v-if="transfer_contract_token==false" class="font-desc-black">
						<text v-if="address.toLowerCase() == transaction.from.toLowerCase()" style="margin-right: 30rpx;">Send</text>
						<text v-else-if="address.toLowerCase() == transaction.to.toLowerCase()" style="margin-right: 30rpx;">Receive</text>
						<text v-else style="margin-right: 30rpx;"></text>
						<text  style="font-weight: 550;">{{transaction.eth_num}} ETH</text>
					</view>
					<view v-if="transfer_contract_token"  class="font-desc-black">
						<text v-if="address.toLowerCase() == transaction.from.toLowerCase()" style="margin-right: 30rpx;">Send</text>
						<text v-else-if="address.toLowerCase() == transaction.data.args[0].toLowerCase()" style="margin-right: 30rpx;">Receive</text>
						<text v-else style="margin-right: 30rpx;"></text>
						<text style="font-weight: 550;">{{transaction.data.args[1]}} {{transaction.contract_info.symbol}}</text>
					</view>
					<view class="font-desc-gray-little" style="margin-top: 15rpx;">{{current_network.network}}</view>
				</view>
			</view>
			<view class="detail-line flex-row-start-start">
				<view class="line-title font-desc-black" v-if="transaction.tx_status == 'Successful'">Gas Fee</view>
				<view class="line-title" v-else>Estimated Fee</view>
				<view class="line-content">
					<view class="font-desc-black" v-if="transaction.tx_status == 'Successful'">{{transaction.gas_fee}} ETH</view>
					<view class="font-desc-black" v-else>{{transaction.estimate_gas_fee}} ETH</view>
				</view>
			</view>
		</view>
		<view class="detail-part detail-part2">
			<view class="detail-line flex-row-start-start detail-line-border">
				<view class="line-title fonr">From</view>
				<view class="line-content" >
					<view class="font-desc-gray">{{transaction.from}}</view>
				</view>
			</view>
			<view class="detail-line flex-row-start-start">
				<view class="line-title font-desc-black">To</view>
				<view class="line-content">
					<view class="font-desc-gray" >{{transaction.to}}</view>
					<view  v-if="transfer_contract_token" class="font-desc-gray-little" style="margin-top: 5rpx;">contract address</view>
				</view>
			</view>
			<view class="detail-line flex-row-start-start" v-if="transfer_contract_token">
				<view class="line-title font-desc-black">Target</view>
				<view class="line-content">
					<view class="font-desc-gray" >{{transaction.data.args[0]}}</view>
				</view>
			</view>
		</view>
		<view class="detail-part detail-part3">
			<view class="detail-line flex-row-start-start detail-line-border">
				<view class="line-title font-desc-black">TxHash</view>
				<view class="line-content">
					<view class="font-desc-gray" >{{transaction.tx_hash}}</view>
				</view>
			</view>
			<view class="detail-line flex-row-start-start detail-line-border">
				<view class="line-title font-desc-black">Block Hash</view>
				<view class="line-content">
					<view class="font-desc-gray" >{{transaction.block_hash}}</view>
				</view>
			</view>
			<view class="detail-line flex-row-start-start">
				<view class="line-title font-desc-black">Block Number</view>
				<view class="line-content">
					<view class="font-desc-gray" >{{transaction.block_number}}</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import AppJs from '@/common/app.js';
	import ETHER_API from '@/common/etherApi.js';
	import PRICEQUERY from '@/common/priceQuery.js';
	import { ethers } from 'ethers';
	import UTIL from '@/common/util.js';
	import Transaction from "@/common/transaction.js";
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
				tx_hash : '',
				address : "",
				transaction : {from:"",to:""},
				transfer_contract_token:false
			}
		},
		onLoad(param) {
			if(!AppJs.checkAppInit()){
				return;
			}
			this.current_network = this.network_list[this.global_network_index];
			
			if(!param.tx_hash || !param.address){
				uni.showToast({
					title:"Data exception",
					icon:"error"
				})
				uni.navigateBack();
				return;
			}
			this.tx_hash = param.tx_hash;
			this.address = param.address;
			//先从本地拿
			let local_tx = Transaction.getTx(this.tx_hash);
			if(local_tx){
				this.transaction = local_tx;
			}
			this.getTransaction(this.tx_hash);
		},
		onPullDownRefresh(){
			this.getTransaction(this.tx_hash);
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			getTransaction: async function (tx_hash){
				let ether_api = new ETHER_API.etherApi(this.network_list[this.global_network_index]);
				let tx = await ether_api.getTransaction(tx_hash);
				//console.log(tx);
				if(!tx){
					uni.showToast({
						title:"Can't find the transaction",
						icon:'none'
					})
					return false;
				}
				if(tx.type == 2){
					let token = TOKEN.getToken(tx.to);
					if(token){
						const inter = new ethers.Interface(token.abi);
						const decode = inter.parseTransaction({data:tx.data,value:tx.value});
						console.dir(decode);
						this.transaction.data = decode;
						this.transaction.contract_info = token;
						if("transfer" == this.transaction.data.name){
							this.transfer_contract_token = true;
						}
					}
				}
				let tr = await ether_api.getTransactionReceipt(tx_hash);
				//console.log(tr);
				if(!tr){
					this.transaction.tx_status = "Pending";
					this.transaction.time = "";
					this.transaction.from = tx.from;
					this.transaction.to = tx.to;
					this.transaction.value = tx.value;
					this.transaction.eth_num = Number(ethers.formatEther(tx.value)).toFixed(8);
					this.transaction.gas_limit = tx.gasLimit;
					this.transaction.gas_price = tx.gasPrice;
					this.transaction.estimate_gas_fee = Number(ethers.formatEther(this.transaction.gas_limit * this.transaction.gas_price)).toFixed(8);
					this.transaction.tx_hash = tx.hash;
					this.transaction.block_hash = tx.blockHash;
					this.transaction.block_number = tx.blockNumber;
					return this.transaction;
				}
				if(tr && tr.status){
					if(1 == tr.status){
						this.transaction.tx_status = "Successful";
					}else{
						this.transaction.tx_status = "Confirming";
					}
				}else{
					this.transaction.tx_status = "Unkonwn";
				}
				this.transaction.time = "";
				this.transaction.from = tr.from;
				this.transaction.to = tr.to;
				this.transaction.value = tx.value;
				this.transaction.eth_num = Number(ethers.formatEther(tx.value)).toFixed(8);
				this.transaction.gas_used = tr.gasUsed;
				this.transaction.gas_price = tr.gasPrice;
				this.transaction.gas_fee = Number(ethers.formatEther(this.transaction.gas_used * this.transaction.gas_price)).toFixed(8);
				this.transaction.tx_hash = tr.hash;
				this.transaction.block_hash = tr.blockHash;
				this.transaction.block_number = tr.blockNumber;
				return this.transaction;
			}
		}
	}
</script>

<style>
	/* #ifdef MP-WEIXIN */
	
	page{background:#f6f6f6;}
	
	/* #endif */
	
	/* #ifdef H5 */
	
	.page-bg{background-color: #f6f6f6;}
	
	/* #endif */
	
	.status-icon{
		width: 100rpx;
		height: 100rpx;
	}
	.status-text{
		margin: 10rpx 0rpx 10rpx 0rpx;
	}
	.tx-status-Pending{
		color: #969696;
	}
	.tx-status-Successful{
		color: limegreen;
	}
	.tx-status-Confirming{
		color: black;
	}
	.tx-status-Unkonwn{
		color: #ee3d02;
	}
	.detail-part{
		background-color: #ffffff;
		padding: 30rpx;
		border-radius: 15rpx;
		margin: 30rpx 0rpx 30rpx 0rpx;
	}
	.detail-line{
		padding: 15rpx 0rpx 15rpx 0rpx;
	}
	.detail-line-border{
		border-bottom: 1rpx solid rgba(170, 170, 170, 0.2);
	}
	.line-title{
		width: 25%;
		word-break: break-word;
	}
	.line-content{
		width: 75%;
		word-break: break-word;
	}
</style>
