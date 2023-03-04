## zyLoad 加载

## zyLoad 加载参数属性
|序号	|参数		|说明						|类型			|可选值											|默认值	|是否必须	|
|---	| ---		| ---						| ---			| ---											| ---	| ---		|
|1		|mode		|模式选择					|String			|classic/semiCircle/fullCircle/circle/transverse|classic|√			|
|2		|duration	|动画执行周期时间，单位ms	|Number/String	|---											|1200	|√			|
|3		|size		|加载图标的大小，单位px		|Number/String	|---											|12		|√			|
|4		|color		|图标颜色					|String			|---											|#999999|√			|
|5		|text		|自定义文字					|String			|---											|---	|×			|
|6		|textSize	|自定义文字大小，单位px		|Number/String	|---											|12		|×			|
|7		|textColor	|自定义文字颜色				|String			|---											|#999999|×			|

## zyLoad 使用方式
```
<template>
	<view class="container">
		<view class="text">圆形loading</view>
		<zy-load></zy-load>
		<view class="text">圆形loading</view>
		<zy-load mode='fullCircle'></zy-load>
		<view class="text">半圆形loading</view>
		<zy-load mode='semiCircle'></zy-load>
		<view class="text">圆圈形loading</view>
		<zy-load mode='circle' size="4"></zy-load>
		<view class="text">横向loading</view>
		<zy-load mode='transverse' size="4"></zy-load>
		<view class="text">自定义颜色</view>
		<zy-load color="#409EFE"></zy-load>
		<view class="text">自定义文字</view>
		<zy-load text="加载中"></zy-load>
	</view>
</template>

<script>
import zyLoad from '@/uni_modules/zy-loading/components/zy-loading/zy-loading.vue'
	export default {
		components:{
			zyLoad
		},
		data() {
			return {
			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	/* 灰色 */
	$zy-dark-grey: #999999;

	.container {
		margin: 0 20rpx;
	}

	.text {
		padding: 30rpx 0;
		font-size: 26rpx;
		color: $zy-dark-grey;
	}
</style>

```
#### 如使用过程中有任何问题，或者您有一些好的建议，欢迎联系QQ：2360273432 
