<template>
	<view class="container">
		<form @submit="formSubmit">
			<view class="form-item">
				<view class="form-item-title font-desc-black">From</view>
				<wallet-list-popup ref="wallet_list_pop" :pop_title="'Choose account'" :wallet_list="wallet_list" :selected_address="current_wallet.address" :show_setup_btn="false" @change="changeWallet">
					<view class="transfer-form-item from-address-selector" @click="showWalletListPop">
						<view class="from-address-info">
							<view class="from-address-name font-desc-gray">{{current_wallet.name}}</view>
							<view class="from-address font-desc-black">{{current_wallet.address}}</view>
						</view>
						<image class="form-icon"  src="../../static/img/expand.png"></image>
					</view>
				</wallet-list-popup>
			</view>
			<view class="form-item">
				<view class="form-item-title font-desc-black">To</view>
				<view class="transfer-form-item to-address">
					<input class="to-address-input" type="text" name="to_address" >
					<view class="to-address-func-list">
						<image class="form-icon"  src="../../static/img/contact.png"></image>
						<image class="form-icon"  src="../../static/img/scan.png"></image>
					</view>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-title font-desc-black">Asset</view>
				<choose-token ref="token_choose" pop_title="Select Asset" :wallet="current_wallet" @change="changeAsset">
					<view class="transfer-form-item asset-selector" @click="showTokenChoose">
						<view v-if="selected_asset.symbol=='ETH'" class="asset-info" >
							<image class="asset-icon"  src="../../static/img/ETH.png"></image>
							<view class="asset-name font-desc-black">{{selected_asset.symbol}}</view>
						</view>
						<view v-else class="asset-info">
							<view class="token-default-icon flex-row-center-center">{{selected_asset.symbol[0]}}</view>
							<view class="asset-name font-third-title" style="margin-left: 10rpx;">{{selected_asset.symbol}}</view>
						</view>
						<image class="form-icon"  src="../../static/img/expand.png"></image>
					</view>
				</choose-token>
			</view>
			<view class="form-item">
				<view class="form-item-title font-desc-black flex-row-space-between-center" >
					<view>Amount</view>
					<view class="balance font-desc-gray-little" style="font-weight: 500;">Balance : {{selected_asset.balance}}{{selected_asset.symbol}}</view>
				</view>
				<view class="transfer-form-item amount-input-part">
					<input class="amount-input" type="digit" name="amount">
					<view class="amount-input-right">
						<view class="font-desc-gray">{{selected_asset.symbol}}</view>
					</view>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-title font-desc-black flex-row-space-between-center">
					<view>Gas Fee (Estimated)</view>
					<view class="font-desc-gray-little" style="font-weight: 500;">
						<uni-load-more :status="gas_estimate_status" :contentText="gas_status_tip" :iconSize="18"/>
					</view>
				</view>
				<view class="transfer-form-item gas-fee-selector" @click="showGasPopup" :animation="gas_fee_item_animation">
					<view class="gas-fee-left">
						<view class="gas-fee-usd-worth font-desc-black">$ {{gas_priority[current_priority_index].cost_usd}}</view>
						<view class="gas-fee-asset-worth font-desc-gray">{{gas_priority[current_priority_index].cost}} ETH</view>
					</view>
					<view class="gas-fee-right">
						<view class="estimated-time font-desc-black">{{gas_priority[current_priority_index].time}}</view>
						<image class="form-icon"  src="../../static/img/expand.png"></image>
					</view>
				</view>
			</view>
			<view class="next-btn"><button form-type="submit" class="form-btn" type="primary">Next</button></view>
		</form>

		<view>
			<!-- gas 设置弹窗 -->
			<uni-popup ref="set_gas_popup">
				<view class="popup-container">
					<view class="popup-top-area">
						<view></view>
						<view class="popup-title-area font-second-title">Set Gas Fee</view>
						<image class="popup-close-area"  src="/static/img/close.png" @click="closeGasPopup"></image>
					</view>
					<view class="popup-content-area" >
						<view class="gas-fee-overview">
							<view class="gas-fee-overview-line">
								<view class="font-third-title">Gas Fee</view>
								<view class="font-third-title" style="margin-top: 10rpx;" :animation="gas_fee_item_animation">$ {{gas_fee_usd}}</view>
							</view>
							<view class="gas-fee-overview-line">
								<view></view>
								<view class="font-desc-gray" :animation="gas_fee_item_animation">{{gas_fee}} ETH</view>
							</view>
						</view>
						<view class="tab-swiper">
							<view>
								<uni-segmented-control :current="current_tab_index" :values="tab_list" :style-type="'button'"
								:active-color="'#1196db'" @clickItem="onClickTabItem" />
							</view>
						</view>
						<view class="tab-content">
							<view class="tab-content-set-priority" v-if="0 == current_tab_index" :animation="gas_fee_item_animation">
								<view class="priority-item flex-row-start-center" v-for="(priority_item,priority_index) in gas_priority" @click="selectPriority(priority_index)" :class="[ priority_index == 2 ? 'last-priority-item' : '' ]">
									<view class="priority-item-radio">
										<view class="radio-border flex-row-center-center"><view :class="[current_priority_index == priority_index ? 'priority-item-radio-active' : 'priority-item-radio-inactive']"></view></view>
									</view>
									<view class="priority-item-detail" >
										<view class="flex-row-space-between-center">
											<view class="font-desc-black">{{priority_item.level}}</view>
											<view class="font-desc-gray-little">{{priority_item.time}}</view>
										</view>
										<view class="font-desc-gray-little">MaxFee: {{priority_item.max_fee}} GWEI</view>
									</view>
								</view>
								<uni-load-more :status="gas_estimate_status" :contentText="gas_status_tip" :iconSize="18"/>
							</view>
							<view class="tab-content-customize" v-if="1 == current_tab_index">
								<form @submit="setCustomizeGas">
								<view class="customize-gas-item">
									<view class="font-desc-gray">MaxFee</view>
									<view class="customize-gas-item-input flex-row-space-between-center">
										<input type="digit"  :value="customize_set_max_fee" name="customize_set_max_fee"  >
										<view class="font-desc-gray">GWEI</view>
									</view>
								</view>
								<view class="customize-gas-item">
									<view class="font-desc-gray">MaxPriorityFee</view>
									<view class="customize-gas-item-input flex-row-space-between-center">
										<input type="digit" :value="customize_max_priority_fee" name="customize_max_priority_fee"  >
										<view class="font-desc-gray">GWEI</view>
									</view>
								</view>
								<view class="customize-gas-item">
									<view class="font-desc-gray" >Gas</view>
									<view class="customize-gas-item-input">
										<input type="digit" :value="customize_gas" name="customize_gas">
									</view>
								</view>
								<view style="margin-top: 40rpx;"><button form-type="submit" class="form-btn" type="primary" >Set</button></view>
								</form>
							</view>
						</view>
					</view>
				</view>
			</uni-popup>
			
			<!-- 转账确认弹窗 -->
			<uni-popup ref="confirm_payment_popup">
				<view class="popup-container">
					<view class="popup-top-area">
						<view></view>
						<view class="popup-title-area font-second-title">Payment Detail</view>
						<image class="popup-close-area"  src="/static/img/close.png" @click="closeConfirmPaymentPopup"></image>
					</view>
					<view class="popup-content-area" >
						<view class="payment-amount flex-row-center-center"><view class="font-second-title">{{transfer_data.eth_amount}} {{selected_asset.symbol}}</view></view>
						<view class="payment-item flex-row-start-start payment-item-border">
							<view class="payment-title font-desc-gray-little">Payment type</view>
							<view class="payment-content font-desc-black-little">{{selected_asset.symbol}} Transfer</view>
						</view>
						<view class="payment-item flex-row-start-start payment-item-border">
							<view class="payment-title font-desc-gray-little">To</view>
							<view class="payment-content font-desc-black-little">{{transfer_data.to_address}}</view>
						</view>
						<view class="payment-item flex-row-start-start payment-item-border">
							<view class="payment-title font-desc-gray-little">From</view>
							<view class="payment-content font-desc-black-little">{{current_wallet.address}}</view>
						</view>
						<view class="payment-item flex-row-start-start">
							<view class="payment-title font-desc-gray-little">Gas Fee</view>
							<view class="payment-content font-desc-black-little">{{transfer_data.gas_fee}} ETH</view>
						</view>
						<view style="margin-top: 40rpx;"><button class="form-btn" type="primary" @click="showPinPopup" >Next</button></view>
					</view>
				</view>
			</uni-popup>
			<pin-popup ref="pin_popup" :pop_title="'Please enter PIN'" @verifyRet="verifyPinCode"></pin-popup>
		</view>
	</view>
