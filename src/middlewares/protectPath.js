const jwt = require('jsonwebtoken');
const User = require('../models/UserModel'); // تأكد من أنك تستورد المودل الصحيح


//  To verify JWT
function authMiddleware(req, res, next) {
    try {
        // Check the presence of the Authorization header in the request.
        const authToken = req.headers.authorization;

        // If the Authorization header is not present or does not include the token
        if (!authToken || !authToken.split(" ")[1]) {
            return res.status(401).json({ message: 'Authentication failed: Token not provided' });
        }

        // Extract the token from the Authorization header
        const token = authToken.split(" ")[1];

        // Check for token existence
        if (!token) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        //  Validate token using secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Add user information extracted from token to the request
        req.user = decoded;

        // Check if the user exists
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}




// Identity verification

function authorizeUser(req, res, next) {
    if (req.user._id.toString() !== req.params.id) {
        return res.status(403).json({ message: 'Access denied, You are not authorized to enter here!' });
    }
    next();
};

module.exports = {
    authMiddleware,
    authorizeUser
};