function authService(TokenModel, UserModel) {

    authenticateUser = async (username, password) => {
        let user = await getUserByUsername(username);
        //TODO: Verify password
        return user;
    }

    getUserForToken = async (token) => {
        return await getUser(token.userId);
    }

    getToken = async (token) => {
        return await TokenModel.findOne({token: token});
    }

    getUserByUsername = async (username) => {
        return UserModel.findOne({username: username}, (err, user, next) => {
            if (err) next(err);
            return user;
        });
    }

    getUser = async (id) => {
        return await UserModel.findOne({_id: id})
    }

    return { getUserForToken, getToken, authenticateUser };
}

module.exports = authService;