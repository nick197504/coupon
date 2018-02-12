var util = require("../../utils/util.js")
var app = getApp()
Page({
  data: {
    couponList: [],
    pageIndex: 0,
    isLoading: true,
    loadOver: false,
    categoryList: [{ CategoryID: "", CategoryName: "其它" }, { CategoryID: "all", CategoryName: "全部" }],
    selectCategory: "all",
    showCategoryName: "全部",
    selectIndex: 0,
    inputContent: "",
    discountRate:0
  },
  onLoad: function (options) {    
    this.getCategoryList()
  },
  onShow: function () {
    if (wx.getStorageSync('isDetailBack')) {
      wx.removeStorageSync('isDetailBack')
      return
    }
    this.setData({
      couponList: [],
      pageIndex: 0,
      isLoading: true,
      loadOver: false,
      selectCategory: wx.getStorageSync('selectCategory') == "" ? "all" : wx.getStorageSync('selectCategory'),
      showCategoryName: wx.getStorageSync('showCategoryName') == "" ? "全部" : wx.getStorageSync('showCategoryName'),
      selectIndex: wx.getStorageSync('selectIndex') == "" ? this.data.categoryList.length - 1 : wx.getStorageSync('selectIndex'),
      inputContent: wx.getStorageSync('inputContent')
    })
    this.getMoreCouponList()
  }, 
  getMoreCouponList: function () {
    var that = this   
    wx.request({
      url: "http://www.haojingke.com/index.php/api/index/myapi?",
      data: {
        "type": "goodslist",
        "apikey": app.globalData.Acount.apikey,
        "page": that.data.pageIndex,
        //"PageSize": 20,
      },
      method: "GET",
      success: function (resRequest) {
        if (resRequest.data.status_code == "200") {
          if (resRequest.data.data != null && resRequest.data.data.length > 0) {           
            var couponLocalList = resRequest.data.data;
            for (var i = 0; i < couponLocalList.length; i++) {
              var list = util.calculateDiscountRate(couponLocalList[i]);
              couponLocalList[i] = list;
            }
            couponLocalList.sort(util.sortBywlPriceAfter);            
            that.setData({
              couponList: couponLocalList,
              isLoading: false
            })
          }
          else {
            that.setData({
              isLoading: true,
              loadOver: true
            })
          }
        }
      },
      fail: function (resRequest) {
        console.log("getMoreCouponList fail");
      }
    })
  }, 
  getCategoryList: function () {
    console.log("getCategoryList");   
    // var that = this
    // wx.request({
    //   url: "https://taoquan.cillbiz.com/GetCategory.ashx",
    //   data: {
    //     "Acount": {
    //       "UserName": app.globalData.Acount.UserName,
    //       "PassWord": app.globalData.Acount.PassWord
    //     }
    //   },
    //   method: "POST",
    //   success: function (resRequest) {
    //     if (resRequest.data.Result == "请求成功") {
    //       that.setData({
    //         categoryList: resRequest.data.Categorys.concat(that.data.categoryList),
    //         selectIndex: resRequest.data.Categorys.length + 1
    //       })
    //     }
    //   }
    // })
  },
  bindPickerChange: function (e) {
    this.setData({
      couponList: [],
      loadOver: false,
      isLoading: true,
      pageIndex: 0,
      selectIndex: e.detail.value,
      selectCategory: this.data.categoryList[e.detail.value].CategoryID
    })
    if (this.data.selectCategory != 'C100' && this.data.selectCategory != 'C010' && this.data.selectCategory != 'C110') {
      this.setData({
        showCategoryName: this.data.categoryList[e.detail.value].CategoryName
      })
      wx.setStorageSync('showCategoryName', this.data.categoryList[e.detail.value].CategoryName)
    }
    else {
      this.setData({
        showCategoryName: "全部"
      })
      wx.setStorageSync('showCategoryName', "全部")
    }
    this.getMoreCouponList()
    wx.setStorageSync('selectCategory', this.data.categoryList[e.detail.value].CategoryID)
    wx.setStorageSync('selectIndex', e.detail.value)
  },
  selectByCategory: function (e) {
    console.log("selectByCategory");
    var selectNum = 0
    console.log(this.data.categoryList);
    this.data.categoryList.every(function (categoryItem, i) {
      console.log(e.currentTarget.dataset.categoryId);
      if (categoryItem.CategoryID == e.currentTarget.dataset.categoryId) {
        selectNum = i
        return false
      }
      return true
    })
    this.setData({
      couponList: [],
      loadOver: false,
      isLoading: true,
      pageIndex: 0,
      showCategoryName: "全部",
      selectCategory: e.currentTarget.dataset.categoryId,
      selectIndex: selectNum,
    })
    this.getMoreCouponList()
    wx.setStorageSync('showCategoryName', "全部")
    wx.setStorageSync('selectCategory', e.currentTarget.dataset.categoryId)
    wx.setStorageSync('selectIndex', selectNum)
  },
  selectByItemName: function () {
    console.log("selectByItemName");
    this.setData({
      couponList: [],
      loadOver: false,
      isLoading: true,
      pageIndex: 0
    })
    this.getMoreCouponList()
  },
  selectAll: function () {
    this.setData({
      couponList: [],
      pageIndex: 0,
      isLoading: true,
      loadOver: false,
      selectCategory: "all",
      showCategoryName: "全部",
      selectIndex: this.data.categoryList.length - 1,
      inputContent: ""
    })
    this.getMoreCouponList()
    wx.setStorageSync('showCategoryName', "全部")
    wx.setStorageSync('selectCategory', "all")
    wx.setStorageSync('inputContent', "")
    wx.setStorageSync('selectIndex', this.data.categoryList.length - 1)
  },
  bindInputChange: function (e) {
    this.setData({
      inputContent: e.detail.value
    })
    wx.setStorageSync('inputContent', e.detail.value)
  },
  setCouponInfo: function (e) {
    wx.setStorageSync('couponInfo', this.data.couponList[e.currentTarget.dataset.index])
  },
  onPullDownRefresh: function () {
   //console.log("onPullDownRefresh");   
    this.setData({
      couponList: [],
      loadOver: false,
      isLoading: true,
      pageIndex: 0
    });
    //console.log("after setData");
    //console.log("before refresh");
    this.getMoreCouponList();
   // console.log("after refresh");
    wx.stopPullDownRefresh();
  },
  onReachBottom: function () {
    this.setData({
      isLoading: true,
      loadOver: false,
      pageIndex: this.data.pageIndex + 1
    })
    this.getMoreCouponList()
  }
})
