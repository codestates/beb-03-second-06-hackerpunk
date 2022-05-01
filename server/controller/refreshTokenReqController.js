const users = require('../models/user');

const {
    checkRefeshToken,
    generateAccessToken,
    sendAccessToken,
} = require('./tokenFunc');

const refresh = async (req, res) => {
    try{
        const refresh_token = req.cookies.refresh_token;
        if (!refresh_token){
            res.status(400).json({message: 'fail, refresh token has not provided'});
            console.log('fail, refresh token has not provided');
            return;
        }
    
        const refreshTokenData = checkRefeshToken(refresh_token);
        if (!refreshTokenData) {
            res.status(400).json({message: 'fail, invalid refresh token'});
            console.log('fail, invalid refresh token');
            return;
        }
        else{
            const { id } = refreshTokenData;
            await users
                .findOne({"userId": id})
                .then((user) => {
                    if (!user) {
                        res.status(404).json({message: 'fail, old refreshToken'});
                        console.log('fail, old refreshToken');
                        return;
                    }
                    else {
                        const access_token = generateAccessToken({'id': id});
                        sendAccessToken(res, access_token);
                        console.log('succeed, sent new accessToken');
                        return;
                    }
                })
                .catch((err) => {
                    res.status(500).json({message: 'fail'});
                    console.error(err);
                    return;
                })
        }
    }
    catch(err){
        res.status(400).json({message: 'fail, refresh'});
        console.error(err);
        return;
    }
}

module.exports = {
    refresh
};