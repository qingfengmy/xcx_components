// components/lock/index.js
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
    linePoints: [],
    color: '#c41412',
    firstPoints: [],
    state: 0, // 0:除此设置; 1:再次设置; 2: 解锁;3:解锁成功
    notice: '请设置密码'
  },
  ready() {
    this.init()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    start(e) {
      const {
        ctx,
        state
      } = this.data
      if (state == 3) {
        return
      }
      const pos = this.getPosition(e)
      // 清空画布
      ctx.clearRect(0, 0, 300, 300)
      // 画九宫格
      this.drawNine();
      // 画圆心
      this.checkPoints(pos)
      ctx.draw(true)
    },
    move(e) {
      const now = new Date()
      const LIMIT = 60
      const duration = now - this.prev
      // 由于小程序canvas效率低下，帧频率大于60丢弃
      if (duration < Math.floor(1000 / LIMIT)) return;
      this.prev = now
      
      const {
        ctx,
        state
      } = this.data
      if (state == 3) {
        return
      }
      const pos = this.getPosition(e)
      // 清空画布
      ctx.clearRect(0, 0, 300, 300)
      // 画九宫格
      this.drawNine();
      // 画已入栈的圆心和线
      this.drawLinePoints()
      // 画move线
      this.drawMoveLine(pos)
      // 校验其他圆心
      this.checkPoints(pos)
      ctx.draw(true)
    },
    end() {
      const {
        ctx,
        state,
        linePoints,
        firstPoints
      } = this.data
      if (state == 3) {
        return
      }
      console.log('end')
      // 清空画布
      ctx.clearRect(0, 0, 300, 300)
      // 画九宫格
      this.drawNine();
      // 画已入栈的圆心和线
      this.drawLinePoints()
      // 处理业务
      if (state == 0) {
        // 除此设置
        this.init()
        this.setData({
          state: 1,
          firstPoints: linePoints,
          notice: "请再次设置密码"
        })
      } else if (state == 1) {
        // 二次设置
        let result = false
        if (firstPoints.length != linePoints.length) {
          result = true
        }
        for (let i = 0; i < firstPoints.length; i++) {
          if (firstPoints[i].index != linePoints[i].index) {
            result = true
          }
        }
        if (result) {
          this.setData({
            notice: '和初次密码不一致，请再次设置'
          })
        } else {
          this.init()
          this.setData({
            notice: '设置成功，请解锁',
            state: 2
          })
        }
      } else {
        // 解锁
        let result = false
        if (firstPoints.length != linePoints.length) {
          result = true
        }
        if (!result) {
          for (let i = 0; i < firstPoints.length; i++) {
            if (firstPoints[i].index != linePoints[i].index) {
              result = true
            }
          }
        }
        if (result) {
          this.init()
          this.setData({
            notice: '密码错误，请重试',
            state: 2
          })
        } else {
          // this.init()
          this.setData({
            notice: '恭喜解锁成功',
            state: 3
          })
        }
      }
    },
    // 画moveLine
    drawMoveLine(pos) {
      const {
        ctx,
        linePoints,
      } = this.data
      const lastPoint = linePoints[linePoints.length - 1]
      ctx.beginPath()
      ctx.lineWidth = 3
      ctx.moveTo(lastPoint.x, lastPoint.y)
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
      ctx.closePath()
    },
    // 校验其他圆心
    checkPoints(pos) {
      const {
        points,
        r,
        ctx,
        linePoints,
        color
      } = this.data
      for (let i = 0; i < points.length; i++) {
        const point = points[i]
        if (!this.isFocus(point) && Math.abs(point.x - pos.x) < r && Math.abs(point.y - pos.y) < r) {
          // 画圆心
          ctx.setFillStyle(color)
          ctx.beginPath()
          ctx.arc(point.x, point.y, r / 4, 0, 2 * Math.PI)
          ctx.closePath()
          ctx.fill()
          // 保存密码
          linePoints.push(point)
          break;
        }
      }
      this.setData({
        linePoints
      })
    },
    // 画已入栈的圆心
    drawLinePoints() {
      const {
        r,
        ctx,
        linePoints,
        color
      } = this.data
      for (let i = 0; i < linePoints.length; i++) {
        const point = linePoints[i]
        ctx.setFillStyle(color)
        ctx.beginPath()
        ctx.arc(point.x, point.y, r / 4, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.fill()
      }
      for (let i = 0; i < linePoints.length - 1; i++) {
        ctx.beginPath()
        ctx.lineWidth = 3
        ctx.moveTo(linePoints[i].x, linePoints[i].y)
        ctx.lineTo(linePoints[i + 1].x, linePoints[i + 1].y)
        ctx.stroke()
        ctx.closePath()
      }
    },
    // 画九宫格
    drawNine() {
      const {
        ctx,
        points,
        r,
        color
      } = this.data
      for (let i = 0; i < points.length; i++) {
        ctx.lineWidth = 2
        ctx.setStrokeStyle(color)
        ctx.beginPath()
        ctx.arc(points[i].x, points[i].y, r, 0, Math.PI * 2)
        ctx.closePath()
        ctx.stroke()
      }
    },
    // 获取touch点相对于canvas的坐标
    getPosition(e) {
      return {
        x: e.touches[0].x,
        y: e.touches[0].y
      }
    },
    // 判断该点是否已经画过
    isFocus(point) {
      const {
        linePoints
      } = this.data
      let result = false
      for (let i = 0; i < linePoints.length; i++) {
        if (point.index == linePoints[i].index) {
          result = true
        }
      }
      return result
    },

    // 初始化
    init() {
      const ctx = wx.createCanvasContext('canvas', this)
      const width = 300;
      const r = width / 10;
      const offset = Math.floor((width - 3 * 2 * r) / 4)
      const points = []
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          points.push({
            y: 2 * r * i + r + offset * (i + 1),
            x: 2 * r * j + r + offset * (j + 1),
            index: i * 3 + j
          })
        }
      }
      this.setData({
        points,
        r,
        ctx,
        linePoints: [],
        state: 0,
        notice: '请设置密码'
      })
      this.prev = new Date()
      this.drawNine()
      ctx.draw()
    }
  }
})