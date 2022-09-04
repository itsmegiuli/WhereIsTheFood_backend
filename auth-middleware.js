const jwt = require("jsonwebtoken");
const config = require('./config');

const verifyToken = (req, res, next) => {
    console.log(req.body);
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({error: "A token is required for authentication"});
    }
    try {
        req.user = jwt.verify(token, config.jwtSecret);
    } catch (err) {
        console.log(err);
        return res.status(401).send({error: "Invalid Token"});
    }
    return next();
};

module.exports = verifyToken;