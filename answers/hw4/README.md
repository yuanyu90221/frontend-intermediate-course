# 4 從假資料到真資料：Ajax 與 API 串接
+   1 Twitch API裡面有一個 API 是可以拿到現在正在直播的某個遊戲底下的資料，API 的描述是「Gets a list of live streams.」，
+     看到這行就代表你找對 API 了。
+   2 API 要帶的參數有一個 game 的欄位，請帶League%20of%20Legends
+   3 請顯示 20 個實況，不多不少，要剛好 20 個
## 參考API
+   <https://dev.twitch.tv/docs/v5/reference/streams/#get-live-streams>
## 使用Lib
+   1.JQuery 配置(先在.bowerrc檔案內定義 bower lib 安裝位置，使用`bower install jquery`安裝 jquery)
+   2.利用 $(document).ready 設定 DOM Ready之後 load data的邏輯

<pre>
    $(document).ready(function(){
        // 自定義 DOM ready 邏輯
    });
</pre>

+   3.利用$.prepend這個method 將資料動態塞入資料最前方

<pre>
      $('.out_space').prepend(
          //要顯示的div
      );
</pre>

+   4.利用$.children.length 算出當下子元素的個數

<pre>
    $('.out_space').children().length;
</pre>

##  github.io 連結 
+   <https://yuanyu90221.github.io/frontend-intermediate-course/answers/hw4/> 