import { Strategy } from 'passport-local';
import  users  from '../config/users';

export default new Strategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
    const emailLogin = users.find(user => user.email == email);
    console.log(emailLogin);
    if(emailLogin && password == emailLogin.password) {
        return done(null, emailLogin);
    }
    return done(null, false);
});