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
import PassInfoModel, { PassInfo } from '../models/passinfo.model';
import WxUserModel from '../models/wxuser.model';

import wxuserCtrl from './wxusers.controller';

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export let list = async (req, res, next) => {
    try {
        var openId = req.user.openId || req.query.openId;

        if (!openId) {
            return res.json({
                error: true,
                message: "Please login to use passInfo",
            });
        }

        await WxUserModel.findOneAndUpdate({ openId: openId },
            {
                $set: {
                    avatarUrl: req.body.avatarUrl,
                    city: req.body.city,
                    country: req.body.country,
                    gender: req.body.gender,
                    language: req.body.language,
                    nickName: req.body.nickName,
                    province: req.body.province,
                },
                $inc: {
                    __v: 1,
                }
            },
            {
                new: true,
                maxTimeMS: 5000
            });

        let passInfo = await PassInfoModel.findOne({
            openId: openId
        });

        if (!passInfo) {
            passInfo = new PassInfoModel({
                passInfo: [],
                currentPower: 0,
                openId: openId,
            });
            await passInfo.save();
        }

        return res.json({
            error: false,
            message: "OK",
            data: passInfo
        });
    }
    catch (ex) {
        console.error(ex);
        return res.json({
            error: true,
            message: ex && ex.message || ex
        });
    }
};

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export let update = async (req, res, next) => {
    try {
        const openId = req.user.openId || req.query.openId;

        if (!openId) {
            return res.json({
                error: true,
                message: "Please login to use passInfo",
            });
        }

        let passInfo = await PassInfoModel.findOne({ openId: req.query.openId });

        if (!passInfo) {
            passInfo = new PassInfoModel({
                restoredAt: new Date(),
                currentPower: 20,
                passInfo: [],
                openId: openId,
            });
            await passInfo.save();
        }
        else {
            passInfo.restoredAt = req.body.restoredAt;
            passInfo.currentPower = req.body.currentPower;
            passInfo.passInfo = req.body.passInfo;
            await passInfo.save();
        }

        await passInfo.save();

        if (req.body.passInfo) {
            wxuserCtrl.uploadScore(req, res, next);
        }

        return res.json({
            error: false,
            message: "OK",
            data: passInfo
        });
    }
    catch (ex) {
        console.error(ex);
        return res.json({
            error: true,
            message: ex && ex.message || ex
        });
    }
};

export default { list, update };
