const express = require('express');
const router = express.Router();
const Vote = require('../model/vote');
const User = require("../model/user");
const Discovery = require("../model/discovery");
const db = require('../db/mySql');
let loggedUserId = 0;

router.get('/deleteVote', (req, res, next)=>{
    console.log(req.query.type);
    Vote.deleteVote(req.query.discoveryId, req.query.userId, req.query.type);
    let loggedUserId = req.query.userId;
    User.userAndRoleList(loggedUserId).then(( [userList])=>{
        Discovery.discoveryDetailsByUserId(loggedUserId).then(([discoveryList])=> {
            Vote.voteListAndDiscoveryByUserId(loggedUserId).then(([voteList])=>{

                res.render('users/userDiscoveries', {discoveryList: discoveryList, userList: userList, voteList: voteList});
            });
        });
    });
});


router.get('/upVote', (req, res, next)=> {
    loggedUserId = User.getLoggedUserId();
    db.query("SELECT COUNT(*) as count, type FROM vote WHERE discovery_id = ? AND user_id = ?;", [req.query.id, loggedUserId])
        .then(([vote])=>{
           if(vote[0].count == 0) {
               Vote.insertVote(req.query.id, loggedUserId, 'VOTE_UP').then(()=>{
                   Vote.addVoteUp(req.query.id).then(()=>{
                       res.redirect('/users');
                   });
               });
           }else if(vote[0].count == 1){
               if(vote[0].type == 'VOTE_UP'){
                   Vote.deleteUpVote(req.query.id).then(()=>{
                       Vote.deleteVote(req.query.id, loggedUserId).then(()=>{
                          res.redirect('/users');
                       });
                   });
               }else if(vote[0].type == 'VOTE_DOWN'){
                   Vote.updateVote(req.query.id, loggedUserId, 'VOTE_UP').then(()=>{
                       Vote.voteUp(req.query.id).then(()=>{
                           res.redirect('/users');
                       });
                   });
               }
           }
        });

   // Vote.vote(req.query.id, loggedUserId, req.query.type)
});

router.get('/downVote', (req, res, next) => {
        loggedUserId = User.getLoggedUserId();
    db.query("SELECT COUNT(*) as count, type FROM vote WHERE discovery_id = ? AND user_id = ?;", [req.query.id, loggedUserId])
        .then(([vote])=>{
            if(vote[0].count == 0) {
                Vote.insertVote(req.query.id, loggedUserId, 'VOTE_DOWN').then(()=>{
                    Vote.addVoteDown(req.query.id).then(()=>{
                        res.redirect('/users');
                    });
                });
            }else if(vote[0].count == 1){
                if(vote[0].type == 'VOTE_DOWN'){
                    Vote.deleteVoteDown(req.query.id).then(()=>{
                        Vote.deleteVote(req.query.id, loggedUserId).then(()=>{
                            res.redirect('/users');
                        });
                    });
                }else if(vote[0].type == 'VOTE_UP'){
                    Vote.updateVote(req.query.id, loggedUserId, 'VOTE_DOWN').then(()=>{
                        Vote.voteDown(req.query.id).then(()=>{
                            res.redirect('/users');
                        });
                    });
                }
            }
        });
       // Vote.vote(req.query.id, loggedUserId, req.query.type);
});

module.exports.route = router;