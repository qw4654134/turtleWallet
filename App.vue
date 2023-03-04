<script>
	
  export default {
    onLaunch: function() {
      console.log('App Launch')
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    },
	globalData: {  
		//网络列表
		global_network_list:[],
		//网络索引
	    global_network_index: -1,
		//是否已完成app数据初始化
		global_is_app_data_init: false
	}
  }
</script>

<style>
@import './common/uni.css';
@import './common/index.css';
	
  .container {
    padding: 15px;
  }

  button {
    margin-bottom: 15px;
  }
</style>

