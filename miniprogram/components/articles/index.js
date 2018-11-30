// components/articles/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    articles: Array
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toArticle({ currentTarget }) {
      wx.navigateTo({
        url: `/article/index?id=${currentTarget.dataset.id}`,
      })
    },
  }
})
