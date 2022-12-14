import { TUICallEngine } from "./components/TUICallKit/TUICallEngine/tuicall-engine-wx";

var AppTUICallKitDelegate = {

  TYPE_INVITE: "invite",
  TYPE_CALL: "call",

  init({tim,sdkAppId,userId,userSig}) {
    //创建TUICallEngine
    wx.$TUICallEngine = TUICallEngine.createInstance({
      tim: tim,
      sdkAppID: sdkAppId,
    });

    //添加INVITED监听
    this.addTUICallEngineEvent();

    //初始化TUICallEngine
    wx.$TUICallEngine.init({
      userID: userId,
      userSig: userSig,
    })
  },

  addTUICallEngineEvent() {
    wx.$TUICallEngine.on('INVITED', this.handleNewInvitationReceived, this);
  },

  removeTUICallEngineEvent() {
    wx.$TUICallEngine.off('INVITED', this.handleNewInvitationReceived, this);
  },

  /**
   * 监听新的邀请
   */
  handleNewInvitationReceived(event) {
    this.removeTUICallEngineEvent();
    this.navigateTo(this.TYPE_INVITE, event);
  },

  /**
   * 监听主动拨打
   */
  handleNewCall(event) {
    this.removeTUICallEngineEvent();
    this.navigateTo(this.TYPE_CALL, event);
  },

  navigateTo(type, event) {
    wx.navigateTo({
      url: '/pages/calling/calling?type=' + type + '&event=' + JSON.stringify(event),
    })
  }
}
export default AppTUICallKitDelegate



