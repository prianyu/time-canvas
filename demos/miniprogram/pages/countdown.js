import Time from './utils/time.all'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pause: true,
    started: false,
    height: 200,
    milliseconds: '000'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
  },

  init() {
    this.time = new Time('time', {
      width: 300,
      height: 200,
      type: 'countdown',
      color: "#FFF",
      format: "h:i:s",
      init: e => {
        console.log(e)
      },
      start: e => {
        this.setData({
          started: true,
          pause: false
        })
      },
      end: e => {
        console.log("倒计时结束了")
      },
      finish: () => {
        this.setData({
          pause: true
        })
        this.reset()
      }
    })
  },

  onUnload() {
    this.time.pause()
  },

  reset() {
    this.time.reset()
    this.setData({
      pause: true,
      started: false
    })
  },

  togglePlay() {
    const { pause, started } = this.data
    this.setData({
      pause: !pause
    })
    if(pause || !started) {
      this.time.play(1)
    } else {
      this.time.pause(true)
    }
    
  },


  onShareAppMessage: function () {

  }
})