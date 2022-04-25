const users = require('../models/user');
const bcrypt = require('bcrypt');
//const saltRounds = 10;

//
const {
    generateAccessToken,
    generateRefreshToken,
    sendRefreshToken,
    sendAccessToken
} = require('./tokenFunc');

const login = (req, res) => {
    const { id, password } = req.body;
    console.log('===========================================');
    console.log(`[login] id: ${id}, password: ${password}`);

    if (!id || !password) {
        res.status(400).json({message: "wrong request"});
        console.log('No ID or No PW');
        return;
    }

    users
        .findOne({"id": id})
        .then((user) => {
            if (!user) {
                res.status(404).json({message: "user not found"});
                console.log("Login Fail, no user");
                return;
            }
            // else if (user.status == 'pending'){
            //     res.status(401).json({message: "pending account. please verify your email"});
            //     console.log("Attemping to login with pending account");
            //     return;
            // }
            else {
                bcrypt.compare(password, user.password)
                    .then((result) => {
                        if (!result){
                            res.status(404).json({message: "wrong password"});
                            console.log("Login Fail, wrong password")
                            return;
                        }
                        else {
                            const accessToken = generateAccessToken({'id': user.id});
                            const refreshToken = generateRefreshToken({'id': user.id});

                            sendRefreshToken(res, refreshToken);
                            sendAccessToken(res, accessToken);

                            //res.status(200).json({'id': user.id});
                            console.log("Login Success");
                            return;
                        }
                    })
                    .catch((err) => {
                        res.status(500).json({message: err});
                        console.log('[ERROR compare] \n', err);
                        return;
                    })
            }
        })
        .catch((err) => {
            res.status(500).json({message: err});
            console.log('[ERROR find] \n', err);
            return;
        });
};

module.exports = {
    login
};