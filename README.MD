# Dwolla Project

A project to build an application with [Dwolla's Sandbox API](https://accounts-sandbox.dwolla.com/login).

## Tutorials used

[Node.js & Passport Login](https://github.com/bradtraversy/node_passport_login)

Not a copy and paste, but a good amount of code was reused from the tutorial to get an app built with authentication. This way I can spend more time with the Dwolla Sandbox API. The 3 main differnces in my app from the tutorial are:

1. I used handlebars instead of EJS
2. I used a local mongodb connection
3. I used the tutorial for a boilerplate authentication app, but then built more functionality on top of it

## About the Project

A Node.js server using the Express framework. It uses Handlebars for serverside rendering. It also uses MongoDB as a database with Mongoose as a ODM. And a ton of other tools that you can find in the package.json file.

For the Dwolla integration, I am using a me to me payments flow with verified personal customers as the customer type. The app users will be able to register for the app, create a customer, and add up to 3 fake funding sources. From their they can move money between those funding sources and their Dwolla balance.

## Use This Yourself

Feel free to use this code. You will need to set up your own local MongoDB. You will also need to setup your own keys.js and dwolla.js files within the config folder. I .gitignore these file that is in the config folder for security reasons.

### config/dwolla.js

module.exports = {
// Navigate to https://dashboard-sandbox.dwolla.com/applications for your application key and secret.
appKey: "...",
appSecret: "..."
};

### config/keys.js

module.exports = {
MongoURI: "...",
SessionSecret: "..."
};
