# 3308SP21_011_6 - TaskIt

* Jules Fischer-White - julesiam
* Ryan Osler - GitOsler
* Gregory Tanaka - TheGregTanaka
* Joshua Truong - JTDev21
* Timothy Waymouth - timway33
* Manoj Yeddanapudy - maye7573


A React/NodeJS marketplace to facilitate short term free-lance work for small jobs and tasks.


# **Setting up the project**

This project uses npm, so you'll need it [installed](https://www.npmjs.com/get-npm) to run locally even if you use Docker.

There is a directory `code` which contains all the source code for the project, and a directory `data` which contains scripts for the database. Both of these directories contain dockerfiles.

## **Running With Docker**

## `# Clone repo`
```
git clone https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6.git
cd 3308SP21_011_6/
```

## `# Set up database`
```
# change to the data directory
cd data

# Build the docker image for the database and tag it "mysql-taskit"
docker build -t mysql-taskit .

# Run the contianer, map it to port 3306 and name it taskitDb
docker run -p 3306:3306 --name=taskitDb -d mysql-taskit
```

## `# Set up React app`
```
# go up one step to the root project directory, then change to the code directory
cd ../code

# if this is your first time running the app, or if any dependancies have changed, 
## you'll need to install them. This will also create the node modules directory 
## where React gets installed.
npm install --silent

# Build the docker image for the app and tag it "react-taskit". This will take a while.
docker build -t react-taskit .


# When we run the app, we use -v to mount the current directory to container. 
## Slightly different command for windows/*nix here

# mac/linux
docker run -p 3000:3000 -v`pwd`:/app --name taskitApp --link taskitDb react-taskit

# windows
docker run -p 3000:3000 -v ${PWD}:/app --name taskitApp --link taskitDb react-taskit
```

You should be able to connect using an SQL client on your host machine.
```
Host: 0.0.0.0:3306
Database: taskitDb
User: root
Password: Task123
```

or on the command line: `docker exec -it taskitDb mysql -uroot -p`

You should be able to access the app through your browser at `0.0.0.0:3000`

### Notes about Code Docker - `taskitApp`

Make sure you run the data container first, so that it can be linked to this container. If you wish to run just this container without the database, you may ommit `--link taskitDb` from the run command.

The build step will probably take a long time. This is fine. Fortunately, unless the dockerfile changes, you should not need to build again. The `-v` option will mount the code directory to the app directory inside the container. This will allow you to edit files and see your changes while the container is running without needing to restart it.

The commend above runs the container in the forground. This is to mimic the typical behavior of npm recompiling and showing you errors in real time. If you wish to run the container detached (in the background), simply provide it the `-d` option.

Once the container runs, npm still needs to initialize. It may take a minute before you can access the application in the browser. If you are running in the foreground, it should be ready once you see `Compiled successfully!`


## **Running without Docker**

If you prefer not to run with docker, you can run React locally with npm, just make sure you have the correct version of node installed.

You can setup the app this way by running:
```
git clone https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6.git
cd 3308SP21_011_6/code
npm install --silent
npm install react-scripts@4.0.2 -g --silent
npm start
```

Scripts to settup the database are located in https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/data . These are standard sql files which can be run to setup the database on your local environment, and should be run in sequential order.

---

> ## Version Info
> React v17.0.1
>
> node v14.15.5
>
> MySql v8.0.23
