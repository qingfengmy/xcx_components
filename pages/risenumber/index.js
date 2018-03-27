// pages/risenumber/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:30
  },

  start(){
    const {num} = this.data;
    const riseNum = this.selectComponent('#qing-risenum');
    riseNum.start(num);
  }
})