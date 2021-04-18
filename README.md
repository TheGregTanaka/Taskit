# 3308SP21_011_6 - TaskIt

* Jules Fischer-White - [julesiam](https://github.com/julesiam)
* Ryan Osler - [GitOsler](https://github.com/GitOsler)
* Gregory Tanaka - [TheGregTanaka](https://github.com/TheGregTanaka)
* Joshua Truong - [JTDev21](https://github.com/JTDev21)
* Timothy Waymouth - [timway33](https://github.com/timway33)
* Manoj Yeddanapudy - [maye7573](https://github.com/maye7573)


A React/NodeJS marketplace to facilitate short term free-lance work for small jobs and tasks.


# **Setting up the project**

### There are 3 separate pieces to this project. You can run them separately for dev, but you will need to start all three for a completely functional app.

This project uses npm, so you'll need it [installed](https://www.npmjs.com/get-npm) to run locally.

## 1. Database

This project uses MySQL.

A script to create a database as well as a `taskit` user is included in the `data`
directory. Install and set up MySQL on your machine. Then, either copy the
contents of `data/database.init.sql` into a MySQL client, or from the command
line run `mysql -u root -p < data/database.init.sql`.

See [readme](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/blob/main/data/README.md) in the `data` directory for table and column type documentation.

## 2. nodeJS Back End

The directory `code/api` contains the source code for a REST api, writen in nodeJS using the express framework, which provides the data access layer of the application. This performs calls to the database.

The application requires environment variables. There is an example provided at
`code/api/example.env` which works for development, however should be renamed.
(.env\* is gitignored). The values in this are different on the
production server.

To run the node app for development, run:
```
cp code/api/example.env code/api/.env 
cd code/api
npm install
npm start
```

This will start a nodemon process listening on `localhost:3200`.

NOTE: YOU MUST HAVE A LOCAL COPY OF THE DATABASE FOR THIS TO WORK PROPERLY

To push to heroku, from the `code/api` directory run `npm run publishHeroku`

See [readme](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/blob/main/code/api/README.md) in the `api` directory for route documentation.

## 3. React Front End

The front end of the application is React, and located directly in the code directory.

The application requires environment variables. There is an example provided at
`code/api/example.env` which works for development, however should be renamed.
(.env\* is gitignored). The values in this are different on the
production server.

To run the React app for development, run:
```
cp code/web/example.env code/web/.env
cd code/web
npm install
npm start
```

This will start the application on `localhost:3000`.


To push to heroku, from the `code/web` directory run: 
```
cp env.dev .env.development
npm run publishHeroku
```


---

> ## Version Info
> React v17.0.1
>
> node v14.15.5
>
> MySql v8.0.23
