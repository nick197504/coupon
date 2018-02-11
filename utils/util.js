function formatTime(date) {
  var year = date.getFullYear()
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

module.exports = {
  formatTime: formatTime,
  formatNumber:formatNumber,
  sortBywlPriceAfter: sortBywlPriceAfter,
  sortBySales: sortBySales,
  sortByDiscount:sortByDiscount,
  calculateDiscountRate: calculateDiscountRate,
  sortByDiscountRate: sortByDiscountRate
}
