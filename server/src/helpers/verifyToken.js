const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied!');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        next();

    } catch (err) {
        return res.status(400).send('Invaild Token!');
    }
}

const generateToken = (user) => {
    const token = jwt.sign(
        {
            _id: user._id,
            title: user.title,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            registered: user.registered,
            role: user.role
        },
        process.env.TOKEN_SECRET
    );
    return token;
}



module.exports.verifyToken = verifyToken;
module.exports.generateToken = generateToken;