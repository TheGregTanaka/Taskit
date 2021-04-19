# Taskit Rest API Routes
The below table is a table of contents, click on Methods or Routes to jump to those sections.
Method | Route | Action | Body | Query String Parameters
---|---|---|---|---
[`POST`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#post) | [`/login`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#login) | Authenticate user | Body should contain the email and hashed password |
[`POST`]() | [`/payment`]() | Submit payment | |
[`POST`]() | [`/review/:workerID`]() | Create review | Body should contain review info including taskID |
[`POST`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#post) | [`/task`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#task) | Creates new task | New task data |
[`POST`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#post) | [`/user`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#user) | Creates new user | New user profile data |
[`GET`]() | [`/companayProfile/:workerID`]() | Gets data for the company profile page, tasks and reviews | none | 
[`GET`]() | [`/review/:workerID`]() | Gets reviews for the specified user | none | 
[`GET`]() | [`/review/getAvgRating/:workerID`]() | Gets the average rating for the specified user | none | 
[`GET`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#get) | [`/task`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#task-1) | Gets a listing of all tasks | none | `status`, `type`
[`GET`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#get) | [`/task/getFeed`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#taskgetfeed) | Gets all tasks in pending status | none | `type`
[`GET`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#get) | [`/task/:taskID`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#tasktaskid) | Gets task by id | none |
[`GET`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#get) | [`/task/tasker/:taskerID`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#tasktaskertaskerid) | Gets all tasks created by a givin tasker | none |
[`GET`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#get) | [`/task/worker/:workerID`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#taskworkerworkerid) | Gets all tasks accepted by a givin worker | none |
[`GET`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#get) | [`/user/:userID`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#useruserid) | Gets specified user by id | none  |
[`PATCH`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#patch) | [`/user/:userID`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#useruserid-1)\* | Updates specified user | Fields and updated info |
[`PATCH`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#patch) | [`/task/:taskID`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#tasktaskid-1) | Updates specified task | Fields and updated info |
[`DELETE`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#delete) | [`/task/:taskID`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#tasktaskid-2) | Removes specified task | none |
[`DELETE`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#delete) | [`/user/:userID`](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/tree/main/code/api#useruserid-2) | Removes specified user | none |

\* Requires login

Below is detailed info on using each route. Keys are case sensitive.

## POST
### `/login`
Body must include:
- email
- password

On success, returns:
- Signed JWT Cookie
- JSON body `{ id:userID, email:"user@email.com"}`. The react app will save this in session.

### `/payment`

### `/review/:workerID`
Body must include:
- review
  - rating
  - description
  - taskID



### `/task`
Body must include:
- title
- typeID
- taskerID

Body may optionally include:
- statusID *
- description
- price
- workerID
- datePosted
- dateCompleted
- address
- lat
- lng
- redirect
- remotePossible

\* if not provided, statusID defaults to 1, "Pending".

On success, returns the newly inserted task. The response body will include all the keys which were provided in the request, with an additional key `id` with the new primary key of the task.

### `/user`
Body must include:
- email
- password
- name

Body may optinoally unclude
- profilePicture
- phone
- bio

On success, returns the newly inserted user. The response body will include all the keys which were provided in the request, with an additional key `id` with the new primary key of the userProfile.


## GET

### `/companayProfile/:workerID`

### `/review/:workerID`

### `/review/getAvgRating/:workerID`

### `/task`
Returns a list of all tasks.
```
[
  {
    "id": ,
    "title": ,
    "typeID": ,
    "type": ,
    "statusID": ,
    "status": ,
    "description": ,
    "taskerID": ,
    "tasker": ,
    "workerID": ,
    "worker": ,
    "datePosted": ,
    "dateCompleted": ,
    "price": ,
    "location":,
    "phone":,
    "email":
  }
  {
    "id": ,
    "title": ,
    "typeID": ,
    "type": ,
    "statusID": ,
    "status": ,
    "description": ,
    "taskerID": ,
    "tasker": ,
    "workerID": ,
    "worker": ,
    "datePosted": ,
    "dateCompleted": ,
    "price": ,
    "location":,
    "phone":,
    "email":
  }
]
```
Query parameters may optionally be provided to specify a status and or type id to filter by.

### `/task/getFeed`
Similar to GET /task however only returns pending tasks. A type ID can be provided in the query string to filter by.

### `/task/:taskID`
Returns the task specified by `:taskID`
```
[
  {
    "id": ,
    "title": ,
    "typeID": ,
    "type": ,
    "statusID": ,
    "status": ,
    "description": ,
    "taskerID": ,
    "tasker": ,
    "workerID": ,
    "worker": ,
    "datePosted": ,
    "dateCompleted": ,
    "price": ,
    "location":,
    "phone":,
    "email":
  }
]
```

### `/task/tasker/:taskerID`
Returns an array of tasks created by the specified user.
```
[
  {
    "id": ,
    "title": ,
    "typeID": ,
    "type": ,
    "statusID": ,
    "status": ,
    "description": ,
    "taskerID": ,
    "tasker": ,
    "workerID": ,
    "worker": ,
    "datePosted": ,
    "dateCompleted": ,
    "price": ,
    "location":,
    "phone":,
    "email":
  }
  {
    "id": ,
    "title": ,
    "typeID": ,
    "type": ,
    "statusID": ,
    "status": ,
    "description": ,
    "taskerID": ,
    "tasker": ,
    "workerID": ,
    "worker": ,
    "datePosted": ,
    "dateCompleted": ,
    "price": ,
    "location":,
    "phone":,
    "email":
  }
]
```

### `/task/worker/:workerID`
Returns an array of tasks accepted by the specified user.
```
[
  {
    "id": ,
    "title": ,
    "typeID": ,
    "type": ,
    "statusID": ,
    "status": ,
    "description": ,
    "taskerID": ,
    "tasker": ,
    "workerID": ,
    "worker": ,
    "datePosted": ,
    "dateCompleted": ,
    "price": ,
    "location":,
    "phone":,
    "email":
  }
  {
    "id": ,
    "title": ,
    "typeID": ,
    "type": ,
    "statusID": ,
    "status": ,
    "description": ,
    "taskerID": ,
    "tasker": ,
    "workerID": ,
    "worker": ,
    "datePosted": ,
    "dateCompleted": ,
    "price": ,
    "location":,
    "phone":,
    "email":
  }
]
```

NOTE: THE EMAIL AND PHONE RETURNED ARE THOSE OF THE TASKER, NOT THE WORKER

### `/user/:userID`
Returns the user specified by `userID`
```
[
  {
    "email": ,
    "name": ,
    "profilePicture": ,
    "phone": ,
    "bio": 
  }
]
```


## PATCH
### `/user/:userID`
Updates the specified user. Request must include cookie with signed token. This can be generated with the /login route.

Body should include only the fields being updated.

### `/task/:taskID`
Updates the specified user.

Body should include only the fields being updated.

Currently, these both return empty body and 204, this should be updated.

## DELETE
### `/task/:taskID`
Deletes the task with the matching ID

### `/user/:userID`
Deletes the user with the matching ID

---
Important notes: 
- `taskerID` will be set at creation, and is a non-nullable field. `workerID` on the other hand will not be set until a worker has accepted the task and may then be null.
- When creating/updating a task, you must only include fields which are being edited. Do not include tasker/worker names or human readable status/types, only use the IDs. Do not send null fields, simply omit these from the json body. 
- Do not send a primary key. On create these will be generated by the database, on update these will be sent as query parameters.
- Query strings are optional and can be combined with an ampersand.


See [data/README.md](https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6/blob/main/data/README.md) for additional information about required fields and data types in the database.