</template>

<script>
	import AppJs from '@/common/app.js';
	import WALLET from '@/common/wallet.js';
	import ETHER_API from '@/common/etherApi.js';
	import { ethers } from 'ethers';
	import graceChecker from "@/common/graceChecker.js";
	import pin from '@/common/pin.js';
	import Transaction from "@/common/transaction.js";
	import UTIL from '@/common/util.js';
	import TOKEN from "@/common/token.js";
	import PRICEQUERY from '@/common/priceQuery.js';
	
	export default {
		data() {
			return {
				ether_api: null,
				network_list : getApp().globalData.global_network_list,
				global_network_index : getApp().globalData.global_network_index,
				wallet_list : [],
				current_wallet : {
					"address":"____________________________________",
					"name":"______",
					"keystore":"",
					"balance": "_",
					"usd_worth":"_",
					"tokens":[]
				},
				current_network:{
					network:"__",
					url:"",
					color:"#f6f6f6",
					etherscan_api:""
				},
				selected_asset:{symbol:"ETH",balance:0},
				current_tab_index : 0,
				tab_list : ['Set priority','Customize'],
				gas_priority:[
					{"level":"Fastest","max_fee":"_","time":"_ Min","cost_usd":"_","cost":"_","gas":"21000","eth_price":"0"},
					{"level":"Standard","max_fee":"_","time":"_ Min","cost_usd":"_","cost":"_","gas":"21000","eth_price":"0"},
					{"level":"Low","max_fee":"_","time":"_ Min","cost_usd":"_","cost":"_","gas":"21000","eth_price":"0"}
				],
				gas_price:0,
				gas_limit:0,
				current_priority_index:1,
				customize_set_max_fee:0,
				customize_max_priority_fee:0,
				customize_gas:21000,
				gas_fee_usd:"_",
				gas_fee:"_",
				transfer_data:{},
				gas_status_tip:{"contentdown": " ","contentrefresh": "Refreshing...","contentnomore": " "},
				gas_estimate_status:'more', 
				
				refrush_timer:0,
				refrush_gas_countdown:0,//刷新gas费的倒计时
				refrush_gas_last_time:0,//上一次刷新gas费的时间
				refrush_gas_gap:10,//刷新gas费的时间间隔,单位 s
				gas_fee_item_animation:{}
			}
		},
		onLoad() {
			//定时获取gas预估数据
			this.refrush_timer = setInterval(() => {
				if("loading" == this.gas_estimate_status){
					return;
				}
				let now = new Date().getTime();
				let time_gap = now - this.refrush_gas_last_time;
				if(time_gap > this.refrush_gas_gap * 1000){
					this.gas_estimate_status = "loading";
					this.getGasInfo().then((res)=>{
						this.gas_estimate_status = "more";
						this.refrush_gas_last_time = new Date().getTime();
					},(res)=>{
						console.log(res);
						this.refrush_gas_last_time = new Date().getTime();
						this.gas_estimate_status = "more";
					});
					return;
				}
			}, 1000);
		},
		onUnload() {
			clearInterval(this.refrush_timer);
		},
		onShow() {
			if(!AppJs.checkAppInit()){
				return;
			}
			this.current_network = this.network_list[this.global_network_index];
			
			//加载当前钱包
			this.wallet_list = WALLET.getWalletList();
			if(!this.wallet_list || !(this.wallet_list instanceof Array) || 0 == this.wallet_list.length){
				uni.showModal({
					title:"Data exception, please contact admin",
					showCancel:false,
					confirmText:'Got it'
				});
				console.log("读取钱包列表异常");
				return;
			}
			
			this.current_wallet = WALLET.getDefaultWallet();
			console.log(this.current_wallet);
			if(!this.current_wallet){
				uni.showModal({
					title:"Data exception, please contact admin",
					showCancel:false,
					confirmText:'Got it'
				});
				console.log("读取钱包数据异常");
				return;
			}
			
			//获取链上资产信息
			this.ether_api = new ETHER_API.etherApi(this.network_list[this.global_network_index]);
			this.getBalance();
			
			//加载tokenlist
			this.loadTokens();
		},
		methods: {
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
				this.getBalance();
				this.loadTokens();
			},
			getBalance(){
				let ether_api = new ETHER_API.etherApi(this.network_list[this.global_network_index]);
				ether_api.getBalance(this.current_wallet.address).then((res)=>{
					console.log("balance:"+res);
					if(typeof(res) == 'undefined'){
						this.current_wallet.balance = "__";
					}else{
						this.current_wallet.balance = Number(res).toFixed(8) ;
					}
					if(this.selected_asset.symbol == "ETH"){
						this.selected_asset.balance = this.current_wallet.balance;
					}
				},(res)=>{
				});
			},
			async getGasInfo(){
				let ether_api = new ETHER_API.etherApi(this.network_list[this.global_network_index]);
				let ret = await ether_api.getGasAndTimeOracle();
				if(ret){
					this.gas_priority = ret;
					if(0 == this.current_tab_index){
						this.gas_price = this.gas_priority[this.current_priority_index].max_fee;
						this.gas_limit = this.gas_priority[this.current_priority_index].gas;
						this.gas_fee = this.gas_priority[this.current_priority_index].cost;
						this.gas_fee_usd = this.gas_priority[this.current_priority_index].cost_usd;
						//动画
						var animation = uni.createAnimation({
						    duration: 1000,
						    timingFunction: 'ease',
						});
						animation.opacity(0.3).step().opacity(1).step();
						this.gas_fee_item_animation = animation.export();
					}
					return this.gas_priority;
				}
				return false;
			},
			showGasPopup(){
				this.$refs.set_gas_popup.open("bottom");
			},
			closeGasPopup(){
				this.$refs.set_gas_popup.close();
			},
			showConfirmPaymentPopup(){
				this.$refs.confirm_payment_popup.open("bottom");
			},
			closeConfirmPaymentPopup(){
				this.$refs.confirm_payment_popup.close();
			},
			formSubmit(e){
				var form_data = {};
				form_data.to_address = e.detail.value.to_address;
				form_data.amount = e.detail.value.amount;
				form_data.gas_price =  this.gas_price;
				form_data.gas =  this.gas_limit;
				
				var rule = [
				    {name:"to_address", checkType : "notnull", checkRule:"",  errorMsg:"Please enter wallet address"},
				    {name:"to_address", checkType : "reg", checkRule:"^0x[0-9a-fA-F]{40}$",  errorMsg:"Incorrect wallet address"},
					{name:"amount", checkType : "notnull", checkRule:"",  errorMsg:"Please enter amount"},
					{name:"amount", checkType : "number", checkRule:"1,20",  errorMsg:"Please enter a amount"},
					{name:"gas_price", checkType : "notnull", checkRule:"",  errorMsg:"Please set gas price"},
					{name:"gas", checkType : "notnull", checkRule:"",  errorMsg:"Please set gas limit"}
				];
				//进行表单检查
				var checkRes = graceChecker.check(form_data, rule);
				if(!checkRes){
					uni.showToast({ title: graceChecker.error, icon: "none" });
					return false;
				}
				form_data.eth_amount = e.detail.value.amount;
				form_data.gas_price = ethers.parseUnits(form_data.gas_price,"gwei");
				form_data.amount = ethers.parseEther(form_data.amount);
				form_data.gas_fee = Number(ethers.formatEther(BigInt(form_data.gas_price)  * BigInt(form_data.gas))).toFixed(8) ;
				this.transfer_data = form_data;
				this.transfer_data.contract_info = null;
				if("ETH" != this.selected_asset.symbol){
					this.transfer_data.contract_info = this.selected_asset;
					this.transfer_data.amount =  ethers.parseUnits(e.detail.value.amount, this.selected_asset.decimal);
				}
				console.log(this.transfer_data);
				this.showConfirmPaymentPopup();
				return this.transfer_data;
			},
			async sendTransaction(pin_code){
				//解密私钥
				if(!pin_code){
					return false;
				}
				let wallet_info = await WALLET.getPrivateKey(this.current_wallet.address,pin_code);
				if(typeof(wallet_info.privateKey) == 'undefined'){
					uni.showToast({ title: "Failed to decrypt wallet , please try again", icon: "error" });
					return false;
				}
				uni.showLoading({
					title:"Sending transcation..."
				});
				let ether_api = new ETHER_API.etherApi(this.network_list[this.global_network_index]);
				
				var trans_ret = await ether_api.transfer(
					this.current_wallet.address,
					this.transfer_data.to_address,
					this.transfer_data.amount,
					wallet_info.privateKey,
					this.transfer_data.gas_price,
					this.transfer_data.gas,
					this.transfer_data.contract_info
				);
				uni.hideLoading();
				if(!trans_ret.ret){
					uni.showModal({
						title:trans_ret.msg,
						showCancel:false,
						confirmText:'Got it',
					});
					return false ;
				}
				let tx = {};
				tx.type = trans_ret.data.type;
				tx.txreceipt_status = 0;
				tx.tx_status = tx.txreceipt_status == 1 ? "Successful" : "Pending";
				tx.block_number = trans_ret.data.blockNumber;
				tx.timestamp = new Date().getTime();
				tx.humanize_time = UTIL.dateUtils.formtTimastamp(tx.timestamp);
				tx.hash = trans_ret.data.hash;
				tx.block_hash = trans_ret.data.blockHash;
				tx.from = trans_ret.data.from;
				tx.to = trans_ret.data.to;
				tx.value = trans_ret.data.value.toString();//wei
				tx.eth_num = Number(ethers.formatEther(BigInt(tx.value))).toFixed(6);
				tx.gas = trans_ret.data.gasLimit.toString();
				tx.gas_used = null;
				tx.gas_price = this.transfer_data.gas_price.toString();
				tx.confirmations = null;
				tx.humanize_confirm = null;
				tx.data = trans_ret.data.data;
				
				Transaction.saveTx(tx);
					
				uni.$emit("home_notify",{title:'Transaction submitted,tap to check it',url:'/pages/transaction/processing?address='+tx.from});
				uni.showToast({ title: "Successfully sent the transcation", icon: "success" ,duration:2500});	
				uni.redirectTo({url:"/pages/index/wallet"});
				return true;
				
			},
			onClickTabItem(e){
				if (this.current_tab_index !== e.currentIndex) {
					this.current_tab_index = e.currentIndex
				}
				if(1 == this.current_tab_index){
					if('_' == this.gas_priority[this.current_priority_index].max_fee){
						this.gas_priority[this.current_priority_index].max_fee = "0";
					}
					this.customize_set_max_fee = this.gas_priority[this.current_priority_index].max_fee;
				}
			},
			selectPriority(priority_index){
				this.current_priority_index = priority_index;
				if('_' == this.gas_priority[this.current_priority_index].max_fee){
					this.gas_priority[this.current_priority_index].max_fee = "0";
				}
				this.gas_price = this.gas_priority[this.current_priority_index].max_fee;
				this.gas_limit = this.gas_priority[this.current_priority_index].gas;
				this.gas_fee = this.gas_priority[this.current_priority_index].cost;
				this.gas_fee_usd = this.gas_priority[this.current_priority_index].cost_usd;
				this.closeGasPopup();
			},
			setCustomizeGas(e){
				var rule = [
				    {name:"customize_set_max_fee", checkType : "notnull", checkRule:"",  errorMsg:"Please enter max fee"},
				    {name:"customize_set_max_fee", checkType : "number", checkRule:"1,20",  errorMsg:"Please enter a valid max fee"},
					{name:"customize_max_priority_fee", checkType : "number", checkRule:"1,20",  errorMsg:"Please enter a valid max priority fee"},
					{name:"customize_gas", checkType : "notnull", checkRule:"",  errorMsg:"Please enter gas"},
					{name:"customize_gas", checkType : "number", checkRule:"1,20",  errorMsg:"Please enter a valid gas"}
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if(!checkRes){
					uni.showToast({ title: graceChecker.error, icon: "none" });
					return;
				}
				this.gas_price = (Number( e.detail.value.customize_set_max_fee) + Number(e.detail.value.customize_max_priority_fee)).toString();
				this.gas_limit = this.customize_gas;
			},
			showPinPopup(){
				this.closeConfirmPaymentPopup();
				this.$refs.pin_popup.show();
			},
			verifyPinCode(e){
				let pin = e.ret
				if(!pin){
					uni.showToast({ title: "PIN error", icon: "none" });
					return;
				}
				this.$refs.pin_popup.closePopup();
				this.sendTransaction(pin);
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
			showTokenChoose(){
				this.$refs.token_choose.show();
			},
			changeAsset(e){
				if("ETH" ==  e.contract_address){
					this.selected_asset = {symbol:"ETH",balance:this.current_wallet.balance};
					return;
				}
				for (let token of this.current_wallet.tokens) {
					if(e.contract_address == token.contract_address){
						this.selected_asset = token;
					}
				}
				
			}
		}
	}
</script>

<style>
	/* #ifdef MP-WEIXIN */
	
	page{background:#f6f6f6;}
	
	/* #endif */
	
	/* #ifdef H5 */
	
	.page-bg{background-color: #f6f6f6;}
	
	/* #endif */
	
	.form-item{
		margin-bottom: 35rpx;
	}
	.form-item-title{
		margin-bottom: 20rpx;
	}
	.transfer-form-item{
		background-color: white;
		border-radius: 15rpx;
		padding: 20rpx;
	}
	.from-address-selector{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.from-address-info > view{
		width: 95%;
		word-break: break-word;
	}
	.form-icon{
		width: 40rpx;
		height: 40rpx;
		margin-left: 25rpx;
	}
	.to-address{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.to-address-input{
		width: 75%;
	}
	.to-address-func-list{
	}
	.asset-selector{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.asset-info{
		display: flex;
		align-items: center;
	}
	.asset-icon{
		width: 50rpx;
		height: 50rpx;
		margin-right: 15rpx;
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
	.amount-input-part{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.amount-input-right{
		display: flex;
		align-items: center;
	}
	.use-max-amount{
		font-weight: 600;
		color: #1196db;
		margin-left: 25rpx;
	}
	.gas-fee-selector{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.gas-fee-right{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.next-btn{
		width:  calc(100% - 60rpx);
		position: fixed;
		bottom: 0;
	}
	.next-btn > button{
		background-color: #1196db !important;
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
		padding: 30rpx 30rpx 15rpx 30rpx;
	}
	.gas-fee-overview-line{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.tab-swiper{
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 15rpx 0rpx 30rpx 0rpx;
	}
	.tab-swiper > view{
		width: 55%;
	}
	.priority-item{
		padding: 35rpx 0rpx 35rpx 0rpx;
		border-bottom: 1rpx solid rgba(159, 159, 159, 0.1);
	}
	.last-priority-item{
		border-bottom: 0rpx;
	}
	.priority-item-radio{
		width: 10%;
	}
	.radio-border{
		width: 40rpx;
		height: 40rpx;
		border-radius: 40rpx;
		border: 3rpx solid rgba(170, 170, 170, 0.3);
	}
	.radio-border > view{
		width: 30rpx;
		height: 30rpx;
		border-radius: 30rpx;
	}
	.priority-item-radio-inactive{
		background-color: #ffffff;
	}
	.priority-item-radio-active{
		background-color: #1196db;
	}
	.priority-item-detail{
		width: 90%;
	}
	.customize-gas-item{
		margin-bottom: 35rpx;
	}
	.customize-gas-item-input{
		background-color: rgba(170, 170, 170, 0.2);
		border-radius: 15rpx;
		padding: 20rpx;
		margin-top: 15rpx;
	}
	
	.payment-item{
		padding: 20rpx 0rpx 20rpx 0rpx;
	}
	.payment-item-border{
		border-bottom: 1rpx solid rgba(159, 159, 159, 0.1);
	}
	.payment-title{
		width: 30%;
	}
	.payment-content{
		width: 70%;
		word-break: break-word;
	}
</style>
