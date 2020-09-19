"use strict";

//========================== Load Modules Start =======================

//========================== Load internal modules ====================
// Load user dao
var _ = require("lodash");
const userDao = require('./userDao');
const appUtils = require("../../../appUtils");
//========================== Load Modules End ==============================================

function login(loginInfo) {
    let query = {};
    // query.email = loginInfo.email;
    // let password = appUtils.createHashSHA256(loginInfo.password);
    query = { $and: [{ $or: [{ email: loginInfo.email }, { userName: loginInfo.email }], password: appUtils.createHashSHA256(loginInfo.password) }] };
    return userDao.findByKey(query)
        .then(function (result) {
            if (result) {
                return result;
            } else {
                return false;
            }
        });
}

function signUp(signupInfo) {
    signupInfo.password = appUtils.createHashSHA256(signupInfo.password);
    return userDao.signUp(signupInfo)
}

function resetPassword(params) {
    params.password = appUtils.createHashSHA256(params.password);
    return userDao.resetPassword(params)
}

function getProfile(loginInfo) {
    let query = {};
    query._id = loginInfo.user_id;
    return userDao.findByKey(query)
}


function isEmailIdExist(loginInfo) {
    return userDao.isEmailIdExist(loginInfo)
}
function isUserNameExist(loginInfo) {
    return userDao.isUserNameExist(loginInfo)
}
function isEmailIdOrUserNameExist(loginInfo) {
    return userDao.isEmailIdOrUserNameExist(loginInfo)
}

function updateUser({ query, update }) {
    return userDao.updateUser({ query, update })
}
function updateUserIsSubscribed({ query, update }) {
    return userDao.updateUserIsSubscribed({ query, update })
}


function getByKey(param) {
    return userDao.getByKey(param)
}


//========================== Export Module Start ==============================

module.exports = {
    login,
    signUp,
    isEmailIdExist,
    isUserNameExist,
    isEmailIdOrUserNameExist,
    updateUser,
    getByKey,
    resetPassword,
    getProfile,
    updateUserIsSubscribed
};

//========================== Export Module End ===============================
