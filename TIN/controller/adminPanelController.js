const express = require('express');
const router = express.Router();
const db = require('../db/mysql');
const Discovery = require('../model/discovery');
const userRole = require('../model/userRole');
const User = require('../model/user');
const Vote = require('../model/vote');

let username = '';

router.get('/', (req, res, next)=>{
    db.query("SELECT * FROM user\n" +
        "INNER JOIN user_role on user.username = user_role.username\n" +
        "WHERE user.username = ?", ['Admin']).then(( [loggedUserList])=>{
                db.query("SELECT discovery.discovery_id,\n " +
                    "user.is_active, user.user_id, user.username, COUNT(discovery.discovery_id) AS discoveryCount,\n" +
                    " SUM(discovery.vote_count) AS SumVoteCount FROM user\n" +
                    "LEFT JOIN discovery ON discovery.user_id = user.user_id\n" +
                    "INNER JOIN user_role on user.username = user_role.username\n" +
                    "WHERE role_name = 'Użytkownik' OR role_name = 'Zablokowany'\n" +
                    "GROUP BY user.username").then(( [allUsersInfoList])=>{
                        db.query("SELECT * FROM discovery\n" +
                            "INNER JOIN user ON user.user_id = discovery.user_id").then(([discoveryList])=>{
                                res.render('users/adminPanel', {loggedUserList: loggedUserList, discoveryList: discoveryList, allUsersInfoList: allUsersInfoList });
                        });

                    });
        });
});

router.get('/showBanUserForm', (req, res, next)=>{
    username = req.query.username;
    User.listByUsername('Admin').then(( [userList])=> {
            res.render('users/banUser', {userList: userList})
    });
});

router.post('/banUser', (req, res, next)=>{
    userRole.banUser(username, req.body.reason).then(()=>{
        res.redirect('/adminPanel');
    }).catch(err =>{
        console.log(err);
    });
});

router.get('/unBanUser', (req, res, next)=>{
    userRole.unBanUser(req.query.username).then(()=>{
       res.redirect('/adminPanel')
    }).catch(err =>{
        console.log(err);
    });
});

router.get('/deleteUserDiscovery', (req, res, next)=>{
    Discovery.removeDiscovery(req.query.discoveryId).then(()=>{
        res.redirect('/adminPanel');
    }).catch(err =>{
        console.log(err);
    });
});

router.get('/deleteUser', (req, res, next)=> {
    db.query("SELECT * FROM vote WHERE user_id = ?;", [req.query.user_id]).then(([list])=>{
       // console.log(list[0].discovery_id);
        list.forEach(function (user) {
            console.log(user.type);
            if(user.type == 'VOTE_UP') {
                Vote.deleteUpVote(user.discovery_id);
                console.log("DELETE UP")
            } else if(user.type == 'VOTE_DOWN') {
                Vote.deleteVoteDown(user.discovery_id);
                console.log("DELETE DOWN")
            }
        });
        Vote.deleteVoteWhenUserDelete(req.query.user_id).then(()=>{
           Discovery.deleteDiscoveryWhenUserDelete(req.query.user_id).then(()=>{
               userRole.deleteRole(req.query.username).then(()=>{
                   User.deleteUser(req.query.user_id).then(()=>{
                       res.redirect('/adminPanel');
                   }).catch(err=>{
                       console.log(err);
                   })
               });
                   });
               }).catch(err=>{
                   console.log(err);
        })
   })
});


module.exports.route = router;