# TamaFit

## [Deployed app](https://tranquil-temple-28656.herokuapp.com/)

## About TamaFit:

TamaFit is a full stack web application that tracks a user's workout history and display an avatar of their choice. Users can view/edit their logs, update their avatars, and compare their exercise logs with other users' logs.

## Why this app?

TamaFit was written to address the problem of how a web-based fitness app could store user data in a relational database, display user data, allow the user to update their workouts and profiles, and display a ranking of users. TamaFit needed to be mobile-responsive as well.

## Technical Solutions:

Sequelize was used to manage the user input to a MySQL server. During testing, the database was hosted locally using MAMP, and it was pushed to Heroku for deployment, with JawsDB providing the SQL database. Bcrypt & passport provided authentication functionality. In addition, Handlebars was used for displaying the content onscreen, along with Bootstrap elements such as forms, buttons, and an image carousel. Media queries and Bootstrap classes were used for mobile responsiveness.

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
