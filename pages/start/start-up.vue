<template>
	<view class="container flex-column-center-center">
		<view></view>
		<view class="icon-area flex-column-center-center">
			<image class="icon" src="/static/img/wallet.png" />
			<view class="icon-text font-first-title">Turtle Wallet</view>
		</view>
		<view></view>
	</view>
</template>

<script>
	import CONFIG from '@/common/config.js';
	import PIN from '@/common/pin.js';
	
	export default {
		data() {
			return {
				setup_page_param:""
			}
		},
		methods: {
			
		},
		onLoad(param) { // http://localhost:5173/#/pages/start/start-up?guest_mode=true
			console.log(param);
			if(param && param.guest_mode){
				this.setup_page_param = "?guest_mode=true"
			}
		},
		onReady() {

		},
		onShow(){
			//初始化配置信息
			//先看是否有默认网络的记录
			try {
				//读取网络配置
				let global_network_list = CONFIG.block_chain_net.eth.net_list;
				let default_network = uni.getStorageSync('storage_default_network');
				console.log(default_network)
				let global_network_index = 0;
				if (!default_network) {
					default_network = CONFIG.block_chain_net.eth.default_net;
				}
				for (var i = 0; i < global_network_list.length; i++) {
					if(global_network_list[i].network == default_network){
						global_network_index = i;
						console.log("网络配置：" + global_network_list[i].url);
					}
				}
				getApp().globalData.global_network_list = global_network_list;
				getApp().globalData.global_network_index = global_network_index;
				
				//用于标记是否完成app数据初始化
				getApp().globalData.global_is_app_data_init = true;
				
				
			} catch (e) {
				console.log("读取配置信息异常");
				return;
			}
			
			var page_url = "/pages/setup-wallet/setup" + this.setup_page_param;
			try {
				//如果无任何钱包或者无PIN，则显示创建钱包页面
				const value = uni.getStorageSync('storage_wallet_list');
				const pin = PIN.getPIN();
				if (value && pin) {
					page_url = "/pages/index/wallet";
				}
			} catch (e) {
				uni.showToast({
					title:"Data exception, please contact admin",
					icon:'error'
				});
				return;
			}
			setTimeout(() => {
			    uni.redirectTo({url: page_url});
			}, 2000);
		}
	}
</script>

<style>
	.container{
		height: var(--vheight);
	}

	.icon-area{
		margin-top: 300rpx;
		animation: fadein 2s ease forwards;

	}
	.icon {
		width: 300rpx;
		height: 300rpx;
	}
	.icon-text{
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
	}
	@keyframes fadein {
	    from { opacity: 0; }
	    to { opacity: 1; }
	}
</style>
