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

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export let list = async (req, res, next) => {
    try {
        var openId = req.query.openId;

        if (!openId) {
            return res.json({
                error: true,
                message: "Please login to use passInfo",
            });
        }

        let passInfo = await PassInfoModel.findOne({
            openId: openId
        });

        if (!passInfo) {
            passInfo = new PassInfoModel({
                passInfo: [],
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
        const openId = req.query.openId;

        if (!openId) {
            return res.json({
                error: true,
                message: "Please login to use passInfo",
            });
        }

        let passInfo = await PassInfoModel.findOne({ openId: req.query.openId });

        if (!passInfo) {
            passInfo = new PassInfoModel({
                passInfo: [],
                openId: openId,
            });
            await passInfo.save();
        }
        else {
            passInfo.passInfo = req.body.passInfo;
            await passInfo.save();
        }

        await passInfo.save();

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
