# 8 當我們包在一起：Webpack
+   1.使用 Webpack，把 jQuery 以及其他 js 檔案都打包成一個bundle.js
+   參考說明 ref <http://ithelp.ithome.com.tw/articles/10188007>

## 使用Lib
+   0. 使用 import 讀入 utils,使用 require讀入 jquery
```javascript
   import utils from '../i18n/utils.js';
    window.$ = require('jquery');
    window.JQuery = $; 
```

+   1. jQuery on event監聽 click事件 加入isLoading Detection
```javascript
    $('.zh-toogle').off('click');
    $('.zh-toogle').on('click', function(){
        if(isLoading==false){
            bindToogle('zh-tw');
        }
        else{
            alert('loading is busy');
        }
    });
    $('.en-toogle').off('click');
    $('.en-toogle').on('click', function(){
        bindToogle('en');
    });
```

+   2. 利用 jQuery text修改文字內容 改用 module.export的 util
```javascript
function bindTitle(){
   let currentLang = utils.getI18n('TITLE',`${window.lang}`);
    $('.title').text(currentLang);
}
```

+   3. 需要注意的事情是 import跟 require不能混著用, 舉例來說i18n.js與 utils.js內都是用require
+   i18n.js
```javascript
    module.exports = {
        "en": require('./en.json'),
        "zh-tw": require('./zh-tw.json')
    };
```

+   utils.js
```javascript
    const I18N = require('./i18n.js');
    /**
    * 取得i18n key
    * 
    * @param {any} id 
    * @param {any} region 
    * @returns 
    */
    function getI18n(id, region){
        if(!region||!I18N[region]){
            region = 'en';
        }
        return I18N[region][id];
    }

    module.exports = {
        "getI18n": getI18n
    };
```

+   4. 使用 json-loader 讀入.json
```javascript
    module: {
        rules: [
            {
                test: /\.json$/,
                use: 'json-loader'
            }
        ]
    }
```

+   5. 由於我的專案中用了 es6 語法 為了能夠使用使用 es2015語法的套件 
+      需要使用 babel-loader先把 所有js檔 轉換成 es2015 語法
+   安裝 babel, babel-loader, babel-preset-es2015
```code
    npm i babel babel-loader babel-preset-es2015 --save-dev
```

+   在 rule內新增 babel-loader 設定
+   webpack.config.js設定
```code
    {
        test: /\.js$/,
        loaders: ['babel-loader?presets[]=es2015']
    }
```
##  github.io 連結 
+   <https://yuanyu90221.github.io/frontend-intermediate-course/answers/hw8/> 