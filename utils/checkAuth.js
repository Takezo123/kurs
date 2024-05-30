import jwt from 'jsonwebtoken'; //npm install jsonwebtoken
export default (req,res,next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/,'');
    
    if (token) {
        try {
            const decoded  =  jwt.verify(token, 'secret');
            req.userId=  decoded._id;
            next();
        } catch (e) {
            return res.status(403).json({
                message: 'Unauthorized',
            });
        }
    }else{
        return res.status(401).json({
            message: 'Unauthorized',
        });
    
    }
    
};