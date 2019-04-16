module.exports = function(req, res, next) {
    //assign req (request) to variable called session
    const {session} = req;

    //check if request does not contain user information
    if ( !session.user) {
        //no user yet so create default user
        session.user = {username: '', cart: [], total: 0};
    }
    
    //user exists - move to next function/action
    next();
};