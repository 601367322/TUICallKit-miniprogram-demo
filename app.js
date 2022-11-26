import TIM from './lib/tim-wx-sdk';
import {
    genTestUserSig
} from './debug/GenerateTestUserSig'
import { TUICallEngine } from './components/TUICallKit/TUICallEngine/tuicall-engine-wx';

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

        //创建TUICallEngine
        wx.$TUICallEngine = TUICallEngine.createInstance({
            tim: wx.$TUIKit,
            sdkAppID: wx.$chat_SDKAppID,
        });

        //添加INVITED监听
        this.addTUICallEngineEvent();

        //初始化TUICallEngine
        wx.$TUICallEngine.init({
            userID: wx.$chat_userID,
            userSig: wx.$chat_userSig,
        })
    },

    addTUICallEngineEvent() {
        wx.$TUICallEngine.on('INVITED', this.handleNewInvitationReceived, this);
    },

    handleNewInvitationReceived(event) {
        wx.$TUICallEngine.off('INVITED', this.handleNewInvitationReceived, this);
        wx.navigateTo({
            url: '/pages/calling/calling?value=' + JSON.stringify(event),
        })
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