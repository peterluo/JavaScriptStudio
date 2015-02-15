﻿//https://passport.jd.com/uc/login?ltype=logout

var Nightmare = require('nightmare');
var db = require('./db');
var webdriver = new Nightmare(
    {
        loadImages: false,
        weak: false,
        timeout: 2000,
        phantomPath: 'D:\\Sync\\Node\\phantomjs-1.9.8-windows\\',
        cookiesFile:'D:\\github\\NodeStudio\\NightmareAllInOne\\NightmareAllInOne\\jdcookie.js'
    }
);

webdriver
.on('timeout', console.log)
.on('resourceRequestStarted', function (requestData, networkRequest) {
        //console.log('requested: ' + JSON.stringify(requestData, undefined, 4));
        var url = requestData.url;
    if (url.indexOf('.css') > 0) {
        console.log("css abort");
            return;
        }
    })
.useragent('Mozilla/5.0 (Windows; U; Windows NT 5.2) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13')
    .goto("https://passport.jd.com/uc/login?ltype=logout")
    .wait(1000)
    .type("#loginname", "hyq1860")
    .type("#nloginpwd", "1984107hyq")
    .click("#loginsubmit")
    .wait(2000)
    .goto("http://order.jd.com/center/list.action")
    .evaluate(function () {
        //return document.title;
        return $("a[name='orderIdLinks']").eq(0).text();
    },function(result) {
        console.log(result);
    })
    .run(function (err, nightmare) {
    if (err) return console.log(err);
    console.log('Done!');
});