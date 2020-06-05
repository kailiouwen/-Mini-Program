// pages/play/play.js
const app = getApp()

Page({

 
  data: {
    statusBtn: "pause",//初始化播放按钮状态
    showCur: "00:00",//初始化进度时件格式
    showDur: "00:00",//歌曲总时间
	mode:"loop"// 定义初始切换歌曲状态
  },

  
  onLoad: function (options) {
    this.audioCtx = wx.createAudioContext('MA')//创建audio上下文环境AudioContext对象
    this.setData({//setDate()是Page的方法,需要把它指向Page,默认指向request
      musics:app.globalData.musics,//全局变量拿到全部歌曲
      idx:options.idx,
      music: app.globalData.musics[options.idx]//拿到具体的那一首歌曲
    })
    this.audioCtx.play()//执行
  },
  autoPlay: function (idx) { //初始化音乐，然后获取播放音乐的方法
    this.setData({
      music: this.data.musics[idx]
    })
    this.audioCtx.play()
    this.setData({//定义状态,ctrlPlay根据状态绑定
      status: "play", //播放的状态
      statusBtn: "pause" //当前播放状态下的按钮图片
    })
  },
  ctrlPlay: function () {//控制暂停/播放的方法
    if (this.data.status == "play") {//控制暂停的方法
      console.log("暂停播放")
      this.audioCtx.pause()//控制它暂停
      this.setData({//更改状态
        status: "pause",//更改为暂停状态
        statusBtn: "play"//更改为播放状态图片
      })
    } else {//控制播放的方法
      console.log("播放歌曲")
      this.audioCtx.play()//控制它播放
      this.setData({//更改状态
        status: "play",//更改为播放状态
        statusBtn: "pause"//更改为暂停状态图片
      })
    }
  },
  playPrev: function () {//跳到上一首歌曲的方法（操作下标idx）
    let idx = this.data.idx//声明赋值取得下标
    if (idx == 0) {//第一首的时候跳到最后一首
      idx = this.data.musics.length - 1//总字符长度-1
    } else {//不是第一首,跳到上一首
      idx -= 1
    }
    this.setData({//
      idx: idx
    })
    this.autoPlay(idx)//传idx下标执行
  },
  playNext: function () {//跳到下一首歌曲的方法（操作下标idx）
    let idx = this.data.idx//声明赋值取得下标
    if (idx == this.data.musics.length - 1) {//总字符长度-1
      idx = 0//最后一首回到第一首
    } else {
      idx = idx * 1 + 1 // 强制转换类型字符串转换成数字
    }
    this.setData({
      idx: idx
    })
    this.autoPlay(idx)//传idx下标执行
  },
  ended: function () {//当前歌曲播放完毕，进入下一首
    this.playNext()
  },
  
  switchModeEvent: function(e) {  
    var newMode = 'loop';
    var toastMsg = "列表循环";
    if (this.data.mode === 'loop') {
      newMode = 'single';
      toastMsg = "单曲循环";
    } else if (this.data.mode === 'single') {
      newMode = 'random';
      toastMsg = "随机播放";
    }
    this.setData({
  		
      mode: newMode,
      toastMsg: toastMsg,
      toastHidden: false
    })
    wx.showToast({
      title: toastMsg,
      duration: 2000
    });
  },
  
  //根据循环模式切换下一首
  getNextSongId: function() {
    
    if (this.data.mode === 'single') {
      return this.data.currentId;
    } else if (this.data.mode === 'random') {
      const music = wx.getStorageSync('music');
      return music[Math.floor(Math.random() * music.length)]
    } else if (this.data.mode === 'loop') {
      var ids = wx.getStorageSync('ids');
      return ids[this.data.currentId].nextid;
    }
  },
  timeupdate: function (e) {
	  //歌曲播放过程，获取时间进度和时间总长度，进行页面动态效果的绑定
    let curTime = e.detail.currentTime//声明当前播放的时间进度："+e.detail.currentTime
    let durTime = e.detail.duration//声明当前歌曲的时间总长度："+e.detail.duration
    this.setData({
		//绑定进度条百分比,动态增长进度条
      perc: (curTime / durTime) * 100,//绑定当前播放的时间进度条
      showCur: this.formatTime(curTime),//绑定当前播放的时间进度
      showDur: this.formatTime(durTime),//绑定当前歌曲的时间总长度
      deg: curTime * 5//绑定旋转图片的角度,进行动态旋转
    })
  },
  formatTime: function (time) {//对获取时间格式化变成分:秒
    let m = parseInt(time / 60)//声明分钟数取整数
    let s = parseInt(time - m * 60)//声明秒钟数取整数
    m = this.matchNum(m)
    s = this.matchNum(s)
    let showTime = m + ":" + s//声明具体时间多少分,多少秒
    return showTime//取showTime变量
  },
  matchNum: function (num) {//数字补零,当数字小于12的时候,在前面补个0,让它一直两位数显示
    if (num < 10) {
      num = "0" + num//格式00
    }
    return num//取num变量
  },
  
  //转发
    onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: true,
      success: function () {
        wx.showToast({
          title: "分享成功",
          duration: 2000
        });
      }
    })
  }
  
})  
 
  
  


