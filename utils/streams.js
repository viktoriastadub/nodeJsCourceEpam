import program from 'commander';
import {commands} from "./commands.json"
import * as fileWorker from "./streamFilesCtlr"


const helpMsg = () =>
    console.log(`
        commands Example
    $ ./streams --action=io --file=MOCK_DATA.csv
    $ ./streams --action=transform-file --file=MOCK_DATA.csv
    $ ./streams -a io -f MOCK_DATA.csv
    $ ./streams --help
    $ ./streams -h
             `);
export const commandLine = () => {
    program
        .version('0.1.0')
        .option('-a, --action <action> ', 'choose and action')
        .option('-f, --file <file> ', 'file path')
        .parse(process.argv);

    program.on('--help',helpMsg);

    const actionItem = program.action;
    const fileItem = program.file;

    console.log(actionItem);
    console.log(fileItem);

    if (!actionItem || !fileItem) {
        helpMsg()
    }
    else {
        switch (actionItem.toLowerCase()) {
            case commands.IO:
                fileWorker.fileReader(fileItem);
                break;
            case commands.TRANSFROM_FILE:
                fileWorker.fileUpdater(fileItem);
                break;
            case commands.CONVERT :
                fileWorker.fileTransformer(fileItem);
                break;
            case commands.IOJSON:
                fileWorker.cvsTojsonIO(fileItem);
                break;
            default :
                console.error('this action is absent. Please check!');
                process.exit(1);
                break;
        }

    }
};

if(!module.parent){
    commandLine()
}