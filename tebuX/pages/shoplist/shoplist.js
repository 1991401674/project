// pages/shoplist/shoplist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoplist:[],
    sou:""
  },
  tab(event){
    var url = event.currentTarget.dataset.url
    wx.switchTab({
      url: '../'+url+'/'+url,
    })
  },
  getShoplist(){
    wx:wx.request({
      url: 'http://172.20.10.6:1674/shoplists',
      success: (res)=>{
        this.setData({
          shoplist:res.data
        })
      }
    })
  },
  getinfo(event){
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../shopinfo/shopinfo?id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShoplist()
    this.setData({
      sou:options.title
    })
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