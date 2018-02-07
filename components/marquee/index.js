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
    const { fontSize, text, velocity } = this.data;
    const that = this;
    wx.createSelectorQuery().in(this).select('#text').boundingClientRect(function (rect) {
      const width = rect.width;
      const duration = (width * 10+100000) / velocity;
      that.setData({ width, duration });
      var animation = wx.createAnimation({})

      that.animation = animation

      that.start();

      that.interval = setInterval(that.start.bind(that), duration + 1100)
    }).exec();
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
      this.animation.translate(317).step({ duration: 100, timingFunction: 'step-start' });
      this.animation.translate(-width).step({ duration });
      this.setData({
        animationData: this.animation.export()
      })
    },
    updateText(newVal, oldVal) {
      if (!newVal) {
        return;
      }

    }
  }
})
