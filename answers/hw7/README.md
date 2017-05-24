# 7 走向國際：i18n
+   1.可以只抓取某個語言的實況（可參考 Twitch API）
+   參考API ref <https://dev.twitch.tv/docs/v5/reference/streams/#get-live-streams>
+   加入 url Parameter language 選項可參考<https://help.twitch.tv/customer/portal/articles/1771242-language-codes-for-localized-directories>
+   2.提供按鈕切換語言
+   |   2.1 global變數 window.lang儲存目前所query的語系:en或 zh-tw
+   |   2.2 global變數 window.I18N['en']儲存英文語系對應的key value pair
+   |   2.3 global變數 window.I18N['zh-tw']儲存英文語系對應的key value pair  
## 使用Lib
+   1. jQuery on event監聽 click事件
```javascript
    $('.zh-toogle').off('click');
    $('.zh-toogle').on('click', function(){
        bindToogle('zh-tw');
    });
    $('.en-toogle').off('click');
    $('.en-toogle').on('click', function(){
        bindToogle('en');
    });
```

+   2. 利用 jQuery text修改文字內容
```javascript
function bindTitle(){
    $('.title').text(`${window.I18N[window.lang].TITLE}`);
}
```
##  github.io 連結 
+   <https://yuanyu90221.github.io/frontend-intermediate-course/answers/hw7/> 