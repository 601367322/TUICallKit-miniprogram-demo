import TIM from './lib/tim-wx-sdk';
import {
  genTestUserSig
} from './debug/GenerateTestUserSig'
import AppTuicallkitDelegate from './app-tuicallkit-delegate';

App({
  onLaunch: function () {
    //初始化TIM
    var tim = TIM.create({
      SDKAppID: this.globalData.config.SDKAPPID,
    });
    wx.$TUIKit = tim;

    //账号信息
    const userSig = genTestUserSig(this.globalData.config).userSig
    wx.$chat_SDKAppID = this.globalData.config.SDKAPPID;
    wx.$TUIKitTIM = TIM;
    wx.$chat_userID = this.globalData.config.userID;
    wx.$chat_userSig = userSig;

    AppTuicallkitDelegate.init({
      tim: tim,
      userId: this.globalData.config.userID,
      sdkAppId: this.globalData.config.SDKAPPID,
      userSig: userSig,
    });
  },

  globalData: {
    config: {
      userID: xxx, //User ID
      SECRETKEY: xxx, // Your secretKey
      SDKAPPID: xxx, // Your SDKAppID
      EXPIRETIME: 604800,
    },
  },
  onSDKReady() {

  },
});