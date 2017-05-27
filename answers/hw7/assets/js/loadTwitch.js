'use strict'
let current_pages = 0;
let isLoading = false;
window.lang = 'en';
$(document).ready(function(){
    bindTitle();
    loadTwitch(appendDataToDOM , true);
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height() && (isLoading == false)) {
            isLoading = true;
            // 滑到底部的時候
            setTimeout(loadTwitchAPI, 1000);
        }
    });
    $('.zh-toogle').off('click');
    $('.zh-toogle').on('click', function(){
        bindToogle('zh-tw');
    });
    $('.en-toogle').off('click');
    $('.en-toogle').on('click', function(){
        bindToogle('en');
    });
});
function bindTitle(){
    $('.title').text(`${window.I18N[window.lang].TITLE}`);
}
function loadTwitchAPI(){
    loadTwitch(appendDataToDOM, false);
}
function setLang(lng){
    window.lang = lng;
}
function bindToogle(lng){
    current_pages = 0;
    setLang(lng);
    $('.live_cell').remove();
    loadLogo();
    loadTwitch(appendDataToDOM, false);
}

function loadLogo(){
    $('.out_space').append(`<div class="logo"></div>`);
}
/**
 * 動態載入 Twitch API 個數
 */
function loadTwitch(cb, isFirst){
    bindTitle();
    // isLoading = true;
    let qLang = `${window.lang}`;
    // 參考API ref https://dev.twitch.tv/docs/v5/reference/streams/#get-live-streams
    $.ajax({
        type: 'GET',
        url: `https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends&limit=20&offset=${current_pages}&language=${qLang}`,
        headers: {
        'Client-ID': '8ussvz4lfocpyaewqd7f9mmso7t4kj'
        },
        success: function(data) {
            removeLogo();
            removelastTwo();
            // 取出 data 所需的streams arrray
            cb(data.streams,isFirst);
            makeBalance();
            current_pages+=20;
            isLoading = false;
        },
        error: function(error){
            console.log(error);
            isLoading = false;
        }
    });
}
/**
 * 把Twitch API 取得的 data array動態匯出
 * 
 * @param {any} data
 * @param {boolean} isFirst
 */
function appendDataToDOM(data, isFirst){ 
  // 在 append 之前取的當下 .out_space下子節點個數
  var current_channel_num = getRenderChannelNums();
  // 這邊做了一個判端式用來處理 reload的時候不重複加入多超過20 +2(2個空結構用來預防跑版) 
  if(isFirst == true){
    if(current_channel_num < 22){
        if(data&&data.length > 0 ){
            data.forEach((data)=>{
                appendData(data);
            });
        }
    }
  }
  else{
     if(data&&data.length > 0 ){
        data.forEach((data)=>{
            appendData(data);
        });
    } 
  }
}
/**
 * 取得當下 out_space內的 第一層子節點個數
 * 
 * @returns out_space內的 第一層子節點個數
 */
function getRenderChannelNums(){
    return $('.out_space').children().length;
}
/**
 * 把stream物件動態匯出來
 * 
 * @param {any} streamObj stream的物件
 */
function appendData(streamObj){
    let {preview, channel} = streamObj;
    let {medium,large, small} = preview;
    if(medium==null&&small==null&&large==null){
        console.log(preview);
    }
    let view = (medium!==null)?medium:(small!==null)?small:(large!==null)?large:"./assets/images/view-default.jpg"; 
    let {logo, name, display_name} = channel;
    let logo_view = (logo!==null)?logo:"./assets/images/player-default.png";
    // console.log(logo_view);
    $('.out_space').append($(`<div class="live_cell">
                                    <img src="${view}"/>
                                     <div class="player_part">
                                        <div class="player_logo">
                                            <img src="${logo_view}"/>
                                        </div>
                                        <div class="player_text">
                                            <span>${display_name}</span>
                                            <span>${name}</span>
                                        </div>
                                    </div> 
                               </div>`)).fadeIn();
   // bind loading img error handle
   // 新增對於load img error的處理
    $('.player_logo img').off('error'); 
    $('.player_logo img').on('error',(e)=>{
        console.log('logo loading error!');
        e.target.src = './assets/images/player-default.png';
    });

    
}

function makeBalance(){
    $('.out_space').append($('<div class="live_cell"></div><div class="live_cell"></div>'));
}

function removeLogo(){
    $('.logo').remove();
}

function removelastTwo(){
    $('.out_space > .live_cell').slice(-2).remove();
}