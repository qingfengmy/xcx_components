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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData: {}
  },

  ready(){
    var animation = wx.createAnimation({
      duration: 10000,
      timingFunction: 'ease',
    })

    this.animation = animation

    animation.translate(375).step()

    this.setData({
      animationData: animation.export()
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateText(newVal, oldVal) {
      // if (!newVal) {
      //   return;
      // }
      // const width = this.getWidth(newVal);
      // const duration = this.getDuration(newVal);
      // var animation = wx.createAnimation({
      //   duration: 10000,
      //   timingFunction: "ease",
      //   delay: 0
      // })
      // animation.translate(50).step();
      // console.log('this.animation', animation);
      // this.setData({
      //   animationData: animation.export()
      // })
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
