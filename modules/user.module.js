const { sucRes, errRes, generateShortId } = require('../services/utils');
const User = require('../models/user.model');
module.exports = {

    registration: async(req, res) => {
        try {
            let userData = new User(req.body);
            let userDetails = await userData.save();
            if (userDetails == null) {
                return errRes('Something Went Wrong..Unable to save');
            } else {
                return sucRes('User Details saved successfully', userDetails);
            }
        } catch (error) {
            console.log(error);
            if (error.errmsg != undefined) {
                if (error.name = 'MongoError' && error.errmsg.includes('duplicate')) {
                    return errRes('Email Already Exists!!');
                } else {
                    return errRes('Something went wrong, unable to save details');
                }
            } else {
                return errRes('Something went wrong, unable to save details');
            }
        }
    },

    login: async(req, res) => {
        try {
            let userData = await User.findOne({ email: req.body.email });
            if (userData !== null) {
                let isMatched = userData.validatePassword(req.body.password);
                if (isMatched) {
                    return sucRes('User is Logged In successfully', userData);
                } else {
                    return errRes('Invalid Credentials, Please check your Username/Password');
                }
            } else {
                return errRes('Email not found..Please try again');
            }
        } catch (error) {
            console.log(error);
            return errRes('Something Went Wrong!!');
        }
    },
}