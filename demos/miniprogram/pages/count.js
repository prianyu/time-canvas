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
      type: 'count',
      color: "#FFF",
      format:  "h:i:s",
      size: 40,
      init: e => {
        console.log(e)
      },
      start: e => {
        this.setData({
          started: true,
          pause: false
        })
      },
      change: (e) => {
        this.setData({
          milliseconds: `00${e.milliseconds}`.slice(-3)
        })
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
      started: false,
      milliseconds: "000"
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