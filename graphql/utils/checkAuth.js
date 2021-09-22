const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (context) => {
    // context.req = { ... headers }
    const authHeader = context.req.headers.authorization;

    if(authHeader){
        // Bearer ....
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                // userPayload
                return jwt.verify(token, SECRET_KEY);
            } catch (err) {
                // Invalid/Expired token
                return null;
            }
        }
    }

    return null;
}