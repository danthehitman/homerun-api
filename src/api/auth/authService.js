var mongoose = require('mongoose'),
    userModel = mongoose.model('user'),
    tokenModel = mongoose.model('token');

exports.authenticate = (req, res, next) => {

    tokenModel.findOne({ "token" : req.header("auth")}, (err, token) => {
        if (err) 
            return res.status(401).json({ message: 'Unauthorized' });
        else {            
            userModel.findById(token.userId, (err, result) => {
                if (err) 
                    res.status(500).json({ message: 'Unable to retrieve associated user for token.' }).send();
                else {
                    req.user = result;
                    next();
                }
            });
        }
    });

    // if (!token) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }

    // if (!user) {
    //     return res.status(500).json({ message: 'Unable to retrieve associated user for token.' });
    // }
};

exports.authorize = (req, res, next) => {
    console.log(req.user.email);
    next();
};

