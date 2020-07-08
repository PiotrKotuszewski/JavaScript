const db = require('../db/mysql');

class userRole{
    constructor(roleName, username) {
        this.roleName = roleName;
        this.username = username;
    }

    static add(username){
        return db.execute("INSERT INTO tin_database.user_role (username) VALUES (?);", [username]);
    }

    static updateUsername(username, usernameBefore){
        db.execute("UPDATE user_role SET username = ? WHERE username = ?", [username, usernameBefore]);
    }

    static banUser(username, reason){
        db.execute("UPDATE user SET is_active = 0 WHERE username = ?;", [username]);
        return db.execute("UPDATE user_role SET role_name = ?, description = ? WHERE username = ?;", ['Zablokowany', reason,  username]);
    }

    static unBanUser(username){
        db.execute("UPDATE user SET is_active = 1 WHERE username = ?;", [username]);
        return db.execute("UPDATE user_role SET role_name = ?, description = '' WHERE username = ?;", ['Użytkownik', username])
    }

    static banReason(username){
        return db.query("SELECT * FROM user_role WHERE username = ?;",[username]);
    }

    static deleteRole(username){
        return db.execute("DELETE FROM user_role WHERE username = ?;", [username]);
    }
}

module.exports = userRole;