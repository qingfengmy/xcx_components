// components/marquee/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    option: {
      type: Object,
      value: {
        color: '#FF993D',
        bgColor: '#FFF9E9',
        text: 'hello world hello world hello world'
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData: {},
    velocity: 16
  },

  ready() {
    this.setNotice();
  },

  detached() {
    clearInterval(this.interval);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    start() {
      const { width, duration } = this.data;
      let that = this;
      // wx.createSelectorQuery().in(this).select('#text').boundingClientRect(function (rect) {
      that.animation.translate((682 / 750) * wx.getSystemInfoSync().screenWidth).step({ duration: 100, timingFunction: 'step-start' });
      that.animation.translate(-width).step({ duration });
      that.setData({
        animationData: that.animation.export()
      })
      // }).exec()

    },

    setNotice() {
      const { fontSize, text, velocity } = this.data;
      const that = this;
      wx.createSelectorQuery().in(this).select('#text').boundingClientRect(function (rect) {
        const width = rect.width;
        const duration = (width + (682 / 750) * wx.getSystemInfoSync().screenWidth) * 500 / velocity;
        that.setData({ width, duration });
        var animation = wx.createAnimation({ duration })

        that.animation = animation

        that.start();

        that.interval = setInterval(that.start.bind(that), duration)
      }).exec();
    },

    updateText(newVal, oldVal) {
      if (!newVal) {
        return;
      }

    }
  }
})
