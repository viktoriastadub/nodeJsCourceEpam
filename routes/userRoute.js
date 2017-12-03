import express from 'express'

const userRoute = express.Router();
const userMap = new Map();
let id = 1;
const product = {
    name: 'Vika',
    title: 'Course'
};
userMap.set(id, product);


userRoute.get('/', (req, res) => {
    res.send(userMap)
});

userRoute.get('/:id', (req, res) => {
    res.send(userMap.get(Number(req.params.id)) || {});
});

userRoute.post('/', (req, res) => {
    id += 1;
    userMap.set(id, (req.body));
    res.send(userMap);
});


export default userRoute;