const users = require('../models/user.js');

const login = (req, res) => {
    const { id, password } = req.body;
    console.log(`[login] id: ${id}, password: ${password}`)

    users
        .findOne({"id": id, "password": password})
        .then((user) => {
            if (!user){
                console.log("Login Fail");
                res.status(404).json({message: "user not found"});
            }
            else {
                console.log("Login Success");
                res.status(200).json({
                    message : "Login Success",
                    data: {
                        user: user
                    }
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err
            });
        });
};

module.exports = {
    login
};