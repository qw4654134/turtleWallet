
import CryptoJS from 'crypto-js';

export default{
	ivStr : "yyuuide45678",//矢量
	//加密
	aesEncrypt : function(data,password){
		password = password ? password : 'th33168';
		var key  = CryptoJS.enc.Utf8.parse(password);
		var iv   = CryptoJS.enc.Utf8.parse(this.ivStr);
		// var srcs = CryptoJS.enc.Utf8.parse(data);
		var encrypted = CryptoJS.AES.encrypt(data, key, {
			iv:iv,
			mode:CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7});
		return encrypted.toString();
	},
	//解密
	aesDecrypt : function(data,password){
		password = password ? password : 'th33168';
		var key  = CryptoJS.enc.Utf8.parse(password);//
		var iv   = CryptoJS.enc.Utf8.parse(this.ivStr);
		// const restoreBase64 = data.replace(/\-/g,'+').replace(/_/g,'/');
		var restoreBase64=data.replace(/[\r\n]/g,'');
		 
		var decrypt = CryptoJS.AES.decrypt(restoreBase64, key, {
			iv:iv,
			mode:CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7});
		return CryptoJS.enc.Utf8.stringify(decrypt).toString();
	}
}
