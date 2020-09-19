<<<<<<<<---------------------Discription of project------------------->>>>>>>>>>
*  here is server.js file end point of project 


* .env file here is define db name and password and all require private key

*  inside lib->dbconfig.js connect db

*  lib -> index.js if i want  pickup any key than define process.env 

* all middleware make middleware file

* routes file call all routes here

* without Authentacation no more any api hit 
so we go middileware basicauth.js file here is Authentacation of api

* module file module-
                  |
                  v1

                  | - user module
                                | userModel.js (define schema here)
                                |userRoutes.js here is routing of user module
                                |userFacade.js here is write business logic all
                                |userservice.js here is call service (if i want another module call then i call ,call another service)
                                |uservalidator.js here is check validation 
                                |userDao.js here is call querry (call  basedao.js)
                                usermapper.js return result from querry than show here

                     

* dao file here is define all querry here 


* public\apidocsv1 -
                  |define swagger.json here is show all module api



* constant .js define all module collection and constant message


* custom.js here is define error which type error


* responsehandler -here is define response handler if status code 1 than result sucess and status code 0 than error