# Message Passer App

## Getting Started
* Install npm
`npm install npm@latest -g`
* Install nodemon
`npm install -g nodemon`

* Fork and clone your forked repo
`$ git remote add upstream git@github.com:karolina-benitez/message_passer.git`


#### Set up Back End
* Run npm install to get all the necessary dependencies:
`$ cd backend`
`$ npm install`
* Start server
`$ npm start`
if error occurs, make sure you correctly installed nodemon
#### Set up Data Base
* Install Postgres
`$ brew install postgres`
`$ brew services start postgresql`
`$ psql postgres`
`$ CREATE DATABASE messagepasserdb;`
`$ \c messagepasserdb`
`$ CREATE TABLE messages(
  id serial PRIMARY KEY,
  messageBody VARCHAR (1000) NOT NULL,
  messageURL VARCHAR (1000) NOT NULL,
);`

#### Set up Front End
* run npm install to get all the necessary dependencies:
`$ cd backend`
`$ npm install`
* Start server
`$ npm start`
