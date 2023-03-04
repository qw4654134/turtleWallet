
export default{
	token_list_key : 'storage_token_list',
	getList: function(){
		try {
			var list_json = uni.getStorageSync(this.token_list_key);
			var list =  JSON.parse(list_json);
			if(Array.isArray(list)){
				return list;
			}
			return [];
		} catch (e) {
			return false;
		}
	},
	saveTokenInfo:function(token){
		var list = this.getList();
		if(!list){
			list = [];
		}
		if(!token){
			return false;
		}
		//重复的token就更新
		for (var i = 0; i < list.length; i++) {
			if(String(list[i].contract_address).toLowerCase()  == String(token.contract_address).toLowerCase()){
				list.splice(i,1);
				break;
			}
		}

		list.push(token);
		try {
			uni.setStorageSync(this.token_list_key, JSON.stringify(list));
			console.log("已存储token:" + token.contract_address);
			return true;
		} catch (e) {
			console.log(e)
			uni.showToast({
				title:"Failed to save token info"
			});
			return false;
		}
	},
	getToken : function(contract_address){
		var list = this.getList();
		if(!list){
			return false;
		}
		for (let token of list) {
			if(String(contract_address).toLowerCase()  == String(token.contract_address).toLowerCase() ){
				return token;
			}
		}
		return false;
	},
	delToken : function(contract_address){
		var list = this.getList();
		if(!list){
			return false;
		}
		for (var i = 0; i < list.length; i++) {
			if(String(list[i].contract_address).toLowerCase() == String(contract_address).toLowerCase()){
				list.splice(i,1);
				uni.setStorageSync(this.token_list_key, JSON.stringify(list));
				break;
			}
		}
		return true;
	},
	verifyContractStandardFunc(abi){
		if(!Array.isArray(abi)){
			return false;
		}

		let has_funcs = [
			{name:"symbol",verify:false},
			{name:"decimals",verify:false},
			{name:"transfer",verify:false},
			{name:"totalSupply",verify:false}
		];
		
		for (let b of abi) {
			if(!b.type || b.type!="function" || !b.name){
				continue;
			}
			for (let func of has_funcs) {
				if(func.name == b.name){
					func.verify = true;
				}
			}
		
		}
		for (let func of has_funcs) {
			if(!func.verify){
				return false;
			}
		}
		return true;
	}
}

