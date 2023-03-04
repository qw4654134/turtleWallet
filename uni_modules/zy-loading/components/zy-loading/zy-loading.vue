<template>
	<view class="zy_load_container">
		<view class="zy_load">
			<!-- 经典模式 -->
			<view v-if="mode=='classic'" class="zy_load_classic"
				:style="[{animationDuration:`${duration}ms`,fontSize:`${size}px`},colorStyle]">
				<view class="zy_load_classic_dot" :style="colorStyle" v-for="i in 12"></view>
			</view>
			<!-- 半圆或全圆模式 -->
			<view v-else-if="mode=='fullCircle'||mode=='semiCircle'"
				:class="{zy_load_fullCircle:mode=='fullCircle',zy_load_semiCircle:mode=='semiCircle'}"
				class="zy_load_mode" :style="[{animationDuration:`${duration}ms`,fontSize:`${size}px`},colorStyle]">
			</view>
			<!-- 大小不一的粒子旋转加载动画模式 -->
			<view class="zy_load_circle" v-else-if="mode=='circle'"
				:style="[{animationDuration:`${duration}ms`,fontSize:`${size}px`},colorStyle]">
			</view>
			<!-- 横向粒子变动加载动画 -->
			<view class="zy_load_transverse" v-else-if="mode=='transverse'"
				:style="[{animationDuration:`${duration}ms`,fontSize:`${size}px`},colorStyle]">
			</view>
		</view>
		<text :style="[{fontSize:`${textSize}px`,color:`${textColor}`}]" class="zy_load_text">{{text}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			// 模式选择,classic/semiCircle/fullCircle/circle/transverse
			mode: {
				type: String,
				default: 'classic'
			},
			//动画执行周期时间，单位ms
			duration: {
				type: Number | String,
				default: 1200
			},
			//加载图标的大小，单位px
			size: {
				type: Number | String,
				default: 12
			},
			//图标颜色
			color: {
				type: String,
				default: '#999999'
			},
			//文字自定义
			text: {
				type: String,
				default: ''
			},
			//自定义文字大小，单位px
			textSize: {
				type:  Number | String,
				default: 12
			},
			//自定义文字颜色
			textColor: {
				type: String,
				default: '#999999'
			},
		},
		data() {
			return {
				//图标动态颜色赋值
				colorStyle: {
					'--color': this.color,
				}
			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	@import './index.scss';
</style>
