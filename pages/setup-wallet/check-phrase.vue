<template>
	<view class="container">
		<view class="secret-phrase-text">
			<view class="secret-phrase-title font-first-title">Check your phrases</view>
			<view class="secret-phrase-desc font-desc-black">Make sure you have backed up your phrases</view>
		</view>
		<form @submit="formSubmit" >
		<view class="check-list">
			<view class="check-item">
				<view class="check-desc form-item-desc">What's the 4th word of your phrases</view>
				<input class="form-input" type="text" placeholder="Enter the phrase" name="fourth_word">
			</view>
			<view class="check-item">
				<view class="check-desc form-item-desc">What's the 9th word of your phrases</view>
				<input class="form-input" type="text" placeholder="Enter the phrase" name="ninth_word">
			</view>
		</view>
		<view class="confirm-btn"><button form-type="submit" class="form-btn" type="primary">Confirm</button></view>
		</form>
	</view>
</template>

<script>
	import AppJs from '@/common/app.js';
	import crypt from '@/common/crypt.js';
	import pin from '@/common/pin.js';
	import wallet from '@/common/wallet.js';
	
	export default {
		data() {
			return {
				pin_code:'',
				new_wallet_info:{
					"address":"",
					"name":"My wallet",
					"phrases":"",
					"keystore":""
				}
			}
		},
		onLoad() {
			if(!AppJs.checkAppInit()){
				return;
			}
			uni.$on('new_wallet_info',(data)=>{
				let password = pin.checkPinStatus();
				if(!password){
					return;
				}
				var encryp_str = data.new_wallet_info;
				var decrypt_str = crypt.aesDecrypt(encryp_str,password);
				this.new_wallet_info = JSON.parse(decrypt_str);
				if(!this.new_wallet_info){
					uni.showModal({
						title:"Data exception, please contact admin",
						showCancel:false,
						confirmText:'Got it'
					});
				}
			});
			uni.$emit('new_wallet_info1',{});
		},
		onUnload() {
			uni.$off('new_wallet_info',this.requireNewWalletInfo);
		},
		onShow() {
			
		},
		methods: {
			formSubmit:function(e){
				if('' == e.detail.value.fourth_word || '' == e.detail.value.ninth_word){
					uni.showToast({
						title:"Please fill in the form",
						icon:'none'
					});
					return;
				}
				var phrases = this.new_wallet_info.phrases.split(' ');
				var fourth_word = e.detail.value.fourth_word.trim();
				var ninth_word = e.detail.value.ninth_word.trim();
				console.log(fourth_word + ' ' + ninth_word);
				console.log(phrases);
					
				if(phrases.length > 11 && phrases[3] == fourth_word && phrases[8] == ninth_word){
					uni.showToast({
						title:"You have finished setting",
						icon:'none'
					});
					this.new_wallet_info.phrases = '';
					wallet.saveWallet(this.new_wallet_info);
					uni.redirectTo({
						url: "/pages/index/wallet"
					});
					return;
				}
				uni.showToast({
					title:"Please check it",
					icon:'none'
				});
				return;
				
			}
		}
	}
</script>

<style>
	.confirm-btn{
		width:  calc(100% - 60rpx);
		position: fixed;
		bottom: 0;
	}
	.confirm-btn > button{
		background-color: #1196db !important;
	}
	.secret-phrase-desc{
		padding-top: 10rpx;
	}
	
	.check-list{
		padding-top: 60rpx;
	}
	.check-item{
		padding-bottom: 40rpx;
	}
	.check-item > input{
		margin-top: 15rpx;
	}
</style>
