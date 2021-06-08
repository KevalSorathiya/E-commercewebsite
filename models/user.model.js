let mongoose = require("mongoose");
let crypto = require('crypto');

let userSchema = mongoose.Schema({
    fname: String,
    mname: String,
    lname: String,
    address: String,
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    uuid: String,
    encrypt_key: {
        type: String
    },
    dob: Date,
    phoneNumber: String,
    aboutMe: String,
    extraInformation: String,
    technicalSkills: Array,
    templateSelected: Number


});

userSchema.pre('save', function save(next) {
    const user = this
    let password = user.password
    if ((password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[~`!@#$%^&*()+_=\\|[\]{}:;"'?/,.<>-])(?=.*[A-Z]).{8,16}$/))) {
        this.encrypt_key = crypto.randomBytes(16).toString('hex')
        this.password = crypto.pbkdf2Sync(password, this.encrypt_key, 1000, 64, 'sha512').toString('hex')
        next()
    } else {
        next({ code: 500, error: 'password must contains 8 char with special char,small letter,capital letter and a number' })
    }
})

userSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.encrypt_key, 1000, 64, 'sha512').toString('hex')
    return this.password === hash
}
module.exports = mongoose.model("users", userSchema);