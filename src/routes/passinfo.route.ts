import * as express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../config/param-validation';
import passInfoCtrl from '../controllers/passinfo.controller';
import config from '../config/config';
import passport from 'passport';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    .post(passport.authenticate("jwtWx"), passInfoCtrl.list);

router.route('/update')
    .post(passport.authenticate("jwtWx"), passInfoCtrl.update);

export default router;
