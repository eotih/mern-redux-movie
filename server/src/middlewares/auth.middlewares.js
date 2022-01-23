const jwt = require("jwt-then");

const isAuth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) throw "Forbidden!!";
        const token = req.headers.authorization.split(" ")[1];
        const payload = await jwt.verify(token, process.env.SECRET);
        req.payload = payload;
        next();
    } catch (err) {
        res.status(401).json({
            message: "Forbidden 🚫🚫🚫",
        });
    }
};
const isAdmin = async (req, res, next) => {
    try {
        if(!req.user && req.user.role !== "admin") throw "Forbidden!!";
        next();
    }
    catch (err) {
        res.status(401).json({
            message: "Forbidden 🚫🚫🚫",
        });
    }
};
module.exports = {isAdmin, isAuth};