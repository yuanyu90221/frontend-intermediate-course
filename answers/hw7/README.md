# 5 讓網頁變得更完整：加上 placeholder 與 infinite scroll
+   1. 你可以拿我們在第一次作業用的這張圖當作 placeholder。
+   利用設定img 的backgorund把原本的view-default.jpg當作placeholder
+   <http://stackoverflow.com/questions/32909488/how-do-i-make-a-placeholder-image-in-html-if-the-original-image-hasnt-been-foun>
+   2. 必須先出現佔位圖，等圖片載入完成再顯示真的圖片
+   3. infinite scroll 的部分，可以參考 Twitch API 的 limit 跟 offset 這兩個參數
+   新增一個全域變數 current_pages來決定offset : `let current_page = 0;`
+   每次ajax結束就做累加 : `current_pages+=20;`
## 使用Lib
+   1.利用 $(window).scroll 這個method來確認 是否有scroll到網頁底部
+   ref: <http://stackoverflow.com/questions/3898130/check-if-a-user-has-scrolled-to-the-bottom>
+   2.利用 $('.out_space > .live_cell').slice(-2).remove()來移除每次用來做padding的div
+   ref: <http://stackoverflow.com/questions/6623445/remove-3-last-divs-with-jquery>
+   3.利用 img background設定底圖
+   ref:<http://stackoverflow.com/questions/32909488/how-do-i-make-a-placeholder-image-in-html-if-the-original-image-hasnt-been-foun>
##  github.io 連結 
+   <https://yuanyu90221.github.io/frontend-intermediate-course/answers/hw5/> 