const jwt = require('jsonwebtoken');
const JWT_SECRET_STRING = "Let'sNoteWebAppCreatedByKartikJoshi";

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers['auth-token'];
        if (!authHeader) {
            return res.status(401).json({ "error": "Please use a valid authentication token" });
        }

        const token_verification = jwt.verify(authHeader, JWT_SECRET_STRING);
        req.user = token_verification.user;
    } catch (error) {
        return res.status(500).send({ error: "Internal Server error occured" });
    }
    next();
}

module.exports = authenticate;