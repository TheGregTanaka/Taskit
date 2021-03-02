# Taskit Rest API Routes

## UserProfile Routes
Route | Action | Body
---|---|---
`POST /userProfile` | Creates new user | New user profile data
`GET /userProfile/:userID` | Gets specified user by id | none
`PATCH /userProfile/:userID` | Updates specified user | Fields and updated info
`DELETE /userProfile/:userID` | Removes specifid user | none


## Task Routes
Route | Action | Body
---|---|---
`POST /task` | Creates new task | New task data
`GET /task` | Gets a listing of all tasks | none
`GET /task/:taskID` | Gets task by id | none