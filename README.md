# 3308SP21_011_6 

## TaskIt

* Ryan Osler - GitOsler
* Gregory Tanaka - TheGregTanaka
* Joshua Truong - JTDev21
* Timothy Waymouth - timway33
* Jules Fischer-White - julesiam
* Manoj Yeddanapudy - maye7573


A React/NodeJS marketplace to facilitate short term free-lance work for small jobs and tasks.

## Setting up the project

There is a directory `code` which contains all the source code for the project, and a directory `data` which contains scripts for the database. Both of these directories contain dockerfiles.

### Code Docker

```
cd code
docker build -t taskitapp .
docker run -p 3000:3000 --name taskitApp -d taskitapp
```
(the build step might take a while. This is fine.)

You should now be able to access the app through your browser at `0.0.0.0:3000`


### Data Docker

```
cd data
docker build -t mysql8 .
docker run -p 3306:3306 --name=taskitDb -d mysql8
```

You should now be able to connect using an SQL client on your host machine.
```
Host: 0.0.0.0:3306
Database: taskitDb
User: root
Password: Task123
```

or on the command line: `docker exec -it taskitDb mysql -uroot -p`