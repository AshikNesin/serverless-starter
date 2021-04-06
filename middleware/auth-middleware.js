const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

const authMiddleware = (req, res, next) => {
    let token = req.cookies.token;
    const authHeader = req.headers.authorization;
    if (!token && authHeader) {
        token = authHeader.split(' ')[1]
    }

    if (token) {
        // decode the JWT so we can get the user Id on each request
        const payload = jwt.verify(token, JWT_SECRET_KEY);
        req.isAuthenticated = true;
        req.userId = payload.userId
    }
    next();
}

export default authMiddleware;