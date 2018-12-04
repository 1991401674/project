// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper: [],
    imgList:[],
    sou:"搜索"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getSwipt(){
    wx.request({
      url: 'http://172.20.10.6:1674/imagelist',
      success: (res) => {
        this.setData({
          swiper: res.data[0],
          imgList: res.data[1]
        })
      }
    })
  },
  onLoad: function (options) {
    this.getSwipt()
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