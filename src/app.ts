import createError from 'http-errors';
import express, { NextFunction } from 'express';
import path from 'path';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import passport from './config/passport';

import indexRouter from './routes';
import versionRouter from './routes/version';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

// parse body params and attache them to req.body
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());

app.use(logger('dev'));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../miniGame'), {
  setHeaders: function (res, path) {
    if (path.indexOf("sw.js") !== -1 || path.indexOf("manifest.json") != -1 || path.indexOf("index.html") != -1) {
      res.setHeader("Cache-Control", "no-cache");
    }
  }
}), cors());

app.use(express.static(path.join(__dirname, '../public'), {
  setHeaders: function (res, path) {
    if (path.indexOf("sw.js") !== -1 || path.indexOf("manifest.json") != -1 || path.indexOf("index.html") != -1) {
      res.setHeader("Cache-Control", "no-cache");
    }
  }
}), cors());

app.use(express.static(path.join(__dirname, '../public/sw.js'), {
  etag: false
}), cors());

app.use((passport as any).default.initialize());
app.use((passport as any).default.session());

app.use('/', indexRouter);
app.use('/version', versionRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use((err: any, req: any, res: any, next: any) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
