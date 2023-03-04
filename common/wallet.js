import md5 from 'js-md5';
import { ethers } from 'ethers';

export default{
	wallet_list_key : 'storage_wallet_list',
	createWallet:function(){
		let wallet = ethers.Wallet.createRandom();
		return wallet;
	},
	encryptWallet: async function(private_key,pin_code){
		if(!private_key || !pin_code){
			return false;
		}
		try{
			const wallet = new ethers.Wallet(private_key);
			const keystore_json = await wallet.encrypt(pin_code);
			return keystore_json;
		}catch(e){
			console.log(e);
			return false;
		}
		
	},
	decryptWallet: async function(keystore_json,pin_code){
		if(!keystore_json || !pin_code){
			return false;
		}
		try{
			const wallet = await ethers.Wallet.fromEncryptedJson(keystore_json, pin_code);
			return wallet;
		}catch(e){
			console.log(e);
			return false;
		}
	},
	getWalletList: function(){
		try {
			var wallet_list_json = uni.getStorageSync(this.wallet_list_key);
			var wallet_list =  JSON.parse(wallet_list_json);
			if(Array.isArray(wallet_list)){
				return wallet_list;
			}
			return [];
		} catch (e) {
			return false;
		}
	},
	saveWallet : function(wallet){
		var wallet_list = this.getWalletList();
		if(!wallet_list){
			wallet_list = [];
		}
		if(!wallet){
			return false;
		}
		//重复的钱包就更新
		for (var i = 0; i < wallet_list.length; i++) {
			if(String(wallet_list[i].address).toLowerCase()  == String(wallet.address).toLowerCase()){
				wallet_list.splice(i,1);
				break;
			}
		}
		//钱包命名
		if(!wallet.name){
			wallet.name = "ETH Wallet " + wallet.address.substr(2,4);
		}
		wallet_list.push(wallet);
		try {
			uni.setStorageSync(this.wallet_list_key, JSON.stringify(wallet_list));
			console.log("已存储wallet:"+wallet.address);
			return true;
		} catch (e) {
			console.log(e)
			uni.showToast({
				title:"failed to save wallet"
			});
			return false;
		}
	},
	getWallet : function(address){
		var wallet_list = this.getWalletList();
		if(!wallet_list){
			return false;
		}
		for (let wallet of wallet_list) {
			if(String(address).toLowerCase()  == String(wallet.address).toLowerCase() ){
				return wallet;
			}
		}
		return false;
	},
	delWallet : function(address){
		var wallet_list = this.getWalletList();
		if(!wallet_list){
			return false;
		}
		for (var i = 0; i < wallet_list.length; i++) {
			if(String(wallet_list[i].address).toLowerCase() == String(address).toLowerCase()){
				wallet_list.splice(i,1);
				uni.setStorageSync(this.wallet_list_key, JSON.stringify(wallet_list));
				break;
			}
		}
		return true;
	},
	setDefaultWallet : function(address){
		var wallet_list = this.getWalletList();
		var default_wallet = false;
		if(!wallet_list){
			return false;
		}
		for (let wallet of wallet_list) {
			wallet.is_default_wallet = false;
			if(String(address).toLowerCase() == String(wallet.address).toLowerCase() ){
				wallet.is_default_wallet = true;
				default_wallet = wallet;
			}
		}
		if(default_wallet){
			uni.setStorageSync(this.wallet_list_key, JSON.stringify(wallet_list));
			return default_wallet;
		}
		return false;
	},
	getDefaultWallet : function(){
		var wallet_list = this.getWalletList();
		var default_wallet = false;
		if(!wallet_list){
			return false;
		}
		for (let wallet of wallet_list) {
			if(wallet.is_default_wallet){
				default_wallet =  wallet;
			}
		}
		if(default_wallet){
			return default_wallet;
		}
		//如果列表中无默认钱包，则把第一个设置为默认钱包
		this.setDefaultWallet(wallet_list[0].address);
		return wallet_list[0];
	},
	//获取私钥
	getPrivateKey: async function(address,pin_code){
		let wallet = this.getWallet(address);
		if(!wallet){
			return false;
		}
		let recover_wallet = await this.decryptWallet(JSON.stringify(wallet.keystore),pin_code);
		return recover_wallet;
	}
}

