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
};
const QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
const mapWX = new QQMapWX({
  key: 'P3BBZ-EWBR3-JU33R-YF67X-YJ7W7-2HFXQ'
});
Page({
  data: {
    temp: 0,
    weather: '',
    imgSrc: '',
    dataList: [],
    todayDate: '',
    todayMinTemp: 0,
    todayMaxTemp: 0,
    city: '上海市'
  },
  getCityName() {
    let _this = this;
    wx.getLocation({
      success(res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        mapWX.reverseGeocoder({
          location: {
            latitude,
            longitude
          },
          success: (res) => {
            const { result: { address_component: { city } } } = res;
            _this.setData({
              city
            })
          },
          fail: (error) => {
            console.log('将经纬度转化为城市名称fail', error);
          }
        })
      },
      fail() {
        console.log('fail');
      },
      completed() {
        _this.getNowWeather();
      }
    });
  },
  getNowWeather(callback) {
    let _this = this;
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: _this.data.city
      },
      success: (res) => {
        const { data: { result } } = res;
        const { now: { temp, weather }, forecast, today } = result;
        const date = new Date();
        const time = date.getHours();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const todayDate = `${year}-${month}-${day}`;
        const tempArr = [];
        forecast.forEach(item => {
          const obj = {};
          obj.src=`/images/${item.weather}-icon.png`;
          obj.temp = item.temp;
          if (item.id === 0) {
            obj.id = "现在";
          } else {
            // obj.id = (parseFloat(time) + parseFloat(item.id)*3) > 24 ? ((parseFloat(time) + parseFloat(item.id)*3) - 24) + '时' : (parseFloat(time) + parseFloat(item.id)*3) + '时';
            obj.id = (item.id * 3 + time) % 24 + '时';
          }
          tempArr.push(obj)
        });
        this.setData({
          temp: temp,
          weather: weatherMap[weather],
          imgSrc: `/images/${weather}-bg.png`,
          dataList: tempArr,
          todayDate: todayDate,
          todayMinTemp: today.minTemp,
          todayMaxTemp: today.maxTemp
        });
        wx.setNavigationBarColor({
          backgroundColor: colorMap[weather],
          frontColor: '#000000'
      })
      },
      completed: () => {
        callback && callback();
      }
    });
  },
  onLoad() {
    this.getNowWeather();
  },
  onTapLocation() {
    this.getCityName();
  },
  togglePage() {
    wx.navigateTo({
      url: `/pages/list/list?city=${this.data.city}`
    })
  },
  onPullDownRefresh() {
    this.getNowWeather(() => {
      wx.stopPullDownRefresh();
    })
  }
})
