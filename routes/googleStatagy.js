import { Strategy as GoogleStrategy }  from 'passport-google-oauth20'

export default new GoogleStrategy({
        clientID: '991886807312-605j32h99vuqbn9h58095jhlted47cjl.apps.googleusercontent.com',
        clientSecret: 'J6ZJe43ngmAt-UZvTxsmk1XC',
        callbackURL: 'http://localhost:8080/'
    },
    (accessToken, refreshToken, profile, done) => {
        return done(null, accessToken);
    })