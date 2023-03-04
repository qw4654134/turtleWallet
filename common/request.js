function request({url,method,data={},timeout=5000}) {
	return new Promise((resolve,reject)=>{
		uni.request({
			url:url,
			method:method,
			data:data,
			timeout:timeout,
			success(res) {
				resolve(res);
			},
			fail(res) {
				reject(false);
			}
		})
	})
}
export default {
	request
};