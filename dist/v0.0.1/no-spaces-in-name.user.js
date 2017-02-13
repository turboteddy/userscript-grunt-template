// ==UserScript==
// @name         no-spaces-in-name
// @description  This is what my userscript does
// @version      0.0.1
// @author       Simon Berdal
// @license      MIT
// @include      http*://*somedomain.com/moreSpecific/*
// @grant        none
// @run-at       document-idle
// @noframes     true
// ==/UserScript==

(function () {
    'use strict';

    console.groupCollapsed('userscript starting (util) ...');

    my = my || {};    
    my.util = {

        addCSS : function (css) {
            var head = document.getElementsByTagName('head')[0], style;
            if (!head) return;
            style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = css;
            head.appendChild(style);
        }
    };

    my.util.addCSS('#my-userscript-wrap{position:fixed;z-index:100;top:0;left:0;width:100%;background-color:#000;height:36px;display:none}');
    console.log('CSS injected into page now');
      
    console.groupEnd();
})();
