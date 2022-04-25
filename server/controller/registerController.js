const users = require('../models/user');
const bcrypt = require('bcrypt');
//const { customAlphabet } = require('nanoid');
const saltRounds = 10;

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD
    }
});

// const sendConfirmationEmail = (name, email, confirmationCode) => {
//     transport.sendMail({
//         from: process.env.MAIL_ID,
//         to: email,
//         subject: "[HackerPunk] Please confirm your account!",
//         html: `<h1>Email Confirmation</h1>
//             <h2>Hello ${name}</h2>
//             <p>Thank you for joining the HackerPunk. Please confirm your email by entering the following code.</p>
//             <p>Code : ${confirmationCode}</p>
//             </div>`
//     }).catch((err) => console.log(err));
//     console.log('sent confirmation email');
// }

const { sign } = require('jsonwebtoken');
const sendConfirmationEmail = (name, email, confirmationCode) => {
    transport.sendMail({
        from: process.env.MAIL_ID,
        to: email,
        subject: "[HackerPunk] Please confirm your account!",
        html: `<h1>Email Confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for joining the HackerPunk. Please confirm your email by entering the following code.</p>
            <a href=https://localhost:3000/confirm/${confirmationCode}> Click here</a>
            </div>`
    }).catch((err) => console.log(err));
    console.log('sent confirmation email');
}

const register = async (req, res) => {
    const { id, password, email } = req.body;
    console.log('===========================================');
    console.log(`[register] id: ${id}, password: ${password}`);

    if (!id || !password) {
        res.status(400).json({message: 'wrong request'});
        console.log('No ID or No PW');
        return;
    }

    users
        .findOne({"id": id})
        .then((user) => {
            if (user) {
                if (user.status == 'pending'){
                    res.status(400).json({message: "pending accounts, please verify your email"});
                    console.log('Register Fail, pending account');
                    return;
                }
                res.status(400).json({message: 'user already exists'});
                console.log('Register Fail, user already exists');
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
            
                        // const userModel = new users();
                        // userModel.id = id;
                        // userModel.password = hash;
                        // userModel.email = email;
                        // userModel.addr = '0x0';
                        // userModel.status = 'pending';
                        // userModel.auth = customAlphabet('0123456789abcdef', 6)();
                        // userModel
                        //     .save()
                        //     .then ((user) => {
                        //         res.status(200).json({'id': user.id});
                        //         console.log('Register processing, not verified');

                        //         sendConfirmationEmail(user.id, user.email, user.auth);
                        //         return;
                        //     })
                        //     .catch((err) => {
                        //         res.status(500).json({message: err});
                        //         console.log('[ERROR save] \n', err);
                        //         return;
                        //     });

                        res.status(200).json({'id': id});
                        console.log('Register processing, not verified');

                        const data = {'id': id, 'password': hash, 'email': email };
                        const confirmToken = sign(data, process.env.REGISTER_SECRET);
                        sendConfirmationEmail(id, email, confirmToken);
                        return;
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