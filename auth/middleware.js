function ensureLoggedIn(req, res, next) {
    console.log(req.signedCookies);
    if(req.signedCookies.user_id) {
        next();
        console.log('should be working')
    } else {
        res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
        res.set('Access-Control-Allow-Credentials', 'true');
        res.status(401);
        next(new Error('Un-Authorized'));
    }
}



module.exports = {
    ensureLoggedIn
}