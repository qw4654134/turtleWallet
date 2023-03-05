<template>
	<view class="container">
		<form @submit="formSubmit">
			<view class="form-item">
				<view class="form-item-title font-desc-black">Asset</view>
				<view class="form-item-content">
					<choose-asset ref="asset_choose" pop_title="Select Asset" :asset_list="asset_list" init_select="ETH" @change="changeAsset">
						<view class="asset-selector flex-row-space-between-center" @click="showAssetListtPop">
							<view v-if="selected_asset.symbol=='ETH'" class="asset-info flex-row-start-center" >
								<image class="asset-icon"  src="../../static/img/ETH.png"></image>
								<view class="asset-name font-desc-black">{{selected_asset.symbol}}</view>
							</view>
							<view v-else class="asset-info flex-row-start-center">
								<view class="token-default-icon flex-row-center-center">{{selected_asset.symbol[0]}}</view>
								<view class="asset-name font-third-title" style="margin-left: 10rpx;">{{selected_asset.symbol}}</view>
							</view>
							<image class="form-icon"  src="../../static/img/expand.png"></image>
						</view>
					</choose-asset>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-title font-desc-black">Address info</view>
				<view class="form-item-content">
					<view class="sub-item  sub-item-border flex-row-space-between-center">
						<input class="form-item-input"  style="width: 90%;" type="text" name="address" placeholder="wallet address">
						<image class="form-icon"  src="../../static/img/scan.png"></image>
					</view>
					<view class="sub-item sub-item-border">
						<input class="form-item-input" type="text" name="name" placeholder="name">
					</view>
					<view class="sub-item">
						<input class="form-item-input" type="text" name="desc" placeholder="description (optional)">
					</view>
				</view>
			</view>
			<view class="form-item">
				<button form-type="submit" class="form-btn" type="primary">add</button>
			</view>
		</form>
		
	</view>
</template>

<script>
	import AppJs from '@/common/app.js';
	import TOKEN from "@/common/token.js";
	import AddressBook from '@/common/address-books.js';
	import graceChecker from "@/common/graceChecker.js";
	
	export default {
		data() {
			return {
				address_books : [],
				asset_list:[],
				selected_asset:{symbol:"ETH"}
			}
		},
		onLoad(param) {
			if(!AppJs.checkAppInit()){
				return;
			}
			this.loadTokenList();
			
		},
		methods: {
			formSubmit(e){
				var form_data = {
					address : e.detail.value.address,
					name : e.detail.value.name,
					desc : e.detail.value.desc,
					asset : this.selected_asset
				};
				var rule = [
				    {name:"address", checkType : "notnull", checkRule:"",  errorMsg:"Please enter address"},
				    {name:"address", checkType : "reg", checkRule:"^0x[0-9a-fA-F]{40}$",  errorMsg:"Incorrect address"},
					{name:"name", checkType : "notnull", checkRule:"",  errorMsg:"Please enter name"}
				];
				//进行表单检查
				var checkRes = graceChecker.check(form_data, rule);
				if(!checkRes){
					uni.showToast({ title: graceChecker.error, icon: "none" });
					return false;
				}
				if(AddressBook.save(form_data)){
					uni.showToast({
						title:"Added successfully",
						icon:"success"
					});
					uni.navigateBack();
					return;
				}
				uni.showToast({
					title:"Failed to add",
					icon:"error"
				});
			},
			loadTokenList(){
				let list =TOKEN.getList();
				if(Array.isArray(list)){
					this.asset_list = list;
				}
			},
			showAssetListtPop(){
				this.$refs.asset_choose.show();
			},
			changeAsset(data){
				if("ETH" == data.contract_address){
					this.selected_asset = {symbol:"ETH"};
					return;
				}
				for (let asset of this.asset_list) {
					if(data.contract_address == asset.contract_address){
						this.selected_asset = asset;
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
	.asset-selector{
	}
	.form-btn{
		margin-top: 45rpx;
	}
	.asset-icon{
		width: 50rpx;
		height: 50rpx;
		margin-right: 15rpx;
	}
	.form-icon{
		width: 40rpx;
		height: 40rpx;
		margin-left: 25rpx;
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
	.sub-item{
		padding: 30rpx 10rpx 30rpx 10rpx;
	}
	.sub-item-border{
		border-bottom: 1rpx solid rgba(159, 159, 159, 0.2);
	}
</style>
