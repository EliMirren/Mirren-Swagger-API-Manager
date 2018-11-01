/**
<style>
  #masthead-tuijian hr {
    border-top-color: #563d7c;
  }

  #masthead-tuijian .btn-outline-inverse {
    color: #563d7c;
    text-shadow: none;
    background-color: #fff;
    border-color: #fff;

    padding: 10px 20px;

    letter-spacing: 3px;
  }

  #masthead-tuijian .btn-outline-inverse:hover {
    color: #fff;
    background-color: transparent;
  }

  #masthead-tuijian .slogon {
    display: inline-block;
    margin-top: 5px;
    font-size: 16px;
    color: #bdb0d4;
  }

  #masthead-tuijian .slogon:hover {
    color: #dcd2ef;
    text-decoration: none;
  }
</style>

<div id="masthead-tuijian">
  <hr>
  <a class="btn btn-outline-inverse btn-lg" href="https://juejin.im/welcome/frontend?utm_source=bootcss&utm_medium=word&utm_content=qianduan&utm_campaign=q4_website" onclick="_hmt.push(['_trackEvent', '首页巨幕', 'click', '掘金广告btn'])" target="_blank">访问前端社区</a>
  <p><a class="slogon" href="https://juejin.im/welcome/frontend?utm_source=bootcss&utm_medium=word&utm_content=qianduan&utm_campaign=q4_website" onclick="_hmt.push(['_trackEvent', '首页巨幕', 'click', '掘金广告link'])" target="_blank">来掘金，和更多前端开发者交流</a></p>
</div>

**/

/**
<div><a href="http://www.huodongxing.com/event/4411209831800?qd=bootstrap" onclick="_hmt.push(['_trackEvent', '文档右侧导航', 'click', 'APIcloud广告'])" target="_blank"><img src="../assets/img/apicloud.png"></a></div>
**/

var juejin=
''+
'<style>'+
    '#masthead-tuijian hr {'+
        'border-top-color: #563d7c;'+
    '}'+
  ''+
    '#masthead-tuijian .btn-outline-inverse {'+
        'color: #563d7c;'+
        'text-shadow: none;'+
        'background-color: #fff;'+
        'border-color: #fff;'+
  ''+
        'padding: 10px 20px;'+
  ''+
        'letter-spacing: 3px;'+
    '}'+
  ''+
    '#masthead-tuijian .btn-outline-inverse:hover {'+
        'color: #fff;'+
        'background-color: transparent;'+
    '}'+
  ''+
    '#masthead-tuijian .slogon {'+
        'display: inline-block;'+
        'margin-top: 5px;'+
        'font-size: 16px;'+
        'color: #bdb0d4;'+
    '}'+
  ''+
    '#masthead-tuijian .slogon:hover {'+
        'color: #dcd2ef;'+
        'text-decoration: none;'+
    '}'+
'</style>'+
  ''+
'<div id="masthead-tuijian">'+
    '<hr>'+
    '<a class="btn btn-outline-inverse btn-lg" href="https://juejin.im/welcome/frontend?utm_source=bootcss&utm_medium=word&utm_content=qianduan&utm_campaign=q4_website" onclick="_hmt.push([\'_trackEvent\', \'首页巨幕\', \'click\', \'掘金广告btn\'])" target="_blank">访问前端社区</a>'+
    '<p><a class="slogon" href="https://juejin.im/welcome/frontend?utm_source=bootcss&utm_medium=word&utm_content=qianduan&utm_campaign=q4_website" onclick="_hmt.push([\'_trackEvent\', \'首页巨幕\', \'click\', \'掘金广告link\'])" target="_blank">来掘金，和更多前端开发者交流</a></p>'+
'</div>';

// var apicloud = "<div><a href=\"http:\/\/www.huodongxing.com\/event\/4411209831800?qd=bootstrap\" onclick=\"_hmt.push(['_trackEvent', '文档右侧导航', 'click', 'APIcloud广告'])\" target=\"_blank\"><img src=\"..\/assets\/img\/apicloud.png\"><\/a><\/div>";

!function ($) {

  $(function () {
    $('#tuijian').replaceWith(juejin);
    // $(function(){
    //   $("nav.bs-docs-sidebar").prepend(apicloud);
    // });
    
  })

}(jQuery)
