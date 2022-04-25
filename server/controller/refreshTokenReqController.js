const users = require('../models/user');

const {
    checkRefeshToken,
    generateAccessToken,
    sendAccessToken,
} = require('./tokenFunc');

const refresh = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken){
        res.status(400).json({message: 'refresh token has not provided'});
        console.log('no refresh token');
        return;
    }

    const refreshTokenData = checkRefeshToken(refreshToken);
    if (!refreshTokenData) {
        res.status(400).json({message: 'invalid refresh token'});
        console.log('invalid refresh token');
        return;
    }
    else{
        const { id } = refreshTokenData;
        users
            .findOne({"id": id})
            .then((user) => {
                if (!user) {
                    res.status(404).json({message: 'old refreshToken'});
                    console.log('old refreshToken');
                    return;
                }
                else {
                    const newAccessToken = generateAccessToken({'id': id});
                    sendAccessToken(res, newAccessToken);
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