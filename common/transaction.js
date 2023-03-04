

export default{
	tx_list_key : 'storage_tx_list',
	getTxList: function(address=""){
		try {
			var list_json = uni.getStorageSync(this.tx_list_key);
			if(!list_json){
				return [];
			}
			var list =  JSON.parse(list_json);
			if(!list){
				return false;
			}
			if("" == address){
				return list;
			}
			let filter_list = [];
			for (let tx of list) {
				if(String(tx.from).toLowerCase() == String(address).toLowerCase()  || String(tx.to).toLowerCase() == String(address).toLowerCase()){
					filter_list.push(tx);
				}
			}
			return filter_list;
			
		} catch (e) {
			return false;
		}
	},
	getProcessingTxList: function(address=""){
		let list = this.getTxList(address);
		let ret = [];
		if(!list){
			return false;
		}
		for (let t of list) {
			if(1 != t.txreceipt_status){
				ret.push(t);
			}
		}
		return ret;
	},
	saveTx : function(tx){
		var list = this.getTxList();
		if(!list){
			list = [];
		}
		if(!tx){
			return false;
		}
		if(typeof(tx.value) == 'bigint'){
			tx.value = tx.value.toString();
		}
		if(typeof(tx.gas) == 'bigint'){
			tx.gas = tx.gas.toString();
		}
		if(typeof(tx.gas_used) == 'bigint'){
			tx.gas_used = tx.gas_used.toString();
		}
		if(typeof(tx.gas_price) == 'bigint'){
			tx.gas_price = tx.gas_price.toString();
		}
		//重复的就更新
		for (var i = 0; i < list.length; i++) {
			if(list[i].hash == tx.hash){
				list.splice(i,1);
				break;
			}
		}
		list.push(tx);
		try {
			uni.setStorageSync(this.tx_list_key, JSON.stringify(list));
			console.log("已存储账单:" + tx.hash);
			return true;
		} catch (e) {
			console.log(e)
			uni.showToast({
				title:"failed to save transaction"
			});
			return false;
		}
	},
	getTx : function(hash){
		var list = this.getTxList();
		if(!list){
			return false;
		}
		for (let tx of list) {
			if(hash == tx.hash){
				return tx;
			}
		}
		return false;
	},
	delTx : function(hash){
		var list = this.getTxList();
		if(!list){
			return false;
		}
		for (var i = 0; i < list.length; i++) {
			if(list[i].hash == hash){
				list.splice(i,1);
				uni.setStorageSync(this.tx_list_key, JSON.stringify(list));
				break;
			}
		}
		return true;
	}
}

