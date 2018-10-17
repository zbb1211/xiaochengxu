//index.js
Page({
  onLoad() {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: '深圳市'
      },
      success(res) {
        const { data: { result } } = res;
        const { now: { temp, weather } } = result;
        console.log(temp, weather);
      }
    })
  }
})
