//========================== Load Modules Start ===========================

//========================== Load Internal Module =========================

// Load exceptions
var Exception = require("./model/Exception");
var constants = require("./constant");

//========================== Load Modules End =============================

//========================== Export Module Start ===========================

module.exports = {
    intrnlSrvrErr: function (err) {
        return new Exception(1, constants.MESSAGES.INTERNAL_SERVER_ERROR, err);
    },
    unauthorizeAccess: function (err) {
        return new Exception(2, constants.MESSAGES.UNAUTHORIZED_ACCESS_EXCEPTION, err)
    },
    alreadyRegistered: function (err) {
        return new Exception(3, constants.MESSAGES.phoneNumberAlrdyRegistered, err)
    },
    invalidEmail: function () {
        return new Exception(4, constants.MESSAGES.INVALID_EMAIL)
    },
    userNotFound: function () {
        return new Exception(9, constants.MESSAGES.NO_USER)
    },
    emailAlreadyRegistered: function () {
        return new Exception(6, constants.MESSAGES.EMAIL_ALREADY_EXIST)
    },
    userNameAlreadyRegistered: function () {
        return new Exception(66, constants.MESSAGES.USER_ALREADY_EXIST)
    },
    getCustomErrorException: function (errMsg, error) {
        return new Exception(5, errMsg, error);
    },
    sessionExpired: function (err) {
        return new Exception(8, constants.MESSAGES.SESSION_EXPIRED, err)
    },
    incorrectPass: function () {
        return new Exception(10, constants.MESSAGES.INCORRECT_PASS)
    },
    wrongPass: function () {
        return new Exception(11, constants.MESSAGES.WRONG_PASS)
    },
    userBlocked: function () {
        return new Exception(8, constants.MESSAGES.BLOCKED_USER)
    },
};

//========================== Export Module   End ===========================
