# Backlog
Just a simple backlog application built with the MERN stack. The backlog has 3 stages: open, in progress, and resolved. Furthermore, the application supports admin and user roles with authentication and authorization.

## Setup
### Add default.json under config folder in the server:
```
{
"mongoURI": "<mongoDB atlas uri with login credentials>",
"jwtSecret": "<secret>",
}
```
**Do not add to source control**
### Create a user with an admin role
For now, the only way to register an admin is to uncomment the admin registration endpoint in ```routes/api/users.js```. A suggestion is to run this locally and avoid pushing it to production.

## Production
This application was deployed to Heroku.
### Add production.json under config folder in the server:
```
{
"mongoURI": "<mongoDB atlas uri with login credentials>",
"jwtSecret": "<secret>",
}
```
**Do not add to source control**
