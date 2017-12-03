export default (req,res,next) => {
    req.parsedCoockie =  req.cookies;
    next();
}