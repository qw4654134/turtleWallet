<template>
	<view class="container">
		<form @submit="formSubmit">
			<view class="form-item">
				<view class="form-item-title font-desc-black">Contract Address</view>
				<view class="form-item-content">
					<input class="form-item-input" type="text" name="contract_address">
				</view>
			</view>
			<view class="form-item" v-if="show_token_info">
				<view class="form-item-title font-desc-black">Symbol</view>
				<view class="form-item-info">
					<view class="">{{token_info.symbol}}</view>
				</view>
			</view>
			<view class="form-item" v-if="show_token_info">
				<view class="form-item-title font-desc-black">Total Supply</view>
				<view class="form-item-info">
					<view class="">{{token_info.total_supply}}</view>
				</view>
			</view>
			<view class="form-item" v-if="show_token_info">
				<view class="form-item-title font-desc-black">Decimal</view>
				<view class="form-item-info">
					<view class="">{{token_info.decimal}}</view>
				</view>
			</view>
			
			<button form-type="submit" class="form-btn" type="primary">{{btn_text}}</button>
		</form>
		
	</view>
</template>

<script>
	import AppJs from '@/common/app.js';
	import ETHERAPI from "@/common/etherApi.js";
	import graceChecker from "@/common/graceChecker.js";
	import TOKEN from "@/common/token.js";
	//uni : 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984
	//shib : 0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE
	// dao: 0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413
	//usdt : 0xdac17f958d2ee523a2206206994597c13d831ec7 
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
				btn_text:"Next",
				show_token_info:false,
				token_info:{symbol:"",decimal:0,total_supply:0,abi:null}
			}
		},
		onLoad(param) {
			if(!AppJs.checkAppInit()){
				return;
			}
			this.current_network = this.network_list[this.global_network_index];
			
		},
		methods: {
			formSubmit(e){
				if("Next" == this.btn_text){
					this.getContractInfo(e.detail.value.contract_address);
					
				}else if("Add Token" == this.btn_text){
					this.addToken();
				}
			},
			async getContractInfo(contract_address){
				let form_data = {};
				form_data.contract_address = String(contract_address).trim();
				var rule = [
				    {name:"contract_address", checkType : "notnull", checkRule:"",  errorMsg:"Please enter contract address"},
				    {name:"contract_address", checkType : "reg", checkRule:"^0x[0-9a-fA-F]{40}$",  errorMsg:"Incorrect contract address"}
				];
				//进行表单检查
				var checkRes = graceChecker.check(form_data, rule);
				if(!checkRes){
					uni.showToast({ title: graceChecker.error, icon: "none" });
					return false;
				}
				this.show_token_info = false;
				
				uni.showLoading({});
				
				let ether_api = new ETHERAPI.etherApi(this.current_network);
				let abi = await ether_api.getContractABI(form_data.contract_address);
				if(!abi){
					uni.hideLoading();
					uni.showToast({
						title:"Failed to retrieve contract info",
						icon:'error',
						duration:2000
					});
					return false;
				}
				//校验合约标准函数
				if(!TOKEN.verifyContractStandardFunc(abi)){
					uni.hideLoading();
					uni.showModal({
						title:"This contract cannot be used due to lack of necessary functions",
						showCancel:false,
						confirmText:'Got it'
					});
					return false;
				}
				
				let info = await ether_api.getContractAssetBaseInfo(form_data.contract_address,abi);
				if(!info){
					uni.hideLoading();
					uni.showToast({
						title:"Failed to retrieve contract info",
						icon:'error',
						duration:2000
					});
					return false;
				}
				uni.hideLoading();
				
				this.btn_text = "Add Token";
				this.token_info = info;
				this.token_info.abi = abi;
				this.show_token_info = true;
				
				console.log(this.token_info);
				return this.token_info;
			},
			addToken(){
				if(TOKEN.saveTokenInfo(this.token_info)){
					uni.showToast({
						title:"Successful",
						icon:'success',
						duration:2000
					});
					uni.redirectTo({
						url:"/pages/index/wallet"
					})
					return true;
				}
				uni.showToast({
					title:"Failed to add token",
					icon:'error',
					duration:2000
				});
				return false;
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
	.form-item-content{
		background-color: white;
		border-radius: 15rpx;
		padding: 20rpx;
	}
	.form-item-info{
		border-radius: 15rpx;
		padding: 20rpx;
		background-color: #e8e8e8;
	}
	.form-item-info > view{
		height: 40rpx;
	}
	.form-btn{
		margin-top: 45rpx;
	}
</style>
