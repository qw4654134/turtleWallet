<template>
	<view class="container">
		<view class="qr-card ">
			<view class="flex-column-center-center" style="padding: 60rpx 30rpx 30rpx 30rpx;">
				<view class="qr-card-item tip font-fourth-title">Only Supports Ethereum {{current_network.network}} assets</view>
				<view class="qr-card-item qrcode">
				      <view class="flex-row-center-center" v-for="(row, rowI) in modules" :key="rowI" >
				        <view v-for="(col, colI) in row" :key="colI">
				          <view v-if="col.isBlack" :style="'width: '+qr_size+'rpx;height: '+qr_size+'rpx;background-color: black;'">
				            <!-- 黑色码点 -->
				          </view>
				          <view v-else :style="'width: '+qr_size+'rpx;height: '+qr_size+'rpx;background-color: white;'">
				            <!-- 白色码点 -->
				          </view>
				        </view>
				      </view>
				</view>
				<view class="qr-card-item font-desc-gray">Wallet address</view>
				<view class="qr-card-item font-fourth-title address" @click="copyAddress">{{address}}</view>
			</view>
			<view class="qr-card-item func-list flex-row-space-round-center">
				<view class="func-item flex-row-center-center" @click="showSharePopup">
					<image class="icon" src="/static/img/share.png"></image>
					<view class="icon-text font-desc-black">Share</view>
				</view>
				<view class="func-item flex-row-center-center" @click="copyAddress">
					<image class="icon"  src="/static/img/copy-black.png"></image>
					<view class="icon-text font-desc-black">Copy</view>
				</view>
			</view>
		</view>
		<uni-popup ref="share" type="share" safeArea backgroundColor="#fff">
			<uni-popup-share></uni-popup-share>
		</uni-popup>
	</view>
</template>

<script>
	import AppJs from '@/common/app.js';
	import UQRCode from "@/uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js";
	
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
				address:"",
				qr_data:"",
				qr_size:8,
				modules: []
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
				});
				setTimeout(function () {
					uni.navigateBack();
				}, 2000);
				return;
			}
			this.address = param.address;
			this.qr_data = "ethereum:"+this.address;
			if(this.qr_data){
				this.showQR(this.qr_data);
			}
		},
		methods: {
			showQR(data){
				const qr = new UQRCode();
				qr.data = data;
				qr.make();
				this.modules = qr.modules;
			},
			showSharePopup(){
				this.$refs.share.open("bottom");
			},
			copyAddress(){
				uni.setClipboardData({
					data: this.address,
					success: function () {
						uni.showToast({
							title:"The address has been copied",
							icon:'none'
						});
						
					},
					fail: function(){
						uni.showToast({
							title:"Failed to copy address"
						});
						console.log('复制钱包地址失败');
					}
				});
			}
		}
	}
</script>

<style>
	/* #ifdef MP-WEIXIN */
	
	page{background:#1196db;}
	
	/* #endif */
	
	/* #ifdef H5 */
	
	.page-bg{background-color: #1196db;}
	
	/* #endif */
	
	.container{
		padding: 30rpx 40rpx 30rpx 40rpx;
	}
	.qr-card{
		background-color: white;
		border-radius: 15rpx;
	}
	.tip{
		width: 100%;
		word-wrap: break-word;
		text-align: center;
	}
	.qrcode{
		padding: 30rpx 0rpx 30rpx 0rpx;
	}
	.qr-card-item{
		margin: 15rpx 0rpx 15rpx 0rpx;
	}
	.address{
		width: 100%;
		word-wrap: break-word;
		text-align: center;
	}
	.func-list{
		padding: 30rpx;
		background-color: #f6f6f6;
		border-bottom-left-radius: 15rpx;
		border-bottom-right-radius: 15rpx;
	}

	.icon{
		width: 40rpx;
		height: 40rpx;
		margin-right: 15rpx;
	}
</style>
