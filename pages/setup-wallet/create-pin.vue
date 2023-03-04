<template>
	<view class="container">
		<view class="create-pin-text">
			<view class="create-pin-title font-first-title">{{create_pin_title}}</view>
			<view class="create-pin-desc font-desc-black">{{create_pin_desc}}</view>
		</view>
		<pin-code-keyboard ref="pin_code_keyboard" v-bind:init_pin_code="init_pin_code" @change="pinChange" @finish="pinFinish" codePaddingTop="150rpx" keyboardPaddingTop="100rpx"></pin-code-keyboard>
		<navigator v-if="show_recreate" class="reset-pin flex-row-center-center" open-type="navigateBack">
			<view class="font-desc-black">Recreate</view>
			<uni-icons type="forward"></uni-icons>
		</navigator>
		<view v-if="tip!=''" class="tip flex-row-center-center font-desc-gray">
			<view style="width: 80%;">{{tip}}</view>
		</view>
	</view>
</template>

<script>
	import AppJs from '@/common/app.js';
	import md5 from 'js-md5';
	import pin from '@/common/pin.js';
	import CONFIG from '@/common/config.js';
	import WALLET from '@/common/wallet.js';
	
	export default {
		data() {
			return {
				scene : '',
				method : '',
				input_time : '',
				create_pin_title:'Create a PIN',
				create_pin_desc:'This PIN will unlock your wallet only on this device',
				init_pin_code: '',//初始化的pin
				pin_code: '',//已输入的pin
				show_recreate:false,
				sample_wallets : [
					{address:"0x03b5b0221fd758c16ced3c3402f830234cf73bb8",private_key:"0x660838b83ce4a086dda8c18724e18265dacd7e5591bb0f86631f7b8e7dccda55"},
					{address:"0x6A01aaa2edA6f55DB4b4906e807837CBA2dfBc80",private_key:"0x0448beb6c9bcb366932944f711cdd148172c6c54dc5fccc96f92bb740862ea48"}
				],
				tip:""
				
			}
		},
		onLoad(param) {
			if(!AppJs.checkAppInit()){
				return;
			}
			//分三种场景：  http://localhost:5173/#/pages/setup-wallet/create-pin?scene=create-wallet&input_time=2
			//1. 创建钱包设置pin码 scene=create-wallet
			//2. 导入钱包设置pin码 scene=import-wallet
			//3. 游客模式设置pin码 scene=guest-mode
			//每个场景又分第一次输入pin码和第二次确认pin码
			if(!param.scene 
				|| !param.input_time 
				|| String("|create-wallet|import-wallet|guest-mode|").indexOf(param.scene) < 0 
				|| String("|1|2|").indexOf(String(param.input_time)) < 0 
				|| ("import-wallet" == param.scene && String("|mnemonic|private-key|keystore|").indexOf(param.method) < 0)
			){
				//清理掉pin,避免存储了未经二次确认的PIN引起忘记密码的悲剧
				//pin.delPIN();
				uni.showModal({
					title:"Data exception, please contact admin",
					showCancel:false,
					confirmText:'Got it',
					success() {
						uni.navigateBack();
					}
				});
				console.log("进入create-pin页面的参数异常");
				return false;
			}
			if(param && param.tip){
				this.tip = param.tip;
			}
			this.scene = param.scene;
			this.method = param.method;
			this.input_time = param.input_time;
			if(1 == this.input_time){
				this.create_pin_title = 'Create a PIN';
				this.create_pin_desc = 'This PIN will unlock your wallet only on this device';
			}else{
				this.create_pin_title = 'Type your PIN again';
				this.create_pin_desc = 'Make sure remember it all time';
			}
			//uni.$once('reEnterPinError',this.reEnterPinError);
		},
		onUnload() {
			uni.$off("pin_code_set1");
		},
		onShow(){
			if(1 == this.input_time){
				try{
					this.$refs.pin_code_keyboard.clear();
				}catch(e){
					console.log(e)
				}
			}
		},
		methods: {
			pinChange: function(e){
				
			},
			pinFinish: function(e){
				if(!e.pin_code){
					return;
				}
				this.pin_code = e.pin_code;
				switch (this.input_time){
					case '1':
						pin.setPIN(this.pin_code);
						let url = "/pages/setup-wallet/create-pin?scene=" + this.scene+"&input_time=" + 2;
						if("import-wallet" == this.scene){
							url = "/pages/setup-wallet/create-pin?scene=" + this.scene+"&method=" + this.method +"&input_time=" + 2;
						}
						uni.navigateTo({url: url});
						break;
					case '2':
						if(!pin.compare(this.pin_code)){
							uni.showToast({
								title:"The two inputs are inconsistent",
								icon:'error',
								duration:2000
							});
							
							this.show_recreate = true;
							return;
						}
						if("create-wallet" == this.scene){
							//这设计真坑爹
							uni.$on("pin_code_set1",()=> {
								uni.$emit('pin_code_set',{pin:this.pin_code});
							})
							uni.navigateTo({url: "/pages/setup-wallet/wallet-phrase"});
							
						}else if("import-wallet" == this.scene){
							let url = "";
							if("mnemonic" == this.method){
								url = "/pages/setup-wallet/import-mnemonic";
							}
							if("private-key" == this.method){
								url = "/pages/setup-wallet/import-private";
							}
							if("keystore" == this.method){
								url = "/pages/setup-wallet/import-keystore";
							}
							if(!url){
								console.log("参数错误")
							}
							uni.redirectTo({url: url});
							
						}else if("guest-mode" == this.scene){
							//加载样品钱包数据
							this.loadSampleWallet(this.pin_code);
						}
						break;
					default:
						break;
				}
			},
			reEnterPinError:function(data){
				this.$refs.pin_code_keyboard.clear();
				console.log("clear")
			},
			loadSampleWallet: async function(pin_code){
				uni.showLoading({
					title:"Loading sample wallet"
				});
				for (let wallet of this.sample_wallets) {
					let keystore = await WALLET.encryptWallet(wallet.private_key,pin_code);
					if(!keystore){
						uni.showToast({
							title:"Failed to load sample wallet",
							icon:'error'
						});
						continue;
					}
					let save_wallet = {};
					save_wallet.address = wallet.address;
					save_wallet.keystore = JSON.parse(keystore);
					if(!WALLET.saveWallet(save_wallet)){
						uni.showToast({
							title:"Failed to load sample wallet",
							icon:'error'
						});
						continue;
					}
				}
				
				uni.hideLoading();
				//切换到测试网络
				getApp().globalData.global_network_index = 1;
				uni.setStorage({
					key: 'storage_default_network',
					data: CONFIG.block_chain_net.eth.net_list[getApp().globalData.global_network_index].network,
					success: function () {
						console.log("已切换至 test network");
					}
				});
				uni.showToast({
					title:"The sample wallet has been loaded",
					icon:"none"
				});
				setTimeout(() => {
					uni.redirectTo({url: "/pages/index/wallet",success() {
						
					},fail() {
						uni.redirectTo({
							url:"/pages/start/start-up"
						})
					}});
				}, 1000);
			}
		}
	}
</script>

<style>

	.create-pin-text{
		padding-top: 120rpx;
	}

	.create-pin-desc{
		padding-top: 20rpx;
	}
	.reset-pin{
		margin-top: 60rpx;
	}
	.tip{
		margin-top: 90rpx;
		text-align: center;
	}
</style>
