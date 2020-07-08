module.exports = (req, res, next) => {
    const isUserLoggedIn = req.session.isUserLoggedIn;
    const loggedUser = req.session.loggedUser;
    if(isUserLoggedIn) {
        next();
    } else if(loggedUser.is_active === 0) {
        res.redirect('/');
    }else{
        res.redirect('/');
    }
}