const bcrypt = require('bcrypt');
const util = require('util');


const hash = util.promisify(bcrypt.hash); 

const checkHash =  util.promisify(bcrypt.compare); 


module.exports = {hash, checkHash};