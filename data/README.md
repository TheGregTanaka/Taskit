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
* description
* offeredPrice
* negotiable
* complete
* postedBy
* completedBy

taskType
* id
* type

userProfile
* id
* email
* password
* typeID
* name
* profilePicture
* phone
* bio

userType
* id
* type
