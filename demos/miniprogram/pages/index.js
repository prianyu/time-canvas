// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
   
  },
  
  to(e) {
    const type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: type
    })
  },

  onLoad() {
  },
})
