const users = require('../models/user');

const {
    checkRefeshToken,
    generateAccessToken,
    sendAccessToken,
} = require('./tokenFunc');

const refresh = (req, res) => {
    const refresh_token = req.cookies.refresh_token;

    if (!refresh_token){
        res.status(400).json({message: 'refresh token has not provided'});
        console.log('no refresh token');
        return;
    }

    const refreshTokenData = checkRefeshToken(refresh_token);
    if (!refreshTokenData) {
        res.status(400).json({message: 'invalid refresh token'});
        console.log('invalid refresh token');
        return;
    }
    else{
        const { id } = refreshTokenData;
        users
            .findOne({"userId": id})
            .then((user) => {
                if (!user) {
                    res.status(404).json({message: 'old refreshToken'});
                    console.log('old refreshToken');
                    return;
                }
                else {
                    const access_token = generateAccessToken({'id': id});
                    sendAccessToken(res, access_token);
                    console.log('sent new accessToken');
                    return;
                }
            })
            .catch((err) => {
                res.status(500).json({message: err});
                console.log('[ERROR refresh] \n', err);
                return;
            })

    }
}

module.exports = {
    refresh
};