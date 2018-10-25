import express from 'express';
import config from '../config/config';
var router = express.Router();
var http = require("http");
var https = require("https");

router.post('/login', function (req, res, next) {
    const code = req.query.code;

    var url = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.wx.appId}&secret=${config.wx.appSecret}&js_code=${code}&grant_type=authorization_code`;

    console.log(url);

    var request = https.request({
        hostname: "api.weixin.qq.com",
        port: 443,
        path: `/sns/jscode2session?appid=${config.wx.appId}&secret=${config.wx.appSecret}&js_code=${code}&grant_type=authorization_code`,
        method: "GET",
    }, (wxRes) => {
        console.log("response from wx api.");

        let data = "";
        wxRes.on("data", (chunk) => {
            data += chunk;
        });

        wxRes.on("end", () => {
            try {
                let result = JSON.parse(data);

                const { openid, session_key } = result;

                if (!openid) {
                    return res.json({
                        error: true,
                        message: result.message,
                        data: {}
                    });
                }

                res.json({
                    error: result.errcode || 0,
                    message: result.errmsg || "OK",
                    data: {
                        openId: openid,
                        sessionKey: session_key
                    }
                });
            }
            catch (ex) {
                res.json({
                    error: true,
                    message: ex.message,
                    data: {}
                });
            }
        });
    });

    request.end();

    request.on("error", (data) => {
        res.json({
            error: true,
            message: data.message,
            data: {}
        })
    });
});

export default router;