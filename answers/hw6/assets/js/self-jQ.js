window.$ = function(queryArgs){
    return (document.querySelectorAll(queryArgs).length > 1)? document.querySelectorAll(queryArgs): document.querySelector(queryArgs); 
};
/**
 * get document content
 */
window.getChildren = function(queryArgs){
    return (document.querySelector(queryArgs).children);
}
/**
 * append content
 */
window.append = function(queryArgs, content){
    (document.querySelector(queryArgs)).innerHTML+= content;
};

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