// ==UserScript==
// @name         优学院-YouXueYuan-看视频
// @namespace    https://github.com/Brush-JIM/YouXueYuan-JavaScript
// @version      1.0
// @description  js没学过，技术纯属渣渣。可用来看优学院视频而不用手动点击。
// @author       Brush-JIM
// @match        https://ua.ulearning.cn/learnCourse/learnCourse.html?courseId=*&chapterId=*
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @grant        unsafeWindow
// @run-at       document-start
// @icon         https://www.ulearning.cn/ulearning/favicon.ico
// ==/UserScript==

(function() {
    'use strict';
    //删除统计元素
    document.getElementById("statModal").parentNode.removeChild(document.getElementById("statModal"));
    //删除指导元素
    document.getElementsByClassName("user-guide")[0].parentNode.removeChild(document.getElementsByClassName("user-guide")[0]);
    //侧边栏
    var cbl = document.createElement("div");
    cbl.setAttribute("style", "width: 60px;height: 74px;overflow: hidden;position: fixed;right: 10px;bottom: 10%;padding: 4px;background-color: #06a9f4;z-index: 9999;/* border-radius: 8px 0px 0px 8px; *//* box-shadow: rgba(0, 85, 255, 0.098) 0px 0px 20px 0px; */border: 1px solid rgb(233, 234, 236);");
    //cbl.setAttribute('style',"display:table-cell;*display:inline-block;*float:left;width:60px;height:70px;vertical-align:middle;border:1px solid #e3e3e9;margin:0;background-color:#fff;");
    cbl.setAttribute("id","set-auto");
    cbl.innerHTML='<div style="cursor: pointer; text-align: center; padding: 0px;"><span id="set-auto" style="font-size: 12px;line-height: 16px;color: rgb(255, 255, 255);">设置<br />&<br />开关</span></div>';
    document.querySelector('body').appendChild(cbl);
    var xfk = document.createElement('div');
    xfk.setAttribute("style", "position: fixed;height: 300px;bottom: 10%;z-index: 9999;right: 70px; display: none;");
    xfk.setAttribute("id", "set-mune-hide");
    xfk.innerHTML = '<div style="display: block;overflow: hidden;height: 300px;width: 300px;/* border-radius: 8px; *//* box-shadow: rgba(106, 115, 133, 0.22) 0px 6px 12px 0px; */border: 1px solid rgb(233, 234, 236);background-color: rgb(255, 255, 255);"><div style="display: block; border-bottom: 1px solid rgb(230, 230, 230); height: 35px; line-height: 35px; margin: 0px; padding: 0px; overflow: hidden;"><span style="float: left;display: inline;padding-left: 8px;font: 700 14px/35px SimSun;">设置 & 开关</span></div><div style="display: block; position: absolute; top: 36px; width: 100%; height: calc(100% - 36px);"><div style="height: 100%; overflow: auto; padding: 0px 12px; margin: 0px;"><div><label style="display: inline;" title="调速">现在倍速：<input id="speed" type="text"></label></div><div><label style="display: inline;" title="静音"><input id="video_muted" type="checkbox">静音</label></div><div><label style="display: inline;" title="开始/停止"><button id="startstop">开始学习</button></label></div></div></div></div>';
    document.querySelector('body').appendChild(xfk);
    var speed;
    var muted;
    if (unsafeWindow.localStorage.getItem('speed') == null)
    {
        speed = '1';
    }
    else
    {
        speed = unsafeWindow.localStorage.getItem('speed');
    }
    if (unsafeWindow.localStorage.getItem('muted') == null)
    {
        muted = false;
    }
    else
    {
        if (unsafeWindow.localStorage.getItem('muted') == 'true')
        {
            muted = true;
        }
        else
        {
            muted = false
        }
    }
    for (var i = 0;i <= 6;i++) {
        setTimeout(function() {
            if (unsafeWindow.koLearnCourseViewModel == undefined)
            {
                console.log('函数查找失败');
            }
            else
            {
                console.log('函数存在')
            }
        }, 6000);
    }
    document.querySelector('input[id="speed"]').value = speed;
    document.querySelector('input[id="video_muted"]').checked = muted;
    $("#set-auto").click(
        function()
        {
            if (document.querySelector('body').querySelector('span[id="set-auto"]').innerText == '设置\n&\n开关')
            {
                document.querySelector('div[id="set-mune-hide"]').setAttribute('style','position: fixed;height: 300px;bottom: 10%;z-index: 9999;right: 70px;');
                document.querySelector('div[id="set-mune-hide"]').setAttribute('id','set-mune-unhide');
                document.querySelector('body').querySelector('span[id="set-auto"]').innerHTML = '保存<br />or<br />隐藏';
            }
            else
            {
                document.querySelector('div[id="set-mune-unhide"]').setAttribute('style','position: fixed;height: 300px;bottom: 10%;z-index: 9999;right: 70px; display: none;');
                document.querySelector('div[id="set-mune-unhide"]').setAttribute('id','set-mune-hide');
                document.querySelector('body').querySelector('span[id="set-auto"]').innerHTML = '设置<br />&<br />开关'
                unsafeWindow.localStorage.setItem('speed',document.querySelector("input[id='speed']").value);
                unsafeWindow.localStorage.setItem('muted',document.querySelector("input[id='video_muted']").checked);
            }
        }
    );
    $("#startstop").click(
        function()
        {
            unsafeWindow.localStorage.setItem('speed',document.querySelector("input[id='speed']").value);
            unsafeWindow.localStorage.setItem('muted',document.querySelector("input[id='video_muted']").checked);
            if (document.querySelector('button[id="startstop"]').innerHTML == '开始')
            {
                unsafeWindow.watch_class = setInterval(function(){
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
                        else if (document.querySelector("[data-bind='text: $root.i18nMsgText().continueStudy']") != null)
                        {
                            console.log('走神提示');
                            document.querySelector("[data-bind='text: $root.i18nMsgText().continueStudy']").click();
                        }
                        else {
                            alert('未知情况，暂无应对方案，请将本页面截屏，返回给作者。');
                            clearInterval(unsafeWindow.watch_class);
                            return (false);
                        }
                    };
                    var data = new Array();
                    for (var i = 0;i < document.querySelectorAll('video').length;i++)
                    {
                        data[i] = new Array();
                        data[i]["video"] = document.querySelectorAll('video')[i];
                    }
                    var counts = 0;
                    for (var count = 0;count < document.querySelectorAll("div[class='video-info'] span").length;count++)
                    {
                        var data_bind = document.querySelectorAll("div[class='video-info'] span")[count].getAttribute('data-bind');
                        if (data_bind == 'text: $root.i18nMessageText().finished')
                        {
                            data[counts]['s'] = true;
                            counts++;
                            console.log(true);
                        }
                        else if (data_bind == 'text: $root.i18nMessageText().viewed' || data_bind == 'text: $root.i18nMessageText().unviewed')
                        {
                            data[counts]['s'] = false;
                            counts++;
                            console.log(false);
                        }
                    }
                    var all = true
                    for (var j = 0;data.length > j;j++)
                    {
                        if (data[j]['s'] == false)
                        {
                            all = false;
                            if (data[j]['video'].paused == true)
                            {
                                data[j]['video'].play();
                                data[j]['video'].muted = muted;
                                data[j]['video'].playbackRate = unsafeWindow.localStorage.getItem('speed');
                                data[j]['video'].muted = unsafeWindow.localStorage.getItem('muted');
                            }
                            else
                            {
                                if (unsafeWindow.localStorage.getItem('muted') == 'true')
                                {
                                    if (data[j]['video'].muted != true)
                                    {
                                        data[j]['video'].muted = true;
                                    }
                                }
                                else
                                {
                                    if (data[j]['video'].muted != false)
                                    {
                                        data[j]['video'].muted = false;
                                    }
                                }
                                if (data[j]['video'].playbackRate != unsafeWindow.localStorage.getItem('speed'))
                                {
                                    data[j]['video'].playbackRate = unsafeWindow.localStorage.getItem('speed');
                                }
                            }
                            break;
                        }
                    }
                    if (all == true)
                    {
                        console.log('下一页');
                        unsafeWindow.koLearnCourseViewModel.goNextPage();
                        for (var k = 0; k < document.querySelectorAll("[data-bind='text: $root.nextPageName()']").length; ++k) {
                            console.log(document.querySelectorAll("[data-bind='text: $root.nextPageName()']")[k].innerHTML);
                            if (document.querySelectorAll("[data-bind='text: $root.nextPageName()']")[k].innerHTML == "没有了") {
                                setTimeout(function(){
                                    try
                                    {
                                        unsafeWindow.koLearnCourseViewModel.goBack();
                                    }
                                    catch (error)
                                    {
                                        console.log(error);
                                    }
                                },1500);
                                clearInterval(unsafeWindow.watch_class);
                                return (true);
                            };
                        };
                    }
                },1500);
                document.querySelector('button[id="startstop"]').innerHTML = '停止';
            }
            else
            {
                clearInterval(unsafeWindow.watch_class);
                document.querySelector('button[id="startstop"]').innerHTML = '开始';
            }
        }
    );
})();