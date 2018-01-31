// components/marquee/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: '',
      observer: "updateText"
    },
    fontSize: {
      type: Number,
      value: 16
    },
    color: {
      type: String,
      value: 'white'
    },
    background: {
      type: String,
      value: 'lightblue'
    }
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
    const width = this.getWidth(text) * fontSize;
    const duration = width * 1000 / velocity;
    this.setData({ width, duration });
    var animation = wx.createAnimation({})

    this.animation = animation

    this.start();

    this.interval = setInterval(this.start.bind(this), duration + 100)

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
      this.animation.translate(375).step({ duration: 100, timingFunction: 'step-start' });
      this.animation.translate(-width).step({ duration });
      this.setData({
        animationData: this.animation.export()
      })
    },
    updateText(newVal, oldVal) {
      if (!newVal) {
        return;
      }

    },
    getWidth(str) {
      return [].reduce.call(str, (pre, cur, index, arr) => {
        if (str.charCodeAt(index) > 255) {// charCode大于255是汉字
          pre++;
        } else {
          pre += 0.5;
        }
        return pre;
      }, 0);
    },
    getDuration(str) {// 保留，根据文字长度设置时间
      return this.getWidth(str) * 1000;
    }
  }
})
