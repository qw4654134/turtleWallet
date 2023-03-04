<template>
	<view class="container">
		<view class="secret-phrase-text">
			<view class="secret-phrase-title font-first-title">Your Secret Phrases</view>
			<view class="secret-phrase-desc font-desc-black">Please save these phrases, or you will lose your assets</view>
		</view>
		<view class="secret-phrase-list" >
			<view class="phrase-item" v-for="(item,index) in phrases">
				<view class="phrase-item-index font-desc-gray">{{index+1}}</view>
				<view class="phrase-word font-second-title">{{item}}</view>
			</view>
		</view>
		<view class="func-area">
			<view class="func-item" @click="copyPhrases">
				<image class="func-icon" src="/static/img/copy.png"></image>
				<view class="func-text font-desc-black">Copy</view>
			</view>
			<view class="func-item" @click="change">
				<image class="func-icon" src="/static/img/change.png"></image>
				<view class="func-text font-desc-black">Change</view>
			</view>
		</view>
		<view class="secure-tip font-desc-gray">
			<view>Never share your phrases with anyone</view>
			<view>Store it securely in offline</view>
		</view>
		<view class="get-start"><button class="form-btn" type="primary" @click="toCheckPhrases">Get started</button></view>
	</view>
</template>

<script>
	import AppJs from '@/common/app.js';
	import { ethers } from 'ethers';
	import WALLET from '/common/wallet.js';
	import md5 from 'js-md5';
	import config from '/common/config.js';
	import pin from '@/common/pin.js';
	import crypt from '@/common/crypt.js';

	export default {
		data() {
			return {
				pin_code:'',
				phrases:['____','____','____','____','____','____','____','____','____','____','____','____'],
				wallet_info:{}
				
			}
		},
		onLoad() {
			if(!AppJs.checkAppInit()){
				return;
			}
			uni.$on("pin_code_set", (data)=>{
				console.dir(data);
				if(data && data.pin){
					this.pin_code = data.pin;
				}
			});
			uni.$emit('pin_code_set1',{msg:'页面更新'});
			this.change();
		},
		onUnload() {
			uni.$off("pin_code_set");
			uni.$off('new_wallet_info1');
		},
		onShow(){
		},
		methods: {
			copyPhrases(){
				uni.setClipboardData({
					data: this.phrases.join(' '),
					success: function () {
						uni.showToast({
							title:"The phrases has been copied",
							icon:'none'
						});
						
					},
					fail: function(){
						uni.showToast({
							title:"Failed to copy phrases"
						});
						console.log('复制助记词失败');
					}
				});
			},
			change(){
				if(!pin.checkPinStatus()){
					return;
				}
				this.changePhrases();
			},
			changePhrases(){
				uni.showLoading({title:"creating"});
				let wallet = WALLET.createWallet();
				console.log(this.pin_code);
				console.log(wallet.address);
				console.log(wallet.privateKey);
				let phrase_arr = wallet.mnemonic.phrase.split(' ');
				for (var i = 0; i < phrase_arr.length; i++) {
					this.phrases[i] = phrase_arr[i];
				}
				this.wallet_info.address = wallet.address;
				this.wallet_info.phrases = wallet.mnemonic.phrase;
				WALLET.encryptWallet(wallet.privateKey,this.pin_code).then((res)=>{
					uni.hideLoading();
					this.wallet_info.keystore = JSON.parse(res);
					console.dir(this.wallet_info);
				},(res)=>{
					uni.hideLoading();
					console.log("生成keystores error")
					console.log(res)
				});
			},
			toCheckPhrases(){
				try{
					var password = pin.checkPinStatus();
					if(!password){
						return;
					}
					var data = JSON.stringify(this.wallet_info);
					var encrypt_str = crypt.aesEncrypt(JSON.stringify(this.wallet_info),password);
					console.log(encrypt_str);
					uni.$on("new_wallet_info1",()=> {
						uni.$emit('new_wallet_info',{new_wallet_info:encrypt_str});
					});
					
					uni.navigateTo({
						url: "/pages/setup-wallet/check-phrase"
					});
				}catch(e){
					console.log("存储new_wallet_info失败");
					console.log(e);
				}
			}
		}
	}
</script>


<style>

	.secret-phrase-text{
		padding-top: 50rpx;
	}
	.secret-phrase-desc{
		padding-top: 20rpx;
	}
	.secret-phrase-list{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 30rpx;
		background-color: rgba(0, 0, 0, 0.05);
		border-radius: 10rpx;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}
	.phrase-item{
		width: 30%;
		padding-top: 25rpx;
		padding-bottom: 25rpx;
	}
	.func-area{
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
	}
	.func-item{
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
	}
	.func-icon{
		width: 40rpx;
		height: 40rpx;
		margin-right: 10rpx;
	}
	.func-text{
		color: #1196db;
	}
	.secure-tip{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 60rpx;
	}
	.get-start{
		padding-top: 30rpx;
		width:  calc(100% - 60rpx);
		position: fixed;
		bottom: 0;
	}
	

</style>
