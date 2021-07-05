
const bcrypt = require('bcryptjs')

const { SALT_ROUNDS } = process.env

async function hashPassword ( plainText ){

    return bcrypt.hash(plainText, parseInt(SALT_ROUNDS))

}


module.exports = {
  ...bcrypt,
  hashPassword
}
