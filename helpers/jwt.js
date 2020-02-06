const jwt = require('jsonwebtoken');

module.exports = {
    sign : payload => {
        return jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });
    }, decode: token => {
        try{
            const decoded = jwt.verify(token, process.env.SECRET);
            
            if(decoded) return decoded;
            else return null;
        } catch(err) {
            return err;
        }
    }
}