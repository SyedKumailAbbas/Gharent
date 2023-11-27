const { verify } = require("jsonwebtoken")
const validatetoken = (req, res, next) => {
    const token = req.headers['token'];
    console.log('Token:', token); // Log the token to check if it's present
    
    if (!token) {
        console.log('No token found, sending error response.');
        return res.json({ error: "Login first" });
    }

    try {
        const valid = verify(token, "hellojani");
        console.log('Token verification result:', valid); // Log the verification result
        
        if (valid) {
            return next();
        }
    } catch (e) {
        console.log('Token verification error:', e.message); // Log the verification error
        return res.json({ error: e.message });
    }
}


module.exports = {validatetoken}