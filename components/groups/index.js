/**
 * 两行滚动
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    options: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  ready() {
    const query = wx.createSelectorQuery().in(this)
    const that = this;
    query.selectAll('.item').boundingClientRect(function (res) {
      
      const width = res.reduce(function (a, b) {
        return a + b.width;
      }, 0);

      if (width <= 375) {
        that.setData({ width });
      } else {
        let finalWidth = 0;
        res.reduce(function (a, b) {
          const result = a + b.width;
          if (result >= (width / 2 > 375 ? width / 2 : 375) && finalWidth == 0) {
            finalWidth = result;
          }
          return result;
        }, 0);
        that.setData({ width: finalWidth });
      }

    }).exec()
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
