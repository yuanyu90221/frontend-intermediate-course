'use strict'
let current_pages = 0;
let isLoading = false;
document.addEventListener("DOMContentLoaded", function(){
    loadTwitch(appendDataToDOM , true);
    window.addEventListener('scroll', function(){
        if(window.innerHeight + window.scrollY == document.body.scrollHeight && (isLoading == false)){
                        // 滑到底部的時候
            setTimeout(loadTwitchAPI, 2000);
        }
    });
});
function loadTwitchAPI(){
    loadTwitch(appendDataToDOM, false);
}
/**
 * 動態載入 Twitch API 個數
 */
function loadTwitch(cb, isFirst){
    isLoading = true;
    // 參考API ref https://dev.twitch.tv/docs/v5/reference/streams/#get-live-streams
    
    window.request('GET',
    `https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends&limit=20&offset=${current_pages}&client_id=8ussvz4lfocpyaewqd7f9mmso7t4kj`,
     (data)=>{
        removeLogo();
        removelastTwo();
        // 取出 data 所需的streams arrray
        cb(data.streams,isFirst);
        makeBalance();
        current_pages+=20;
        isLoading = false;
     },(err)=>{
        console.log(err);
        isLoading = false;
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
    return window.getChildren('.out_space').length;
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
    
    window.append('.out_space',`<div class="live_cell">
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
                               </div>`);
}

function makeBalance(){
    window.append('.out_space','<div class="live_cell"></div><div class="live_cell"></div>');
}

function removeLogo(){
    window.remove('.logo');
}

function removelastTwo(){   
   if($('.out_space > .live_cell')!==null){
    let last2 = Array.from ($('.out_space > .live_cell'));
    if(last2.length > 2){
        last2 = last2.slice(-2);
    }
    last2.forEach((item)=>{
        item.remove();
    });
   }
}