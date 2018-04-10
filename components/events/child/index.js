// components/events/child/index.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleBubblesTap(){
      console.log('child bubbles tap---');
      this.triggerEvent('customevent', {}, { bubbles: true }) 
    },
    handletap(){
      console.log('child tap---')
      this.triggerEvent('customevent', {})
    }
  }
})
