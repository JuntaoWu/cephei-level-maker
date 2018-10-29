import express from 'express';
import config from '../config/config';
var router = express.Router();
var http = require("http");
var https = require("https");
import * as jwt from 'jsonwebtoken';
import passport from 'passport';

import wxuserCtrl from '../controllers/wxusers.controller';

router.post('/login', passport.authenticate("localWx"), wxuserCtrl.login);

router.get('/leaderBoard', passport.authenticate(["jwtWx", "localWx"]), wxuserCtrl.leaderBoard);
router.get('/playerRank', passport.authenticate(["jwtWx", "localWx"]), wxuserCtrl.playerRank);

export default router;