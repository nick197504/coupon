var app = getApp()
Page({
  data: {
    couponInfo: {},
    picWidth: wx.getSystemInfoSync().windowWidth,
    platformTypeUrl: "../../images/jd.png",
    loadingBtn: false,
    showStatus: false,
    taoKouLing: "",
    maxLength: 0
  },
  onShow: function () {
    wx.setStorageSync('isDetailBack', true)
  },
  onLoad: function (options) {
    this.setData({
      couponInfo: wx.getStorageSync('couponInfo')
    })
    if (this.data.couponInfo.PlatformType == "天猫")
      this.setData({
        platformTypeUrl: "../../images/tmall.png"
      })
  },
  hideView: function () {
    this.setData({
      showStatus: false
    })
  },  
  /*
  getCoupon: function (options){
    var that = this;
    that.setData({
      loadingBtn: true
    })
    console.log(that.data.couponInfo.materiaUrl);
    
    wx.navigateTo({
      url: "../shopping/shopping",
    })
  }*/
  
  getCoupon: function (options) {    
    var that = this;
    that.setData({
      loadingBtn: true
    })
    wx.request({
      url: "http://www.haojingke.com/index.php/api/index/myapi?",
      data: {
        "type": "unionurl",
        "apikey": app.globalData.Acount.apikey,
        "materialIds": that.data.couponInfo.skuId,
        "couponUrl":that.data.couponInfo.couponList         
      },
      method: "POST",
      success: function (resRequest) {        
        if (resRequest.data.status_code == "200") {          
          that.setData({
            taoKouLing: resRequest.data.data,
            loadingBtn: false,
            showStatus: true,
            //maxLength: resRequest.data.QuanDetail.TaoKouLing.length
          });
          //console.log(that.data);          
        }
      }
    })
    console.log(that.data.taoKouLing);
    wx.setStorageSync("taoKouLing", that.data.taoKouLing);
    console.log(wx.getStorageSync("taoKouLing"));
    wx.navigateTo({
      url: "../shopping/shopping",
    })
  }
})
