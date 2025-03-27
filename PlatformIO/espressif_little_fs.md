使用LittleFS库操作Spiffs，不要使用SPIFFS.

## 需要手动挂载
```c++
#include <LittleFS.h>

void setup() {

    // 启动闪存文件系统
    if (!LittleFS.begin(true)) {
        Serial.println("LittleFS挂载失败");
        return;
    }

}
```
