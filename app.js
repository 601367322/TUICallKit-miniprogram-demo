import TIM from './lib/tim-wx-sdk';
import {
    genTestUserSig
} from './debug/GenerateTestUserSig'
import appTuicallkitDelegate from './app-tuicallkit-delegate';

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

        appTuicallkitDelegate.init();
    },

    globalData: {
        config: {
            userID: '111', //User ID
            SECRETKEY: 'a00bb702118c491d8f6a7f315d47c767d7d6d4b46cc70e928dc7db4d1434e751', // Your secretKey
            SDKAPPID: 1400486080, // Your SDKAppID
            EXPIRETIME: 604800,
        },
    },
    onSDKReady() {

    },
});