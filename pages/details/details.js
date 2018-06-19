const app = getApp();
import { weiboData } from './data.js';
let wxparse = require("../../wxParse/wxParse.js");
Page({
  data: {
    discussList: []
  },
  onLoad: function (options) {
    this.setData({
      discussList: weiboData.data.cards[0].card_group
    });
    wx.setNavigationBarTitle({
      title: options.id
    });
    console.log(this.data.discussList);
    wxparse.wxParse('dkcontent', 'html', this.data.dkcontent, this, 5);  
  }
});