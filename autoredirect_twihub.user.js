// ==UserScript==
// @name         TwiHub自動リダイレクト
// @namespace    https://github.com/HidegonSan/TwiHub-AutoRedirect
// @version      0.0.2
// @description  TwiHubのリダイレクトページで、自動リダイレクトします。
// @author       Hidegon
// @match        *://twihub.me/v2/detail.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twihub.me
// @grant        none
// ==/UserScript==

location.href = document.querySelectorAll("a[href^='https://video.twimg.com/']")[0].href || "https://twihub.me/";
