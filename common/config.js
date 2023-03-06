export default {
	//支持的链及其网络地址
    "block_chain_net": {
		"eth":{
			"default_net":"Goerli Test Network",
			"net_list":[
				{"network":"Ethereum Main Network","url":"https://mainnet.infura.io/v3/8650610ca2224aaaa2fbcf3b7e47b445","etherscan_api":"https://api.etherscan.io/api","color":"#1ceba6"},
				{"network":"Goerli Test Network","url":"https://goerli.infura.io/v3/8650610ca2224aaaa2fbcf3b7e47b445","etherscan_api":"https://api-goerli.etherscan.io/api","color":"#6f6b73"}
			]
		}
	},
	"etherscan_api_key":"N1SZFS4PXGRS9QT95USZ4E5VYRWVU9TZS1",
	//PIN的最大长度
	"pin_code_max_length" : 6,
	//PIN取值
	"pin_keyboard_value" : ["1","2","3","4","5","6","7","8","9",".","0","{$del}"]
}
