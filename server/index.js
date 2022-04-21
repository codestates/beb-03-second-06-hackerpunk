const express = require('express');
const cors = require('cors');
const app = express();

const { DBinit } = require('./mongodb/db');

const port = 4100;

const login_router = require('./router/login');
const register_router = require('./router/register');
const contents_router = require('./router/contents');

const printLog = (req, res, next) => {
    console.log(`requst method is ${req.method}, url is ${req.url}`);
    next();
};

app.use(cors());
app.use(express.json());
app.use(printLog);

app.use('/login', login_router);
app.use('/register', register_router);
app.use('/contents', contents_router);

app.get('/', (req, res) => {
    res.status(200).send('This is server homepage.');
});

app.listen(port, () => {
    DBinit();
    console.log(`[Running] Server is listening on port ${port}.`);
});

module.exports = app;