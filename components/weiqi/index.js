// components/weiqi/index.js
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
    result: '',
    n: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 计算
     */
    formSubmit(e) {
      console.log(e);
      const n = e.detail.value.n;
      const array = Array.from({ length:n*n }, (v, k) => k);
      // 和
      // 1: 1/2;
      // 2: 4/2;
      // 3: 9/2;
      // 4: 16/2;
      // 5: 25/2
      const result = n % 2 === 0 ? n * n / 2 : (n * n)+'/'+2
      this.setData({ n, array, result});

      console.log(array,n);
    }
  }
})
