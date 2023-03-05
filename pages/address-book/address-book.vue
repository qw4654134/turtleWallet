<template>
	<view>
		<z-paging ref="paging" :refresher-enabled="false" :to-bottom-loading-more-enabled="false" :loading-more-default-text="load_more_default_text" :loading-more-loading-text="load_more_loading_text" :loading-more-no-more-text="load_more_no_more_text" :loading-more-fail-text="load_more_fail_text" v-model="address_books" @query="loadBooks" >
			<view class="address-book-item flex-row-start-center" v-for="(item,index) in address_books" @click="selectAddressBook(item)">
				<view class="asset-info flex-column-center-center">
					<image v-if="'ETH' == item.asset.symbol" class="asset-icon" src="/static/img/ETH.png"></image>
					<view v-else class="token-default-icon flex-row-center-center">{{item.asset.symbol[0]}}</view>
					<view class="font-desc-black">{{item.asset.symbol}}</view>
				</view>
				<view class="book-info" :class="[index != address_books.length-1 ? 'address-book-item-border': '']">
					<view class="book-name font-desc-gray">{{item.name}}</view>
					<view class="book-address font-desc-black">{{item.address}}</view>
					<view class="book-desc font-desc-gray-little">{{item.desc}}</view>
				</view>
			</view>
		</z-paging>
		<navigator class="add-btn flex-row-center-center" open-type="navigate" url="/pages/address-book/add-book">
			<button class="form-btn">Add</button>
		</navigator>
	</view>
</template>

<script>
	import AppJs from '@/common/app.js';
	import AddressBook from '@/common/address-books.js';
	
	export default {
		data() {
			return {
				address_books : [],
				load_more_default_text:{'en':'Pull up to load more','zh-Hans':'下拉加载更多'},
				load_more_loading_text:{'en':'loading','zh-Hans':'加载中'},
				load_more_no_more_text:{'en':'no more','zh-Hans':'没有了'},
				load_more_fail_text	:{'en':'Failed to load,try agin','zh-Hans':'加载失败,请重试'}
				
			}
		},
		onLoad() {
			if(!AppJs.checkAppInit()){
				return;
			}
		},
		onShow() {
			this.loadBooks();
		},
		methods: {
			loadBooks : function(){
				let books = AddressBook.getList();
				if(Array.isArray(books)){
					this.address_books = books;
					this.$refs.paging.complete(books);
					return this.address_books;
				}
				this.$refs.paging.complete(false);
				return false;
			},
			selectAddressBook : function(book){
				uni.$emit("select_book",book);
				uni.navigateBack();
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
	
	.address-book-item{
		background-color: white;
	}
	.asset-info{
		width: 10%;
		padding: 30rpx;
	}
	.asset-icon{
		width: 50rpx;
		height: 50rpx;
		margin-bottom: 6rpx;
	}
	.book-info{
		width: 90%;
		padding: 30rpx 30rpx 30rpx 0rpx;
	}
	.book-address{
		margin: 5rpx 0rpx 5rpx 0rpx;
		word-break: break-word;
	}
	.book-desc{
		word-break: break-word;
	}
	.address-book-item-border{
		border-bottom: 1rpx solid rgba(159, 159, 159, 0.2);
	}
	.add-btn{
		position: absolute;
		bottom: 0rpx;
		width: 100%;
	}
	.add-btn > button{
		width: 90%;
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
</style>
