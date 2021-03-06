# 3308SP21_011_6 - TaskIt

* Jules Fischer-White - [julesiam](https://github.com/julesiam)
* Ryan Osler - [GitOsler](https://github.com/GitOsler)
* Gregory Tanaka - [TheGregTanaka](https://github.com/TheGregTanaka)
* Joshua Truong - [JTDev21](https://github.com/JTDev21)
* Timothy Waymouth - [timway33](https://github.com/timway33)
* Manoj Yeddanapudy - [maye7573](https://github.com/maye7573)


A React/NodeJS marketplace to facilitate short term free-lance work for small jobs and tasks.


# **Setting up the project**

### There are 3 separate pieces to this project. You can run them separately for dev, but you will need to start all three seperately for a completely functional app.

This project uses npm, so you'll need it [installed](https://www.npmjs.com/get-npm) to run locally.

## 1. Database

This project uses MySQL.

There is a data directory which contains scripts to set up the structure and initial data in your database. These must be run in sequence from lowest to highest number.

## 2. nodeJS Back End

The directory `code/api` contains the source code for a REST api, writen in nodeJS using the express framework, which provides the data access layer of the application. This performs calls to the database.

To run the node app, run:
```
cd code/api
npm install
npm start
```

This will start a nodemon process listening on `localhost:3200`.

See readme in the api folder for route documentation.

## 3. React Front End

The front end of the application is React, and located directly in the code directory. To run this, simply:
```
cd code
npm install
npm install react-scripts@4.0.2 -g --silent
npm start
```

This will start the application on `localhost:3000`.



---

> ## Version Info
> React v17.0.1
>
> node v14.15.5
>
> MySql v8.0.23
