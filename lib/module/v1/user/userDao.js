"use strict";
//========================== Load Modules Start =======================

//========================== Load internal modules ====================
var mongoose = require("mongoose");

//========================== Load internal modules ====================
const User = require('./userModel');

// init user dao
let BaseDao = require('../../../dao/baseDao');
const userDao = new BaseDao(User);


//========================== Load Modules End ==============================================

function create(userInfo) {
    let user = new User(userInfo);
    return userDao.save(user);
}

function isEmailIdExist(params) {
    let query = {};
    query.email = params.email;
    return userDao.findOne(query)
        .then(function (result) {
            if (result) {
                return result;
            }
            else {
                return false;
            }
        })
}
function editProfile(loginInfo) {
// console.log("loginInfo------------->>>>>",loginInfo);
let query = {};
    query._id = loginInfo.userId;

    var update = {};
    if (loginInfo.name) {
        update.name = loginInfo.name;
    }

    if (loginInfo.email) {
        update.email = loginInfo.email;
    }
    if (loginInfo.password) {
        update.password = loginInfo.password;
    }
    
    update.updated = new Date();
    let option = {};
    option.new = true;
    return userDao.findOneAndUpdate(query, update, option);
}

function deleteProfile(params) {
    let query = {};
    query.userId = params.userId;
    let options = {};
    options.new = true;
    return userDao.remove(query)
}

//========================== Export Module Start ==============================

module.exports = {
    create,
    isEmailIdExist,
    editProfile,
    deleteProfile
   
};

//========================== Export Module End ===============================
