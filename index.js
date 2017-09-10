const {User,Product} = require('./models'),
    {name} = require('./config/config.json');
let user = new User('Vika'),
    product = new Product('Test');
console.log(name);