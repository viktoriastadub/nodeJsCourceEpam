import fs from 'fs';
import through2 from 'through2';
import csv from 'node-csv';
import {filterCVS} from '../modules/importer'

const readable = filePath => fs.createReadStream(filePath);
export const fileReader = filePath => readable(filePath).pipe(process.stdout);


export const fileUpdater = (filePath) =>
    readable(filePath).pipe(through2(function(chunk, enc, callback){
        this.push(chunk.toString().toUpperCase());
        callback();
    })).pipe(process.stdout);


const convertStreamToJson = () => through2(function(chunk, enc, callback) {
    filterCVS(chunk.toString()).then((cvs) => {
        this.push(JSON.stringify(cvs));
        callback()
    });
});

export  const cvsTojsonIO = (filePath) => readable(filePath).pipe(convertStreamToJson.call()).pipe(process.stdout);


export const fileTransformer = (filePath) => readable(filePath).pipe(convertStreamToJson.call())
    .pipe(fs.createWriteStream(filePath.replace('csv','json')));