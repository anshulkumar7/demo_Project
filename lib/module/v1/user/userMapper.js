/**
 * This file will have request and response object mappings.
 */
var _ = require("lodash");
const contstants = require("../../../constant");
const config = require('../../../config');

function loginMapping(params) {
    var respObj = {
        "message": "Successfully Login",
        "accessToken": params.redisSession,
        "userProfile": params.user,
    }
    return respObj;
}

function logoutMapper(param) {
    var respObj = {
        "message": "You has been logout successfully",
        result: param
    }
    return respObj;
}
function forgetMapper(param) {
    var respObj = {
        "message": "Password reset link sent on registered mail.",
        result: param
    }
    return respObj;
}
function resetPassword(result) {
    var respObj = {
        message: "Password reset successfully",
        userProfile: result,
    }
    return respObj;
}
function changeEmail(result) {
    var respObj = {
        message: "email changed successfully",
        userProfile: result,
    }
    return respObj;
}
function signUpMapping(params) {
    var respObj = {
        "message": contstants.MESSAGES.USER_SIGNUP,
        "accessToken": params.redisSession,
        "userProfile": {
            "_id": params.user._id,
            "email": params.user.email,
            "name": params.user.name,
            "userName": params.user.UserName
        }
    }
    return respObj;
}


module.exports = {
    loginMapping,
    logoutMapper,
    signUpMapping, forgetMapper,
    resetPassword,
    changeEmail
}