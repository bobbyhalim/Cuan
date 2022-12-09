const bcrypt = require('bcryptjs')

//*Untuk hashing password
function hashingPassword(password) {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password , salt)
    return hash
}

//*Untuk membandingkan password dengan encrypted password
//? Menghasilkan true atau false
function comparePassword(passwordUser , passwordDb) {
    return bcrypt.compareSync(passwordUser , passwordDb)
}

module.exports = {
    hashingPassword , 
    comparePassword
}