import express from 'express';
import productRoute from './productRoutes';
import userRoute from './userRoute';

const apiRouter = express.Router();
apiRouter.use('/products',productRoute);
apiRouter.use('/users',userRoute);

export default apiRouter;