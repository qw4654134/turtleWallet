<template>
	<view class="container">
		<form @submit="showPinPopup">
			<view class="mne-form-item">
				<view class="font-desc-black">Mnemonic</view>
				<textarea class="mnemonic-text" name="mnemonic" maxlength="400" cols="30" rows="10" placeholder="Enter mnemonic phrases separated by space"></textarea>
			</view>
			<view class="mne-form-item advanced-item">
				<uni-collapse >
					<uni-collapse-item title="Advanced (Set path)" :show-animation="true" :title-border="'none'" :border="false">
						<view class="path-list">
							<view class="path-item " v-for="(item,index) in path_list" :class="[index != path_list.length-1 ? 'path-item-border' : '' ]" @click="choosePath(index)">
								<view class="flex-row-space-between-center">
									<view>
										<view class="font-desc-black">{{item.title}}</view>
										<view class="font-desc-gray-little">{{item.path}}</view>
									</view>
									<image v-if="index == selected_path_index" class="is-path-select" mode="widthFix" src="/static/img/right.png"></image>
								</view>
								<view class="customize-path-item" v-if="path_list[selected_path_index].title == 'Customize' && path_list[index].title == 'Customize'">
									<input class="customize-path" type="text" name="customize_path" :value="item.path">
								</view>
							</view>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</view>
			<view class="confirm-btn"><button form-type="submit" class="form-btn" type="primary">confirm</button></view>
		</form>
		<pin-popup ref="pin_popup" :pop_title="'Please enter PIN'" @verifyRet="verifyPinCode"></pin-popup>
	</view>
</template>

<script>
	import AppJs from '@/common/app.js';
	import PIN from "@/common/pin.js";
	import ETHER_API from "@/common/etherApi.js";
	import WALLET from '@/common/wallet.js';
	
	export default {
		data() {
			return {
				network_list : getApp().globalData.global_network_list,
				global_network_index : getApp().globalData.global_network_index,
				path_list:[
					{title:"Default",path:"m/44'/60'/0'/0/0"},
					{title:"Ledger",path:"m/44'/60'/0'/0"},
					{title:"Customize",path:"m/44'/60'/1'/0/0"}
				],
				selected_path_index:0,
				mnemonic:"",
				customize_path:""
			}
		},
		onLoad() {
			if(!AppJs.checkAppInit()){
				return;
			}
		},
		onShow() {
		},
		methods: {
			choosePath(index){
				this.selected_path_index = index;
			},
			showPinPopup(e){
				this.mnemonic = e.detail.value.mnemonic;
				this.customize_path = e.detail.value.customize_path;
				if(!this.mnemonic){
					uni.showToast({
						title: "Please enter mnemonic",
						icon:"error"
					});
					return false;
				}
				if("Customize" == this.path_list[this.selected_path_index].title && !this.customize_path){
					uni.showToast({
						title:"Please set path",
						icon:'error'
					});
					return false;
				}
				this.$refs.pin_popup.show();
			},
			verifyPinCode(e){
				let pin = e.ret
				if(!pin){
					uni.showToast({ title: "PIN error", icon: "none" });
					return;
				}
				this.$refs.pin_popup.closePopup();
				this.importWallet(this.mnemonic,this.customize_path,pin);
			},
			async importWallet(mnemonic,customize_path,pin_code){
				uni.showLoading({
					title:"importing..."
				});
				
				let path = this.path_list[this.selected_path_index].path;
				if("Customize" == this.path_list[this.selected_path_index].title){
					path = customize_path;
				}
				let ether_api = new ETHER_API.etherApi(this.network_list[this.global_network_index],false);
				let ret = ether_api.fromMnemonic(mnemonic.trim(),path);
				console.log(JSON.stringify(ret));
				if(!ret.ret){
					uni.hideLoading();
					uni.showToast({
						title: ret.msg ? ret.msg : "Failed to import wallet,please try again",
						icon:"error"
					});
					return false;
				}
				let keystore = await WALLET.encryptWallet(ret.data.privateKey,pin_code);
				if(!keystore){
					uni.hideLoading();
					uni.showToast({
						title:"Failed to import wallet,please try again",
						icon:'error'
					});
					return false;
				}
				let wallet = {};
				wallet.address = ret.data.address;
				wallet.keystore = JSON.parse(keystore);
				
				if(!WALLET.saveWallet(wallet)){
					uni.hideLoading();
					uni.showToast({
						title:"Failed to import wallet,please try again",
						icon:'error'
					});
					return false;
				}
				WALLET.setDefaultWallet(wallet.address);
				uni.hideLoading();
				uni.showToast({
					title:"Import succeeded"
				});
				setTimeout(() => {
				    uni.redirectTo({
				    	url:"/pages/index/wallet"
				    });
				}, 1200);
				return true;
			}
		}
	}
</script>

<style>
	.mne-form-item{
		margin: 30rpx 0rpx 30rpx 0rpx;
	}
	.advanced-item{
		border-radius: 15rpx;
		padding: 5rpx;
		border:1rpx solid rgba(159, 159, 159, 0.1);
	}
	.path-list{
		padding: 0rpx 30rpx 30rpx 30rpx;
	}
	.path-item{
		padding:15rpx 0rpx 15rpx 0rpx;
	}
	.path-item-border{
		border-bottom:1rpx solid rgba(159, 159, 159, 0.1);
	}
	.mnemonic-text{
		width: calc(100% - 60rpx);
		background-color: #f6f6f6;
		border-radius: 15rpx;
		padding: 30rpx;
		margin-top: 20rpx;
	}
	.is-path-select{
		width: 30rpx;
	}
	.confirm-btn{
		width:  calc(100% - 60rpx);
		position: fixed;
		bottom: 0;
	}
	.form-btn{
		background-color: #1196db !important;
	}
	.uni-collapse-item__wrap{
		height: auto !important;
	}
	.customize-path-item{
		margin-top: 15rpx;
	}
	.customize-path{
		padding: 15rpx;
		border-radius: 15rpx;
		background-color: rgba(159, 159, 159, 0.1);;
	}
</style>
