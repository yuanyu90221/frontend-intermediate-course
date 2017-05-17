# 6 返璞歸真：vanilla js
+   1. 把原本使用到 jQuery 的地方全部換成不需要 jQuery
# 禁止使用任何的 JavaScript library
#   我實作的lib: self-jQ.js
+   1. 利用global 變數 window作用域，把一些全域變數以及method放到上面
+   2. 實作 window.$ 
<pre>
/**
 * query selector $
 */
window.$ = function(queryArgs){
    return (document.querySelectorAll(queryArgs).length > 1)? document.querySelectorAll(queryArgs): document.querySelector(queryArgs); 
};
</pre>

+   3. 利用 innerHTML實作 append: window.append(queryArgs, content)
<pre>
/**
 * append content
 */
window.append = function(queryArgs, content){
    (document.querySelector(queryArgs)).innerHTML+= content;
};
</pre>

+   4. 利用 documnet.children 實作 getChildren:
<pre>
/**
 * get document children content
 */
window.getChildren = function(queryArgs){
    return (document.querySelector(queryArgs).children);
}
</pre>

+   5. 利用 document.remove 實作 remove:
<pre>
/**
 * remove content
 */
window.remove = function(queryArgs){
    let results = $(queryArgs);
    if(results!=null){
        if(Object.keys(results).length > 0){
            results.forEach((result)=>{
                result.remove();
            });
        } 
        else{
            results.remove();
        }
    }
}
</pre>

+   6. 利用 XMLHttpRequest實作 request:
<pre>
/**
 * request method
 * 
 * @param {any} type 
 * @param {any} url 
 * @param {any} opts 
 * @param {any} callback 
 * @param {any} errorcb 
 */
function request(type, url, opts, callback, errorcb){
    let xhr = new XMLHttpRequest();
    if(typeof opts === 'function'){
        errorcb = callback;
        callback = opts;
        opts = null;
    }
    xhr.open(type,url);
    let fd = new FormData();
    if(type === 'POST' && opts){
        for(var key in opts){
            fd.append(key, JSON.stringify(opts[key]));
        }
    }
    xhr.onload = function (){
        callback(JSON.parse(xhr.response));
    };
    xhr.onerror = function(){
        errorcb(JSON.parse(xhr.reponse));
    };
    xhr.send(opts?fd:null);
}

window.request = request;
</pre>

+   7. 利用window.innerHeight + window.scrollY == document.body.scrollHeight 關係式以及 window scroll事件偵測 scroll down
<pre>
window.addEventListener('scroll', function(){
    if(window.innerHeight + window.scrollY == document.body.scrollHeight){
                    // 滑到底部的時候
        loadTwitch(appendDataToDOM, false);
    }
});
</pre>

+   8. 利用DOMContentLoaded 事件 偵測 $document.ready

##  github.io 連結 
+   <https://yuanyu90221.github.io/frontend-intermediate-course/answers/hw6/> 