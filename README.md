# TamaFit

Current state:

TamaFit is a full stack web application that will track a user's workout history and display an avatar of their choice. Users can view/edit their logs, update their avatars and compare how many logs other users have in total.

Original concept:

TamaFit is a full stack web application that will track a user's workout history and display an avatar that is a direct visual representation of how much hard work (or lack thereof) the user is doing. The user will create an account and begin to add data about the type of workout they completed and the date they completed it on. The app will use the data to display how the workouts are affecting the user by displaying a happy avatar or an unhappy avatar based on their workout history.

## Getting Started

In order to get started just click here ['TamaFit'](https://tamafitpls.herokuapp.com/) to be taken to the website. Be prepared to make a new account and enjoy your new TamaFit experience. 

## Demo 

![TamaFit](public/images/demo.gif)

### Technical Approach

Tamafit was intended to be a very amitious app with lots of features to track a users health and display this data in a fun and interactive manner. Setting up the database and joining all of the user data together was difficult, we used sequelize to deal with this which made the process smoother. Managing the login info for each user was also a difficult process. Our team used bcrypt to encrypt the users password.

## Built With

* [Bootstrap](https://getbootstrap.com/) - Front-end framework for developing websites and web applications.
* [Handlebars.js](https://handlebarsjs.com) - Templating engine.  It is based on the Mustache template language.
* [Heroku](https://heroku.com) - Heroku is a cloud platform as a service supporting several programming languages.
* [JawsDB MySQL](https://elements.heroku.com/addons/jawsdb) - Add-on for providing a fully functional MySQL Database server for use with Heroku application.
* [JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - High-level programming language.
* [MAMP](https://www.mamp.info/en/) - Local server enviroment.
* [MySQL](https://www.mysql.com/products/workbench/) - Visual tool for database architects.
* [Node.js](https://nodejs.org/en/) - Open-source run-time environment that executes JS code outside of a browser.
* [npm](https://www.npmjs.com/) - npm is a package manager for the JavaScript programming language.
* [VSC](https://code.visualstudio.com/) - Visual Studio Code is a source code editor developed by Microsoft.
    #### npm Packages Used:
    * [animate.css](https://daneden.github.io/animate.css/) - Just-add-water CSS animations!
    * [bcrypt-nodejs](https://www.npmjs.com/package/bcrypt) - bcrypt is a password hashing function designed by Niels Provos and David Mazières.
    * [dotenv](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
    * [express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for node.
    * [express-handlebars](https://www.npmjs.com/package/express-handlebars) - A Handlebars view engine for Express which doesn't suck.
    * [express-session](https://www.npmjs.com/package/express-session) - 
Simple session middleware for Express.
    * [mysql2](https://www.npmjs.com/package/mysql2) - MySQL client for Node.js with focus on performance. Supports prepared statements, non-utf8 encodings, binary log protocol, compression, ssl and much more.
    * [nodemon](https://www.npmjs.com/package/nodemon) - Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.
    * [passport](https://www.npmjs.com/package/passport) - Passport is Express-compatible authentication middleware for Node.js.
    * [passport-local](https://www.npmjs.com/package/passport-local) - Authenticate using a username and password in your Node.js applications.
    * [sequelize](https://www.npmjs.com/package/sequelize) - Sequelize is a promise-based Node.js ORM for Postgres, MySQL, SQLite and Microsoft SQL Server. It features solid transaction support, relations, read replication and more.
    #### npm Developer Packages Used:
    * [chai](https://www.npmjs.com/package/chai) - Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.
    * [chai http](https://www.npmjs.com/package/chai-http) - HTTP integration testing with Chai assertions.
    * [eslint](https://www.npmjs.com/package/eslint) - ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. 
    * [mocha](https://www.npmjs.com/package/mocha) - Simple, flexible, fun JavaScript test framework for Node.js & The Browser.
    * [prettier](https://www.npmjs.com/package/prettier) - Prettier is an opinionated code formatter.

## Authors

* **Dirk Kiesewetter** - [dirk-kiesewetter](https://github.com/dirk-kiesewetter)
* **Michael Perilli** - [OSCOdin](https://github.com/OSCOdin)
* **Pauline Senh** - [plsenh](https://github.com/plsenh)
* **Timothy Charette** - [charettetimothy](https://github.com/charettetimothy)

## Acknowledgments

* Hat tip to anyone whose code was used!

<!-- # Project-2

Coding Bootcamp Project #2

## Team TamaFit

Dirk & Tim - front end / help on back end
Pauline & Michael - back end

## MVP

- page 1 & 2 of the mockup only
- page 1 is login/user auth.
- page 2 is main page
- log in & save user data to DB
- display exercise history dropdown
- exercise selection dropdown
- user settings dropdown - login info
- POST selected exercises to DB

## phase 2

- add customized characters
- implement page 3 (leaderboard & comments etc.)

## phase 3

- save user authentication via cookies...
