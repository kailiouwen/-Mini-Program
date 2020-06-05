//index.js
//获取应用实例


Page({
  data: {
   
  },
 
  onLoad: function () {
    var that = this  //使用桥接的方式处理指针的指向问题。
    wx.request({//请求轮播图图片
      url: 'http://t2.ossjk.com/api/getRotation',
      success: function(res){
        //请求成功，返回响应数据res，对res进行相应处理，绑定到页面渲染
        // console.log(res)
        that.setData({
          imgUrls:res.data
        })
      }
    });


    wx.request({
      url: 'http://t2.ossjk.com/api/getMusic',
      success:function(res){
        console.log(res)
      }
    })
  }
 
})
