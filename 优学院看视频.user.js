// ==UserScript==
// @name         优学院看视频
// @namespace    https://github.com/Brush-JIM/YouXueYuan-JavaScript
// @version      0.3
// @description  js没学过，技术纯属渣渣。可用来看优学院视频而不用手动点击。
// @author       Brush-JIM
// @match        https://ua.ulearning.cn/learnCourse/learnCourse.html?courseId=*&chapterId=*
// @grant        none
// @grant        unsafeWindow
// @run-at       document-idle
// @icon         https://www.ulearning.cn/ulearning/favicon.ico
// ==/UserScript==

(function() {
    'use strict';
    var elements = document.getElementsByClassName('operating-area')[0];
    //删除客服按钮
    elements.removeChild(document.getElementsByClassName('custom-service')[0]);
    //删除统计元素
    document.getElementById("statModal").parentNode.removeChild(document.getElementById("statModal"));
    //删除指导元素
    document.getElementsByClassName("user-guide")[0].parentNode.removeChild(document.getElementsByClassName("user-guide")[0]);
    //在原客服按钮增加上车按钮
    var div = document.createElement("div");
    div.setAttribute("class", "custom-service");
    div.setAttribute("style", "z-index:999999");
    div.innerHTML='<button class="btn-hollow" onclick="start_watch();"><span>上上上车~~~</span></button>';
    elements.appendChild(div);
    for (var i = 0;i <= 6;i++) {
        setTimeout(function() {
            //如果有倒计时，则删除
            try
            {
                document.getElementsByClassName("count-down")[0].parentNode.removeChild(document.getElementsByClassName("count-down")[0]);
            }
            catch (error) {
                console.log(error);
            }
        }, 3000);
    };
    //定义开始函数
    window.start_watch = function() {
        //删除开始按钮并增加停止按钮
        elements.removeChild(document.getElementsByClassName('custom-service')[0]);
        var div = document.createElement("div");
        div.setAttribute("class", "custom-service");
        div.setAttribute("style", "z-index:999999");
        div.innerHTML='<button class="btn-hollow" onclick="stop_watch();"><span>刹刹刹车~~~</span></button>';
        elements.appendChild(div);
        window.myVar = setInterval(function(){
            if (document.getElementsByClassName("file-media")[0] != null) {
                if (document.querySelector("[aria-label='Pause']") != null) {
                    if (document.querySelector("[data-bind='text: $root.i18nMessageText().finished']") == null) {
                        console.log('还未播放完');
                        return ;
                    }
                    else {
                        console.log('显示已看完，但是还未播完');
                    }
                }
                console.log('视频');
                if (document.querySelector("[data-bind='text: $root.i18nMessageText().finished']") == null) {
                    console.log('开始播放视频');
                    document.querySelector("[aria-label='Play']").click();
                    //修改倍速，1.5倍速变15倍速，1.25倍速变10倍速，0.75变5倍速
                    //请确定网速能跟得上
                    document.querySelector("input[value='1.50']").value = 15;
                    document.querySelector("input[value='1.25']").value = 10;
                    document.querySelector("input[value='0.75']").value = 5;
                    return ;
                }
                else {
                    console.log('视频播放完毕');
                }
            }
            console.log('下一页');
            window.koLearnCourseViewModel.goNextPage();
            for (var i = 0; i < document.querySelectorAll("[data-bind='text: $root.nextPageName()']").length; ++i) {
                console.log(document.querySelectorAll("[data-bind='text: $root.nextPageName()']")[i].innerHTML);
                if (document.querySelectorAll("[data-bind='text: $root.nextPageName()']")[i].innerHTML == "没有了") {
                    setTimeout(function(){
                        try
                        {
                            window.koLearnCourseViewModel.goBack();
                        }
                        catch (error)
                        {
                            console.log(error);
                        }
                    },3000);
                    clearInterval(window.myVar);
                    return (true);
                };
            };
            if (document.getElementsByClassName('modal-backdrop fade in')[0] != null) {
                console.log('提示框');
                if (document.querySelector("[data-bind='text: $root.i18nMsgText().gotIt']") != null) {
                    console.log('视频提示');
                    document.querySelector("[data-bind='text: $root.i18nMsgText().gotIt']").click();
                }
                else if (document.querySelector("[data-bind='text: $root.i18nMsgText().confirmLeave']") != null) {
                    console.log('未完成确认');
                    document.querySelector("[data-bind='text: $root.i18nMsgText().confirmLeave']").click();
                }
                else {
                    alert('未知情况，暂无应对方案，请将本页面截屏，返回给作者。');
                    return (false);
                }
            };
            for (i = 0;i <= 6;i++) {
                setTimeout(function() {
                    //如果有倒计时，则删除
                    try
                    {
                        document.getElementsByClassName("count-down")[0].parentNode.removeChild(document.getElementsByClassName("count-down")[0]);
                    }
                    catch (error) {
                        console.log(error);
                    }
                }, 3000);
            };
        }
                                   ,3000);
    };
    //定义停止函数
    window.stop_watch = function() {
        clearInterval(window.myVar);
        //删除停止按钮并增加开始按钮
        elements.removeChild(document.getElementsByClassName('custom-service')[0]);
        var div = document.createElement("div");
        div.setAttribute("class", "custom-service");
        div.setAttribute("style", "z-index:999999");
        div.innerHTML='<button class="btn-hollow" onclick="start_watch();"><span>上上上车~~~</span></button>';
        elements.appendChild(div);
        console.log('刹车成功');
    };
})();