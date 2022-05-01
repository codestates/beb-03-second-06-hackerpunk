const { sign, verify } = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    generateAccessToken: (data) => {
        return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1d" });
    },

    generateRefreshToken: (data) => {
        return sign(data, process.env.REFRESH_SECRET, { expiresIn: "30d" });
    },
    
    sendRefreshToken: (res, refresh_token) => {
        res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
    },

    sendAccessToken: (res, access_token) => {
        res.json({ access_token, message: "succeed" });
    },

    resendAccessToken: (res, access_token, data) => {
        res.json({ access_token, message: "succeed" });
    },

    isAuthorized: (req) => {
        const authorization = req.headers["authorization"];
        if (!authorization) {
          return null;
        }
        const token = authorization.split(" ")[1];
        try {
            return verify(token, process.env.ACCESS_SECRET);
        } catch (err) {
            return null; // return null if invalid token
        }
      },

    checkRefeshToken: (refresh_token) => {
        try {
            return verify(refresh_token, process.env.REFRESH_SECRET);
        } catch (err) {
            return null; // return null if refresh token is not valid
        }
    },
}