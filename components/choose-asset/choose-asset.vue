<template>
	<view class="alp-asset-list-popup">
		<slot></slot>
		<uni-popup ref="asset_list_popup">
			<view class="alp-popup-container">
				<view class="alp-popup-top-area">
					<view></view>
					<view class="alp-popup-title-area font-second-title">{{pop_title}}</view>
					<image class="alp-popup-close-area" mode="widthFix" src="/static/img/close.png" @click="close"></image>
				</view>
				<view class="alp-popup-content-area" >
					<view class="alp-asset-item"  @click="change('ETH')">
						<view class="alp-asset-name">
							<image src="/static/img/ETH.png" ></image>
							<view class="alp-asset-text font-third-title">ETH</view>
						</view>
						<view>
							<image v-if="'ETH' == selected" class="alp-selected-icon" src="/static/img/right.png"></image>
						</view>
					</view>
					<view class="alp-asset-item"  v-for="(item,index) in asset_list" @click="change(item.contract_address)">
						<view class="alp-asset-name">
							<view class="alp-token-default-icon flex-row-center-center">{{item.symbol[0]}}</view>
							<view class="alp-asset-text font-third-title">{{item.symbol}}</view>
						</view>
						<view>
							<image v-if="item.contract_address == selected" class="alp-selected-icon" src="/static/img/right.png"></image>
						</view>
					</view>
					
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name:"choose-asset",
		emits: ['change'],
		props: {
			pop_title:{//弹窗标题
				type:String,
				required:true
			},
			asset_list:{
				type:Array,
				default:[],
				required:true
			},
			init_select:{
				type:String,
				required:true
			}
		},
		data() {
			return {
				selected : this.init_select
			};
		},
		created() {
		},
		methods:{
			show(){
				this.$refs.asset_list_popup.open("bottom");
			},
			change(contract_address){
				this.selected = contract_address;
				this.close();
				this.$emit('change', {
					contract_address: contract_address
				});
			},
			close(){
				this.$refs.asset_list_popup.close();
			}
		}
	}
</script>

<style>
	.alp-popup-container{
		background-color: #ffffff;
		border-radius: 15rpx 15rpx 0rpx 0rpx;
	}
	.alp-popup-top-area{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 18rpx;
		border-bottom: 1rpx solid rgba(80, 80, 80, 0.2);
	}
	.alp-popup-close-area{
		width: 40rpx;
	}
	.alp-popup-content-area{
		padding: 30rpx 30rpx 30rpx 30rpx;
	}
	.alp-asset-item{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 20rpx;
		padding: 0rpx 0rpx 20rpx 0rpx;
		border-bottom: 1rpx solid rgba(159, 159, 159, 0.1);
	}
	.alp-asset-name{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.alp-asset-name > image{
		width: 50rpx;
		height: 50rpx;
	}
	.alp-token-default-icon{
		width: 50rpx;
		height: 50rpx;
		border-radius: 50rpx;
		background-color: #cccccc;
		color: white;
		font-size: 32rpx;
		font-weight: 600;
	}
	.alp-asset-text{
		margin-left: 10rpx;
	}
	.alp-selected-icon{
		width: 30rpx;
		height: 30rpx;
	}
</style>