const users = require('../models/user');

const auth = async (req, res) => {
    if (req.query.code != undefined && req.query.id != undefined){
        users.
            findOne({'id': req.query.id})
            .then(async (user) => {
                if (user && user.auth == req.query.code){
                    const userModel = new users(user);
                    await userModel.update({status: 'active'});
                    res.status(200).json({message: 'register success'});
                    console.log('Register success');
                    return;
                }
                res.status(400).json({message: 'invalid user info'});
                console.log('Auth fail, invalid user info');
                return;
            })
            .catch((err) => {
                res.status(500).json({message: err});
                console.log('[ERROR find] \n', err);
                return;
            });
    }
    else {
        res.status(400).json({message: 'please fill the query parameter'});
        console.log('Auth fail, no query parameter');
        return;
    }
}

module.exports = {
    auth
};