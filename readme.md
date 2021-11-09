# Dofus Eye
This is a test project. I wanted a web based viewer for the dofus perc screenshot reader bot. we'll see where this goes.

I have never build a website / web app before. Going to start with Flask based server and see what happens.

going to try to use flask to run a restful api

using flask, flask-restful, and sqlalchemy so far...

## Running Locally
#### 1. Virtual Environment

(https://flask.palletsprojects.com/en/2.0.x/installation/)

start the virtual environment, update dependencies

TODO: add this bit


#### 2. initialize the database

TODO: need to re-write this section on how to initialize database...

run `flask init-db`. This will create a fresh sqlite3 database of the proper schema. note that this deletes anything already stored in the database.

the sqlite database is by default located at `/instance/main.sql`, but this can be changed in the flask config.


#### 3. start backend server
(https://flask.palletsprojects.com/en/2.0.x/quickstart/)

```bash
flask run
```