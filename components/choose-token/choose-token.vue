<template>
	<view class="tlp-token-list-popup">
		<slot></slot>
		<uni-popup ref="token_list_popup">
			<view class="tlp-popup-container">
				<view class="tlp-popup-top-area">
					<view></view>
					<view class="tlp-popup-title-area font-second-title">{{pop_title}}</view>
					<image class="tlp-popup-close-area" mode="widthFix" src="/static/img/close.png" @click="close"></image>
				</view>
				<view class="tlp-popup-content-area" >
					<view class="tlp-asset-item flex-row-space-between-center"  @click="change('ETH')">
						<view class="flex-row-start-center">
							<view class="tlp-checked-area flex-column-center-center">
								<image v-if="'ETH' == selected" class="tlp-selected-icon" src="/static/img/right.png"></image>
							</view>
							<view class="tlp-asset-name">
								<image src="/static/img/ETH.png" ></image>
								<view class="tlp-asset-text font-third-title">ETH</view>
							</view>
						</view>
						<view class="tlp-asset-bal">
							<view class="tlp-asset-bal-num font-third-title">{{wallet.balance}}</view>
							<view class="tlp-asset-bal-worth font-desc-gray">$ {{wallet.usd_worth}}</view>
						</view>
					</view>
					
					<view class="tlp-asset-item flex-row-space-between-center"  v-for="(item,index) in wallet.tokens" @click="change(item.contract_address)">
						<view class="flex-row-start-center">
							<view class="tlp-checked-area flex-column-center-center">
								<image v-if="item.contract_address == selected" class="tlp-selected-icon" src="/static/img/right.png"></image>
							</view>
							<view class="tlp-asset-name">
								<view class="tlp-token-default-icon flex-row-center-center">{{item.symbol[0]}}</view>
								<view class="tlp-asset-text font-third-title">{{item.symbol}}</view>
							</view>
						</view>
						<view class="tlp-asset-bal">
							<view class="tlp-asset-bal-num font-third-title">{{item.balance}}</view>
							<view class="tlp-asset-bal-worth font-desc-gray">$ {{item.usd_worth}}</view>
						</view>
					</view>
					
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name:"choose-token",
		emits: ['change'],
		props: {
			pop_title:{//弹窗标题
				type:String,
				required:true
			},
			wallet:{//钱包信息
				type:Object,
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
				selected: this.init_select
			};
		},
		created() {
		},
		methods:{
			show(){
				this.$refs.token_list_popup.open("bottom");
			},
			change(contract_address){
				this.selected = contract_address;
				this.close();
				this.$emit('change', {
					contract_address: contract_address
				});
			},
			close(){
				this.$refs.token_list_popup.close();
			}
		}
	}
</script>

<style>
	.tlp-popup-container{
		background-color: #ffffff;
		border-radius: 15rpx 15rpx 0rpx 0rpx;
	}
	.tlp-popup-top-area{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 18rpx;
		border-bottom: 1rpx solid rgba(80, 80, 80, 0.2);
	}
	.tlp-popup-close-area{
		width: 40rpx;
	}
	.tlp-popup-content-area{
		padding: 30rpx 30rpx 30rpx 30rpx;
	}
	.tlp-asset-item{
		margin-top: 20rpx;
		padding: 0rpx 0rpx 20rpx 0rpx;
		border-bottom: 1rpx solid rgba(159, 159, 159, 0.1);
	}
	.tlp-asset-name{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.tlp-asset-name > image{
		width: 50rpx;
		height: 50rpx;
	}
	.tlp-token-default-icon{
		width: 50rpx;
		height: 50rpx;
		border-radius: 50rpx;
		background-color: #cccccc;
		color: white;
		font-size: 32rpx;
		font-weight: 600;
	}
	.tlp-asset-text{
		margin-left: 10rpx;
	}
	.tlp-asset-bal{
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	.tlp-selected-icon{
		width: 30rpx;
		height: 30rpx;
	}
	.tlp-checked-area{
		width: 60rpx;
	}
</style>