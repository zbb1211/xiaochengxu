// pages/list/list.js
const dateMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
const formatTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const time = `${year}-${month}-${day}`;
  return time;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },
  getData(callback) {
    const time = new Date().getTime();
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/future',
      data: {
        city: '深圳市',
        time: time
      },
      success: (res) => {
        const { data: { result } } = res;
        const temp = [];
        result.forEach((item, index) => {
          const obj = {};
          const date = new Date();
          const today = date.getDate();
          date.setDate(today + index);
          const weekDay = date.getDay();//星期几
          obj.id = index;
          obj.day = index === 0 ? '今天' : dateMap[weekDay];
          obj.time = formatTime(date);
          obj.temp = `${item.minTemp}° - ${item.maxTemp}°`;
          obj.iconpath = `/images/${item.weather}-icon.png`;
          temp.push(obj);
          this.setData({
            list: temp
          });
        });
      },
      completed: (callback) => {
        callback && callback();
      }
    });
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})