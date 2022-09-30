# CLAPINGO TASK

## Tech Stacks
`NodeJS`
`Express`
`MongoDB`


## Installation
Use the npm package manager.
```
npm i --save {express,mongodb,body-parser,dotenv,jsonwebtoken}
```
## Available Scripts

`node index.js`

Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.


## Apis

### for signup 
POST: http://localhost:3000/user/signup
and 
in Body
{
    "email":"student10@gmail.com",
    "name":"student10",
    "phone":"1234569999",
    "password":"1234",
    "type":"learner"  //for mentors it can be mentor
}

### for signin
POST : http://localhost:3000/user/signin

and in Body
{
    "email":"student2@gmail.com",
    "password":"1234"
}


### for adding teacher to favourite list
PUT : http://localhost:3000/user/addFavouriteTeacher
### for deleting teacher from the list
PUT : http://localhost:3000/user/removeFavouriteTeacher

user must pass the token recieved at the time of signin to 
Headers
as 'x-auth-token'= token

and in Body
{
    {
    "favTeacher":"teacher4" //teacherNaame
}


### For getting the favourite teacher
GET - http://localhost:3000/user/favouriteTeacher
No need to pass anything





