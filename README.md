[![Coverage Status](https://coveralls.io/repos/github/MomentUs-401/MomentUs-401-Back-End/badge.svg?branch=master)](https://coveralls.io/github/MomentUs-401/MomentUs-401-Back-End?branch=master)

![momentus-logo](./assets/logo-small.png)
# MomentUs-401-Back-End


## Application Summary
'MomentUs' is a digital-scrapbook website that allows users to create and log in to personal accounts to create and store Memories based on location. Users can create, update, view, and delete Memories, as well as view all Memories of all users visually via pins on a map. The Front End is developed in AngularJS 1 and JavaScript and the Back End is developed in Node.js and JavaScript. Both repositories can be accessed in the [MomentUs repository](https://github.com/MomentUs-401).


### Structure and Resources
* This app was structured using MVC (Model-View-Controller) architecture.
* This project is deployed on Heroku using staging and production environments.
* The primary resources utilized in this project are      
  * Back End: Node.js, Mongo DB, Mocha/ Chai, AWS, and Express Middleware.
  * Front End: Angular 1, Webpack, Karma, Mocha/ Chai
_____
## Overview
### Minimum Viable Product
* Create and login to user accounts based on username, password, and email.
* Users can create Memories which accept input of:
  *  Memory Title (required)
  *  Location (Google autofill) (required)
  *  Date (required)
  *  Description (required)
  *  Song Title
  *  Photo Upload (default image)
  *  Friends
* Users to view, edit, and/or delete own Memories on a Dashboard
* Users to view all memories from all users via pins on a map  
  * Clicked pins provide memory information

### Future Opportunities
* Subscribe to other users’ memories
* Public and private memory settings
* Utilize Spotify/ Facebook apis
* Anniversary of memory notifications
* Connect series of memories


### Resources
* [Node.js](https://nodejs.org/en/): Server-side JavaScript environment
* [AWS](https://aws.amazon.com/): Upload Photo storage and functionality
* [Mongo DataBase](https://www.mongodb.com/): Maintain user registration data
* [AngularJS](https://angularjs.org/): HTML for web applications
* [Webpack](https://webpack.js.org/): Module bundler
* [Karma](https://karma-runner.github.io/1.0/index.html): Test runner for Angular JS
* [Heroku](https://www.heroku.com): Deployment (Staging and Production Environments)
* [Express](https://expressjs.com/): Middleware functionality
* [Mongoose](http://mongoosejs.com/): Manage asynchronous environment
* [JSON Web Token](https://jwt.io/introduction/): Secure data transmission
* [Bluebird](https://www.npmjs.com/package/bluebird): Promise rendering
* [Body parser](https://www.npmjs.com/package/body-parser-json): Middleware development
* [Debug](https://www.npmjs.com/package/debug): Debugging code process
* [Cors](https://www.npmjs.com/package/cors): Provides Express middleware
* [Error Handler](https://www.npmjs.com/package/error-handler): Create error status
* [Multer](https://www.npmjs.com/package/multer): Handle middleware form data
* [Bcrypt](https://www.npmjs.com/package/bcrypt): Utilized in password hashing processes
* [Request](https://www.npmjs.com/package/request): Utilized in making http calls
* [Request-Promise](https://www.npmjs.com/package/request-promise): Utilize Request and Bluebird in making http calls

* Developer only:
  * [Mocha](https://www.npmjs.com/package/mocha): Testing framework
  * [Chai](https://www.npmjs.com/package/chai): Testing assertions
  * [Chai-http](http://chaijs.com/): Testing with local server environment

### Team Collaboration Tools
  * GitHub Projects/ Organization
  * Google Docs for larger overview, daily stand-ups
  * Slack for basic communication
_____
## API Endpoints
Deployed endpoint: `https://momentus-backend1.herokuapp.com`

Note: Application requests will be unsuccessful without essential environment variables.

### Install Node Packages
#### Back End
1. First, `npm i` to download all resources onto the local machine.
2. In terminal, run files using `npm run start`.

#### Front End
1. First, `npm i` to download all resources onto the local machine.
2. In terminal, run files using `npm run build-watch`.

#### MongoDB
1. Open Mongo Shell by entering `mongod --dbpath ./db` in the local machine terminal.
    * Verify shell by receiving localhost assignment in terminal window.
2. In a separate terminal tab, access Mongo environment by entering `mongo`.
2. After creating a db entry (see steps above), you can view the database by entering `show dbs`.
3. After verifying database creation in Step 2, you can enter the database environment by entering `use <database name>`.
4. To view database contents, enter `db.users.find()` in tab.
5. To delete database contents, enter `db.users.drop()`

### Create and Modify User
**Objective:** Create, retrieve, modify, and delete user account info from MongoDB.
* Utilize httpie, and enter into terminal window:

1. Create Memory:
  * Template: `http POST https://momentus-backend1.herokuapp.com/signup <username>=<input> <email>=<input@input.com> <password>=<input>`
  * Example: `http POST https://momentus-backend1.herokuapp.com/api/signup username=abigail email=abs@white.com password=123456789`

2. Fetch Account:
  * Template: `http GET https://momentus-backend1.herokuapp.com/api/login -a <username>:<password> 'Authorization:Bearer <token>'`
  * Example: `http GET https://momentus-backend1.herokuapp.com/api/login -a abswhite:123456789`

4. Delete Account:  
  * Template: `http DELETE https://momentus-backend1.herokuapp.com/delete/<user-id> 'Authorization:Bearer <token>'`
  * Example: `http DELETE https://momentus-backend1.herokuapp.com/update/1093982398738957329857 'Authorization:Bearer <token>'`

### Memory API
**Objective:** Create, update, retrieve, and delete user memories.

#### Single User
1. Create Memory:
  * Template: `http -f POST https://momentus-backend1.herokuapp.com/api/memory title=<input> description=<input> date=<input> location:<input> songTitle:<input> friends:<input> image@~<file path>`
  * Example: `http -f POST https://momentus-backend1.herokuapp.com/api/memory title='Bought jeans' description='we went shopping' date=2017-06-21T23:12:16.208Z location:'{lat:10, lng:10, name:'address'}' songTitle:'i like dirt' friends:'abbi and allie' image@~/assets/pic.jpg`

2. Fetch Memories: Retrieves single user's memories
  * Template: `http GET https://momentus-backend1.herokuapp.com/memory/<memoryId> 'Authorization:Bearer <token>'`
  * Example: `http GET https://momentus-backend1.herokuapp.com/memory/338398320983 'Authorization:Bearer 1234567891234838942750934257'`

3. Update Memory:
  * Template: `http PUT https://momentus-backend1.herokuapp.com/memory/<memoryId> -a  description=<input> 'Authorization:Bearer <token>'`
  * Example: `http PUT https://momentus-backend1.herokuapp.com/memory/338398320983  description='we pet goats' 'Authorization:Bearer 1234567891234838942750934257'`

4. Delete Memory:  
  * Template: `http DELETE https://momentus-backend1.herokuapp.com/memory/338398320983 'Authorization:Bearer 1234567891234838942750934257'`
  * Example: `http DELETE https://momentus-backend1.herokuapp.com/memory/338398320983 'Authorization:Bearer 1234567891234838942750934257'`

#### All Users
  2. Fetch All Memories: Retrieves all users' memories
    * Template: `http GET https://momentus-backend1.herokuapp.com/map/ 'Authorization:Bearer <token>'`
    * Example: `http GET https://momentus-backend1.herokuapp.com/map/ 'Authorization:Bearer 1234567891234838942750934257'`

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

### Acknowledgments
