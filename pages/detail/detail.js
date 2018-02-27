var util = require("../../utils/util.js");
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
    var couponLocalList = wx.getStorageSync('couponInfo');
    var endTime = util.formatTime(couponLocalList.endTime);
   // console.log(endTime);
    couponLocalList.endTime = endTime;
    this.setData({
      couponInfo: couponLocalList
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
    
  getCoupon: function (options) {    
    var that = this;
    that.setData({
      loadingBtn: true
    })
    wx.request({
      url: "https://www.nicksun.xyz/weApp?",
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
         }
      }
    })    
  }
})
