// pages/music/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    play: true
  },

  play() {
    this.setData({ play: !this.data.play })
  }
})