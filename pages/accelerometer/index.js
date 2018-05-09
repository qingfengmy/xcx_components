// pages/accelerometer/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x: 0,
    y: 0,
    z: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.onAccelerometerChange(function (res) {
      that.setData({ x: res.x, y: res.y, z: res.z })
    })
    wx.startAccelerometer()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.stopAccelerometer()
  },

})