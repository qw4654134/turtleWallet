function checkAppInit() {
	if(!getApp().globalData.global_is_app_data_init){
		uni.redirectTo({
			url: "/pages/start/start-up"
		});
		return false;
	}
	return true;
}
export default {
	checkAppInit
};