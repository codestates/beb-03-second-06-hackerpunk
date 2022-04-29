//
const fs = require('fs');
const https = require('https');
const cookieParser = require('cookie-parser');

const express = require('express');
const cors = require('cors');
const app = express();

const hackerpunk = require('hackerpunk-api');
const external_abi = require('./abi/ehp_abi.json');

const { DBinit } = require('./mongodb/db');

const users = require('./models/user');

const port = process.env.PORT || 4100; ////////////////

const login_router = require('./router/login');
const register_router = require('./router/register');
//const auth_router = require('./router/auth')
const article_router = require('./router/article');
const comment_router = require('./router/comment');
const refresh_router = require('./router/refreshTokenReq');
const confirm_router = require('./router/confirm');
const connect_router = require('./router/connect');

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
        origin: ["https://hacker-punk.herokuapp.com/", "http://localhost:3000", "https://localhost:3000"],
        credentials: true,
        methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"]
    })
);
app.use(cookieParser());

app.use(printLog);

app.use('/login', login_router);
app.use('/register', register_router);
//app.use('/auth', auth_router);
app.use('/article', article_router);
app.use('/comment', comment_router);
app.use('/refresh', refresh_router);
app.use('/confirm', confirm_router);
app.use('/connect', connect_router);

app.get('/test', (req, res) => {
    res.status(200).json({message:'This is the test'});
});

app.get('/', (req, res) => {
    res.status(200).send('This is server homepage.');
});


//
const HTTPS_PORT = process.env.PORT || process.env.HTTPS_PORT || 4000; /////////////
let server;

let ehp;

const EHPinit = () => {
    const provider = hackerpunk.setProvider(process.env.INFURA_ROPSTEN);
    const wallet = hackerpunk.setWallet(process.env.MASTER_ADDRESS_PRIVATEKEY);
    const signer = hackerpunk.setSigner(wallet, provider);
    ehp = new hackerpunk.ExternalHP(signer, process.env.EHP_ADDRESS, external_abi);
    ehp.singupEventListener( async (internalAddress, externalAddress, event) => {
        console.log('internal Address :', internalAddress);
        console.log('external Address :', externalAddress);
        // event 구조가 transaction receipt -> ether scan
        //event.removed -> boolean , true-> 취소 -> 기존에 mapping 된 것을 db에서 없애줘야 함.
        if (event.removed){
            await users.findOneAndUpdate({"servUserPubKey": internalAddress}, {"userPubKey": '0x0'});
        }
        else {
            await users.findOneAndUpdate({"servUserPubKey": internalAddress}, {"userPubKey": externalAddress});
        }
    });
};

if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')){
    const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
    const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
    const credentials = { key: privateKey, cert: certificate };

    server = https.createServer(credentials, app);
    server.listen(HTTPS_PORT, () => {
        DBinit();

        EHPinit();

        console.log(`[Running] HTTPS Server is listening on port ${HTTPS_PORT}.`);
    });
}
else {
    server = app.listen(port, () => {
        DBinit();

        EHPinit();

        console.log(`[Running] HTTP Server is listening on port ${port}.`);
    });
}

// for deploying at the heroku
// server = app.listen(port, () => {
//             DBinit();
//             EHPinit();
//             console.log(`[Running] Server is listening on port ${port}.`);
//         });

//module.exports = app;
// ehp
module.exports = {server, ehp};