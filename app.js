import Config from './config/config.json';
import {User, Product} from './models';
import {EventEmitterDir, DirWatcher} from './modules/dirwatcher';
import Importer from './modules/importer';
import express from 'express';
import cookieParser from 'cookie-parser';
import cookies  from './middlewares/cookieParser';
import queryParser from './middlewares/queryParser';
import bodyParser from 'body-parser';
import productRoute from './routes/productRoutes';
import userRoute from './routes/userRoute';
import authRoute from './routes/authRoutes';
import authMiddle from './middlewares/passportAuthMiddle';
import passportLocal from './routes/localStratagy';
import apiRouter from './routes/apiRouter'
import session  from 'express-session';
import passport from 'passport';
import {GoogleStrategy}  from './routes/googleStatagy'

const user = new User('Vika');
const product = new Product();
const dirWatcher = new DirWatcher();
const importer = new Importer();

console.log(Config.name);
dirWatcher.watch(Config.dataPath, 1000);
importer.subscribe(EventEmitterDir, Config.dirWatcherEventName, {isSync: false});

const appExpress = express();
appExpress.use(cookieParser());
appExpress.use(cookies);
appExpress.use(queryParser);
appExpress.use(bodyParser.json());
appExpress.use(session({secret: '1q2w454e4r5t', resave: true, saveUninitialized: true}));
appExpress.use(passport.initialize());
appExpress.use(passport.session());
appExpress.use(express.static('./static'));
// passport.use(passportLocal);
//
// passport.serializeUser(function(user, done) {
//         done(null, user.login);
//     });
//
// passport.deserializeUser(function(login, done) {
//         done(null, {login, password: 'password'});
//     });

// appExpress.post('/auth', passport.authenticate('local'), (req, res) => { res.json(req.user)});
passport.use(passportLocal);
passport.use(GoogleStrategy);
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
app.get('/auth/google',
    passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/plus.login'}), (req, res)=> {
    });
appExpress.post('/auth', passport.authenticate('local'), (req, res) => { res.json(req.user)});
// appExpress.use('/api', authMiddle, apiRouter);
// appExpress.use('/api/products', productRoute);
// appExpress.use('/api/users', userRoute);
// appExpress.use('/auth', passportLocal);
// appExpress.get('/', (req, res)=> {
//     console.log(req.parsedCoockie);
//     console.log(res);
// });
// appExpress.get('/api/products', (req, res) => {
//     res.send(productMap)
// });
//
// appExpress.get('/api/products/:id', (req, res) => {
//     console.log(req.params.id);
//     res.send(productMap.get(Number(req.params.id)) || {});
// });
//
// appExpress.post('/api/products', (req, res)=> {
//     id += 1;
//     productMap.set(id, (req.body));
//     res.send(productMap);
//
// });
export default appExpress;