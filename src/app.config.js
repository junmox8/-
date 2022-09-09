export default defineAppConfig({
  pages: [
    "pages/my/index",
    "pages/admin/index",
    "pages/find/index",
    "pages/wenjuandetail/index",
    "pages/zhaomudetail/index",
    "pages/myApply/index",
    "pages/myNaire/index",
    "pages/handUpZhaomu/index",
    "pages/myNaireDetail/index",
    "pages/myApplyDetail/index",
    "pages/gengduo/index"
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  },
  tabBar: {
    backgroundColor: "#ffffff",
    list: [
      {
        text: "首页",
        iconPath: "./img/tabbar_home.png",
        selectedIconPath: "./img/首页-首页.png",
        pagePath: "pages/admin/index"
      },
      {
        text: "发现",
        iconPath: "./img/发现.png",
        selectedIconPath: "./img/发现-copy.png",
        pagePath: "pages/find/index"
      },
      {
        text: "我的",
        iconPath: "./img/tabbar_my.png",
        selectedIconPath: "./img/_我的.png",
        pagePath: "pages/my/index"
      }
    ]
  },
  subPackages: [
    {
      root: "pages/fankui",
      pages: ["fankuiDetail/index", "handUpFankui/index", "myFankui/index"]
    }
  ]
});
