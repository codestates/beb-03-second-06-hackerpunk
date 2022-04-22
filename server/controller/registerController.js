const users = require('../models/user.js');
const bcrypt = require('bcrypt');
const user = require('../models/user.js');
const saltRounds = 10;

const register = async (req, res) => {
    

    const { id, password } = req.body;
    console.log('===========================================');
    console.log(`[register] id: ${id}, password: ${password}`);

    if (!id || !password) {
        res.status(400).json({message: "wrong request"});
        console.log('No ID or No PW');
        return;
    }

    users
        .findOne({"id": id})
        .then((user) => {
            if (user) {
                res.status(400).json({message: "user already exists"});
                console.log("Register Fail, user already exists");
                return;
            }
            else {
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    if (err) {
                        res.status(500).json({message: err});
                        console.log('[ERROR genSalt] \n', err);
                        return;
                    }
                    bcrypt.hash(password, salt, (err, hash) =>{
                        if (err) {
                            res.status(500).json({message: err});
                            console.log('[ERROR hash] \n', err);
                            return;
                        }
            
                        const userModel = new users();
                        userModel.id = id;
                        userModel.password = hash;
                        userModel.addr = '0x0';
            
                        userModel
                            .save()
                            .then ((user) => {
                                res.status(200).json({
                                    message : "Register Success",
                                    data: {
                                        user: user
                                    }
                                });
                                console.log('Register Success');
                                return;
                            })
                            .catch((err) => {
                                res.status(500).json({message: err});
                                console.log('[ERROR save] \n', err);
                                return;
                            });
                    })
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
    register
};