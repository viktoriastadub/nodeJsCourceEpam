import fs from 'fs';
import path from 'path';
import Config from '../../config/config.json';
import parseCSVSSync from 'csv-parse/lib/sync';
import parse from 'csv-parse';
import csv from 'node-csv';

export const filterCVS = (file) => {
    return new Promise((resolve,reject)=>{
        csv.createParser().parse(file, (err, data) => {
            if (err) {
                return reject(err)
            }
            const [props, ...items] = data;
            console.log(props);
            const filteredData = items.map(vals => vals.reduce((obj, val, idx) => ({...obj, [props[idx]]: val}),{}));

            return resolve(filteredData);
        });
    });

};

export default class Importer {

    subscribe(emitter, eventName, options = {isSync: false}) {
        if (options.isSync) {
            emitter.on(eventName, this.importSync.bind(this));
        } else {
            emitter.on(eventName, this.import.bind(this));
        }
    }

    writeDataToJson(data) {
        let outPathResults = path.join(Config.resultsFileName);

        fs.writeFileSync(outPathResults, JSON.stringify(data), 'utf8',
            function (err) {
                console.log(err);
            });
    }

    import() {
        return new Promise((resolve, reject) => {
            const outPutData = [];
            const fullPathToData = path.join(Config.dataPath, Config.fileName);

            const records = parse({delimiter: ',', columns: true});
            let record;

            records.on('readable', () => {
                record = records.read();

                while (record) {
                    outPutData.push(record);
                    record = records.read();
                    this.writeDataToJson(outPutData);
                }
            });
            records.on('finish', () => resolve(outPutData));
            records.on('error', () => reject());

            fs.createReadStream(fullPathToData).pipe(records);
        });
    }

    importSync() {
        const fullPathToData = path.join(Config.dataPath, Config.fileName);
        const fileContent = fs.readFileSync(fullPathToData, {encoding: 'utf8'});
        const outPutData = parseCSVSSync(fileContent, {columns: true});

        this.writeDataToJson(outPutData);
        return outPutData;
    }
}