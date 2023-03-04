
import REQUEST from '@/common/request.js';

export default{
	getPrice : async function (symbol){
		if(!symbol){
			return false;
		}
		try{
			var price_ret = await REQUEST.request({
				url:"https://api.binance.com/api/v3/ticker/price?symbol=" + symbol.toUpperCase(),
				method:"GET"
			});
			if(price_ret && price_ret.data && price_ret.data.price){
				return price_ret.data.price;
			}
			return false;
			
		}catch(e){
			console.log("获取"+symbol+"价格失败");
			console.log(e);
			return false;
		}	
		
	}
	
}
