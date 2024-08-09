## ScrollView使用注意事项
<https://docs.taro.zone/docs/components/viewContainer/scroll-view/>

### 横向滚动
> 微信小程序 中 ScrollView 组件如果设置 scrollX 横向滚动时，并且子元素为多个时（单个子元素时设置固定宽度则可以正常横向滚动），需要通过 WXSS 设置 `white-space: nowrap` 来保证元素不换行，并对 ScrollView 内部元素设置 `display: inline-block` 来使其能够横向滚动。
- **scroll-x="true"：** scroll默认纵向滚动，需要设置`:scroll-x="true"`
- **style：** 需要通过 WXSS 设置 `white-space: nowrap` 来保证元素不换行，并对 ScrollView 内部元素设置 `display: inline-block
` 来使其能够横向滚动


示例代码：
```js
<scroll-view :scroll-x="true" style="white-space: nowrap;" @scroll="scroll">
            <view id="demo1" style="display: inline-block; height: 100px;" >1</view>
            <view id="demo2" style="display: inline-block; height: 100px;" >2</view>
            <view id="demo3" style="display: inline-block; height: 100px;" >3</view>
</scroll-view>
```

### 纵向滚动
> H5 中 ScrollView 组件是通过一个高度（或宽度）固定的容器内部滚动来实现的，因此务必正确的设置容器的高度。例如: 如果 ScrollView 的高度将 body 撑开，就会同时存在两个滚动条（body 下的滚动条，以及 ScrollView 的滚动条）。

- 需要为ScrollView指定高度，为适应不同屏幕，一般采用动态高度
- 自定义refresher需要使用slot组件，slot name=`refresher`
- 自定义refresher需要手动设置refresher状态 `:refresher-triggered`
- 使用`refresherrefresh`方法来监听下拉刷新

示例代码：
```js
<scroll-view class="room-list"
                 :scroll-y="true"
                 lower-threshold="10"
                 :refresher-enabled="true"
                 :refresher-triggered="refresherTriggeredState"
                 refresher-default-style="none"
                 refresher-background="#E9E9E9"
                 @scrolltolower="loadMoreRooms"
                 @refresherrefresh="refresh"
                 :style="{ height: scrollViewHeight + 'px' }"
    >
      <Slot name='refresher'  style="width: 100%; height: 100rpx; display: flex; align-items: center; justify-content: center;">
        <view style="text-align: center; margin-top: 40rpx">
          <image src="../../images/pages/index/spiner.gif" style="width: 80rpx; height: 80rpx;"></image>
        </view>
      </Slot>
      <view class="room-item" v-for="(room, index) in roomList" :key="index">
        <view class="room-item-view flex-row">
            <text class="room-name text-inline">{{ room.name }}</text>
            <text class="room-desc text-inline">{{ room.desc }}</text>
        </view>
       </view>
</scroll-view>


<script>

  data() {
    return {
      refresherTriggeredState: false,
      scrollViewHeight: 0,
    };
  },
  methods: {
    loadMoreRooms(){
      console.log("loadMoreRooms")
    },
    refresh(){
      const self = this;
      self.refresherTriggeredState = true;
      setTimeout(() => {
        self.refresherTriggeredState = false;
      }, 500);
    },
  },
  onReady() {
    const app = Taro.getApp();
    console.log(app);
    try {
      const rpx2px = (rpx) => (rpx / 750) * Taro.getSystemInfoSync().windowWidth;
      Taro.getSystemInfo({
        success: (res) => {
          this.scrollViewHeight = res.windowHeight - rpx2px(340);// 动态设置scrollView高度
        },
      });
    } catch (e) {
      console.log(e);
    }
  },
</script>
```

