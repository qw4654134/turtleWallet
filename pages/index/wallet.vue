<template>
	<view class="container">
		<view class="status-bar"></view>
		<view class="nav-bar">
			<view class="nav-bar-container">
				<view class="nav-bar-left">
					<view class="wallet-title font-second-title">Turtle Wallet</view>
					<view class="network-part" @click="showNetworkPop">
						<view class="network-color" :style="{'--networkColor': current_network.color ? current_network.color : '#6f6b73' }" :animation="network_connect_animation"></view>
						<view class="network-selector font-desc-gray">{{current_network.network}}</view>
						<image class="selector-arrow" src="/static/img/expand.png" />
					</view>
					
				</view>
				<view class="nav-bar-right">
					<view class="manage-wallet">
						<wallet-list-popup ref="wallet_list_pop" :pop_title="'Manage wallet'" :wallet_list="wallet_list" :selected_address="current_wallet.address" :show_setup_btn="true" @change="changeWallet">
							<image class="nav-icon"  src="/static/img/wallet-manage.png"  @click="showWalletListPop"/>
						</wallet-list-popup>
					</view>
					<view class="scan-qr"><image class="nav-icon"  src="/static/img/scan-qr.png" /></view>
					<view class="more-func" @click="showWarningModal"><image class="nav-icon"  src="/static/img/more.png" /></view>
				</view>
			</view>
		</view>
		
		<view class="top-notice-bar" v-if="show_top_notice_bar">
			<uni-notice-bar single :text="top_notice_bar_title" :backgroundColor="top_notice_bar_bgcolor" :color="top_notice_bar_color" :showClose="top_notice_bar_show_close" :showGetMore="top_notice_bar_show_more" @click="clickTopNoticeBar" :clickCallback="top_notice_bar_click_callback"></uni-notice-bar>
		</view>
		
		<view class="page-container" style="min-height: 3200rpx;">
			<view class="wallet-card-part" :style="{'--top_notice_bar_height': top_notice_bar_height }">
				<view class="wallet-card selected-wallet">
					<view class="wallet-card-line">
						<view class="wallet-name font-desc-black">{{current_wallet.name}}</view>
						<navigator open-type="navigate" :url="'/pages/wallet-info/wallet-info?address='+current_wallet.address"><image class="wallet-info"  src="/static/img/more2.png" /></navigator>
					</view>
					
					<view class="wallet-card-line">
						<view class="address-info" @click="copyAddress">
							<view class="wallet-address font-desc-black">{{current_wallet.address}}</view>
							<image class="copy-address"  src="/static/img/copy2.png" />
						</view>
						<view></view>
					</view>
					<view class="wallet-card-line">
						<view></view>
						<view class="wallet-worth">$ {{current_wallet.usd_worth}}</view>
					</view>
				</view>
			</view>
			
			<view class="main-func-list flex-row-space-between-center">
				<navigator class="main-func-item flex-column-center-center" open-type="navigate" url="/pages/transfer/transfer">
					<image class="main-func-item-icon" src="/static/img/doller-transfer.png" ></image>
					<view class="font-desc-black-little">Transfer</view>
				</navigator>
				<navigator class="main-func-item flex-column-center-center" open-type="navigate" :url="'/pages/receive/receive?address='+current_wallet.address">
					<image class="main-func-item-icon"  src="/static/img/qr.png" ></image>
					<view class="font-desc-black-little">Receive</view>
				</navigator>
				<uni-badge  :text="processing_num" absolute="rightTop" :offset="[25, 3]" size="small">
					<navigator class="main-func-item flex-column-center-center" open-type="navigate" :url="'/pages/transaction/processing?address='+current_wallet.address">
						<image class="main-func-item-icon" src="/static/img/time.png" ></image>
						<view class="font-desc-black-little">Processing</view>
					</navigator>
				</uni-badge>
				<navigator class="main-func-item flex-column-center-center" open-type="navigate" :url="'/pages/swap/swap'">
					<image class="main-func-item-icon"  src="/static/img/swap.png" ></image>
					<view class="font-desc-black-little">Swap</view>
				</navigator>
			</view>
			
			<view class="assets-part">
				<view class="assets-part-title">
					<view class="font-desc-black" style="font-weight: 550;">Assets</view>
					<navigator open-type="navigate" url="/pages/token/add-token">
						<image src="/static/img/plus.png" ></image>
					</navigator>
				</view>
				<view class="asset-list">
					<navigator class="asset-item"  open-type="navigate" :url="'/pages/transaction/list?address='+current_wallet.address+'&token=ETH'">
						<view class="asset-name">
							<image  src="/static/img/ETH.png" ></image>
							<view class="asset-text font-third-title">ETH</view>
						</view>
						<view class="asset-bal">
							<view class="asset-bal-num font-third-title">{{current_wallet.balance}}</view>
							<view class="asset-bal-worth font-desc-gray">$ {{current_wallet.usd_worth}}</view>
						</view>
					</navigator>
					
					<navigator class="asset-item"  v-for="(item,index) in current_wallet.tokens"  open-type="navigate" :url="'/pages/transaction/list?address='+current_wallet.address+'&token='+item.symbol+'&contract_address='+item.contract_address">
						<view class="asset-name">
							<view class="token-default-icon flex-row-center-center">{{item.symbol[0]}}</view>
							<view class="asset-text font-third-title">{{item.symbol}}</view>
						</view>
						<view class="asset-bal">
							<view class="asset-bal-num font-third-title">{{item.balance}}</view>
							<view class="asset-bal-worth font-desc-gray">$ {{item.usd_worth}}</view>
						</view>
					</navigator>
					
					<view class="add-coin-tip font-desc-gray">
						<view>Don't see your Token?&nbsp;</view>
						<navigator open-type="navigate" url="/pages/token/add-token">
							<view class="add-coin-func">Add token</view>
						</navigator>
					</view>
				</view>
			</view>
		</view>
		
		
		
		<!-- 顶部通知栏悬浮窗-->
		<uni-transition ref="top_notify_ani" mode-class="fade" :show="show_top_notify" :duration="show_top_duration">
			<view class="top-notify-float flex-row-space-between-center" @touchmove="hideTopNotify" @click="openNotifyUrl">
				<view class="font-desc-black-little" style="color: white;">{{notify_content}}</view>
				<image class="into-icon" src="/static/img//into-white.png"></image>
			</view>
		</uni-transition>
		<!-- 切换网络弹窗 -->
		<uni-popup ref="network_selector_popup">
				<view class="popup-container">
					<view class="popup-top-area">
						<view></view>
						<view class="popup-title-area font-second-title">Select Network</view>
						<image class="popup-close-area"  src="/static/img/close.png" @click="closeNetworkSelector"></image>
					</view>
					<view class="popup-content-area" >
						<view class="network-item" v-for="(item,index) in network_list" @click="changeNetwork(index)" :style="{'--networkItemBorderWith': index == network_list.length-1 ? '0rpx' : '1rpx' }">
							<view class="network-item-left">
								<view class="network-color" :style="{'--networkColor': item.color ? item.color : '#6f6b73' }"></view>
								<view class="network-name font-desc-black">{{item.network}}</view>
							</view>
							<view>
								<image v-if="index == global_network_index" class="is-network-select"  src="/static/img/right.png"></image>
							</view>
						</view>
					</view>
				</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import AppJs from '@/common/app.js'; 
	import CONFIG from '@/common/config.js';
	import WALLET from '@/common/wallet.js';
	import ETHER_API from '@/common/etherApi.js';
	import PRICEQUERY from '@/common/priceQuery.js';
	import { ethers } from 'ethers';
	import Transaction from "@/common/transaction.js";
	import TOKEN from "@/common/token.js";
	
	export default {
		//测试网钱包：0x03b5b0221fd758c16ced3c3402f830234cf73bb8    0x660838b83ce4a086dda8c18724e18265dacd7e5591bb0f86631f7b8e7dccda55
		// 0x6A01aaa2edA6f55DB4b4906e807837CBA2dfBc80    0x0448beb6c9bcb366932944f711cdd148172c6c54dc5fccc96f92bb740862ea48
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
				network_connect_animation:{},
				current_wallet:{
					"address":"0x...........................",
					"name":"ETH Wallet",
					"keystore":"",
					"balance": "__",
					"usd_worth":"__",
					"tokens":[]
				},
				wallet_list:[],
				processing_num:0,
				
				show_top_notify:false,
				show_top_duration : 2000,
				notify_content:"",
				notify_url:"",
				show_notify_time:0,
				
				show_top_notice_bar :false,
				top_notice_bar_height :"0rpx",
				top_notice_bar_title :"",
				top_notice_bar_bgcolor :"",
				top_notice_bar_color :"",
				top_notice_bar_show_close :"",
				top_notice_bar_show_more:"",
				top_notice_bar_click_callback:""
			}	
		},
		onLoad(param) {
			if(!AppJs.checkAppInit()){
				return;
			}
			if(!uni.getStorageSync("is_show_warning_modal")){
				this.showWarningModal();
			}
			this.current_network = this.network_list[this.global_network_index];
			this.loadWalletData();
			this.loadProcessingTx();
			uni.$once("home_notify",(data)=>{
				this.showTopNotify(data);
			});
			
		},
		onUnload() {
			this.stopFlickerNetWorkerStatus();
		},
		onShow() {
			//this.showTopNotify({title:'Transaction submitted,tap to check it',url:'/pages/transaction/processing?address'});
			this.loadProcessingTx();
		},
		onReady() {
		},
		onPullDownRefresh(){
			this.loadWalletData();
			this.loadProcessingTx();
			setTimeout(function () {
				uni.stopPullDownRefresh();
				console.log("stop refresh")
			}, 2000);
		},
		methods: {
			flickerNetWorkerStatus : function(){
				this.flicker_networker_timer = setInterval(() => {
					//动画
					var animation = uni.createAnimation({
					    duration: 600,
					    timingFunction: 'ease',
					});
					animation.opacity(0.1).step().opacity(1).step();
					this.network_connect_animation = animation.export();
					console.log("ani")
				}, 1000);
				console.log(this.flicker_networker_timer)
			},
			stopFlickerNetWorkerStatus:function(){
				clearInterval(this.flicker_networker_timer);
			},
			showTopNotify: function(data){
				if(0 < this.show_notify_time){
					return;
				}
				this.notify_content = data.title;
				this.notify_url = data.url;
				this.show_top_notify = true;
				this.show_notify_time++;
				console.log(this.notify_content);
				setTimeout(function (e) {
					e.hideTopNotify();
				}, 8000,this);
				
			},
			hideTopNotify:function(){
				this.show_top_notify = false;
			},
			showTopNoticeBar : function({title,background_color,color,show_close,show_more,click_callback}){
				this.top_notice_bar_height = "81rpx",
				this.top_notice_bar_title = title,
				this.top_notice_bar_bgcolor = background_color,
				this.top_notice_bar_color = color,
				this.top_notice_bar_show_close = show_close,
				this.top_notice_bar_show_more = show_more,
				this.top_notice_bar_click_callback = click_callback;
				this.show_top_notice_bar = true;
			},
			closeTopNoticeBar:function(){
				this.top_notice_bar_height = "0rpx";
				this.show_top_notice_bar = false;
			},
			clickTopNoticeBar:function(data){
				eval(data.callback+"()");
			},
			showNetWorkErrorPop:function(){
				uni.showModal({
					title:"Network warning",
					content:"Failed to connect to " + this.current_network.network + ". If you are in China, please use VPN",
					showCancel:false,
					confirmText:'Got it'
				});
			},
			openNotifyUrl:function(){
				if(this.notify_url){
					uni.navigateTo({
						url:this.notify_url
					});
				}
			},
			loadProcessingTx:function(){
				let list = Transaction.getProcessingTxList(this.current_wallet.address);
				if(Array.isArray(list)){
					this.processing_num = list.length;
				}
			},
			//加载当前钱包
			loadWalletData: async function(){
				this.flickerNetWorkerStatus();
				this.wallet_list = WALLET.getWalletList();
				if(!this.wallet_list || !(this.wallet_list instanceof Array) || 0 == this.wallet_list.length){
					this.stopFlickerNetWorkerStatus();
					uni.showModal({
						title:"Data exception, please contact admin",
						showCancel:false,
						confirmText:'Got it'
					});
					console.log("读取钱包列表异常");
					return false;
				}
				
				let wallet = WALLET.getDefaultWallet();
				if(!wallet){
					this.stopFlickerNetWorkerStatus();
					uni.showModal({
						title:"Data exception, please contact admin",
						showCancel:false,
						confirmText:'Got it'
					});
					console.log("读取钱包数据异常");
					return false;
				}
				this.current_wallet = wallet;
				
				//获取链上资产信息
				let ether_api = new ETHER_API.etherApi(this.network_list[this.global_network_index]);
				let balance = await ether_api.getBalance(this.current_wallet.address);
				if(!balance){
					this.stopFlickerNetWorkerStatus();
					this.current_wallet.balance = "__";
					this.current_wallet.usd_worth = "__";
					this.showTopNoticeBar({
						title:"Failed to connect to " + this.current_network.network, 
						background_color:"#fffae8",
						color:"#ff0000",
						show_close : false,
						show_more: true,
						click_callback:"this.showNetWorkErrorPop"
					});
					return false;
				}
				this.stopFlickerNetWorkerStatus();
				this.closeTopNoticeBar();
				this.current_wallet.balance = Number(balance).toFixed(8) ;
				let price = await PRICEQUERY.getPrice("ETHUSDT");
				if(!price){
					this.current_wallet.usd_worth = "__";
				}else{
					this.current_wallet.usd_worth = (Number(balance) * Number(price)).toFixed(2);
				}
				WALLET.saveWallet(this.current_wallet);
				this.loadTokens();
				return true;
			},
			showNetworkPop:function(){
				this.$refs.network_selector_popup.open("bottom");
			},
			closeNetworkSelector:function(){
				this.$refs.network_selector_popup.close();
			},
			changeNetwork:function(index){
				if(index == this.global_network_index){
					return;
				}
				getApp().globalData.global_network_index = this.global_network_index = index;
				this.current_network = this.network_list[this.global_network_index];
				uni.setStorage({//记住网络设置
					key: 'storage_default_network',
					data: this.network_list[index].network,
					success: function () {
						
					}
				});
				this.closeNetworkSelector();
				uni.startPullDownRefresh({
					fail:function(){
						console.log("触发刷新失败")
					}
				});
			},
			copyAddress(){
				uni.setClipboardData({
					data: this.current_wallet.address,
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
			},
			showWalletListPop(){
				this.$refs.wallet_list_pop.show();
			},
			changeWallet(e){
				var default_wallet = WALLET.setDefaultWallet(e.address);
				if(!default_wallet){
					uni.showToast({
						title:"Failed to change wallet",
						icon:'error'
					});
					return false;
				}
				if(e.address == this.current_wallet.address){
					return true;
				}
				this.current_wallet = default_wallet;
				uni.startPullDownRefresh();
			},
			async loadTokens(){
				let list = TOKEN.getList();
				if(!Array.isArray(list)){
					return false;
				}
				let ethers_api = new ETHER_API.etherApi(this.current_network);
				for (let token of list) {
					let bal = await ethers_api.getContractAssetBalance(token.contract_address,token.abi,this.current_wallet.address,token.decimal);
					if(bal){
						token.balance = Number(bal).toFixed(8);
						let price = await PRICEQUERY.getPrice(token.symbol+"USDT");
						if(!price){
							token.usd_worth = "__";
							continue;
						}
						token.usd_worth = (Number(token.balance) * Number(price)).toFixed(2);
					}else{
						token.balance = "__";
						token.usd_worth = "__";
					}
				}
				this.current_wallet.tokens = list;
				WALLET.saveWallet(this.current_wallet);
			},
			showWarningModal(){
				uni.showModal({
					title:"Warning",
					content:"Don't use the wallet to manage your assets in main network.It's still being tested.Hope u have a nice experience!",
					showCancel:false,
					confirmText:'Got it'
				});
				uni.setStorageSync("is_show_warning_modal",1);
			}
		}
	}
</script>

<style>
	.container{
		padding: 0rpx;
		margin: 0rpx;
	}
	
	/* #ifdef APP-PLUS */
	.status-bar{
		height: var(--status-bar-height);
		width: 100%;
	}
	/* #endif */
	
	.nav-bar{
		position: fixed;
		top: 0;
		/* #ifdef APP-PLUS */
		top: var(--status-bar-height);
		/* #endif */
		width: 100%;
		height: 80rpx;
		box-shadow: 2rpx 2rpx 2rpx 2rpx rgba(159, 159, 159, 0.1);
	}
	.nav-bar-container{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-left: 30rpx;
		padding-right: 30rpx;
	}
	.wallet-title{
		
	}
	.network-part{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.network-part > view{
		margin-right: 10rpx;
	}
	.network-color{
		width: 18rpx;
		height: 18rpx;
		border-radius: 18rpx;
		background-color: var(--networkColor);
	}
	.network-selector{
		font-size: 22rpx;
	}
	.selector-arrow {
		width: 30rpx;
		height: 30rpx;
	}
	
	.nav-bar-right{
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}
	
	.nav-icon{
		width: 40rpx;
		height: 40rpx;
		margin-left: 15rpx;
	}
	.top-notice-bar{
		position: fixed;
		width: 100%;
		/* #ifdef APP-PLUS */
		top: calc(var(--status-bar-height) + 80rpx) ;
		/* #endif */
		/* #ifdef H5 */
		top: 80rpx;
		/* #endif */
	}
	.page-container{
		padding: 110rpx 30rpx 30rpx 30rpx;
		/* #ifdef APP-PLUS */
		margin-top: calc(var(--status-bar-height) + 20rpx);
		/* #endif */
	}
	
	.wallet-card-part{
		margin-top: var(--top_notice_bar_height);
	}
	.wallet-card{
		border-radius: 15rpx;
		padding: 10rpx 25rpx 10rpx 25rpx;
	}
	.selected-wallet{
		background-color: #1196db;
	}
	.wallet-card-line{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}
	.wallet-name{
		color: white;
		font-size: 24rpx;
	}
	.wallet-info{
		width: 35rpx;
		height: 35rpx;
	}
	.address-info{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.wallet-address{
		color: white;
		max-width: 400rpx;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.copy-address{
		width: 25rpx;
		height: 25rpx;
		margin-left: 15rpx;
	}
	.wallet-worth{
		color: white;
	}
	.main-func-list{
		margin: 15rpx 0rpx 15rpx 0rpx;
		padding: 30rpx 30rpx 30rpx 30rpx;
		border: 1rpx solid rgba(159, 159, 159, 0.1);
		border-radius: 15rpx;
	}
	.main-func-item{

	}
	.boundary{
		width: 2rpx;
		height: 35rpx;
		border-right: 2rpx solid rgba(159, 159, 159, 0.1);
	}
	.main-func-item-icon{
		width: 40rpx;
		height: 40rpx;
		margin-right: 10rpx;
	}
	.processing-num{
		
	}
	.assets-part{
		padding: 20rpx 0rpx 10rpx 0rpx;
	}
	.asset-list{
		margin-top: 10rpx;
	}
	.assets-part-title{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.assets-part-title > view{
		
	}
	.assets-part-title image{
		width: 40rpx;
		height: 40rpx;
	}

	.asset-item{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 20rpx;
		padding: 0rpx 0rpx 20rpx 0rpx;
		border-bottom: 1rpx solid rgba(159, 159, 159, 0.1);
	}
	.asset-name{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.asset-name > image{
		width: 50rpx;
		height: 50rpx;
	}
	.token-default-icon{
		width: 50rpx;
		height: 50rpx;
		border-radius: 50rpx;
		background-color: #cccccc;
		color: white;
		font-size: 32rpx;
		font-weight: 600;
	}
	.asset-text{
		margin-left: 10rpx;
	}
	.asset-bal{
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	
	.popup-container{
		background-color: #ffffff;
		border-radius: 15rpx 15rpx 0rpx 0rpx;
	}
		
	.popup-top-area{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 18rpx;
		border-bottom: 1rpx solid rgba(159, 159, 159, 0.1);
	}
	.popup-close-area{
		width: 40rpx;
		height: 40rpx;
	}
	.popup-content-area{
		padding: 30rpx 30rpx 30rpx 30rpx;
	}
	.network-item{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 0rpx 30rpx 0rpx;
		border-bottom: var(--networkItemBorderWith) solid rgba(159, 159, 159, 0.1);
	}
	.network-item-left{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.network-name{
		margin-left: 10rpx;
	}
	.is-network-select{
		width: 28rpx;
		height: 28rpx;
	}
	.add-coin-tip{
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 50rpx 0 30rpx 0;
	}
	.add-coin-func{
		color: #1196db;
	}
	.top-notify-float{
		position: fixed;
		z-index: 998;
		height: 80rpx;
		width: calc(100% - 60rpx) ;
		top: 0rpx;
		left: 0rpx;
		background-color: #1196db;
		padding: 0rpx 30rpx 0rpx 30rpx;
	}
	.into-icon{
		width: 30rpx;
		height: 30rpx;
	}
</style>
