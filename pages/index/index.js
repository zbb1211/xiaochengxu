//index.js
const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}
const colorMap = {
  'sunny': '#c4efff',
  'cloudy': '#daeff7',
  'overcast': '#c4ced2',
  'lightrain': '#b6d6e2',
  'heavyrain': '#c3ccd0',
  'snow': '#99e3ff'
}
Page({
  data: {
    temp: 0,
    weather: '',
    imgSrc: ''
  },
  onLoad() {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: '深圳市'
      },
      success: (res) => {
        const { data: { result } } = res;
        const { now: { temp, weather } } = result;
        this.setData({
          temp: temp,
          weather: weatherMap[weather],
          imgSrc: `/images/${weather}-bg.png`
        });
        wx.setNavigationBarColor({
          backgroundColor: colorMap[weather],
          frontColor: '#000000'
      })
      }
    });
  }
})
