<template>
	<view class="iw-wallet-list-popup">
		<slot></slot>
		<uni-popup ref="import_wallet_popup">
			<view class="iw-popup-container">
				<view class="iw-popup-top-area">
					<view></view>
					<view class="iw-popup-title-area font-second-title">{{pop_title}}</view>
					<image class="iw-popup-close-area" mode="widthFix" src="/static/img/close.png" @click="closePopup"></image>
				</view>
				<view class="iw-popup-content-area" >
					<view class="iw-import-item iw-import-item-border flex-row-space-between-center" @click="importWallet('/pages/setup-wallet/import-mnemonic','mnemonic')">
						<view class="iw-import-item-left flex-row-start-center">
							<image class="iw-import-item-icon" src="/static/img/word.png" mode="widthFix"></image>
							<view class="iw-item-title-desc">
								<view class="iw-item-title font-desc-black">Mnemonic</view>
								<view class="iw-item-desc font-desc-gray-little">It's composed of words and separaed by spaces</view>
							</view>
						</view>
						<image class="iw-import-item-right" src="/static/img/into.png" mode="widthFix"></image>
					</view>
					<view class="iw-import-item iw-import-item-border flex-row-space-between-center"  @click="importWallet('/pages/setup-wallet/import-private','private-key')">
						<view class="iw-import-item-left flex-row-start-center">
							<image class="iw-import-item-icon" src="/static/img//key.png" mode="widthFix"></image>
							<view class="iw-item-title-desc">
								<view class="iw-item-title font-desc-black">Private Key</view>
								<view class="iw-item-desc font-desc-gray-little">Private key of the wallet</view>
							</view>
						</view>
						<image class="iw-import-item-right" src="/static/img/into.png" mode="widthFix"></image>
					</view>
					<view class="iw-import-item  flex-row-space-between-center" @click="importWallet('/pages/setup-wallet/import-keystore','keystore')">
						<view class="iw-import-item-left flex-row-start-center">
							<image class="iw-import-item-icon" src="/static/img//json.png" mode="widthFix"></image>
							<view class="iw-item-title-desc">
								<view class="iw-item-title font-desc-black">Keystore</view>
								<view class="iw-item-desc font-desc-gray-little">A json file encrypted with private key</view>
							</view>
						</view>
						<image class="iw-import-item-right" src="/static/img/into.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import PIN from '@/common/pin.js';
	export default {
		name:"import-wallet",
		props: {
			pop_title:{//弹窗标题
				type:String,
				required:true
			}
		},
		data() {
			return {
			};
		},
		methods:{
			show(){
				this.$refs.import_wallet_popup.open("bottom");
			},
			closePopup(){
				this.$refs.import_wallet_popup.close();
			},
			importWallet(url,method){
				let pin_code = PIN.getPIN();
				if(!pin_code){
					uni.redirectTo({
						url:"/pages/setup-wallet/create-pin?scene=import-wallet&method="+method+"&input_time=1"
					});
					return;
				}
				uni.navigateTo({url:url});
			}
		}
	}
</script>

<style>
	.iw-popup-container{
		background-color: #ffffff;
		border-radius: 15rpx 15rpx 0rpx 0rpx;
	}
	.iw-popup-top-area{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 18rpx;
	}
	.iw-popup-close-area{
		width: 40rpx;
	}
	.iw-popup-content-area{
		padding: 30rpx 30rpx 30rpx 30rpx;
	}
	.iw-import-item{
		padding: 30rpx 0rpx 30rpx 0rpx;
	}
	.iw-import-item-border{
		border-bottom: 1rpx solid rgba(80, 80, 80, 0.2);
	}
	.iw-item-title-desc{
		margin-left: 15rpx;
	}
	
	.iw-import-item-icon{
		width: 50rpx;
	}
	.iw-import-item-right{
		width: 30rpx;
	}
</style>