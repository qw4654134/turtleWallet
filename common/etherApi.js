import { ethers } from 'ethers';
import CONFIG from '@/common/config.js';
import REQUEST from '@/common/request.js';
import UTIL from '@/common/util.js';
import PRICEQUERY from "@/common/priceQuery.js";
import TOKEN from "@/common/token.js";

function etherApi(network, use_ether_api = true) {
	if(!network){
		return false;
	}
	this.network_url = network.url;
	this.network_name = network.network;
	this.etherscan_api = network.etherscan_api;
	if(use_ether_api){
		this.provider = new ethers.JsonRpcProvider(this.network_url);
	}
}

etherApi.prototype.createWallet = function() {
	try{
		const wallet = ethers.Wallet.createRandom();
		return wallet;
	}catch(e){
		console.dir(e);
		return false;
	}
},
 etherApi.prototype.createWalletKeyStore = async function(private_key,password) {
	if(!private_key || !password){
	 	return false;
	}
	try{
		const wallet = new ethers.Wallet(private_key);
		const keystore_json = await wallet.encrypt(password);
		return keystore_json;	
	}catch(e){
		console.dir(e);
		return false;
	}
	
},
etherApi.prototype.fromPrivateKey = function(private_key) {
	if(!private_key){
		return false;
	}
	try{
		const wallet = new ethers.Wallet(private_key);
		return wallet;
	}catch(e){
		console.dir(e);
		return false;
	}
},
etherApi.prototype.fromMnemonic = function(phrases,path) {
	var ret = {ret:false,msg:"",data:null};
	if(!phrases || !path){
		return ret;
	}
	try{
		const wallet = ethers.Wallet.fromPhrase(phrases,path);
		ret.ret = true;
		ret.data = wallet;
		return ret;
	}catch(e){
		console.dir(e);
		ret.ret = false;
		if(e.code && "INVALID_ARGUMENT" == e.code){
			ret.msg = "Invalid mnemonic";
		}
		return ret;
	}
},
etherApi.prototype.fromEncryptedJson = async function(json,password) {
	if(!json || !password){
		return false;
	}
	try{
		const wallet = await ethers.Wallet.fromEncryptedJson(json,password);
		return wallet;
	}catch(e){
		console.dir(e);
		return false;
	}
},
etherApi.prototype.getBalance = async function(address){
	if(!address){
		return false;
	}
	try{
		const balance = await this.provider.getBalance(address);
		const format = ethers.formatEther(balance); 
		return format;
	}catch(e){
		console.dir(e);
		return false;
	}
	
},
etherApi.prototype.getBlockNumber = async function() {
	try{
		const block_num = await this.provider.getBlockNumber();
		return block_num;
	}catch(e){
		console.dir(e);
		return false;
	}
	
},
etherApi.prototype.getBlock = async function(block_number) {
	if(!block_number){
		return false;
	}
	try{
		let block = await this.provider.getBlock(block_number);
		return block;
	}catch(e){
		console.dir(e);
		return false;
	}
	
},
etherApi.prototype.getTransaction = async function(tx_hash) {
	if(!tx_hash){
		return false;
	}
	try{
		const transcation = await this.provider.getTransaction(tx_hash);
		return transcation;
	}catch(e){
		console.dir(e);
		return false;
	}
	
},
etherApi.prototype.getTransactionReceipt = async function(tx_hash){
	if(!tx_hash){
		return false;
	}
	try{
		const tr = await this.provider.getTransactionReceipt(tx_hash);
		return tr;
	}catch(e){
		console.dir(e);
		return false;
	}
	
},
etherApi.prototype.getCode = async function(address) {
	if(!address){
		return false;
	}
	try{
		const code = await this.provider.getCode(address);
		return code;
	}catch(e){
		console.dir(e);
		return false;
	}
	
},
etherApi.prototype.getFeeData = async function() {
	try{
		let fee_data = await this.provider.getFeeData();
		//{"_type":"FeeData","gasPrice":"67735608259","maxFeePerGas":"136271216518","maxPriorityFeePerGas":"1000000000"}
		return fee_data;
	}catch(e){
		console.dir(e);
		return false;
	}
	
},
etherApi.prototype.getGasAndTimeOracle = async function() {
	let gas_priority = [
					{"level":"Fastest","max_fee":"_","time":"_ Min","cost_usd":"_","cost":"_","gas":"21000","eth_price":"0"},
					{"level":"Standard","max_fee":"_","time":"_ Min","cost_usd":"_","cost":"_","gas":"21000","eth_price":"0"},
					{"level":"Low","max_fee":"_","time":"_ Min","cost_usd":"_","cost":"_","gas":"21000","eth_price":"0"}
				];
				
	let eth_price = await PRICEQUERY.getPrice("ETHUSDT");
	if(!eth_price){
		eth_price = 0;
	}
	
	if("Goerli Test Network" == this.network_name){
		let fee_info = await this.getFeeData();
		if(!fee_info){
			console.log("获取gas信息失败:"+JSON.stringify(fee_info));
			return gas_priority;
		}
		let gas_spend = fee_info.gasPrice * BigInt(gas_priority[0].gas);
		gas_priority[0].max_fee = gas_priority[1].max_fee = gas_priority[2].max_fee = ethers.formatUnits(fee_info.gasPrice,"gwei");
		gas_priority[0].cost = gas_priority[1].cost = gas_priority[2].cost = Number(ethers.formatEther(gas_spend)).toFixed(8);
		gas_priority[0].eth_price = gas_priority[1].eth_price = gas_priority[2].eth_price = eth_price;
		gas_priority[0].cost_usd = gas_priority[1].cost_usd = gas_priority[1].cost_usd =  (eth_price * gas_priority[0].cost).toFixed(4);
		gas_priority[0].time = gas_priority[1].time = gas_priority[2].time = "30 Secs";
		return gas_priority;
	}
	
	let gas_oracle = await REQUEST.request({
		url: this.etherscan_api + "?module=gastracker&action=gasoracle&apikey=" + CONFIG.etherscan_api_key,
		method:"GET"
	});
	if(!gas_oracle || gas_oracle.data.message != "OK"){
		console.log("获取gas预测失败");
		console.log(gas_oracle);
		return gas_priority;
	}
	gas_priority[0].max_fee = gas_oracle.data.result.FastGasPrice;
	gas_priority[0].cost = (ethers.formatEther(ethers.parseUnits(gas_oracle.data.result.FastGasPrice,"gwei")) * gas_priority[0].gas).toFixed(6);
	gas_priority[1].max_fee = gas_oracle.data.result.ProposeGasPrice;
	gas_priority[1].cost = (ethers.formatEther(ethers.parseUnits(gas_oracle.data.result.ProposeGasPrice,"gwei")) * gas_priority[1].gas).toFixed(6);
	gas_priority[2].max_fee = gas_oracle.data.result.SafeGasPrice;
	gas_priority[2].cost = (ethers.formatEther(ethers.parseUnits(gas_oracle.data.result.SafeGasPrice,"gwei")) * gas_priority[2].gas).toFixed(6);
	
	
	gas_priority[0].eth_price = gas_priority[1].eth_price = gas_priority[2].eth_price = eth_price;
	gas_priority[0].cost_usd = (eth_price * gas_priority[0].cost).toFixed(2);
	gas_priority[1].cost_usd = (eth_price * gas_priority[1].cost).toFixed(2);
	gas_priority[2].cost_usd = (eth_price * gas_priority[2].cost).toFixed(2);
	
	let price_list = [gas_oracle.data.result.FastGasPrice,gas_oracle.data.result.ProposeGasPrice,gas_oracle.data.result.SafeGasPrice];
	for (var i = 0; i < price_list.length; i++) {
		let time_info = await REQUEST.request({
			url:this.etherscan_api + "?module=gastracker&action=gasestimate&gasprice="+  ethers.parseUnits(price_list[i],"gwei")  +"&apikey=" + CONFIG.etherscan_api_key,
			method:"GET"
		});
		if(time_info && time_info.data.message=="OK"){
			gas_priority[i].time = UTIL.dateUtils.humanize_2(time_info.data.result * 1000) ;
		}else{
			console.log("获取转账确认时间失败");
			console.log(time_info);
		}
	}
	return gas_priority;
},
etherApi.prototype.transfer = async function(from,to,value,private_key,gas_price,gas_limit=21000,contract_info=null) {
	let transfer_ret = {ret:false,data:null,msg:""};
	
	if(!from || !to || !private_key || !gas_price){
		transfer_ret.ret = false;
		transfer_ret.msg = "Param error";
		return transfer_ret;
	}
	value = BigInt(value);
	gas_price = BigInt(gas_price);
	gas_limit = BigInt(gas_limit);
	console.log(value.toString());
	console.log(gas_price.toString());
	console.log(gas_limit.toString());
	var wallet = new ethers.Wallet(private_key, this.provider);
	var code = await this.provider.getCode(to);
	if(!code){
		transfer_ret.ret = false;
		transfer_ret.msg = "Network error";
		return transfer_ret;
	}
	console.log("address code:" + code);
	if (code !== '0x') {
		transfer_ret.ret = false;
		transfer_ret.msg = "Cannot transfer to a contract";
		return transfer_ret;
	}
	var balance = await this.provider.getBalance(from);
	console.log("current eth balance:" + balance.toString());
	
	try{
		if (contract_info) {
			let asset_bal = await this.getContractAssetBalance(contract_info.contract_address,contract_info.abi,from,contract_info.decimal);
			console.log("current "+ contract_info.symbol +" balance:"+ asset_bal);
			if(!asset_bal || asset_bal < ethers.formatUnits(value, contract_info.decimal)){
				transfer_ret.ret = false;
				transfer_ret.msg = "Insufficient Balance";
				return transfer_ret;
			}
			
			let gas_fee = gas_price * gas_limit;
			if(balance < gas_fee){
				transfer_ret.ret = false;
				transfer_ret.msg = "Insufficient ETH Balance";
				return transfer_ret;
			}
			
			const tokenContract = new ethers.Contract(contract_info.contract_address, contract_info.abi, this.provider);
			const txSigner= tokenContract.connect(wallet);
		    let contract_transfer_ret = await txSigner.transfer(to, value);
			console.dir(contract_transfer_ret);
			if(contract_transfer_ret){
				transfer_ret.ret = true;
				transfer_ret.data = contract_transfer_ret;
				transfer_ret.msg = "Successfully sent the transcation";
				return transfer_ret;
			}
			transfer_ret.ret = false;
			transfer_ret.msg = "Failed to send the transcation";
			return transfer_ret;
		}
		
		var need_value = value + gas_price * gas_limit;
		console.log("need_value:" + need_value.toString());
		
		if(need_value > balance){
			transfer_ret.ret = false;
			transfer_ret.msg = "Insufficient Balance";
			return transfer_ret;
		}
		var tx = await wallet.sendTransaction({
		    gasLimit: gas_limit,
		    gasPrice: gas_price,
		    to: to,
		    value: need_value
		});
		console.dir(tx);
		if(tx && tx.hash){
			transfer_ret.ret = true;
			transfer_ret.data = tx;
			transfer_ret.msg = "Successfully sent the transcation";
			return transfer_ret;
		}
		transfer_ret.ret = false;
		transfer_ret.msg = "Failed to send the transcation";
		return transfer_ret;
		
	}catch(e){
		console.dir(e);
		transfer_ret.ret = false;
		transfer_ret.msg = "Failed to send the transcation:"+e.code;
		return transfer_ret;
	}
	
	
},
etherApi.prototype.getTxHistory = async function(address,page=1,offset=20){
	if(!address){
		return false;
	}
	var list = [];
	let txlist = await REQUEST.request({
		url:this.etherscan_api + "?module=account&action=txlist&address="+address+"&startblock=0&endblock=99999999&page="+page+"&offset="+offset+"&sort=desc&apikey="+CONFIG.etherscan_api_key,
		method:"GET"
	});
	if(txlist && txlist.data && txlist.data.message && txlist.data.result){
		if("OK" == txlist.data.message || "No transactions found" == txlist.data.message){
			for (let t of txlist.data.result) {
				let tx = {};
				tx.txreceipt_status = t.txreceipt_status;
				tx.tx_status = tx.txreceipt_status == 1 ? "Successful" : "Pending";
				tx.block_number = t.blockNumber;
				tx.timestamp = t.timeStamp * 1000;
				tx.humanize_time = UTIL.dateUtils.formtTimastamp(tx.timestamp);
				tx.hash = t.hash;
				tx.block_hash = t.blockHash;
				tx.from = t.from;
				tx.to = t.to;
				tx.value = t.value;//wei
				tx.eth_num = Number(ethers.formatEther(BigInt(tx.value))).toFixed(6);
				tx.gas = t.gas;
				tx.gas_used = t.gasUsed;
				tx.gas_price = t.gasPrice;
				tx.confirmations = t.confirmations * 1000;
				tx.humanize_confirm = UTIL.dateUtils.humanize_2(tx.confirmations);
				tx.data = t.input;
				list.push(tx);
			}
			return list;
		}
	}
	console.log(txlist);
	return false;
},
etherApi.prototype.getContractABI = async function(contract_address){
	if(!contract_address){
		return false;
	}
	let ret = await REQUEST.request({
		url:this.etherscan_api + "?module=contract&action=getabi&address="+contract_address+"&apikey="+CONFIG.etherscan_api_key,
		method:"GET"
	});
	if(ret && ret.data && ret.data.message && "OK" == ret.data.message && ret.data.result){
		var contractABI = "";
		contractABI = JSON.parse(ret.data.result);
		return contractABI;
	}
	console.log("获取合约abi失败");
	console.log(ret);
	return false;
},
etherApi.prototype.getContractAssetBalance = async function(contract_address,abi,wallet_address,decimal){
	if(!contract_address || !wallet_address || !abi){
		return false;
	}
	try{
		let contract = new ethers.Contract(contract_address, abi, this.provider);
		let bal = await contract.balanceOf(wallet_address);
		const result = ethers.formatUnits(bal, decimal);
		if(!result){
			return false;
		}
		return result;
	}catch(e){
		console.dir(e);
		return false;
	}
	
},
etherApi.prototype.getContractAssetBaseInfo = async function(contract_address,abi){
	if(!contract_address || !abi){
		return false;
	}
	let ret =  {};
	try{
		let contract = new ethers.Contract(contract_address, abi, this.provider);
		ret.contract_address = contract_address;
		ret.decimal = await contract.decimals();
		ret.symbol = await contract.symbol();
		ret.total_supply = await contract.totalSupply();
		
		ret.symbol = String(ret.symbol).toUpperCase();
		ret.decimal = Number(ret.decimal);
		ret.total_supply = ethers.formatUnits(ret.total_supply, ret.decimal);
		
		if(!ret.decimal || !ret.symbol || !ret.total_supply){
			return false;
		}
		return ret;
		
	}catch(e){
		console.dir(e);
		return false;
	}
}
;
export default {
	etherApi
};