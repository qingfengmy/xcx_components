// components/scratch/index.js
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
    startX: 0,
    startY: 0,
    r: 5
  },

  ready() {
    const ctx = wx.createCanvasContext('canvas', this)
    ctx.rect(0, 0, 200, 100)
    ctx.setFillStyle('#ccc')
    ctx.fill()

    ctx.draw()

    // ctx.clearRect(10, 10, 100, 10)
    // ctx.draw(true)
    this.setData({
      ctx
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getRect(x, y) {
      const {
        r
      } = this.data
      const x1 = x - r > 0 ? x - r : 0
      const y1 = y - r > 0 ? y - r : 0
      return [x1, y1, 2 * r]
    },
    start(e) {
      console.log('start', e)
      const {
        x,
        y
      } = e.touches[0]
      const {
        ctx
      } = this.data
      const pos = this.getRect(x, y)
      console.log('--move--', pos)
      ctx.clearRect(pos[0], pos[1], pos[2], pos[2])
      ctx.draw(true)
    },
    move(e) {
      console.log('move', e)
      const {
        ctx
      } = this.data
      const {
        x,
        y
      } = e.touches[0]
      const pos = this.getRect(x, y)
      console.log('--move--', pos)
      ctx.clearRect(pos[0], pos[1], pos[2], pos[2])
      ctx.draw(true)
    },
    end(e) {
      console.log('已完成')
    }
  }
})