<template>
	<view class="container">
		<form @submit="showPinPopup">
			<view class="form-item">
				<view class="font-desc-black">Keystore</view>
				<textarea class="keystore-text" name="keystore" maxlength="-1"  cols="30" rows="10" placeholder="Enter keystore,it's a json text"></textarea>
			</view>
			<view class="form-item">
				<view class="font-desc-black">Password</view>
				<input type="safe-password" class="password-input" name="password">
			</view>
			<view class="confirm-btn"><button form-type="submit" class="form-btn" type="primary">confirm</button></view>
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
				keystore:null,
				password:""
			}
		},
		onLoad() {
			if(!AppJs.checkAppInit()){
				return;
			}
		},
		onShow() {
			this.pin_code = PIN.checkPinStatus();
			if(!this.pin_code){
				return;
			}
		},
		methods: {
			showPinPopup(e){
				let keystore = null;
				try{
					keystore = JSON.parse(e.detail.value.keystore);
				}catch(e){
					uni.showToast({
						title: "Please enter keystore in json form",
						icon:"error"
					});
					return false;
				}
				if(!keystore){
					uni.showToast({
						title: "Please enter keystore in json form",
						icon:"error"
					});
					return false;
				}
				this.keystore = keystore;
				this.password = e.detail.value.password;
				if(!this.password){
					uni.showToast({
						title: "Please enter password",
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
				this.importWallet(this.keystore,this.password,pin);
			},
			async importWallet(keystore,password,pin_code){
				uni.showLoading({
					title:"importing..."
				});
				let ether_api = new ETHER_API.etherApi(this.network_list[this.global_network_index],false);
				let ret = await ether_api.fromEncryptedJson(JSON.stringify(keystore),password);
				console.log(JSON.stringify(ret));
				if(!ret){
					uni.hideLoading();
					uni.showToast({
						title: "Failed to import wallet,please try again",
						icon:"error"
					});
					return false;
				}
				//用pin生成新的keystore
				let new_keystore = await WALLET.encryptWallet(ret.privateKey,pin_code);
				if(!new_keystore){
					uni.hideLoading();
					uni.showToast({
						title:"Failed to import wallet,please try again",
						icon:'error'
					});
					return false;
				}
				
				let wallet = {};
				wallet.address = ret.address;
				wallet.keystore = JSON.parse(new_keystore);
				
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
	
	.keystore-text{
		width: calc(100% - 60rpx);
		background-color: #f6f6f6;
		border-radius: 15rpx;
		padding: 30rpx;
		margin-top: 20rpx;
	}
	
	.password-input{
		background-color: #f6f6f6;
		border-radius: 15rpx;
		padding: 15rpx;
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
