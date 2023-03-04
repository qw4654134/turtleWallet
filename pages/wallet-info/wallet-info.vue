<template>
	<view>
		<view class="group">
			<view class="item item-border">
				<view class="item-title font-desc-black">Wallet Address</view>
				<view class="item-desc font-desc-gray-little">{{current_wallet.address}}</view>
			</view>
			<view class="item flex-row-space-between-center">
				<view class="item-title font-desc-black">Wallet Name</view>
				<view class="flex-row-center-center">
					<view class="font-desc-black" style="margin-right: 15rpx;">{{current_wallet.name}}</view>
					<uni-icons type="forward"></uni-icons>
				</view>
			</view>
		</view>
		<view class="group">
			<view class="item flex-row-space-between-center">
				<view class="item-title font-desc-black">Backup wallet</view>
				<uni-icons type="forward"></uni-icons>
			</view>
		</view>
		
		<view class="group" >
			<view class="item flex-row-center-center">
				<view class="item-title font-desc-black" style="color: red;">Delete wallet</view>
			</view>
		</view>
	</view>
</template>

<script>
	import AppJs from '@/common/app.js';
	import WALLET from '@/common/wallet.js';
	
	export default {
		data() {
			return {
				current_wallet:{
					"address":"0x...........................",
					"name":"ETH Wallet",
					"keystore":"",
					"balance": "__",
					"usd_worth":"__",
					"tokens":[]
				}
			}
		},
		onLoad(param) {
			if(!AppJs.checkAppInit()){
				return;
			}
			if(!param.address){
				uni.showToast({
					title:"Data exception",
					icon:"error"
				})
				uni.navigateBack();
				return;
			}
			this.current_wallet.address = param.address;
			this.loadWalletData();
			
		},
		methods: {
			loadWalletData: function(){
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
	
	.group{
		margin-bottom: 30rpx;
	}
	.item{
		padding: 30rpx;
		background-color: white;
	}
	.item-border{
		border-bottom: 1rpx solid rgba(159, 159, 159, 0.1);
	}
	.item-desc{
		margin-top: 10rpx;
	}
</style>
