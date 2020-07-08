const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');

const User = require('../model/user');
const Discovery = require('../model/discovery');
const userRole = require('../model/userRole');

const pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;

let loggedUserId = 0;
let loggedUsername = "";

router.get("/", (req, res, next) => {
    Discovery.discoveryList()
        .then(( [discoveryList])=> {
        User.userListById(loggedUserId).then(( [userList])=>{
            userRole.banReason(loggedUsername).then(([userRoleList])=>{
                res.render('users/logged', {discoveryList: discoveryList, userList: userList, userRoleList: userRoleList});
            });
        });
    });
});

router.get('/notLogged', (req, res, next)=>{
    Discovery.discoveryList()
        .then(( [discoveryList])=> {
            res.render('users/notLogged', {discoveryList: discoveryList});
        });
});

router.get("/showNewForm", (req, res, next) => {
    res.render('users/register', {user: {}, userList: User.userListById(loggedUserId)});
});

router.get("/showLoginForm", (req, res, next) => {
    res.render('users/login', {user: {}, userList: User.userListById(loggedUserId)});
});

router.post("/add", (req, res, next) => {
    User.checkIfEmailExist(req.body.email).then(([emails])=>{
        User.checkIfUsernameExist(req.body.username).then(([usernames])=>{
           if(usernames[0] != null){
               req.flash('usernameError', 'Nazwa zajęta');
               res.redirect('/users/showNewForm');
           }else if(emails[0] != null) {
               req.flash('emailError', 'Email jest zajęty');
               res.redirect('/users/showNewForm');
           }else {
               bcryptjs.hash(req.body.password, 10, function (err, hash) {
                   const newUser = new User(req.body.username, req.body.email, hash);
                   User.add(newUser).then(() => {
                       userRole.add(newUser.username);
                       User.listByUsername(newUser.username).then(([rows]) => {
                           loggedUserId = rows[0].user_id;
                           loggedUsername = newUser.username;
                       })
                   });
                   res.redirect("/users/showLoginForm");
               });
           }
           });
    });
});

router.post("/login", (req, res, next)=>{
    let email = req.body.email;
    User.checkIfEmailExist(email).then(([rows])=> {
        if(rows[0] == null){
            req.flash('loginError', 'Nieprawidłowy email lub hasło');
            res.redirect('/users/showLoginForm');
        }else {
            bcryptjs.compare(req.body.password, rows[0].password, function (err, isMatch) {
                if (err) {
                    throw err;
                }else if (isMatch) {
                    loggedUserId = rows[0].user_id;
                    loggedUsername = rows[0].username;
                    User.setLoggedUserId(loggedUserId);
                    req.session.isUserLoggedIn = true;
                    req.session.userLogged = rows[0];
                    res.redirect("/users");
                }else{
                    req.flash('loginError', 'Nieprawidłowy email lub hasło');
                    res.redirect('/users/showLoginForm');
                }
            })
        }
    }).catch(console.log);
});

router.get('/logout', (req, res, next)=>{
    req.session.destroy();
    res.redirect('/');
});

router.get('/showEditProfil', (req, res, next)=>{
    User.userListById(loggedUserId).then(([userList])=>{
        User.userAndRoleList(loggedUserId).then(([userAndRoleList])=>{
            res.render('users/editProfil', {userList: userList, userAndRoleList: userAndRoleList});
        });
    });
});

router.post('/editProfil', (req, res, next)=>{
    console.log(req.body.username);
    console.log(req.body.email);
    console.log(pattern.test(req.body.email));
    User.checkIfUsernameExist(req.body.username).then(([usernames])=>{
        User.checkIfEmailExist(req.body.email).then(([emails])=>{
            User.userListById(loggedUserId).then(([logged])=>{

     //      if(usernames[0] != null && logged[0].username != req.body.username){
       //        req.flash('usernameSpan', 'Username jest zajęty');
       //        res.redirect('/users/showEditProfil');
            if(emails[0] != null && logged[0].email != req.body.email) {
                req.flash('emailSpan', 'Email jest zajęty');
                res.redirect('/users/showEditProfil');
            }else if(!pattern.test(req.body.email)) {
                    req.flash('emailSpan', 'Email jest niepoprawny');
                    res.redirect('/users/showEditProfil');
           }else{
                   User.editUser(req.body.username, req.body.email, loggedUserId).then(()=>{
                      // userRole.updateUsername(req.body.username, logged[0].username).then(()=>{
                       res.redirect("/users");
                   }).catch(err =>{
                       console.log(err);
                   });
              // });
           }
            });
        });
    });
});

module.exports.route = router; 