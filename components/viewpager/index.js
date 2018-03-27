// components/viewpager/index.js
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
    imgUrls: ['http://img.wfxiao.com.cn/yk/images/2018/03/20/5c4b81896b744047907363a1a179e2b1.jpg', 'http://img.wfxiao.com.cn/yk/images/2018/03/20/09b06aec8fb84aeb87c323f731929bc5.jpg', 'http://img.wfxiao.com.cn/yk/images/2018/03/20/abfb3ab192304095b456bf14ebdb580b.jpg', 'http://attach.bbs.miui.com/forum/201605/11/163125xk1rvubkbqbqqu5b.jpg'],
    height: 400,
    width: 375,
    imgH: [0, 0, 0, 0]
  },

  ready() {
    const that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log('height::', res.windowHeight);
        that.setData({ height: res.windowHeight, width: res.screenWidth })
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleLoad(e) {
      console.log(e);
      const { width, height } = this.data;
      const iWidth = width;
      const iHeight = e.detail.height * width / e.detail.width;
      this.setData({ [`imgH[${e.currentTarget.dataset.index}]`]: iHeight })
    },
    handleSwiperChange(e) {
      console.log(e);
      setTimeout(() => {
        const { imgUrls } = this.data;
        if (e.detail.current == imgUrls.length - 1) {
          this.setData({ imgUrls: [...imgUrls, ...imgUrls] })
        }
      }, 2000)
    }
  }
})
