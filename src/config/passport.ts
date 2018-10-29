import * as passport from 'passport';
import User from '../models/user.model';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

import config from './config';
import UserModel from '../models/user.model';
import WxUserModel, { WxUser } from '../models/wxuser.model';

import * as https from 'https';

// Setting username field to email rather than username
const localOptions = {
    usernameField: 'username',
    passwordField: 'password',
};

// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, (username, password, done) => {
    console.log("localLogin");
    User.findOne({ username: username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false);
        }

        if (user.password != password) {
            return done(null, false, {
                message: "Your login details could not be verified. Please try again."
            });
        }
        return done(null, user);
    });
});

const localWxOptions = {
    usernameField: 'code',
    passwordField: 'code',
};

// Setting up local WxLogin strategy
const localWxLogin = new LocalStrategy(localWxOptions, (username, password, done) => {
    console.log("localWxLogin");

    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.wx.appId}&secret=${config.wx.appSecret}&js_code=${username}&grant_type=authorization_code`;

    console.log(url);

    let request = https.request({
        hostname: "api.weixin.qq.com",
        port: 443,
        path: `/sns/jscode2session?appid=${config.wx.appId}&secret=${config.wx.appSecret}&js_code=${username}&grant_type=authorization_code`,
        method: "GET",
    }, (wxRes) => {
        console.log("response from wx api.");

        let data = "";
        wxRes.on("data", (chunk) => {
            data += chunk;
        });

        wxRes.on("end", async () => {
            try {
                let result = JSON.parse(data);

                const { openid, session_key } = result;

                if (!openid) {
                    return done(null, false);
                }

                let user = await WxUserModel.findOne({ openId: openid });

                if (!user) {
                    user = new WxUserModel({
                        openId: openid
                    });
                    await user.save();
                }

                return done(null, user);
            }
            catch (ex) {
                return done(null, false, {
                    message: ex.message || "Your login details could not be verified. Please try again."
                });
            }
        });
    });

    request.end();
});

// Setting JWT strategy options
const jwtOptions = {
    // Telling Passport to check authorization headers for JWT
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter("token"),
    // Telling Passport where to find the secret
    secretOrKey: config.jwtSecret
    // TO-DO: Add issuer and audience checks
};


// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {

    UserModel.findOne({ username: payload.username }).then(user => {
        done(null, user);
    }).catch(error => {
        done(null, false);
    });
});

const jwtWxLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    WxUserModel.findOne({ openId: payload.openId }).then(user => {
        done(null, user);
    }).catch(error => {
        done(null, false);
    });
});

(passport as any).default.serializeUser(function (user, done) {
    done(null, user);
});

(passport as any).default.deserializeUser(function (user, done) {
    done(null, user);
});

(passport as any).default.use("jwt", jwtLogin);
(passport as any).default.use("local", localLogin);
(passport as any).default.use("jwtWx", jwtWxLogin);
(passport as any).default.use("localWx", localWxLogin);

export default passport;