module.exports = (err, req, res, next) => {
    console.error(err.stack);
    console.error('Error Message:', err.message);
    console.error('Error Stack:', err.stack);
    res.status(500).send('error!');
};

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};