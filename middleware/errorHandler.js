module.exports = (err, req, res, next) => {
    console.error(err.stack);
    console.error('Error Message:', err.message);
    console.error('Error Stack:', err.stack);
    res.status(500).send('Something broke!');
};