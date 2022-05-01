const dotenv = require('dotenv');
dotenv.config();

const { verify } = require('jsonwebtoken');
const users = require('../models/user');
const hackerpunk = require('hackerpunk-api');

const {
    generateAccessToken,
    generateRefreshToken,
    sendRefreshToken,
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
    try{
        const { token } = req.body;
        if (!token) {
            res.status(400).json({message: 'fail, confirmation token has not provided'});
            console.log('fail, confirmation token has not provided');
            return;
        }
    
        const tokenData = checkToken(token);
        if (!tokenData) {
            res.status(400).json({message: 'fail, invalid confirmation token'});
            console.log('fail, invalid confirmation token');
            return;
        }
        else {
            const { id, password, email } = tokenData;
            if (!id || !password || !email){
                res.status(400).json({message: 'fail, need id, password and email'});
                console.log('fail, need id, password and email');
                return;
            }
            await users
                .findOne({'userId': id})
                .then( async (user) => {
                    if (user) {
                        res.status(400).json({message: 'fail, user already exists'});
                        console.log('fail, user already exists');
                        return;
                    }
                    else {
                        const userModel = new users();
                        userModel.userId = String(id);
                        userModel.userPassword = String(password);
                        userModel.userEmail = String(email);
                        const today = new Date();
                        userModel.userDate = today.getFullYear() + '.' + (today.getMonth()+1) + '.' + today.getDate();
                        userModel.userDonated = 0;
                        userModel.userPubKey = '0x0';
    
                        try{
                            const { privateKey, mnemonic, address } = await hackerpunk.createWallet(password);
                            userModel.servUserPubKey = String(address).toLowerCase();
                            userModel.servUserMnemonic = String(mnemonic);
                            userModel.servUserPrivKey = String(privateKey);    
                        }
                        catch(err){
                            res.status(500).json({message: 'fail'});
                            console.error(err);
                            return;
                        }
    
                        await userModel
                            .save()
                            .then((user) => {
                                const access_token = generateAccessToken({'id': user.userId});
                                const refresh_token = generateRefreshToken({'id': user.userId});
    
                                sendRefreshToken(res, refresh_token);
                                res.status(200).json({access_token,
                                                        message: 'succeed, verified',
                                                    });
                                console.log('succeed, verified');
                                return;
                            })
                            .catch((err) => {
                                res.status(400).json({message: 'fail'});
                                console.error(err);
                                return;
                            })
                    }
                })
                .catch((err) => {
                    res.status(400).json({message: 'fail'});
                    console.error(err);
                    return;
                })
        }
    }
    catch(err){
        res.status(400).json({message: 'fail'});
        console.error(err);
        return;
    }
}

module.exports = {
    confirm
};