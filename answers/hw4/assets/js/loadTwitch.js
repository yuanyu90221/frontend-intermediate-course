'use strict'
$(document).ready(function(){
    loadTwitch();
});
/**
 * 動態載入 Twitch API 個數
 */
function loadTwitch(){
    // 參考API ref https://dev.twitch.tv/docs/v5/reference/streams/#get-live-streams
    $.ajax({
        type: 'GET',
        url: 'https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends&limit=20',
        headers: {
        'Client-ID': '8ussvz4lfocpyaewqd7f9mmso7t4kj'
        },
        success: function(data) {
            removeLogo();
            makeBalance();
            // 取出 data 所需的streams arrray
            appendDataToDOM(data.streams);
        }
    });
}
/**
 * 把Twitch API 取得的 data array動態匯出
 * 
 * @param {any} data
 */
function appendDataToDOM(data){ 
  // 在 append 之前取的當下 .out_space下子節點個數
  var current_channel_num = getRenderChannelNums();
  // 這邊做了一個判端式用來處理 reload的時候不重複加入多超過20 +2(2個空結構用來預防跑版) 
  if(current_channel_num < 22){
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
    let view = (medium!==null)?medium:(small!==null)?small:(large!==null)?large:"./assets/images/view-default.jpg"; 
    let {logo, name, display_name} = channel;
    let logo_view = (logo!==null)?logo:"./assets/images/player-default.png";
    $('.out_space').prepend($(`<div class="live_cell">
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
}

function makeBalance(){
    $('.out_space').append($('<div class="live_cell"></div><div class="live_cell"></div>'));
}

function removeLogo(){
    $('.logo').remove();
}