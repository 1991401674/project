// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:[],
    list:[],
    active:1,
    sou:"搜索"
  },
  shop(event){
    var title=event.currentTarget.dataset.title
    wx.navigateTo({
      url: '../shoplist/shoplist?title='+title,
      success: function(res) {
        console.log(title)
      }
    })
  },
  active(event){
    if(event!==1){
      var i = event.target.dataset.id
    }else{
      var i=1;
    }
    if(i>0){
      this.setData({
        list: this.data.title[i].list,
        active:i
      })
    }else{
      wx.navigateTo({
        url: '../shoplist/shoplist?title=全部'
      })
    }
  },
  getTitle(){
    wx.request({
      url: 'http://172.20.10.6:1674/shoplist',
      success: (res) => {
        this.setData({
          title:res.data
        })
        this.active(1)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTitle()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})