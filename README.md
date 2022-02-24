# Book shop: Backend
A Node.js and Express.js sever for my online book shop with authantication.

## Technologies
##### Built with
* [Node.js](https://nodejs.org/en/) Node.js is an open-source and cross-platform JavaScript runtime environment.
* [Express.js](https://expressjs.com/) is a minimal and flexible Node.js framework that provides easy and clean server with less code 
* [Sequelize ORM](https://sequelize.org/) is a promise-based Node.js ORM for MySql that help me write a good db in a language I know well. 
* [MySQL](https://www.mysql.com/) is a relational database management system.I chose it because for managing users, orders, authantication and many products with a lot of relationals between them choosing a relational db was the best decision.
* [bcrypt](https://www.npmjs.com/package/bcrypt) A library to help me hash passwords and keep user information crypt


## Project Status
In process


## Room for Improvement
There's alot more that need to be done..
#### TODO
* Create a Category module and making a many to many relation between categories and books
* adding server side filtering
* adding autantication middelware and isAdmin middleware for more security
* handling errors at the server 


## Setup
clone this repo, go to its root directory, and run `npm install` to install its dependencies.

Once the dependencies are installed, you can run `nodemon server.js` to start the application. You will then be able to access it at localhost:3030. 

MySQL DataBase is local at the moment so the server will throw an error, but it's in progress and will be fixed soon!
 
If the installation is successful you will see a print at the terminal
```
Database connection OK!
Starting server + sequlize on port 3030...
```
and a log will be printed to the backend.log file:
``DD/MM/YYYY, hh:mm:ss - INFO - Server is running on port: 3030``
