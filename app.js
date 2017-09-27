import Config from './config/config.json';
import { User, Product } from './models';
import {EventEmitterDir, DirWatcher} from './modules/dirwatcher';
import Importer from './modules/importer';

const user = new User('Vika');
const product = new Product();
const dirWatcher = new DirWatcher();
const importer = new Importer();

console.log(Config.name);
dirWatcher.watch(Config.dataPath, 1000);
importer.subscribe(EventEmitterDir, Config.dirWatcherEventName, { isSync: false });