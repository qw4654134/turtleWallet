<template>
	<view class="container">
		<view class="icon-container">
			<image class="image" mode="widthFix" src="/static/img/wallet.png" />
		</view>
		<view class="setup-container">
			<view class="setup-text">
				<view class="setup-text-title font-first-title">Set up ETH wallet</view>
				<view class="setup-text-desc font-desc-black">Turtle Wallet currently only supports Ethereum tokens</view>
			</view>
			<view class="setup-func-list">
				<view class="setup-func setup-func-border" @click="createWallet">
					<view class="func-icon"><image class="image" src="/static/img/create_wallet.png" /></view>
					<view class="func-title-desc">
						<view class="func-title font-second-title">Create new crypto wallet</view>
						<view class="func-desc font-desc-black">to store,send & receive</view>
					</view>
				</view>
				<import-wallet :ref="'import_wallet_popup'" :pop_title="'Import ETH wallet'">
					<view class="setup-func" @click="showImportWalletPopup">
						<view class="func-icon"><image class="image"  src="/static/img/import_wallet.png" /></view>
						<view class="func-title-desc">
							<view class="func-title font-second-title">Import your wallet</view>
							<view class="func-desc font-desc-black">by mnemonic,private key or keystore</view>
						</view>
					</view>
				</import-wallet>
			</view>
		</view>
		<view class="guest-mode">
			<view class="flex-row-center-center" @click="showGuestModePop">
				<view class="font-desc-gray">Experience mode</view>
				<image class="guest-mode-into" src="/static/img/into.png" ></image>
			</view>
		</view>
		<!-- 提示窗 -->
		<uni-popup ref="expreience_dia" type="dialog">
			<uni-popup-dialog type="info" cancelText="不了" confirmText="好的" title="体验模式" content="您由体验链接进入，建议进入体验模式，自动导入样本钱包，高效体验" @confirm="expreienceDiaConfirm" @close="expreienceDiaClose">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import AppJs from '@/common/app.js';
	export default {
		data() {
			return {
				auto_show_guest:false,
				guest_url : "/pages/setup-wallet/create-pin?scene=guest-mode&input_time=1&tip=After creating PIN, you can start the experience"
			}
		},
		onLoad(param){
			if(!AppJs.checkAppInit()){
				return;
			}
			if(param && param.guest_mode){
				this.auto_show_guest = true;
			}
		},
		onShow() {
			
		},
		onReady() {
			if(this.auto_show_guest){
				this.$refs.expreience_dia.open();
			}
		},
		methods: {
			createWallet: function(){
				uni.navigateTo({
					url:"/pages/setup-wallet/create-pin?scene=create-wallet&input_time=1"
				});
			},
			showImportWalletPopup:function(){
				this.$refs.import_wallet_popup.show();
			},
			showGuestModePop: function(){
				uni.showModal({
					content:"You'll experience this App with a sample wallet in test network",
					confirmText:"Go on",
					success: function (res) {
						if (res.confirm) {
							uni.navigateTo({
								url:"/pages/setup-wallet/create-pin?scene=guest-mode&input_time=1&tip=After creating PIN, you can start the experience"
							});
						}
					}
				});
			},
			expreienceDiaConfirm:function(){
				uni.navigateTo({
					url:this.guest_url
				});
			},
			expreienceDiaClose:function(){
				this.$refs.expreience_dia.close();
			}
			
		}
	}
</script>

<style>

	.icon-container{
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding-top: 120rpx;
	}
	.icon-container > image{
		width: 300rpx;
	}
	.setup-container{
		display: flex;
		flex-direction: column;
		padding-top: 100rpx;
	}
	.setup-text{
		display: flex;
		flex-direction: column;
	}

	.setup-func-list{
		padding-top: 20rpx;
	}
	.setup-func{
		display: flex;
		flex-direction: row;
		align-items:center;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}
	.setup-func-border{
		border-bottom: 1rpx solid rgba(159, 159, 159, 0.1);
	}
	.func-icon{
		padding:20rpx;
	}
	.func-icon > image{
		width: 60rpx;
		height: 60rpx;
	}
	.guest-mode{
		width: calc(100% - 60rpx) ;
		position: absolute;
		bottom: 60rpx;
	}
	.guest-mode-into{
		width: 25rpx;
		height: 25rpx;
		margin-left: 5rpx;
	}
</style>
