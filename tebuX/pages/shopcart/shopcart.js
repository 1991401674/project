// pages/shopcart/shopcart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:0,
    shop:[],
    acShop:[],
    sum:0,
    all:false,
    alls:true,
    tab: true,
  },
  shopId(event){
    var id = event.currentTarget.dataset.id-1
    wx.navigateTo({
      url: '../shopinfo/shopinfo?id='+id,
    })

  },
  pay(){
    var sum = this.data.sum
    if(sum==0){
      wx.showToast({
        title: '请选择要购买的商品',
        icon:"none"
      })
      return
    }
    wx.showModal({
      title: '微信支付',
      content: '你确定要支付'+sum+'元吗',
      success:(res)=>{
        if (res.cancel) {
          wx.showToast({
            title: '取消支付',
            icon:"none"
          })
        } else {
          var acShop = this.data.acShop
          var img, size, i = acShop.length
          for (var key in acShop) {
            img = acShop[key].img
            size = acShop[key].size
            wx.request({
              url: 'http://172.20.10.6:1674/delshop',
              data: {
                img: img,
                size: size
              },
              method: "POST",
              success: (res) => {
                i--
                acShop.shift()
                if (i == 0) {
                  this.setData({
                    acShop: acShop,
                    all: false,
                    alls: false,
                    sum: 0
                  })
                  this.getshop();
                }
              }
            })
          }
          wx.showToast({
            title: '支付成功'
          })
        }
      }
    })
  },
  icon(event){
    var type=event.target.dataset.type
    var acShop=this.data.acShop
    if(type=="del"){
      if(acShop.length==0){
        wx.showToast({
          title: '请选择要删除的商品',
          icon: "none",
          duration: 1500
        })
      }else{
        wx.showModal({
          title: '删除商品？',
          content: '你确定要删除该商品吗？',
          success:(res)=>{
            if (res.cancel) {
              wx.showToast({
                title: '取消删除',
                icon:'none',
                duration: 2000
              })
            } else {
              var img, size, i = acShop.length
              for (var key in acShop) {
                img = acShop[key].img
                size = acShop[key].size
                wx.request({
                  url: 'http://172.20.10.6:1674/delshop',
                  data: {
                    img: img,
                    size: size
                  },
                  method: "POST",
                  success: (res) => {
                    i--
                    acShop.shift()
                    if (i == 0) {
                      this.setData({
                        acShop: acShop,
                        all: false,
                        alls:false,
                        sum: 0
                      })
                      wx.showToast({
                        title: '删除成功',
                        duration: 2000
                      })
                      this.getshop();
                    }
                  }
                })
              }
            }
          }
        })
      }
    }else if(type=="more"){
      if(this.data.tab){
        wx.showTabBar({aniamtion:true})
        this.setData({
          tab:false
        })
      }else{
        wx.hideTabBar({aniamtion:true})
        this.setData({
          tab: true
        })
      }
    } else if (type == "back") {
      wx.switchTab({
        url: '../home/home',
        success: function (e) {
          wx.showTabBar({
            aniamtion:true
          })
        }
      })
    }
  },
  all(){
    if(this.data.shop.length==0){
      wx.showToast({
        title: '没有商品可选',
        icon: "none"
      })
      return
    }
    if (!this.data.all || !this.data.alls){
      var arr = []
      var sum = 0
      for (var key in this.data.shop) {
        arr.push(this.data.shop[key])
        sum += parseInt(this.data.shop[key].count * this.data.shop[key].price)
      }
      this.setData({
        acShop: arr,
        all: true,
        alls:true,
        sum: sum
      })
    }else{
      this.setData({
        acShop: [],
        all: false,
        alls: false,
        sum: 0
      })
    }
  },
  checked(event) {
    var sum = 0
    if (event.length>=0) {
      for (var i in this.data.acShop) {
        sum += parseInt(this.data.acShop[i].count * this.data.acShop[i].price)
      }
      this.setData({
        sum: sum
      })
    } else {
      var arr = []
      var a = event.detail.value
      for (var i in a) {
        arr.push(this.data.shop[parseInt(a[i])])
        sum += parseInt(this.data.shop[a[i].toString()].count * this.data.shop[a[i].toString()].price)
      }
      this.setData({
        acShop: arr,
        sum: sum
      })
      if (this.data.acShop.length == this.data.shop.length) {
        this.setData({
          all: true,
          alls: true
        })
      } else {
        this.setData({
          alls: false
        })
      }
    }
  },
  minus(event) {
    var a=event.target.dataset.id
    var arr=[]
    var arrs=[]
    for (var i in this.data.shop) {
      if (this.data.shop[i].id == a){
        if (this.data.shop[i].count>1) {
          this.data.shop[i].count--
          if (this.data.acShop.length > 0) {
            for (var key in this.data.acShop) {
              if (this.data.acShop[key].id == this.data.shop[i].id) {
                this.data.acShop[key].count--
              }
              arrs.push(this.data.acShop[key])
            }
            this.setData({
              acShop: arrs
            })
            this.checked(this.data.acShop)
          }
          wx: wx.request({
            url: 'http://172.20.10.6:1674/shopadd',
            data: { 
              count: this.data.shop[i].count,
              img: this.data.shop[i].img,
              size: this.data.shop[i].size,
            },
            method: 'POST',
            success:(res)=> {
              this.checked(this.data.acShop) 
            }
          })
        }
      }
      arr.push(this.data.shop[i])
    }
    this.setData({
      shop:arr
    })
  },
  adds(event) {
    var a = event.target.dataset.id
    var arr = []
    var arrs=[]
    for (var i in this.data.shop) {
      if (this.data.shop[i].id == a) {
        if (this.data.shop[i].count<999){
          this.data.shop[i].count++
          if(this.data.acShop.length>0 ){
            for(var key in this.data.acShop){
              if (this.data.acShop[key].id == this.data.shop[i].id){
                this.data.acShop[key].count++
              } 
              arrs.push(this.data.acShop[key])
            }
            this.setData({
              acShop: arrs
            })
            this.checked(this.data.acShop)
          }
          wx: wx.request({
            url: 'http://172.20.10.6:1674/shopadd',
            data: {
              count: this.data.shop[i].count,
              img: this.data.shop[i].img,
              size: this.data.shop[i].size,
            },
            method: 'POST',
            success: (res) => {
              
            }
          })
        }
      }
      arr.push(this.data.shop[i])
    }
    this.setData({
      shop: arr
    })
  },
  getshop(){
    wx:wx.request({
      url: 'http://172.20.10.6:1674/shopcart',
      success: (res)=> {
        this.setData({
          shop:res.data
        })
      }
    })
  },
  minu() {
    var c = this.data.count
    if (c > 0) {
      this.setData({
        count: --c
      })
    }
  },
  add() {
    var c = this.data.count
    if (c < 999) {
      this.setData({
        count: ++c
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.hideTabBar({ aniamtion: true })
    this.setData({
      tab: true
    })
    this.getshop();
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