
import * as express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../config/param-validation';
import config from '../config/config';
import passport from 'passport';
import captureCtrl from '../controllers/capture.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    .post(captureCtrl.create);

export default router;
