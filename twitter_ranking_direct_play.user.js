// ==UserScript==
// @name         Twitter保存ランキング 直接再生
// @version      0.0.8
// @description  各種Twitter保存ランキングで動画を直接再生できるようにします (twihub.me, twidouga.net, twivideo.net, twiigle.com, twicoco.com, twidou.link)
// @match        *://twihub.me/v2/detail.php*
// @match        *://www.twidouga.net/*
// @match        *://twivideo.net/*
// @match        *://twiigle.com/*
// @match        *://twicoco.com/*
// @match        *://www.twidou.link/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// @author       Hidegon
// @updateURL    https://raw.githubusercontent.com/HidegonSan/TwitterRankingUserScript/main/twitter_ranking_direct_play.user.js
// @downloadURL  https://raw.githubusercontent.com/HidegonSan/TwitterRankingUserScript/main/twitter_ranking_direct_play.user.js
// @supportURL   https://github.com/HidegonSan/TwitterRankingUserScript/issues
// @homepage     https://github.com/HidegonSan/TwitterRankingUserScript
// ==/UserScript==

// License: WTFPL

(function() {
try {


function get_extension(url) {
  return url.split(".").slice(-1)[0].split("?")[0]
}


// twihub.me
if (location.origin == "https://twihub.me") {
  var card = document.getElementsByClassName("c_detail-card")[0]
  var video_url = document.querySelectorAll("a[href^='https://video.twimg.com/']")[0].href
  var video_extension = get_extension(video_url)
  var thumbnail_url = card.childNodes[0].childNodes[0].src
  var element = `<video controls="controls" preload="none" poster="${thumbnail_url}"><source src="${video_url}" type="video/${video_extension}"></video>`
  card.childNodes.forEach(e => { e.remove() })
  card.insertAdjacentHTML("afterbegin", element)
  card.style.cssText += "margin: auto!important;"
  card.childNodes[0].style.cssText += "max-height: 80vh;"
} // End of twihub.me


// twidouga.net
else if (location.origin == "https://www.twidouga.net") {
  document.querySelectorAll(".gazou > .poster > a[href^='https://video.twimg.com/']").forEach(function(e) {
    var video_url = e.href
    var video_extension = get_extension(video_url)
    var thumbnail_url = e.childNodes[0].src
    var element = `<video controls="controls" style="width: 300px; border-radius: 15px;" preload="none" poster="${thumbnail_url}"><source src="${video_url}" type="video/${video_extension}"></video><br>`
    e.parentNode.parentNode.insertAdjacentHTML("afterend", element)
    e.parentNode.parentNode.remove()
  })
} // End of twidouga.net


// twivideo.net
else if (location.origin == "https://twivideo.net") {
  var show_more_called = 0;

  if (!document.getElementById("read_page")) {
    document.getElementsByClassName("grids")[0].insertAdjacentHTML("afterend", '<div id="read_page" style="display: block;">もっと見る</div>')
    document.getElementById("read_page").addEventListener("click", function() {
	    var offset = document.querySelectorAll(".grids .art_li").length
	    var limit = 45
	    view_lists(offset, limit);
    });
  }

  function replace_to_video(start, end) {
    var videos = document.querySelectorAll(".item_image")
    for (var i=0; i<videos.length; i++) {
      if (start <= i && i <= end) {
        var video = videos[i]
        var video_url = video.childNodes[1].href
        var video_extension = get_extension(video_url)
        var thumbnail_url = video.childNodes[1].childNodes[1].src
        var element = `<video controls="controls" style="width: 100%; height: auto; object-fit: contain; border-radius: 3px;" preload="none" poster="${thumbnail_url}"><source src="${video_url}" type="video/${video_extension}"></video><br>`
        video.insertAdjacentHTML("afterbegin", element)
        video.childNodes[3].remove()
      }
    }
  }

  function patched_show_more() {
	  var video_counts = document.getElementsByClassName("art_li").length
    replace_to_video(45*show_more_called, 45*(show_more_called + 1) - 1)
    if ($) {
      setInterval(
        function() {
          $(".grids").masonry("reloadItems")
          $(".grids").masonry('layout')
        },
        500
      )
    }
	  if (video_counts < 1000 || video_counts < 0) {
      document.getElementById("read_page").style.display = "block"
      show_more_called += 1;
    }
	  else {
      document.getElementById("read_page").style.display = "none"
      return false
    }
  }

  show_more = patched_show_more;

} // End of twivideo.net


// twiigle.com
else if (location.origin == "https://twiigle.com") {
  document.querySelectorAll(".item_image").forEach(function(video) {
    var video_url = video.childNodes[1].href
    var video_extension = get_extension(video_url)
    var thumbnail_url = video.childNodes[1].childNodes[1].src
    var element = `<video controls="controls" style="width: 100%; height: auto; object-fit: contain; border-radius: 3px;" preload="none" poster="${thumbnail_url}"><source src="${video_url}" type="video/${video_extension}"></video><br>`
    video.insertAdjacentHTML("afterbegin", element)
    video.childNodes[3].remove()
  })
  if ($) {
    setInterval(
      function() {
        $(".grids").imagesLoaded(function() {
          $(".grids").masonry({
            itemSelector: ".art_li",
            gutterWidth: 0,
            isAnimated: true,
            isResizable: true
          });
        });
      },
      500
    )
  }
} // End of twiigle.com


// twicoco.com, www.twidou.link
else if (location.origin == "https://twicoco.com" || location.origin == "https://www.twidou.link") {
  document.querySelectorAll(".video-card").forEach(function(card) {
    var video_url = card.parentNode.href
    var video_extension = get_extension(video_url)
    var thumbnail_url = card.childNodes[0].childNodes[0].src
    var element = `<video controls="controls" style="width: 100%;" preload="none" poster="${thumbnail_url}"><source src="${video_url}" type="video/${video_extension}"></video><br>`
    card.parentNode.insertAdjacentHTML("afterend", element)
    card.remove()
  })
} // End of twicoco.com, www.twidou.link


} catch (e) { }
})()
