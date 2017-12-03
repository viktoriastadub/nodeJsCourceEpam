import express from 'express'

const productRoute = express.Router();
const productMap = new Map();
let id = 1;
const product = {
    name: 'Supreme T-Shirt', 
    brand: 'Supreme',
    price: 99.99,
    options: [
        {color: 'blue'},
        {size: 'XL'}]
};
productMap.set(id,product);


productRoute.get('/', (req, res) => {
    res.send(productMap)
});

productRoute.get('/:id', (req, res) => {
    res.send(productMap.get(Number(req.params.id)) || {});
});

productRoute.post('/', (req, res) => {
    id += 1;
    productMap.set(id, (req.body));
    res.send(productMap);
});


export default productRoute;