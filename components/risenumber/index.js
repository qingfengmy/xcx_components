// components/risenumber/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    styles: {
      type: String,
      value: 'font-size:50rpx;color:#f20000',
      observer: function (newVal, oldVal) { 
        console.log('---styles---', newVal, oldVal);
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: 0,
  },


  /**
   * 组件的方法列表
   */
  methods: {
    toDecimal(num, decimal = 2) {
      return num.toFixed(decimal)
    },
    start(num, decimal = 2) {
      this.setData({ num, decimal })
      const rat = num / 15;
      this.anim(0, rat)
    },
    anim(result, rat) {
      const that = this;
      const { num, decimal } = this.data;
      setTimeout(() => {
        result += rat;
        if (result > num) {
          that.setData({ value: this.toDecimal(num, decimal) })
        } else {
          console.log('result', result, num);
          that.setData({ value: this.toDecimal(result, decimal) })
          this.anim(result, rat)
        }
      }, 100)
    }
  }
})
