<template>
	<view class="container">
		<form @submit="showPinPopup">
			<view class="form-item">
				<view class="font-desc-black">Private key</view>
				<textarea class="private-key-text" name="private_key" maxlength="200" cols="30" rows="10" placeholder="Enter private key"></textarea>
			</view>
			<view class="confirm-btn"><button form-type="submit" class="form-btn" type="primary" >Next</button></view>
		</form>
		<pin-popup ref="pin_popup" :pop_title="'Please enter PIN'" @verifyRet="verifyPinCode"></pin-popup>
	</view>
</template>

<script>
	import AppJs from '@/common/app.js';
	import PIN from "@/common/pin.js";
	import ETHER_API from "@/common/etherApi.js";
	import WALLET from '@/common/wallet.js';
	
	export default {
		data() {
			return {
				network_list : getApp().globalData.global_network_list,
				global_network_index : getApp().globalData.global_network_index,
				private_key:""
			}
		},
		onLoad() {
			if(!AppJs.checkAppInit()){
				return;
			}
		},
		onShow() {
		},
		methods: {
			showPinPopup(e){
				this.private_key = e.detail.value.private_key;
				if(!this.private_key){
					uni.showToast({
						title: "Please enter private key",
						icon:"error"
					});
					return false;
				}
				this.$refs.pin_popup.show();
			},
			verifyPinCode(e){
				let pin = e.ret
				if(!pin){
					uni.showToast({ title: "PIN error", icon: "none" });
					return;
				}
				this.$refs.pin_popup.closePopup();
				this.importWallet(this.private_key,pin);
			},
			async importWallet(private_key,pin_code){
				uni.showLoading({
					title:"importing..."
				});
				
				let ether_api = new ETHER_API.etherApi(this.network_list[this.global_network_index],false);
				
				let ret = ether_api.fromPrivateKey(private_key);
				console.log(JSON.stringify(ret));
				if(!ret){
					uni.hideLoading();
					uni.showToast({
						title: "Failed to import wallet,please try again",
						icon:"error"
					});
					return false;
				}
				let keystore = await WALLET.encryptWallet(ret.privateKey,pin_code);
				if(!keystore){
					uni.hideLoading();
					uni.showToast({
						title:"Failed to import wallet,please try again",
						icon:'error'
					});
					return false;
				}
				let wallet = {};
				wallet.address = ret.address;
				wallet.keystore = JSON.parse(keystore);
				
				if(!WALLET.saveWallet(wallet)){
					uni.hideLoading();
					uni.showToast({
						title:"Failed to import wallet,please try again",
						icon:'error'
					});
					return false;
				}
				WALLET.setDefaultWallet(wallet.address);
				uni.hideLoading();
				uni.showToast({
					title:"Import succeeded"
				});
				setTimeout(() => {
				    uni.redirectTo({
				    	url:"/pages/index/wallet"
				    });
				}, 1200);
				return true;
			}
		}
	}
</script>

<style>
	.form-item{
		margin: 30rpx 0rpx 30rpx 0rpx;
	}
	
	.path-item{
		padding:15rpx 0rpx 15rpx 0rpx;
	}
	
	.private-key-text{
		width: calc(100% - 60rpx);
		background-color: #f6f6f6;
		border-radius: 15rpx;
		padding: 30rpx;
		margin-top: 20rpx;
	}
	
	.confirm-btn{
		width:  calc(100% - 60rpx);
		position: fixed;
		bottom: 0;
	}
	.form-btn{
		background-color: #1196db !important;
	}
	
</style>
