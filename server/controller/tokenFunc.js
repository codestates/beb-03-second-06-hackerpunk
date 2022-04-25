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
    
    sendRefreshToken: (res, refreshToken) => {
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
    },

    sendAccessToken: (res, accessToken) => {
        res.json({ accessToken, message: "ok" });
    },

    resendAccessToken: (res, accessToken, data) => {
        res.json({ accessToken, message: "ok" });
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

    checkRefeshToken: (refreshToken) => {
        try {
            return verify(refreshToken, process.env.REFRESH_SECRET);
        } catch (err) {
            return null; // return null if refresh token is not valid
        }
    },
}