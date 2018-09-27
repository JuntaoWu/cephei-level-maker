import express from 'express';
var router = express.Router();
import authRouter from './auth.route';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/auth', authRouter);

export default router;
