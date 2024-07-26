const jwt = require("jsonwebtoken")


// ====== Ensure that there is a Token or not ======
function verifyToken(req, res, next) {
    const authToken = req.headers.authorization

    if (authToken) {
        const token = authToken.split(" ")[1]
        try {
            // Decode the token and get the data
            const decodedPayload = jwt.verify(token, process.env.JWT_SECRET_KEY)
            console.log("decodedPayload  -->> ", decodedPayload);
            // attach user to request obj
            req.user = decodedPayload
            next()
        } catch (error) {
            return res.status(401).json({ message: "authenthication failed" })
        }
    } else {
        return res.status(401).json({ message: "no token provide, access denied" })
    }
}

// ====== Ensure that there is a Token admin or not ======
function verifyTokenAndAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return res.status(403).json({ message: "you are not an admin" })
        }
    })
}

module.exports = {
    verifyToken, verifyTokenAndAdmin
}