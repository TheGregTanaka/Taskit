## TaskitDb

This file contains info on the db structure.

See the README at the root of the project directory for details on running the database set up file.

![](/data/erd.png)

## Tables
**task**
* id - _(int) PK, U, NN_
* title - _(varchar64) NN_
* typeID - _(int) NN_
* statusID - _(int) NN *_
* description - _(longtext)_
* price - _(float)_
* taskerID - _(int) NN_
* workerID - _(int)_
* datePosted - _(date)_
* dateCompleted - _(date)_
* address - _(varchar128)_
* city - _(varchar128)_
* state - _(varchar128)_
* zip - _(varchar20)_
* country - _(varchar128)_

##### \* statusID defaults to 1 ('Pending') on creation, indicating the task is open for workers to accept.
##### \** remotePossible defaults to false. We may or may not end up using this, but this could be used to indicate that a location is not needed for the task.

**typeTask**
* id - _(int) PK, U, NN_
* type - _(varchar128)_

**statusTask**
* id - _(int) PK, U, NN_
* status - _(varchar128)_

**userProfile**
* id - _(int) PK, U, NN_
* email - _(varchar128) NN, U_
* password - _(varchar128) NN_
* name - _(varchar128) NN_
* phone - _(varchar20)_
* bio - _(longtext)_
* token - _(varchar128) *_

##### \* jwt refresh token for use with login 

**review**
* id - _(int) PK, U, NN_
* rating - _(float) NN_
* description - _(longtext)_
* taskID - _(int) *_

##### \* taskID is a foreign key that references task.id. It should cascade so if a task is deleted, its reviews will be as well.


### Key
_PK_ = Primary Key (these auto increment used to index the table)

_NN_ = Non Nullable (these are required fields)

_U_ = Unique (may not insert the same value more than once)
