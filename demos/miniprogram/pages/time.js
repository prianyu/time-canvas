import Time from './utils/time'
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
      color: "#FFF",
    })
  },


  onShareAppMessage: function () {

  }
})