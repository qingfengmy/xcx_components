// components/pan1/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    areaNumber: 8, //抽奖间隔
    speed: 16, //转动速度
    awardNumer: 5, //中奖区域从1开始
    mode: 1, //1是指针旋转，2为转盘旋转
  },

  ready() {
    const opts = {
      areaNumber: 8,
      speed: 16,
      awardNumer: 1,
      mode: 1,
    }
    this.setData({
      deg: 0,
      areaNumber: opts.areaNumber, // 奖区数量
      speed: opts.speed || 16, // 每帧速度
      awardNumer: opts.awardNumer, // 中奖区域 从1开始
      mode: opts.mode || 2,
      singleAngle: '', // 每片扇形的角度
      isStart: false
    })


    // this.init()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init() {
      let {
        areaNumber,
        singleAngle,
        mode
      } = this.data
      singleAngle = 360 / areaNumber
      this.singleAngle = singleAngle
      this.page.setData({
        wheel: {
          singleAngle,
          mode
        }
      })
    },
    start() {
      let {
        deg,
        awardNumer,
        singleAngle,
        speed,
        isStart,
        mode
      } = this.data
      if (isStart) return
      this.setData({isStart:true})
      const endAddAngle = (awardNumer - 1) * singleAngle + singleAngle / 2 + 360 // 中奖角度
      const rangeAngle = (Math.floor(Math.random() * 4) + 4) * 360 // 随机旋转几圈再停止
      let cAngle;
      const that = this
      this.timer = setInterval(() => {
        if (deg < rangeAngle) {
          deg += speed
        } else {
          cAngle = (endAddAngle + rangeAngle - deg) / speed
          cAngle = cAngle > speed ? speed : cAngle < 1 ? 1 : cAngle
          deg += cAngle

          if (deg >= (endAddAngle + rangeAngle)) {
            deg = endAddAngle + rangeAngle
            that.setData({isStart:false})
            clearInterval(this.timer)
            // this.endCallBack()
          }
        }

        that.setData({
          singleAngle,
          deg,
          mode
        })
      }, 1000 / 60)
    }
  }
})