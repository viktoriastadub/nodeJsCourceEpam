import express from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_WORD } from '../config/config.json'
import { users } from '../config/users';

const authRoute = express.Router();
const USER_NOT_FOUND = 'User not found.';
const PASS_NOT_FOUND = 'Password is wrong.';
const MESSAGE = 'Success!';

authRoute.post('/auth', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = users[email];
    if(!user) {
        res.json({ success: false, message: USER_NOT_FOUND})
    }
    if(user.password!==password) {
        res.json({ success: false, message: PASS_NOT_FOUND})
    }
    const payload = {
        user: user.name
    };
    const token = jwt.sign(payload,SECRET_WORD);
    res.json({
        success: true,
        message: MESSAGE,
        token: token
    });
});

export default authRoute;