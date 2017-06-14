# 10 改掉你的壞習慣：ESLint 與 standard
+   1. 在 ESLint 與 standard 兩套裡面挑一套使用並通過檢測
+   2. 如果你喜歡分號，也歡迎使用分號版的semistandard
## 使用Lib
+   1. 使用有分號的semistandard來做語法檢測，安裝 semistandard
```code
    npm install -g semistandard
    npm install --save-dev semistandard
```

+   2. 使用 snazzy的格式，讓檢測結果顯示比較好看懂，安裝 snazzy
```code
    npm install -g snazzy
    npm install --save-dev snazzy
```

+   3. 在package.json設定 semistandard的ignore配置，避免檢驗到不必要的檔案
```json
    "semistandard": {
        "ignore": [
            "assets/css/",
            "assets/js/*.min.js",
            "node_modules/",
            "*.config.js",
            "gulpfile.js"
        ]
    }
```

+   4. 執行 semistandard --verbose | snazzy，檢測除了ignore配置之外的js

##  github.io 連結 
+   <https://yuanyu90221.github.io/frontend-intermediate-course/answers/hw10/> 