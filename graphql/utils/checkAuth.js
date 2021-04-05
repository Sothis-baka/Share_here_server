const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');

module.exports = (context) => {
    // context = { ... headers }
    const authHeader = context.req.headers.authorization;

    if(authHeader){
        // Bearer ....
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                // userPayload
                return jwt.verify(token, SECRET_KEY);
            } catch (err) {
                // Invalid/Expired token'
                return null;
            }
        }
    }

    return null;
}