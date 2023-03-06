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
	import TOKEN from "@/common/token.js";
	import AddressBook from '@/common/address-books.js';
	
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
				sample_contract : {
					symbol : "UNI",
					contract_address : "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
					decimal : 18,
					total_supply : "1000000000",
					abi : [{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"minter_","type":"address"},{"internalType":"uint256","name":"mintingAllowedAfter_","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"minter","type":"address"},{"indexed":false,"internalType":"address","name":"newMinter","type":"address"}],"name":"MinterChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DELEGATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DOMAIN_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint32","name":"","type":"uint32"}],"name":"checkpoints","outputs":[{"internalType":"uint32","name":"fromBlock","type":"uint32"},{"internalType":"uint96","name":"votes","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getCurrentVotes","outputs":[{"internalType":"uint96","name":"","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getPriorVotes","outputs":[{"internalType":"uint96","name":"","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minimumTimeBetweenMints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"mintCap","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minter","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"mintingAllowedAfter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"minter_","type":"address"}],"name":"setMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
				},
				sample_book : {
					address : "0xb0714705DaBF9425727De7d7f10301E085FFcC05",
					name : "admin's address",
					desc : "",
					asset : {symbol : "ETH"}
				},
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
							uni.showToast({
								title:"The sample data has been loaded",
								icon:"none"
							});
							//加载样品数据
							this.loadSampleWallet(this.pin_code);
							this.loadSampleContract();
							this.loadAddressBook();
							
							uni.hideLoading();
							setTimeout(() => {
								uni.redirectTo({url: "/pages/index/wallet",success() {
									
								},fail() {
									uni.redirectTo({
										url:"/pages/start/start-up"
									})
								}});
							}, 1000);
							
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
				
				//切换到测试网络
				getApp().globalData.global_network_index = 1;
				uni.setStorage({
					key: 'storage_default_network',
					data: CONFIG.block_chain_net.eth.net_list[getApp().globalData.global_network_index].network,
					success: function () {
						console.log("已切换至 test network");
					}
				});
				
			},
			loadSampleContract(){
				TOKEN.saveTokenInfo(this.sample_contract);
			},
			loadAddressBook(){
				AddressBook.save(this.sample_book);
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
