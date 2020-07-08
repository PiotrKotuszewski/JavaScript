const express = require('express');
const router = express.Router();

const Discovery = require('../model/discovery');
const User = require("../model/user");

let discoveryIdTest;
let loggedUserId;

router.get("/", (req, res, next) => {
   User.userListById(loggedUserId).then(( [userList])=>{
      Discovery.discoveryList().then(( [discoveryList])=>{
         res.render('users/logged', {discoveryList: discoveryList, userList: userList});
      });
   });
});


router.get("/showDiscoveryAdd", (req, res, next)=>{
   loggedUserId = req.query.id;
   User.userListById(loggedUserId).then(( [userList, fields])=>{
      res.render('users/addDiscovery', {discovery: {}, userList: userList});
   }).catch(err =>{
      console.log(err);
   });
});

router.get('/showEditDiscovery', (req, res, next)=>{

   discoveryIdTest = req.query.discoveryId;
   User.userListById(loggedUserId).then(( [userList])=>{
      Discovery.discoveryDetailsByUserId(loggedUserId).then(([discoveryList])=> {
         res.render('users/editDiscovery', {discoveryList: discoveryList, userList: userList});
      });
   });
})

router.post("/addDiscovery", (req, res, next)=>{
   Discovery.discoveryListByName(req.body.name).then(([names])=>{
      Discovery.discoveryListByUrl(req.body.url).then(([urls])=>{
         if(names[0] != null){
            req.flash('nameError', 'Post o tej nazwie juz istnieje');
            res.redirect('/discovery/showDiscoveryAdd?id='+loggedUserId);
         }else if(urls[0] != null){
            req.flash('urlError', 'Post z tym urlem juz istnieje');
            res.redirect('/discovery/showDiscoveryAdd?id='+loggedUserId);
         }else {

   const newDiscovery = new Discovery(req.body.name, req.body.description, new Date(), req.body.url,0,0);
   Discovery.addDiscovery(newDiscovery, loggedUserId).then(() =>{
      res.redirect('/users');
   }).catch(err =>{
      console.log(err);
   });
         }

   });
});
});

router.post('/editDiscovery', (req, res, next)=>{
   Discovery.editDiscovery(discoveryIdTest, req.body.description).then(() =>{
      res.redirect('/discovery');
   }).catch(err =>{
      console.log(err);
   });
});

router.get('/userDiscoveries', (req, res, next)=>{
   loggedUserId = req.query.id;

   User.userAndRoleList(loggedUserId).then(( [userList])=>{
      Discovery.discoveryDetailsByUserId(loggedUserId).then(([discoveryList])=> {
             Discovery.discoveryAndVoteList(loggedUserId).then(([voteList])=>{
                    res.render('users/userDiscoveries', {discoveryList: discoveryList, userList: userList, voteList: voteList});
                 });
          });
       });
});

router.get('/deleteDiscovery', (req, res, next) =>{
   Discovery.removeDiscovery(req.query.discoveryId).then(() =>{
      User.userAndRoleList(loggedUserId).then(( [userList])=>{
         Discovery.discoveryDetailsByUserId(loggedUserId).then(([discoveryList])=> {
            Discovery.discoveryAndVoteList(loggedUserId).then(([voteList])=>{
               res.render('users/userDiscoveries', {discoveryList: discoveryList, userList: userList, voteList: voteList});
            });
         });
      });
   }).catch(err =>{
      console.log(err);
   });
});

module.exports.route = router;