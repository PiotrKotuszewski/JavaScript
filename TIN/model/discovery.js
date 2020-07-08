
const discoveryList = [];
const db = require('../db/mysql');


class Discovery{
    constructor(name, description, date, url, voteUp, voteDown, voteCount, discoveryId, userId){
        this.name = name;
        this.description = description;
        this.date = date;
        this.url = url;
        this.voteUp = voteUp;
        this.voteDown = voteDown;
        this.voteCount = voteUp+voteDown;
        this.discoveryId = discoveryId;
        this.userId = userId;
    }

    static addDiscovery(discovery, userId){
        return db.execute("INSERT INTO discovery (name, description, url, user_id, date, up_vote, down_vote, vote_count) " +
            "VALUES (?, ?, ?, ?, ? , ?, ?, ?);",
            [discovery.name, discovery.description, discovery.url, userId, new Date(),
                discovery.voteUp, discovery.voteDown, discovery.voteUp+discovery.voteDown]);
    }

    static discoveryList(){
        return db.query("SELECT * FROM discovery\n" +
            "INNER JOIN user on user.user_id = discovery.user_id\n" +
            "ORDER BY vote_count DESC;");
    }

    static getDiscoveryListByDiscoveryId(discoveryId){
        let filteredList = discoveryList.filter(x => x.discoveryId == discoveryId);
        return filteredList;
    }

    static discoveryDetailsByUserId(userId){
        return db.query("SELECT * FROM discovery\n" +
            "INNER JOIN user ON user.user_id = discovery.user_id\n" +
            "WHERE discovery.user_id = ?;", [userId]);
    }

    static discoveryAndVoteList(loggedUserId){
        return db.query("SELECT * FROM vote\n" +
            "INNER JOIN discovery on vote.discovery_id = discovery.discovery_id\n" +
            "WHERE vote.user_id = ?;", [loggedUserId])
    }

    static editDiscovery(discoveryId, newDescription){
       return db.execute("UPDATE discovery SET description = ? WHERE discovery_id = ?;", [newDescription, discoveryId]);

    }

    static removeDiscovery(discoveryId){
        db.execute("DELETE FROM vote WHERE discovery_id = ?", [discoveryId]);
        return db.execute("DELETE FROM discovery WHERE discovery_id = ?", [discoveryId]);
    }

    static updateVote(discoveryId, voteUp, voteDown){
        return db.execute("UPDATE discovery SET up_vote = up_vote + ?, down_vote = down_vote + ?, vote_count = up_vote+down_vote WHERE discovery_id = ?", [voteUp, voteDown, discoveryId]);
    }

    static discoveryListByName(name){
        return db.query("SELECT * FROM discovery WHERE name = ?", [name]);
    }
    static discoveryListByUrl(url){
        return db.query("SELECT * FROM discovery WHERE url = ?", [url]);
    }

    static discoveryUserAndVoteList(){
        return db.query("SELECT discovery.name, user.username, vote.type, vote.date FROM discovery\n" +
            "INNER JOIN user on discovery.user_id = user.user_id\n" +
            "INNER JOIN vote on discovery.discovery_id = vote.discovery_id\n" +
            "WHERE ");
    }

    static deleteDiscoveryWhenUserDelete(user_id){
        return db.execute("DELETE FROM discovery WHERE user_id = ?;", [user_id]);
    }
}

module.exports = Discovery;