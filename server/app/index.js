const GenerationEngine = require('./generation/engine');
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const slimeRouter = require('./api/slime');
const generationRouter = require('./api/generation');
const accountRouter = require('./api/account');

/* 
------------------------STATIC ASSETS------------------------
*/ 
const imageDir = path.join(__dirname, '../../art/raws/all/');
const bgDir = path.join(__dirname, '../../art/background/');
const svgDir = path.join(__dirname, '../../art/icon/slime.svg');
const faviconDir = path.join(__dirname, '../../art/favicon');
const webmDir = path.join(__dirname, '../../art/webm');
const engine = new GenerationEngine();

/* 
------------------------SERVER CONFIG------------------------
-set instance of engine object to a locals variable
-body parsing middleware allows parsing of incoming user JSON object data (must be called before routes)
-Cookie parsing middleware allows parsing of user cookie objects, which will contain session info (must be called before routes)
-set up routes
-cors allows client dev server runing on 1234 to make requests to us from slime router 
    this middleware works around same-origin policy in browser

-error handler middleware applies status codes to errors

-start the engine to begin creating generations in db
*/ 
const app = express();
app.locals.engine = engine;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:1234',
    credentials: true
}));
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        type: 'error',
        message: err.message
    });
});

app.use('/images',express.static(imageDir));
app.use('/background', express.static(bgDir));
app.use('/slimeIcon', express.static(svgDir));
app.use('/favicon', express.static(faviconDir));
app.use('/webm', express.static(webmDir));
app.use('/slime', slimeRouter);
app.use('/generation', generationRouter);
app.use('/account', accountRouter);


engine.start();

/* 
------------------------EXPORT------------------------
*/ 
module.exports = app;