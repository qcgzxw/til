## 点按事件兼容pc和h5
h5 按下弹起事件分别是 `onTouchStart` `onTouchEnd`
pc 按下弹起事件分别是 `onMouseDown` `onMouseUp`

对于想要同事兼容pc和h5点按的情况，需要根据不同的设备监听不同的事件。如：
```js
import {isPc} from "../utils/agent";

export const CommonClickBox = ({ className, onTouchStart, onTouchEnd }) => {
  return <>
    {
      isPc
        ?
        <div className={className}
          onMouseDown={onTouchStart}
          onMouseUp={onTouchEnd}
        ></div>
        :
        <div className={className}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        ></div>
    }
  </>
}

```

不要同时监听`onTouchStart` `onMouseDown`，会导致触发两次。

