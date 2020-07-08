let loggedId = 0;
const db = require('../db/mysql');

class User {

    constructor(username, email, password, id) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }


    static add(user) {
            return db.execute("INSERT INTO user (username, email, is_active, password) VALUES (?, ?, true, ?);",
                [user.username, user.email, user.password]);
    }
    static list() {
         return db.execute("SELECT * FROM user;");
    }

    static listByUsername(username){
        return db.query("SELECT * FROM user WHERE username = ?;", [username]);
    }

    static userListById(userId) {
        return db.query("SELECT * FROM user \n" +
            "INNER JOIN user_role ON user.username = user_role.username\n" +
            "WHERE user.user_id = ?", [userId]);
    }

    static userAndRoleList(loggedUserId){
        return db.query("SELECT * FROM user\n" +
        "INNER JOIN user_role on user.username = user_role.username\n" +
        "WHERE user.user_id = ?", [loggedUserId]);
    }


    static setLoggedUserId(userId){
        loggedId = userId;
    }

    static getLoggedUserId(){
        return loggedId;
    }

    static checkIfUsernameExist(username){
        return db.query("SELECT * FROM user WHERE username = ?;", [username]);
    }

    static checkIfEmailExist(email){
        return db.query("SELECT * FROM user WHERE email = ?;", [email]);
    }

    static editUser(username, email, userId){
        return db.execute("UPDATE user SET username = ?, email = ? WHERE user_id = ?;", [username, email, userId]);
    }

    static deleteUser(user_id){
        return db.execute("DELETE FROM user WHERE user_id = ?;", [user_id]);
    }
}

module.exports = User;