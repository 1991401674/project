// pages/shopinfo/shopinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper:[],
    info:[],
    checked:"请选择（尺码/颜色/数量）",
    simg:"",
    count:1,
    close:false,
    color:"",
    size:"",
    inCo: 0,
    list: [],
    pageIndex: 0,
    pageSize: 6,
    hasMore: true,
    id:"",
    shopCart:[]
  },
  tab(){
    wx.switchTab({
      url: '../shopcart/shopcart',
    })
  },
  addCart() {
    var color = this.data.color
    var size = this.data.size
    var count = this.data.count
    if(color && size && count>0){
      var c = this.data.info
      var img = this.data.simg
      var title = c.title
      var id = c.id
      var price = c.price
      wx.request({
        url: 'http://172.20.10.6:1674/shopcart',
        data: {
          id: id,
          title: title,
          price: price,
          color: color,
          size: size,
          count: count,
          img: img
        },
        method: "POST",
        success: (res) => {
          wx.showToast({
            title: res.data.msg,
          })
        }
      })
    }else{
      wx.showToast({
        title: '请选择商品',
        icon: "none"
      })
      this.checkedShop()
    }
  },
  url(event){
    var url=event.currentTarget.dataset.url;
    if(url=="home"){
      wx.switchTab({
        url: '../' + url + '/' + url
      })
    }else{
      wx.navigateTo({
        url: '../' + url + '/' + url + '?title=全部'
      })
    }
  },
  getinfo(id){
    wx.request({
      url: 'http://172.20.10.6:1674/shopinfo',
      success:(res)=>{
        var a=res.data[id]
        this.setData({
          swiper:a,
          id:id
        })
      }
    }),
    wx.request({
      url: 'http://172.20.10.6:1674/shoplists',
      success:(res)=>{
        var a = res.data[id]
        this.setData({
          info: a
        })
        var img = this.data.info.sm_img[0]
        this.setData({
          simg: img
        })
      }
    })
  },
  color(event){
    var id=parseInt(event.detail.value)
    var img = this.data.info.sm_img[id]
    var color = this.data.info.color[id]
    this.setData({
      simg:img,
      color: color
    })
  },
  size(event) {
    var id = parseInt(event.detail.value)
    var size = this.data.info.size[id]
    this.setData({
      size: size
    })
  },
  minu(){
    var c=this.data.count
    if(c>0){
      this.setData({
        count: --c
      })
    }
  },
  add() {
    var c = this.data.count
    if (c<999) {
      this.setData({
        count: ++c
      })
    }
  },
  close(event){
    if (event.target.dataset.c=="ok"){
      if(this.data.count==0){
        wx.showToast({
          title: '商品数量为0',
          icon: "none",
          duration: 1500
        })
      }else if(this.data.color==""){
        wx.showToast({
          title: '请选择商品颜色',
          icon: "none",
          duration: 1500
        })
      } else if (this.data.size=="") {
        wx.showToast({
          title: '请选择商品尺码',
          icon: "none",
          duration: 1500
        })
      }else{
        wx.showToast({
          title: '选择成功',
        })
        this.setData({
          close: false,
          checked:"已选：-"+this.data.color+"-"+this.data.size+"-"+this.data.count+"件"
        })
      }
    }else{
      this.setData({
        close: false
      })
    }  
  },
  checkedShop(){
    this.setData({
      close: true
    })
  },
  inCo(event){
    if (event.target.dataset.c==0) {
      this.setData({
        inCo: false
      })
    }else{
      this.setData({
        inCo: true
      })
    }
  },
  loadMore(i) {
    var id=this.data.id
    if (this.data.hasMore == false) {
      wx.showToast({
        title: '没有更多',
        icon: "none"
      })
        return
    }
    var pno = ++this.data.pageIndex;
    var ps = this.data.pageSize;
    var util = require('../../utils/util.js')
    wx.request({
      url: 'http://172.20.10.6:1674/comment',
      data: { id:id+1, pno: pno, pageSize: ps },
      success: (res) => {
        var data = this.data.list.concat(
          res.data.data
        )
        var pageCount = res.data.pageCount
        var flag = pno < pageCount;
        for(var key in data){
          data[key].ctime=util.ymd(data[key].ctime)
        }
        this.setData({
          pageIndex: pno,
          list: data,
          hasMore: flag
        })
      }
    })
    if (i !== 1) {
      wx.showLoading({
        title: '下拉加载数据。。。',
      });
      setTimeout(function () {
        wx.hideLoading();
      }, 1000)
    }
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getinfo(parseInt(options.id))
    this.loadMore(1)
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
    if(this.data.inCo==1){
      this.loadMore(0)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})