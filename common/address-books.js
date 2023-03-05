export default{
	storage_key : 'address_book_list',
	getList: function(){
		try {
			var list_json = uni.getStorageSync(this.storage_key);
			if(!list_json){
				return [];
			}
			var list =  JSON.parse(list_json);
			if(Array.isArray(list)){
				return list;
			}
			return false;
		} catch (e) {
			return false;
		}
	},
	save:function(address_book){
		var list = this.getList();
		if(!list){
			list = [];
		}
		if(!address_book){
			return false;
		}
		//重复的就更新
		for (var i = 0; i < list.length; i++) {
			if(String(list[i].address).toLowerCase()  == String(address_book.address).toLowerCase()){
				list.splice(i,1);
				break;
			}
		}

		list.push(address_book);
		try {
			uni.setStorageSync(this.storage_key, JSON.stringify(list));
			console.log("已存储address-book:" + address_book.address);
			return true;
		} catch (e) {
			console.log(e)
			uni.showToast({
				title:"Failed to save address book info"
			});
			return false;
		}
	},
	get : function(address){
		var list = this.getList();
		if(!list){
			return false;
		}
		for (let item of list) {
			if(String(address).toLowerCase()  == String(item.address).toLowerCase() ){
				return item;
			}
		}
		return false;
	},
	del : function(address){
		var list = this.getList();
		if(!list){
			return false;
		}
		for (var i = 0; i < list.length; i++) {
			if(String(list[i].address).toLowerCase() == String(address).toLowerCase()){
				list.splice(i,1);
				uni.setStorageSync(this.storage_key, JSON.stringify(list));
				break;
			}
		}
		return true;
	}
}

