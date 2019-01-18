/**
 * 已知半径R，扇形数量N
 * 求每个扇形的leftBorderWidth和topBorderWidth
 * const π = Math.PI
 * 每个扇形的弧度：rad=2πr/r/N=2π/N
 * leftBorderWidth = Math.sin(rad)*r
 * topBorderWidth = Math.cos(rad)*r*2
 * 
 * */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 单位rpx
    R: {
      type: 'Number',
      value: 300
    },
    N: {
      type: 'Number',
      value: 5
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    deg: 0,
    data: [{
      color: '#983335',
      percent: 20,
      text: '20%-0'
    }, {
      color: '#77963f',
      percent: 20,
      text: '20%-1'
    }, {
      color: '#5d437c',
      percent: 30,
      text: '30%-2'
    }, {
      color: '#35859f',
      percent: 15,
      text: '15%-3'
    }, {
      color: '#d1702f',
      percent: 15,
      text: '15%-4'
    }]

  },

  ready() {
    const PI = Math.PI
    const {
      data
    } = this.data;
    const ctx = wx.createCanvasContext('canvas', this)
    ctx.translate(150, 150)
    ctx.rotate(-PI / 2 - PI / 10)

    data.reduce((total, current) => {
      ctx.beginPath()
      ctx.moveTo(0, 0)
      const start = total;
      const end = total + (current.percent / 100) * (2 * PI)
      ctx.arc(0, 0, 100, start, end)
      ctx.closePath()
      ctx.stroke()
      ctx.setFillStyle(current.color);
      ctx.fill();
      return end;
    }, 0)
    data.reduce((total, current) => {
      ctx.beginPath()
      ctx.moveTo(0, 0)
      const deg = (current.percent / 100) * (2 * PI)
      ctx.rotate(deg * 2 / 3)
      ctx.font = "22px scans-serif";
      ctx.setFillStyle("#000");
      ctx.fillText(current.text, 50, 0);
      ctx.rotate(deg * 1 / 3)
      return deg;
    }, 0)
    ctx.draw()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    start() {
      console.log('start')
      let {
        deg,
        awardNumer = 2,
        singleAngle = 1,
        speed = 10,
        isStart,
        data
      } = this.data
      if (isStart) return
      this.setData({
        isStart: true
      })
      const awardAngle = data.reduce((total, current, index) => {
        return total + (index < awardNumer ? (current.percent / 100) * (360) : 0)
      }, 0)
      console.log('111111111-awardAngle', awardAngle)
      const endAddAngle = 360-awardAngle // 中奖角度
      const rangeAngle = (Math.floor(Math.random() * 5) + 5) * 360 // 随机旋转几圈再停止
      let cAngle;
      const that = this
      this.timer = setInterval(() => {
        if (deg < rangeAngle) {
          deg += speed
          console.log('22222222222')
        } else {
          cAngle = (endAddAngle + rangeAngle - deg) / speed
          cAngle = cAngle > speed ? speed : cAngle < 1 ? 1 : cAngle
          deg += cAngle

          if (deg >= (endAddAngle + rangeAngle)) {
            deg = endAddAngle + rangeAngle
            that.setData({
              isStart: false
            })
            clearInterval(this.timer)
            // this.endCallBack()
            console.log('444')
          }
          console.log('33333333')
        }

        that.setData({
          deg
        })
      }, 1000 / 60)
    }
  }
})