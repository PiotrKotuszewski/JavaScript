let nextId;
const voteList = [];
const db = require('../db/mysql');
const Discovery = require('../model/discovery');
const User = require('../model/user');
let is;

class Vote{
    constructor(date, type, voteId, discoveryId, userId) {
        this.date = date;
        this.type = type;
        this.voteId = voteId;
        this.discoveryId = discoveryId;
        this.userId = userId;
    }

    static addVote(vote, discoveryId, userId){
        vote.voteId = nextId;
        vote.discoveryId = discoveryId;
        vote.userId = userId;

        return vote;
    }

    static voteList(){
        return voteList;
    }

    static voteListAndDiscoveryByUserId(userId){
        return db.query("SELECT * FROM vote\n" +
            "INNER JOIN discovery on vote.discovery_id = discovery.discovery_id\n" +
            "WHERE vote.user_id = ?;", [userId]);
    }

    static deleteVote(discoveryId, userId) {
        return db.execute("DELETE FROM vote WHERE discovery_id = ? AND user_id = ?", [discoveryId, userId]);
    }

    static deleteVotes(user_id){
         db.query("SELECT * FROM vote WHERE user_id = ?;", [user_id]).then(([list])=>{
            list.forEach(function (user) {
                this.deleteVote(user.discovery_id, user_id, user.type);
            })
        });
    }
    static deleteVoteWhenUserDelete(user_id){
        return db.execute("DELETE FROM vote WHERE user_id = ?", [user_id]);
    };

    static addVote(userId, discoveryId, type){
        return db.execute("UPDATE vote SET vote.type = ? , vote.date = ? WHERE discovery_id = ? AND user_id = ?;",
            [type, new Date(), discoveryId, userId]);
    }
    static voteUp(discoveryId){
      return Discovery.updateVote(discoveryId, 1, 1);
    };

    static voteDown(discoveryId){
        return Discovery.updateVote(discoveryId, -1, -1);
    }

    static deleteVoteDown(discoveryId){
        return Discovery.updateVote(discoveryId, 0, 1);
    }

    static deleteUpVote(discoveryId){
        return Discovery.updateVote(discoveryId, -1, 0)
    }

    static addVoteDown(discoveryId){
       return Discovery.updateVote(discoveryId, 0, -1);
    }

    static addVoteUp(discoveryId){
        return Discovery.updateVote(discoveryId, 1, 0);
    }

    static insertVote(discoveryId, userId, voteType){
       return db.execute("INSERT INTO vote (discovery_id, user_id, date, type) VALUES (?, ?, ?, ?);",
            [discoveryId, userId, new Date(), voteType])
    }

    static updateVote(discoveryId, userId, voteType){
        return db.execute("UPDATE vote SET vote.type = ? , vote.date = ? WHERE discovery_id = ? AND user_id = ?;",
            [voteType, new Date(), discoveryId, userId]);
    }

}

module.exports = Vote;