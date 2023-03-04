import md5 from 'js-md5';

export default{
	pin_md5_store_key : 'storage_pin_code_md5',
	setPIN : function(pin_code){
		try {
			uni.setStorageSync(this.pin_md5_store_key, md5(md5(md5(pin_code))));
			
		} catch (e) {
			uni.showToast({
				title:"failed to storage pin"
			});
		}
	},
	getPIN : function(){
		try {
			const pin_code = uni.getStorageSync(this.pin_md5_store_key);
			return pin_code;
		} catch (e) {
			return false;
		}
	},
	compare : function(pin){
		try {
			const pin_code = uni.getStorageSync(this.pin_md5_store_key);
			return md5(md5(md5(pin))) == pin_code;
		} catch (e) {
			return false;
		}
	},
	delPIN: function(){
		try {
			const pin_code = uni.removeStorageSync(this.pin_md5_store_key);
			return true;
		} catch (e) {
			return false;
		}
	},
	//检查PIN是否还存在缓存中，如果无就进入重置钱包流程
	checkPinStatus : function(){
		var pin_code = this.getPIN();
		if(pin_code){
			return pin_code;
		}
		setTimeout(() => {
		    uni.showModal({
		    	title:"Can't find the PIN, Please reset wallet",
		    	showCancel:false,
		    	confirmText:'Got it',
				success: function (res) {
					if (res.confirm) {
						uni.redirectTo({
							url: "/pages/setup-wallet/setup",
							success:function(){
								
							},
							fail:function(res) {
								console.log(res)
							}
						});
					} else if (res.cancel) {
					}
				}
		    });
		    console.log("未找到PIN，请重新设置钱包");
		    
		}, 1000);
		return false;
	}
}

