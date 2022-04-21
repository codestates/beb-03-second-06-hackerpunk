const users = require('../models/user.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
            else {
                bcrypt.compare(password, user.password)
                    .then((result) => {
                        if (!result){
                            res.status(404).json({message: "wrong password"});
                            console.log("Login Fail, wrong password")
                            return;
                        }
                        else {
                            res.status(200).json({
                                message : "Login Success",
                                data: {
                                    user: user
                                }
                            })
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