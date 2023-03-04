<template>
	<view>
		<view class="pck-create-pin-code" :style="{'--codePaddingTop': codePaddingTop }">
			<view class="pck-code-item" v-for="index in pin_code_max_length" :class="[pin_code_length > index-1 ? 'pck-active' : '']">
			</view>
		</view>
		<view class="pck-create-pin-keyboard" :style="{'--keyboardPaddingTop': keyboardPaddingTop }">
			<view class="pck-keyboard-item" v-for="(item,index) in keyboard_value" :animation="animationData[item.key]" @click="clickKeyboard(item)">
				<view v-if="item.value!='{$del}'">{{item.value}}</view>
				<view v-else-if="item.value =='{$del}'"><image class="pck-del-icon" mode="widthFix" src="/static/img/keyboard_del.png"></image></view>
			</view>
		</view>
	</view>
</template>

<script>
	import keyboardConfig from '/components/pin-code-keyboard/keyboard-config.js';
	export default {
		name:"pin-code-keyboard",
		emits: ['change','finish'],
		props: {
			codePaddingTop:{//PIN码显示区域的padding-top
				type:String,
				default:"30rpx"
			},
			keyboardPaddingTop:{//键盘的padding-top
				type:String,
				default:"60rpx"
			},
			init_pin_code:{
				type:String,
				default:""
			}
		},
		data() {
			return {
				pin_code : this.init_pin_code,
				pin_code_length: 0,//当前已输入的PIN的长度
				pin_code_max_length: keyboardConfig.pin_code_max_length,
				keyboard_value : [],
				animationData: ['','','','','','','','','','','',''],
				animation: ['','','','','','','','','','','','']
			};
		},
		created() {
			this.pin_code_length = this.init_pin_code.length;
			for (var i = 0; i < keyboardConfig.pin_keyboard_value.length; i++) {
				let ob = {"value":keyboardConfig.pin_keyboard_value[i],"key":i}
				this.keyboard_value.push(ob);
			}
			for (var i = 0; i < this.animation.length; i++) {
				this.animation[i] = uni.createAnimation({duration: 200,delay:0});
			}

		},
		methods:{
			clickKeyboard: function(n){
				this.animation[n.key].opacity(0.1).step().opacity(1).step();
				this.animationData[n.key] = this.animation[n.key].export();
				
				if('{$del}' == n.value && this.pin_code.length > 0){
					this.pin_code = this.pin_code.substr(0,this.pin_code.length-1);
					this.pin_code_length = this.pin_code.length;
				}
				if(this.pin_code_max_length > this.pin_code.length && n.value !='{$del}'){
					this.pin_code += n.value;
					this.pin_code_length = this.pin_code.length;
				}
				
				this.$emit('change', {
					pin_code: this.pin_code
				});
				if(this.pin_code_max_length == this.pin_code.length){
					this.$emit('finish', {
						pin_code: this.pin_code
					});
					return;
				}
			},
			clear:function(){
				this.pin_code = "";
				this.pin_code_length = 0;
			}
		}
	}
</script>

<style>
	.pck-create-pin-code{
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding-top: var(--codePaddingTop);
	}
	.pck-code-item{
		height: 40rpx;
		width: 40rpx;
		border: 6rpx solid rgba(115, 117, 120, 0.8);
		border-radius: 40rpx;
		margin: 10rpx;
	}
	.pck-active{
		background-color: #1196db;
		border: 6rpx solid #1196db;
	}
	.pck-create-pin-keyboard{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding-top: var(--keyboardPaddingTop);
	}
	.pck-keyboard-item{
		width: 32%;
		text-align: center;
		font-size: 48rpx;
		padding-top: 15rpx;
		padding-bottom: 15rpx;
	}
	.pck-del-icon{
		width: 55rpx;
	}
</style>