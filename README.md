# MERN forum server

MERN forum server is the server side application of the MERN forum website. This project was created using Node.js, Express.js and MongoDB as database. JWT token authentication using refresh tokens was implemented in this project.

## Features used in this project

This Project is a Node.js application which uses the following features
1. Entire project done using Typescript
2. Unprotected and protected API routes used
3. JWT token authentication with refresh tokens is used
4. Proper logs are printed for every API requests and database connection

## Live Application URL

The Application is deployed in Heroku at https://mern-forum-app-server.herokuapp.com/

## Cloning and Running the Application in local

**IMPORTANT NOTE - This application initializes a server for the [MERN forum client](https://github.com/BlueGhost12/mern-forum-client) app. Locally run this app first before running the client application.**
All configs required for this app are preconfigured and can be found in this project under [this](https://github.com/BlueGhost12/mern-forum-server/blob/main/src/Config/config.ts) directory. The environment variables are also preconfigured and is located in the [.env](https://github.com/BlueGhost12/mern-forum-server/blob/main/.env) file

Clone the project into local

Go into the project folder and type the following command to install necessary packages and dependencies. 

```bash
npm install
```

In order to run the application Type the following command

```bash
npm run dev
```

The Application Runs on **localhost:1337** by default



