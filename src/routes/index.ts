import express from 'express';
var router = express.Router();
import authRouter from './auth.route';
import levelRouter from './level.route';
import passport from 'passport';
import levelCtrl from '../controllers/level.controller';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/auth', authRouter);

router.use('/level', levelRouter);

router.use('/level.json', passport.authenticate("jwt"), levelCtrl.json);

export default router;
