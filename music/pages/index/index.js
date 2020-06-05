//index.js
//1.全局的getApp()函数，可以获取到小程序实例。
const app = getApp()

/*Page()函数用来注册一个页面，接受object参数，data是Object类型*/
Page({
  data: {
   
  },
  /*小程序注册完成后，监听加载页面触发function()*/
  /*进入页面向服务器发送请求，服务器传回数据 */
  onLoad: function (){
	  var that = this;/*this此时指向的是Page对象*/
	  wx.request({/*网络接口，传入的是对象object*/
		  url:'http://t2.ossjk.com/api/getRotation',/*开发者服务器接口地址，string ,轮播图后台接口，有三张图片，由后端开发提供*/
		  success:function(res){/*function类型，接口调用成功的回调函数,res=response*/
			  console.log(res)/*response，console此时显示地址数组，数组可以拿来迭代，把数组渲染到页面*/
			  that.setData({	/*setDate()是Page的方法,需要把它指向Page,默认指向request*/
				  imgUrls:res.data /**/
			  })
		  }
	  });
	  wx.request({
		  url:'http://t2.ossjk.com/api/getMusic',/*播放列表后台接口*/
		  success:(res)=>{
			  console.log(res)
			  this.setData({/*定义参数*/
				  muscis:res.data	/*获取服务器返回的数组res.date,赋值给muscis*/
			  })
        app.globalData.musics = res.data
		  }
	  })
  },
  navTo: function (e) {
    var idx = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../play/play?idx=' + idx,
    })
  }
})
