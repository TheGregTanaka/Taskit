# Taskit Rest API Routes

## UserProfile Routes
Route | Action | Body
---|---|---
`POST /userProfile` | Creates new user | New user profile data
`GET /userProfile/:userID` | Gets specified user by id | none
`PATCH /userProfile/:userID` | Updates specified user | Fields and updated info
`DELETE /userProfile/:userID` | Removes specifid user | none

Data is returned as plain JSON.
```
{
  "email":"mario@plumber.com",
  "name":"Mario Pipes",
  "profilePicture":null,
  "phone":null,
  "bio":null
}
```

## Task Routes
Route | Action | Body | Query String Parameters
---|---|---|---
`POST /task` | Creates new task | New task data |
`GET /task` | Gets a listing of all tasks | none | `status`, `type`
`GET /task/:taskID` | Gets task by id | none |

Data is returned as plain JSON, with each task (if multiple returned) being its own row.
```
[
  {
    "id":1,
    "title":"Task1",
    "typeID":1,
    "statusID":1,
    "description":"description",
    "offeredPrice":1.0,
    "negotiable":0,
    "taskerID":1,
    "workerID":null,
    "datePosted":"2021-02-08T07:00:00.000Z",
    "dateCompleted":null,
    "rating":null
  },
  {
    "id":2,
    "title":"varchar",
    "typeID":1,
    "statusID":1,
    "description":"longtext",
    "offeredPrice":0.0,
    "negotiable":0,
    "taskerID":1,
    "workerID":null,
    "datePosted":"2021-02-08T07:00:00.000Z",
    "dateCompleted":null,
    "rating":null
  }
]
```
