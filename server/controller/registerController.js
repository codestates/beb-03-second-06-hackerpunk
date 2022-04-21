const users = require('../models/user.js');

const register = (req, res) => {
    const { id, password, email, phone } = req.body;
    console.log(`[register] id: ${id}, password: ${password}, email: ${email}, phone: ${phone}`)

    const userModel = new users();
    userModel.id = id;
    userModel.password = password;
    userModel.email = email;
    userModel.phone = phone;
    userModel.addr = '0x0';
    userModel
        .save()
        .then ((user) => {
            console.log('Register Success');
            res.status(200).json({
                message : "Register Success",
                data: {
                    user: user
                }
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err
            });
        });
};

module.exports = {
    register
};