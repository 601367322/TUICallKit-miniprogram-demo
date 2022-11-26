const app = getApp();

Page({
  data: {
    isShowConversation: false,
    isShowConversationList: true,
    currentConversationID: '',
    unreadCount: 0,
    config: {
      userID: '',
      userSig: '',
      type: 1,
    },
  },
  onLoad(options) {
    this.init()
  },
  onReady() {

  },
  onShow() {

  },
  onHide() {

  },
  onUnload() {

  },
  init() {
    
    const TUIConversation = this.selectComponent('#TUIConversation');
    TUIConversation.init();
    wx.$chat_reportType = 'chat-uikit-wechat';
  },
  currentConversationID(event) {
    this.setData({
      isShowConversation: true,
      isShowConversationList: false,
      currentConversationID: event.detail.currentConversationID,
      unreadCount: event.detail.unreadCount,
    }, () => {
      const TUIChat = this.selectComponent('#TUIChat');
      TUIChat.init();
    });
  },
  showConversationList() {
    this.setData({
      isShowConversation: false,
      isShowConversationList: true,
    }, () => {
      const TUIConversation = this.selectComponent('#TUIConversation');
      TUIConversation.init();
    });
  },
  
  sendMessage(event) {
    this.selectComponent('#TUIChat').sendMessage(event);
  }
})