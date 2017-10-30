import fs from 'fs';
import EventEmitter from 'events';
import Config from '../../config/config.json';

const EventEmitterDir = new EventEmitter();

function fsWatcherListener(eventType, filename) {
    console.log('DirWatcher', eventType, filename);
    if (eventType === 'change') {
        EventEmitterDir.emit(Config.dirWatcherEventName, filename);
    }
}

class DirWatcher {

    watch(path, delay) {
        setTimeout(() => fs.watch(path, {recursive: true}, fsWatcherListener), delay);
    }
}

export {EventEmitterDir, DirWatcher}