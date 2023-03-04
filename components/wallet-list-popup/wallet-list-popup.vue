<template>
	<view class="wmp-wallet-list-popup">
		<slot></slot>
		<uni-popup ref="wallet_manage_popup">
			<view class="wmp-popup-container">
				<view class="wmp-popup-top-area">
					<view></view>
					<view class="wmp-popup-title-area font-second-title">{{pop_title}}</view>
					<image class="wmp-popup-close-area" mode="widthFix" src="/static/img/close.png" @click="closeWalletList"></image>
				</view>
				<view class="wmp-popup-content-area" >
					<view class="wmp-wallet-card" v-for="(item,index) in wallet_list" :class="[item.address == selected_address ? 'wmp-selected-wallet' : 'wmp-un-selected-wallet']" @click="changeWallet(item.address)" >
						<view class="wmp-wallet-card-line">
							<view class="wmp-wallet-name font-desc-black">{{item.name}}</view>
						</view>
						<view class="wmp-wallet-card-line">
							<view class="wmp-address-info">
								<view class="wmp-wallet-address font-desc-black">{{item.address}}</view>
							</view>
							<view></view>
						</view>
					</view>
				</view>
				<view class="wmp-popup-bottom-area" v-if="show_setup_btn">
					<navigator class="wmp-wallet-setup-func" open-type="redirect" url="/pages/setup-wallet/wallet-phrase">
						<image mode="widthFix" src="/static/img/create_wallet.png"></image>
						<view class="font-desc-black" >Create wallet</view>
					</navigator>
					<view class="wmp-boundary"></view>
					<import-wallet :ref="'import_wallet_popup'" :pop_title="'Import ETH wallet'">
						<view class="wmp-wallet-setup-func" @click="showImportWalletPopup">
							<image mode="widthFix" src="/static/img/import_wallet.png"></image>
							<view class="font-desc-black" >Import wallet</view>
						</view>
					</import-wallet>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name:"wallet-list-popup",
		emits: ['change'],
		props: {
			pop_title:{//弹窗标题
				type:String,
				required:true
			},
			wallet_list:{//钱包列表
				type:Array,
				default:[],
				required:true
			},
			selected_address:{//选中的钱包地址
				type:String,
				default:"",
				required:false
			},
			show_setup_btn:{//是否展示安装钱包的按钮
				type:Boolean,
				default:false,
				required:false
			}
		},
		data() {
			return {
			};
		},
		methods:{
			show(){
				this.$refs.wallet_manage_popup.open("bottom");
			},
			changeWallet(address){
				this.closeWalletList();
				this.$emit('change', {
					address: address
				});
			},
			closeWalletList(){
				this.$refs.wallet_manage_popup.close();
			},
			showImportWalletPopup:function(){
				this.$refs.import_wallet_popup.show();
			}
		}
	}
</script>

<style>
	.wmp-popup-container{
		background-color: #ffffff;
		border-radius: 15rpx 15rpx 0rpx 0rpx;
	}
	.wmp-popup-top-area{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 18rpx;
		border-bottom: 1rpx solid rgba(80, 80, 80, 0.2);
	}
	.wmp-popup-close-area{
		width: 40rpx;
	}
	.wmp-popup-content-area{
		padding: 30rpx 30rpx 30rpx 30rpx;
	}
	.wmp-wallet-card{
		border-radius: 15rpx;
		padding: 10rpx 25rpx 10rpx 25rpx;
		margin: 20rpx 0rpx 20rpx 0rpx;
	}
	.wmp-selected-wallet{
		background-color: #1196db;
	}
	.wmp-un-selected-wallet{
		background-color: rgba(80, 80, 80, 0.4);
	}
	.wmp-wallet-card-line{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}
	.wmp-wallet-name{
		color: white;
		font-size: 24rpx;
	}
	.wmp-address-info{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.wmp-wallet-address{
		color: white;
		width: 95%;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
	.wmp-popup-bottom-area{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30rpx 0rpx 30rpx 0rpx;
	}
	.wmp-wallet-setup-func{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin: 0rpx 40rpx 0rpx 40rpx;
	}
	.wmp-wallet-setup-func > image{
		width: 40rpx;
		margin-right: 10rpx;
	}
	.wmp-boundary{
		width: 2rpx;
		height: 35rpx;
		border-right: 2rpx solid rgba(80, 80, 80, 0.3);
	}
</style>