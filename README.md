# TamaFit

## [Deployed app](https://tranquil-temple-28656.herokuapp.com/)

## About TamaFit:

TamaFit is a full stack web application that tracks a user's workout history and display an avatar of their choice. Users can view/edit their logs, update their avatars, and compare their exercise logs with other users' logs.

## Why this app?

TamaFit was written to address the problem of how a web-based fitness app could store user data in a relational database, display user data, allow the user to update their workouts and profiles, and display a ranking of users. TamaFit needed to be mobile-responsive as well.

## Technical Solutions:

Sequelize was used to manage the user input to a MySQL server. During testing, the database was hosted locally using MAMP, and it was pushed to Heroku for deployment, with JawsDB providing the SQL database. Bcrypt & passport provided authentication functionality. In addition, Handlebars was used for displaying the content onscreen, along with Bootstrap elements such as forms, buttons, and an image carousel. Media queries and Bootstrap classes were used for mobile responsiveness.

## How TamaFit is organized
TamaFit is set up using the Model-View-Controller architectural pattern. The files related to the model handle database configuration and functionality. The view consists of the Handlebars files for each individual page, and the controller consists mainly of the JS files for routing, authentication, and connections between the database and Handlebars pages. 

## How to run TamaFit
TamaFit can either be run via the deployed link, or installed on a local machine. 

** Note: for screenshots of the steps below, click this link (https://github.com/dirk-kiesewetter/Bamazon). This is for another app, but the setup steps are similar.

#### Setup - MySQL/MAMP

1. You will need to have a MySQL server running to use this app locally. MAMP is free software that runs a MySQL server on your local machine. Their URL can be found in the `Built With` section below. Once you have a MySQL server running, take note of the `host`, `port`, `user` and `password` info on the server. On MAMP, this can be accessed clicking on the `open start page` icon on the MAMP app.

2. Install and configure the MySQL database app. For `MySQL Workbench`, on the start screen, click on the add or edit icons next to `MySQL Connections` and check that the settings correspond to the MAMP settings. The password is normally `root`. Once the settings are entered, click the `Test Connection` button to confirm that the connection is working.

#### Setup - Database:

1. Open the code for `schema.sql` (found in the `db` folder) in your text editor, copy it, and paste it into the Query window of `MySQL Workbench`.

2. Click the leftmost lightning-bolt icon (to the right of the disk icon), or select Query - Execute (All or Selection) in the Workbench menu. This will create the schema (skeleton) for the database.

3. Then click on the refresh icon at the top right side of the `SCHEMAS` panel to confirm that the database was created. It should be called burgers_db. Click on the dropdown arrows of the database and confirm that the database was created, and that it has a table named `burgers` with 3 of columns.

4. Delete the existing code in `MySQL Workbench` and paste in the contents of the `seeds.sql` file. This will import the data into the database. Click the left-most lighting bolt and click the refresh. expand the tables, and select the product table. Three small black icons will appear to the right. Click the right-most one, which looks like a small spreadsheet with a lightning bolt in the corner. This will display a preview of the database structure. Confirm that the table was created. You can also check the Output window on the bottom for any error messages.

#### Setup - Node, Express, MySQL, and the server.js file

1. If not installed already, download & install `Node.js` on your computer.

2. Copy all the supplied the files to the directory you wish to run `TamaFit` from.

3. At the command line, navigate to the directory where the server.js file is located and type `npm i` - this will read the `package.json` file and install any needed packages. They will be installed into a node_modules folder.

#### How to use TamaFit locally:

1. Navigate in the command line to the directory where the server.js file located. Type `node server` at the prompt. This will run the server portion of the app.

2. Open a new web browser window. Type `localhost:3000/index` to run the client portion of the app.


## Demo

![TamaFit](public/images/demo.gif)

## Built With

- [Bootstrap](https://getbootstrap.com/) - Front-end framework for developing websites and web applications.
- [Handlebars.js](https://handlebarsjs.com) - Templating engine based on the Mustache template language.
- [Heroku](https://heroku.com) - cloud platform as a service supporting several programming languages.
- [JawsDB MySQL](https://elements.heroku.com/addons/jawsdb) - Add-on for providing a fully functional MySQL Database server for use with Heroku application.
- [JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - High-level programming language.
- [MAMP](https://www.mamp.info/en/) - Local server environment.
- [MySQL](https://www.mysql.com/products/workbench/) - Visual tool for database architects.
- [Node.js](https://nodejs.org/en/) - Open-source run-time environment that executes JS code outside of a browser.
- [npm](https://www.npmjs.com/) - package manager for the JavaScript programming language.
- [VSC](https://code.visualstudio.com/) - Visual Studio Code is a source code editor developed by Microsoft.

#### npm Packages Used:

- [animate.css](https://daneden.github.io/animate.css/) - Just-add-water CSS animations!
- [bcrypt-nodejs](https://www.npmjs.com/package/bcrypt) - password hashing function designed by Niels Provos and David Mazières.
- [dotenv](https://www.npmjs.com/package/dotenv) - a zero-dependency module that loads environment variables from a .env file into process.env.
- [express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for node.
- [express-handlebars](https://www.npmjs.com/package/express-handlebars) - A Handlebars view engine for Express which doesn't suck.
- [express-session](https://www.npmjs.com/package/express-session) - Simple session middleware for Express.
- [mysql2](https://www.npmjs.com/package/mysql2) - MySQL client for Node.js with focus on performance. Supports prepared statements, non-utf8 encodings, binary log protocol, compression, ssl and much more.
- [nodemon](https://www.npmjs.com/package/nodemon) - a utility that will monitor for any changes in your source and automatically restart your server.
- [passport](https://www.npmjs.com/package/passport) - an Express-compatible authentication middleware for Node.js.
- [passport-local](https://www.npmjs.com/package/passport-local) - Authenticate using a username and password in your Node.js applications.
- [sequelize](https://www.npmjs.com/package/sequelize) - a promise-based Node.js ORM for Postgres, MySQL, SQLite and Microsoft SQL Server. It features solid transaction support, relations, read replication and more.

#### npm Developer Packages Used: -

- [chai](https://www.npmjs.com/package/chai) - a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.
- [chai http](https://www.npmjs.com/package/chai-http) - HTTP integration testing with Chai assertions.
- [eslint](https://www.npmjs.com/package/eslint) - a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- [mocha](https://www.npmjs.com/package/mocha) - Simple, flexible, fun JavaScript test framework for Node.js & The browser.
- [prettier](https://www.npmjs.com/package/prettier) - an opinionated code formatter.

## Authors

- **Dirk Kiesewetter** - [dirk-kiesewetter](https://github.com/dirk-kiesewetter)
- **Michael Perilli** - [OSCOdin](https://github.com/OSCOdin)
- **Pauline Senh** - [plsenh](https://github.com/plsenh)
- **Timothy Charette** - [charettetimothy](https://github.com/charettetimothy)
