const dotenv = require('dotenv');
dotenv.config();

const bcrypt = require('bcrypt');
const users = require('../models/user');
const hackerpunk = require('hackerpunk-api');
const hp_abi = require('../abi/hp_abi.json');

const {
    generateAccessToken,
    generateRefreshToken,
    sendRefreshToken,
} = require('./tokenFunc');

const login = async (req, res) => {
    try{
        const { id, password } = req.body;
        console.log('===========================================');
        console.log(`[login] id: ${id}, password: ${password}`);
        if (!id || !password) {
            res.status(400).json({message: 'fail, need id and password'});
            console.log('fail, need id and password');
            return;
        }
    
        await users
            .findOne({"userId": id})
            .then( (user) => {
                if (!user) {
                    res.status(404).json({message: 'fail, no matching user'});
                    console.log('fail, no matching user');
                    return;
                }
                else {
                    bcrypt.compare(password, user.userPassword)
                        .then( async (result) => {
                            if (!result){
                                res.status(404).json({message: 'fail, wrong password'});
                                console.log('fail, wrong password')
                                return;
                            }
                            else {
                                const today = new Date();
                                const currentTime = today.getFullYear() + '.' + (today.getMonth()+1) + '.' + today.getDate();
                                if (user.userDate !== currentTime){
                                    user.userDate = currentTime;
                                    try{
                                        await user.save();
                                    }
                                    catch(err){
                                        res.status(500).json({message: 'fail'});
                                        console.error(err);
                                        return;
                                    }

                                    const provider = hackerpunk.setProvider(process.env.INFURA_ROPSTEN);
                                    const wallet = hackerpunk.setWallet(process.env.MASTER_ADDRESS_PRIVATEKEY);
                                    const signer = hackerpunk.setSigner(wallet, provider);
                                    const hp = new hackerpunk.HP(signer, process.env.HP_ADDRESS, hp_abi);

                                    try{
                                        await hp.attendanceMint(user.servUserPubKey);
                                    }
                                    catch(err){
                                        res.status(500).json({message: 'fail'});
                                        console.error(err);
                                        return;
                                    }
                                    console.log('sent attendance reward');
                                }

                                const access_token = generateAccessToken({'id': user.userId});
                                const refresh_token = generateRefreshToken({'id': user.userId});
                                sendRefreshToken(res, refresh_token);
                                res.status(200).json({access_token,
                                                        message: 'succeed, login',
                                                    });
                                console.log('succeed, login');
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
    }
    catch(err){
        res.status(400).json({message: 'fail'});
        console.error(err);
        return;
    }
};

module.exports = {
    login
};