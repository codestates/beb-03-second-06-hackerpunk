const users = require('../models/user');
const { verify } = require('jsonwebtoken');

const { ehp } = require('../index');

const dotenv = require('dotenv');
dotenv.config();

const hackerpunk = require('hackerpunk-api');
const external_abi = require('../abi/ehp_abi.json');


const {
    generateAccessToken,
    generateRefreshToken,
    sendRefreshToken,
    //sendAccessToken
} = require('./tokenFunc');

const checkToken = (token) => {
    try {
        return verify(token, process.env.REGISTER_SECRET);
    }
    catch (err) {
        return null;
    }
}

const confirm = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        res.status(400).json({message: 'confirmation token has not provided'});
        console.log('no confirmation token');
        return;
    }

    const tokenData = checkToken(token);
    if (!tokenData) {
        res.status(400).json({message: 'invalid confirmation token'});
        console.log('invalid confirmation token');
        return;
    }
    else {
        const { id, password, email } = tokenData;
        users
            .findOne({'userId': id})
            .then( async (user) => {
                if (user) {
                    res.status(400).json({message: 'user already exists'});
                    console.log('Register Fail, user already exists');
                    return;
                }
                else {
                    const userModel = new users();
                    userModel.userId = id;
                    userModel.userPassword = password;
                    userModel.userEmail = email;

                    const today = new Date();
                    userModel.userDate = today.getFullYear() + '.' + today.getMonth() + '.' + today.getDate();
                    //처음 들어올 때 출석하면서 바로 보상 주는 코드 작성해야
                    userModel.userDonated = 0;
                    userModel.userPubKey = '0x0';

                    const { privateKey, mnemonic, address } = await hackerpunk.createWallet(password);
                    userModel.servUserPubKey = address;
                    userModel.servUserMnemonic = mnemonic;
                    userModel.servUserPrivKey = privateKey;

                    // const provider = hackerpunk.setProvider(process.env.INFURA_ROPSTEN);
                    // const wallet = hackerpunk.setWallet(process.env.MASTER_ADDRESS_PRIVATEKEY);
                    // const signer = hackerpunk.setSigner(wallet, provider);
                    // const ehp = new hackerpunk.ExternalHP(signer, process.env.EHP_ADDRESS, external_abi);
                    // ehp.registerAddress(address); 이거 위치 바꾸기 


                    userModel
                        .save()
                        .then((user) => {

                            const access_token = generateAccessToken({'id': user.userId});
                            const refresh_token = generateRefreshToken({'id': user.userId});

                            sendRefreshToken(res, refresh_token);
                            //sendAccessToken(res, accessToken);

                            res.status(200).json({access_token,
                                                    message: 'ok',
                                                    // 'id': user.userId,
                                                    // 'email': user.userEmail,
                                                    // 'internal_pub_key': user.servUserPubKey,
                                                    // 'external_pub_key': user.userPubKey,
                                                    // 'amount': 0, // need to be fixed
                                                    // 'level': 99, // need to be fixed
                                                    // 'user_article': [{'message1': 'test1'}, {'message2': 'test2'}]
                                                });

                            //res.status(200).json({'id': user.userId});
                            console.log('Register success');
                            return;
                        })
                        .catch((err) => {
                            res.status(500).json({message: err});
                            console.log('[ERROR save] \n', err);
                            return;
                        });
                }
            })
    }
}

module.exports = {
    confirm
};