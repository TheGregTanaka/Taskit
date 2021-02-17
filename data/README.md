## TaskitDb

A dockerfile is provided to spin up a MySQL instance and run the scripts, however the scripts can be manually run to generate the database without docker. These must be run in sequence.

`00.up.sql` contains the structure of the database, `01.up.sql` contains intial data.

See the README at the root of the project directory for details on running the database.

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

