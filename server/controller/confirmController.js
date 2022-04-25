const users = require('../models/user');
const { verify } = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

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
            .findOne({'id': id})
            .then((user) => {
                if (user) {
                    res.status(400).json({message: 'user already exists'});
                    console.log('Register Fail, user already exists');
                    return;
                }
                else {
                    const userModel = new users();
                    userModel.id = id;
                    userModel.password = password;
                    userModel.email = email;
                    userModel.addr = '0x0';

                    userModel
                        .save()
                        .then((user) => {
                            res.status(200).json({'id': user.id});
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