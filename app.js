import Config from './config/config.json';
import {User, Product} from './models';
import {EventEmitterDir, DirWatcher} from './modules/dirwatcher';
import Importer from './modules/importer';
import express from 'express';
import cookieParser from 'cookie-parser';
import cookies  from './middlewares/cookieParser';
import queryParser from './middlewares/queryParser';
import bodyParser from 'body-parser';

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
appExpress.get('/', (req, res)=> {
    console.log(req.parsedCoockie);
    console.log(res);
});
appExpress.get('/api/products', (req, res) => {
    res.send(productMap)
});

appExpress.get('/api/products/:id', (req, res) => {
    console.log(req.params.id);
    res.send(productMap.get(Number(req.params.id)) || {});
});

appExpress.post('/api/products', (req, res)=> {
    id += 1;
    productMap.set(id, (req.body));
    res.send(productMap);

});
export default appExpress;