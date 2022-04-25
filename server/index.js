//
const fs = require('fs');
const https = require('https');
const cookieParser = require('cookie-parser');

const express = require('express');
const cors = require('cors');
const app = express();

const { DBinit } = require('./mongodb/db');

const port = 4100;

const login_router = require('./router/login');
const register_router = require('./router/register');
const auth_router = require('./router/auth')
const contents_router = require('./router/contents');
const refresh_router = require('./router/refreshTokenReq');

const printLog = (req, res, next) => {
    console.log(`requst method is ${req.method}, url is ${req.url}`);
    next();
};

//app.use(cors());
app.use(express.json());

//
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: ["https://hacker-punk.herokuapp.com/", "http://localhost:3000"],
        credentials: true,
        methods: ["GET", "POST", "OPTIONS"]
    })
);
app.use(cookieParser());

app.use(printLog);

app.use('/login', login_router);
app.use('/register', register_router);
app.use('/auth', auth_router);
app.use('/contents', contents_router);
app.use('/refresh', refresh_router);

app.get('/test', (req, res) => {
    res.status(200).json({message:'This is the test'});
});

app.get('/', (req, res) => {
    res.status(200).send('This is server homepage.');
});


//
const HTTPS_PORT = process.env.HTTPS_PORT || 4000;
let server;
if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')){
    const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
    const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
    const credentials = { key: privateKey, cert: certificate };

    server = https.createServer(credentials, app);
    server.listen(HTTPS_PORT, () => {
        DBinit();
        console.log(`[Running] HTTPS Server is listening on port ${HTTPS_PORT}.`);
    });
}
else {
    server = app.listen(port, () => {
        DBinit();
        console.log(`[Running] HTTP Server is listening on port ${port}.`);
    });
}

//module.exports = app;
//
module.exports = server;