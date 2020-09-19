const Router = require("express").Router();
const requestIp = require('request-ip');

const resHndlr = require("../../../responseHandler");
const middleware = require("../../../middleware");
const constants = require("../../../constant");
const usrFacade = require("./userFacade");
const validators = require("./userValidators");

Router.route("/create")
    .post([validators.validateSignup], function (req, res) {
        let { email, name, password } = req.body;
        usrFacade.create({ email, name, password })
            .then(function (result) {
                resHndlr.sendSuccess(res, result, req);
            }).catch(function (err) {
                resHndlr.sendError(res, err, req);
            })
    });


usrRoutr.route("/editProfile")
    .post([middleware.authenticate.autntctTkn, validators.validateEdit], function (req, res) {
        let { name } = req.body;
        let { userId } = req.user;
        usrFacade.editProfile({
            name,
            userId

        })
            .then(function (result) {
                resHndlr.sendSuccess(res, result, req);
            }).catch(function (err) {
                resHndlr.sendError(res, err, req);
            })
    });


Router.route("/forgotPassword")
    .post([validators.validateForgotPassword], function (req, res) {
        let { email } = req.body;
        usrFacade.forgotPassword({ email })
            .then(function (result) {
                resHndlr.sendSuccess(res, result, req);
            })
            .catch(function (err) {
                resHndlr.sendError(res, err, req);
            })
    });

usrRoutr.route("/deleteProfile")
    .post([middleware.authenticate.autntctTkn], function (req, res) {
        let { email } = req.body;
        let { userId } = req.user;
        usrFacade.deleteProfile({ userId, email })
            .then(function (result) {
                resHndlr.sendSuccess(res, result, req);
            }).catch(function (err) {
                resHndlr.sendError(res, err, req);
            })
    });




module.exports = Router;
