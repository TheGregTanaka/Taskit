# Taskit Rest API Routes

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
