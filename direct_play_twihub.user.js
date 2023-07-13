// ==UserScript==
// @name         TwiHub直再生
// @namespace    https://github.com/HidegonSan/TwiHub-AutoRedirect/
// @version      0.0.3
// @description  TwiHubで動画を直接再生できるようにします
// @author       Hidegon
// @match        *://twihub.me/v2/detail.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twihub.me
// @grant        none

// ==/UserScript==

try {

var card = document.getElementsByClassName("c_detail-card")[0]
var video_url = document.querySelectorAll("a[href^='https://video.twimg.com/']")[0].href
var video_extension = video_url.split(".").slice(-1)[0].split("?")[0]
var element = `<video controls=""><source src="${video_url}" type="video/${video_extension}"></video>`

card.childNodes.forEach(e => { e.remove() })
card.insertAdjacentHTML("afterbegin", element)
card.style.cssText += "margin: auto!important;";
card.childNodes[0].style.cssText += "max-height: 80vh;"

} catch (e) {}
