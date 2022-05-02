const dotenv = require('dotenv');
dotenv.config();

const nodemailer = require('nodemailer');
const { sign } = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const users = require('../models/user');
//const { customAlphabet } = require('nanoid');

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD
    }
});

const sendConfirmationEmail = (name, email, confirmationCode) => {
    transport
        .sendMail({
            from: process.env.MAIL_ID,
            to: email,
            subject: "[HackerPunk] Please confirm your account!",
            html: `<h1>Email Confirmation</h1>
                <h2>Hello ${name}</h2>
                <p>Thank you for joining the HackerPunk. Please confirm your email by clicking the following link.</p>
                <a href=${process.env.CLIENT}/confirm?token=${confirmationCode}> Click here</a>
                </div>`
        })
        .catch((err) => {
            console.log('fail,\n', err);
            return;
        })
    console.log('succeed, sent confirmation email');
}

const register = async (req, res) => {
    try{
        const { id, password, email } = req.body;
        console.log('===========================================');
        console.log(`[register] id: ${id}, password: ${password}, email: ${email}`);
        if (!id || !password || !email) {
            res.status(400).json({message: 'fail, need id, password and email'});
            console.log('fail, need id, password and email');
            return;
        }
    
        await users
            .findOne({"userId": String(id)})
            .then((user) => {
                if (user) {
                    res.status(400).json({message: 'fail, user already exists'});
                    console.log('fail, user already exists');
                    return;
                }
                else {
                    bcrypt.genSalt(saltRounds, (err, salt) => {
                        if (err) {
                            res.status(500).json({message: 'fail'});
                            console.log('fail \n', err);
                            return;
                        }
                        bcrypt.hash(password, salt, (err, hash) =>{
                            if (err) {
                                res.status(500).json({message: 'fail'});
                                console.log('fail \n', err);
                                return;
                            }
    
                            const data = {'id': id, 'password': hash, 'email': email };
                            const confirmToken = sign(data, process.env.REGISTER_SECRET);
                            try{
                                sendConfirmationEmail(id, email, confirmToken);
                            }
                            catch(err){
                                res.status(500).json({message: 'fail'});
                                console.log('fail \n', err);
                                return;
                            }
    
                            res.status(200).json({message:'succeed, please verify the account'});
                            console.log('succeed, please verify the account');
                            return;
                        })
                    })
                }
            })
            .catch((err) => {
                res.status(500).json({message: 'fail'});
                console.log('fail \n', err);
                return;
            });    
    }
    catch(err){
        res.status(400).json({message: 'fail'});
        console.log('fail');
        return;
    }
};

module.exports = {
    register
};