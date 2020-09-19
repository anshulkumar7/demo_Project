"use strict";

//========================== Load Modules Start =======================

//========================== Load external modules ====================
// Load user service
var _ = require("lodash");
var Promise = require("bluebird");
var ip = require('ip');
//========================== Load internal modules ====================

const usrService = require('./userService');
const userMapper = require('./userMapper');
const config = require('../../../config');
const redisSession = require("../../../redisClient/session");
const customException = require("../../../customException");
const constant = require("../../../constant");
const mail = require('../../../service/sendgrid_email')
const appUtils = require("../../../appUtils");
//========================== Load Modules End ==============================================


function create(signupInfo) {
    return usrService.isEmailIdExist(signupInfo)
        .then(function (result) {
            if (result) {
                throw customException.emailAlreadyRegistered()
            }
            else {
                return usrService.create(signupInfo)
                    .then(function (response) {
                        if (response) {
                            let tokenObj = buildUserTokenGenObj(response);
                            let userObj = {
                                userId: response._id.toString(),
                                userObj: tokenObj,
                                ip: ip.address()
                            }
                            return redisSession.create(userObj)
                                .then(function (redisSession) {
                                   
                                    return userMapper.signUpMapping({ user: response, redisSession: redisSession.token, code: constant.STATUS_CODE.SUCCESS });
                                })
                        }
                    })
            }
        })

}


function editProfile(params) {
return usrService.editProfile(params)
}


function forgotPassword(forgotInfo) {
    let self = this
    return usrService.isEmailIdExist(forgotInfo)
        .then(function (result) {
            self.result = result
            if (result) {
                let tokenObj = buildUserTokenGenObj(result);
                let userObj = {
                    userId: result._id.toString(),
                    userObj: tokenObj,
                    ip: ip.address()
                }
                return redisSession.create(userObj)
                    .then(function (redisSession) {
                        forgotInfo.subject = constant.EMAIL.subject.FORGOT_PWD_EMAIL
                        forgotInfo.template = "forgot"
                        forgotInfo.name = result.name
                        forgotInfo.link = config.cfg.url.basePath + "/" + config.cfg.url.forgotpassword + "/" + redisSession.token;
                        return mail.sendEmail(forgotInfo)
                    }).then((res) => {

                        if (res && res[0].statusCode)
                            return userMapper.forgetMapper({ res: res[0].statusCode });

                    })

            } else {
                throw customException.userNotFound()
            }
        })
}

function deleteProfile(params) {
    return usrService.isEmailIdExist(params)
        .then(function (isExist) {
            if (!isExist)
                throw customException.userNotFound();
            return userService.deleteProfile(params)
        }).then(function (res) {
            return {message: "Profile deleted successfully"}
        })

}





function buildUserTokenGenObj(user) {
    var userObj = {};
    userObj.deviceToken = (user.deviceToken) ? user.deviceToken : '';
    userObj.deviceID = (user.deviceID) ? user.deviceID : '';
    userObj.userId = user._id.toString();
    userObj.isAdmin = 0;
    return userObj;
}



//========================== Export Module Start ==============================

module.exports = {
    create,
    editProfile,
    forgotPassword,
    deleteProfile
    
    
};

//========================== Export Module End ===============================signUp