import * as jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import config from '../config/config';

import { Request, Response } from 'express';
import UserModel, { User } from '../models/user.model';
import { NextFunction } from 'express-serve-static-core';

import { ExtractJwt } from 'passport-jwt';

import * as https from 'https';
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

import * as uuid from 'uuid';
import { PassInfo } from '../models/passinfo.model';
import WxUserModel, { WxUser } from '../models/wxuser.model';

import * as redis from '../config/redis';
import _ from 'lodash';

export let login = async (req, res, next) => {
    if (req.user) {
        const token = jwt.sign({
            openId: req.user.openId
        }, config.jwtSecret);

        return res.json({
            error: false,
            message: "OK",
            data: {
                token,
                openId: req.user.openId
            }
        });
    }

    const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
    return next(err);
};

export let uploadScore = async (req, res, next) => {
    console.log("uploadScore");

    try {
        let userProfile = await WxUserModel.findOne({ openId: req.user.openId });

        let score = _(req.body.passInfo).sumBy("stars");

        let newScore = false;
        if (userProfile) {
            if (!userProfile.score || score > userProfile.score) {
                userProfile.score = score;
                newScore = true;

                await userProfile.save();

                const client = redis.getInstance();
                client.zadd("level", userProfile.score.toString(), userProfile.openId.toString());
            }
        }
        else {
            console.log("cannot find userProfile");
        }
    }
    catch (error) {
        console.error(error);
    }
};

export let leaderBoard = async (req: Request, res: Response, next: NextFunction) => {
    console.log("leaderBoard");

    let skip = +(req.query.skip) || 0;
    skip = Math.max(0, skip);

    let limit = +(req.query.limit) || 50;
    limit = Math.max(0, limit);

    const client = redis.getInstance();
    client.zrevrange("level", skip, skip + limit - 1, (redisError, redisResult) => {
        console.log(redisResult);
        const rankMap: any = {};
        redisResult.forEach((openId: string, index: number) => {
            rankMap[openId] = skip + index + 1;
        });

        WxUserModel.find({ openId: { "$in": redisResult } }).then(dbResult => {
            if (!dbResult) {
                return res.json({
                    error: true,
                    message: "No user exists",
                    data: undefined,
                });
            }
            res.json({
                error: false,
                message: "OK",
                data: dbResult.map((user, index) => {
                    return {
                        openId: user.openId,
                        nickName: user.nickName || "",
                        avatarUrl: user.avatarUrl || "",
                        score: user.score || 0,
                        rank: rankMap[user.openId.toString()]
                    };
                }).sort((lhs, rhs) => {
                    return lhs.rank - rhs.rank;
                })
            });
        });
    });
};

export let playerRank = async (req: Request, res: Response, next: NextFunction) => {
    console.log("playerRank");
    const openId = req.user.openId;
    const client = redis.getInstance();

    client.zrevrank("level", openId, (redisError, redisResult) => {
        console.log(redisResult);
        if (!redisResult && redisResult !== 0) {
            return res.json({
                error: true,
                message: "No such user",
                data: undefined
            });
        }
        WxUserModel.findOne({ openId: openId }).then(user => {
            if (!user) {
                return res.json({
                    error: true,
                    message: "No such user",
                    data: undefined
                });
            }
            res.json({
                error: false,
                message: "OK",
                data: {
                    openId: user.openId,
                    nickName: user.nickName || "",
                    avatarUrl: user.avatarUrl || "",
                    score: user.score || 0,
                    rank: redisResult + 1
                }
            });
        });
    });
};

export default { login, uploadScore, leaderBoard, playerRank };