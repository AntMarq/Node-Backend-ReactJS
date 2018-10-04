const jwt = require ('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_KEY);
        console.log("req = ", req.originalUrl === '/users');
        console.log("decode.admin = ", decode.admin);
        console.log("decode.email = ", decode.email);
        if(decode.admin && req.originalUrl === '/users' || req.originalUrl === '/recipes'){
            req.userData = decode;
            next();
        }
        else{
            return res.status(401).json({
                message: "You don\'t have access to get all users"
            });
        }
        
    }
    catch (error){
        return res.status(401).json({
            message: 'Auth failed 2'
        });
    }
};