function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'Years': 31557600000,
		'Months': 2629800000,
		'Days': 86400000,
		'Hours': 3600000,
		'Mins': 60000,
		'Secs': 1000
	},
	
	humanize: function(milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + ' ago';
				break;
			}
		}
		return humanize || 'just';
	},
	//将毫秒数转为对应的年月日时分秒
	humanize_2: function(milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) +" "+ key;
				break;
			}
		}
		return humanize;
	},
	//将毫秒时间戳转换为时间日期格式
	formtTimastamp: function(timestamp) {//单位毫秒
		var date = new Date(timestamp);
		var diff = Date.now() - timestamp;
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1) + '-';
		var D = (date.getDate()< 10 ? '0'+date.getDate():date.getDate())+ ' ';
		var h = (date.getHours() < 10 ? '0'+date.getHours():date.getHours())+ ':';
		var m = (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes()) + ':';
		var s = date.getSeconds() < 10 ? '0'+date.getSeconds():date.getSeconds();
		if(diff < this.UNITS['Days']){
			return h+m+s;
		}
		if(diff < this.UNITS['Months']){
			return M+D+h+m+s;
		}
		return Y+M+D+h+m+s;
		
	},
	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['Days']) {
			return this.humanize(diff);
		}
		var _format = function(number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
}
;
	function copyToClipboard(content){
		uni.setClipboardData({
			data: content,
			success: function () {
				uni.showToast({
					title:"It has been copied",
					icon:'none'
				});
				
			},
			fail: function(){
				uni.showToast({
					title:"Failed to copy it"
				});
				console.log('复制失败');
			}
		});
	}

export default{
	formatTime,
	formatLocation,
	dateUtils,
	copyToClipboard
}
