// ==UserScript==
// @name         优学院看视频
// @namespace    https://github.com/Brush-JIM/YouXueYuan-JavaScript
// @version      2019.5.15
// @description  可用来看优学院视频而不用手动点击。
// @author       Brush-JIM
// @match        https://ua.ulearning.cn/learnCourse/learnCourse.html?courseId=*&chapterId=*
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @grant        unsafeWindow
// @run-at       document-start
// @icon         https://www.ulearning.cn/ulearning/favicon.ico
// @supportURL   https://github.com/Brush-JIM/YouXueYuan-JavaScript
// ==/UserScript==

(function() {
    'use strict';
    try
    {
        unsafeWindow.document.__defineGetter__(
            'hidden',
            function()
            {
                return false;
            }
        )
    }
    catch (error)
    {
        Object.defineProperty(
            document,'hidden',
            {
                get:function()
                {
                    return false;
                }
            }
        );
    }

    try
    {
        unsafeWindow.document.__defineGetter__(
            'visibilityState',
            function()
            {
                return 'visible';
            }
        )
    }
    catch (error)
    {
        Object.defineProperty(
            document,'visibilityState',
            {
                get:function()
                {
                    return 'visible';
                }
            }
        );
    }
    $(unsafeWindow.document).ready
    (
        function ()
        {
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
            xfk.innerHTML = '<div style="display: block;overflow: hidden;height: 300px;width: 300px;/* border-radius: 8px; *//* box-shadow: rgba(106, 115, 133, 0.22) 0px 6px 12px 0px; */border: 1px solid rgb(233, 234, 236);background-color: rgb(255, 255, 255);"><div style="display: block; border-bottom: 1px solid rgb(230, 230, 230); height: 35px; line-height: 35px; margin: 0px; padding: 0px; overflow: hidden;"><span style="float: left;display: inline;padding-left: 8px;font: 700 14px/35px SimSun;">设置 & 开关</span></div><div style="display: block; position: absolute; top: 36px; width: 100%; height: calc(100% - 36px);"><div style="height: 100%; overflow: auto; padding: 0px 12px; margin: 0px;"><div><label style="display: inline;" title="调速">现在倍速：<input id="speed" type="text"></label></div><div><label style="display: inline;" title="静音"><input id="video_muted" type="checkbox">静音</label></div><div><label style="display: inline;" title="退出"><input id="exit" type="checkbox">完成后返回课程目录</label></div><div><label style="display: inline;" title="开始/停止"><button id="startstop">开始学习</button></label></div></div></div></div>';
            document.querySelector('body').appendChild(xfk);
            var speed;
            var muted;
            var auto_exit;
            if (unsafeWindow.localStorage.getItem('speed') == null)
            {
                $('input[id="speed"]')[0].value = '1';
                speed = '1';
            }
            else
            {
                $('input[id="speed"]')[0].value = unsafeWindow.localStorage.getItem('speed');
                speed = unsafeWindow.localStorage.getItem('speed');
            }
            if (unsafeWindow.localStorage.getItem('muted') == null)
            {
                $('input[id="video_muted"]')[0].checked = false;
                muted = false;
            }
            else
            {
                if (unsafeWindow.localStorage.getItem('muted') == 'true')
                {
                    $('input[id="video_muted"]')[0].checked = true;
                    muted = true;
                }
                else
                {
                    $('input[id="video_muted"]')[0].checked = false;
                    muted = false;
                }
            }
            if (unsafeWindow.localStorage.getItem('auto-exit') == null)
            {
                $('input[id="exit"]')[0].checked = true;
                auto_exit = true;
            }
            else
            {
                if (unsafeWindow.localStorage.getItem('auto-exit') == 'true')
                {
                    $('input[id="exit"]')[0].checked = true;
                    auto_exit = true;
                }
                else
                {
                    $('input[id="exit"]')[0].checked = false;
                    auto_exit = false;
                }
            }
            $("#set-auto").click(
                function()
                {
                    //取消跳转网页提示
                    $(unsafeWindow).off('beforeunload');
                    if ($('span[id="set-auto"]')[0].innerText == '设置\n&\n开关')
                    {
                        $('div[id="set-mune-hide"]').attr('style','position: fixed;height: 300px;bottom: 10%;z-index: 9999;right: 70px;');
                        $('div[id="set-mune-hide"]').attr('id','set-mune-unhide');
                        $('span[id="set-auto"]')[0].innerHTML = '保存<br />&<br />隐藏';
                    }
                    else
                    {
                        $('div[id="set-mune-unhide"]').attr('style','position: fixed;height: 300px;bottom: 10%;z-index: 9999;right: 70px; display: none;');
                        $('div[id="set-mune-unhide"]').attr('id','set-mune-hide');
                        $('span[id="set-auto"]')[0].innerHTML = '设置<br />&<br />开关'
                        unsafeWindow.localStorage.setItem('speed',$('input[id="speed"]')[0].value);
                        unsafeWindow.localStorage.setItem('muted',$('input[id="video_muted"]')[0].checked);
                        unsafeWindow.localStorage.setItem('auto-exit',$('input[id="exit"]')[0].checked);
                        speed = $('input[id="speed"]')[0].value;
                        muted = $('input[id="video_muted"]')[0].checked;
                        auto_exit = $('input[id="exit"]')[0].checked;
                    }
                }
            )
            $("#startstop").click(
                function()
                {
                    //取消跳转网页提示
                    $(unsafeWindow).off('beforeunload');
                    unsafeWindow.localStorage.setItem('speed',document.querySelector("input[id='speed']").value);
                    unsafeWindow.localStorage.setItem('muted',document.querySelector("input[id='video_muted']").checked);
                    unsafeWindow.localStorage.setItem('auto-exit',$('input[id="exit"]')[0].checked);
                    speed = $('input[id="speed"]')[0].value;
                    muted = $('input[id="video_muted"]')[0].checked;
                    auto_exit = $('input[id="exit"]')[0].checked;
                    if ($('button[id="startstop"]')[0].innerHTML == '开始学习')
                    {
                        unsafeWindow.watch_class = function(){
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
                                    document.querySelector('button[id="startstop"]').innerHTML = '开始学习';
                                    return (false);
                                }
                            };
                            var data = new Array();
                            for (var i = 0;i < $('video').length;i++)
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
                                        if (auto_exit == true)
                                        {
                                            unsafeWindow.koLearnCourseViewModel.goBack();
                                        }
                                        else
                                        {
                                            document.querySelector('button[id="startstop"]').innerHTML = '学习完成（该按钮已不可点击）';
                                            document.querySelector('button[id="startstop"]').disabled = true;
                                        }
                                        return (true);
                                    };
                                };
                            }
                            unsafeWindow.watch_class_ = setTimeout(unsafeWindow.watch_class,3000);
                        }
                        document.querySelector('button[id="startstop"]').innerHTML = '停止学习';
                        unsafeWindow.watch_class();
                    }
                    else
                    {
                        clearTimeout(unsafeWindow.watch_class_);
                        document.querySelector('button[id="startstop"]').innerHTML = '开始学习';
                    }
                }
            );
        }
    )
})();