import express from 'express';
var router = express.Router();
import authRouter from './auth.route';
import levelRouter from './level.route';
import passport from 'passport';
import levelCtrl from '../controllers/level.controller';
import passInfoRouter from './passinfo.route';
import wxuserRouter from './wxuser.route';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/auth', authRouter);

router.use('/level', levelRouter);

router.use('/level.json', passport.authenticate("jwt"), levelCtrl.json);

router.use('/passInfo', passInfoRouter);

router.use('/users', wxuserRouter);

export default router;
