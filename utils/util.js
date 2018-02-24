function formatTime(date) {
  var date = new Date(parseInt(date)*1000);
  //console.log(date.get);
  var year = date.getFullYear();
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function sortBywlPriceAfter(a, b) {
  return a.wlPrice_after - b.wlPrice_after
}

function sortBySales(a, b) {
  return b.sales - a.sales
}

function sortByDiscount(a, b) {
  return b.discount - a.discount
}

function calculateDiscountRate(coupon) {
  var rate = parseFloat(coupon.discount) * 100 / parseFloat(coupon.wlPrice);
  coupon["discountRate"] = Math.round(rate).toString();
  return coupon;
}

function sortByDiscountRate(a, b) {  
  return parseInt(b.discountRate) - parseInt(a.discountRate)
}

function sortByCategory(categoryId){
  var categoryList = [{id:"C100",name:"家居"},{id:"C010",name:"女装"},{id:"C110",name:"美食"}];
  var category = "";
  for(var i=0;i<categoryList.length;i++){
    if ("" != categoryId && categoryId == categoryList[i].id){
      category = categoryList[i].name;
    } 
  }
  //var reg = new RegExp(category);
  //var couponLocalList = [];
  
 return category;
}

module.exports = {
  formatTime: formatTime,
  formatNumber:formatNumber,
  sortBywlPriceAfter: sortBywlPriceAfter,
  sortBySales: sortBySales,
  sortByDiscount:sortByDiscount,
  calculateDiscountRate: calculateDiscountRate,
  sortByDiscountRate: sortByDiscountRate,
  sortByCategory: sortByCategory
}
