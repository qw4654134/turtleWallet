<template>
	<view class="pp-pin-popup">
		<uni-popup ref="pin_popup">
			<view class="pp-popup-container">
				<view class="pp-popup-top-area">
					<view></view>
					<view class="pp-popup-title-area font-second-title">{{pop_title}}</view>
					<image class="pp-popup-close-area" mode="widthFix" src="/static/img/close.png" @click="closePopup"></image>
				</view>
				<view class="pp-popup-content-area" >
					<pin-code-keyboard @change="pinChange" @finish="pinFinish"></pin-code-keyboard>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import PIN from "@/common/pin.js";
	import md5 from "js-md5";
	
	export default {
		name:"pin-popup",
		emits: ['verifyRet'],
		props: {
			pop_title:{//弹窗标题
				type:String,
				required:true
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			show(){
				this.$refs.pin_popup.open("bottom");
			},
			pinChange(e){
				
			},
			pinFinish(e){
				if(PIN.compare(e.pin_code)){
					this.$emit('verifyRet', {
						ret: e.pin_code
					});
				}else{
					this.$emit('verifyRet', {
						ret: false
					});
				}
				
			},
			closePopup(){
				this.$refs.pin_popup.close();
			}
		}
	}
</script>

<style>
	.pp-popup-container{
		background-color: #ffffff;
		border-radius: 15rpx 15rpx 0rpx 0rpx;
	}
	.pp-popup-top-area{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 18rpx;
		border-bottom: 1rpx solid rgba(80, 80, 80, 0.2);
	}
	.pp-popup-close-area{
		width: 40rpx;
	}
	.pp-popup-content-area{
		padding: 30rpx 30rpx 30rpx 30rpx;
	}
	
</style>