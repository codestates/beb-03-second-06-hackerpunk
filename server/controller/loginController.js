const users = require('../models/user');
const bcrypt = require('bcrypt');

const hackerpunk = require('hackerpunk-api');
const hp_abi = require('../abi/hp_abi.json');
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
        .findOne({"userId": id})
        .then( (user) => {
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
                bcrypt.compare(password, user.userPassword)
                    .then( async (result) => {
                        if (!result){
                            res.status(404).json({message: "wrong password"});
                            console.log("Login Fail, wrong password")
                            return;
                        }
                        else {
                            const today = new Date();
                            const currentTime = today.getFullYear() + '.' + today.getMonth() + '.' + today.getDate();
                            if (user.userDate !== currentTime){
                                user.userDate = currentTime;
                                await user.save();
                                // 토큰을 주는 코드 넣어야 함
                                // new hp.HP().attendanceMint()
                                // new hp.HP().balanceOf()
                                const provider = hackerpunk.setProvider(process.env.INFURA_ROPSTEN);
                                const wallet = hackerpunk.setWallet(process.env.MASTER_ADDRESS_PRIVATEKEY);
                                const signer = hackerpunk.setSigner(wallet, provider);
                                const hp = new hackerpunk.HP(signer, process.env.HP_ADDRESS, hp_abi);
                                await hp.attendanceMint(user.servUserPubKey);
                                console.log('sent attendance reward');
                            }

                            //
                            const access_token = generateAccessToken({'id': user.userId});
                            const refresh_token = generateRefreshToken({'id': user.userId});

                            sendRefreshToken(res, refresh_token);
                            //sendAccessToken(res, accessToken);

                            res.status(200).json({access_token,
                                                    message: 'succeed',
                                                    // 'id': user.userId,
                                                    // 'email': user.userEmail,
                                                    // 'internal_pub_key': user.servUserPubKey,
                                                    // 'external_pub_key': user.userPubKey,
                                                    // 'amount': 0, // need to be fixed
                                                    // 'level': 99, // need to be fixed
                                                    // 'user_article': [{'message1': 'test1'}, {'message2': 'test2'}]
                                                });


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