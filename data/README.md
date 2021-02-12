## Running Database
From this directory run

`docker build -t mysql8 .`

`docker run -p 3306:3306 --name=taskitDb -d mysql8`


You should now have a test database with simple seed data accessible at 0.0.0.0:3306. The default password is `Task123`.



## Tables
task
* id
* title
* typeID
* statusID
* description
* offeredPrice
* negotiable
* taskerID
* workerID
* datePosted
* dateCompleted
* rating

typeTask
* id
* type

statusTask
* id
* status

userProfile
* id
* email
* password
* name
* profilePicture
* phone
* bio

