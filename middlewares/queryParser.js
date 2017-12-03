import expressQSParser from 'express-qs-parser';

export default expressQSParser({
    // list of parameters to be analyzed
    params: {
        //applies the pattern on all matched elements thanks to the global option
        filters: /([\w-_]+)(\>|<|\=|\!=)([\w_-]+)/g,
        order: /(-?)([\w\s]+)/
    },
    // name of the request property where the middleware will store the parsed parameters
    storage: 'parsedQuery'
});