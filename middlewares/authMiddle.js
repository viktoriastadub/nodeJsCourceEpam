import jwt from 'jsonwebtoken';
import {SECRET_WORD} from '../config/config.json'

export default (req, res, next) => {
    console.log(req.body);
    const authToken = req.body.authToken;
    if (authToken) {
        // verifies secret and checks exp
        jwt.verify(authToken, SECRET_WORD, (err, decoded) => {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                console.dir(req);
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.status(403).send({
            success: false,
            message: 'No token.'
        });

    }
}