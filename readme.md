# Dofus Eye
This is a test project. I wanted a web based viewer for the dofus perc screenshot reader bot. we'll see where this goes.

I have never build a website / web app before. Going to see what happens...

backend/api uses:
- Flask
- SQLalchemy
- Marshmallow

to attempt to build a restful api.

# Backend
## 1. set up environment variables/configs

TODO: reword this section (it's copy paste of a bunch of random notes, probably doesnt read well but i'm too lazy to fix at the moment)

first, rename server/.flaskenv_dist to server/.flaskenv. same for client/.env_dist to client/.env

open that file and put in there your SECRET_KEY and any other configs...

also, you gotta rename 'client/.env_dist' to 'client/.env', and then paste the API key inside this file. This makes sure the front end can tell the server that it is authorized to make requests.

## 2. Virtual Environment

start virtual environment:
```bash
$ python3 -m venv venv
```

activate virtual environment:
```bash
$ . venv/bin/activate
```

(or this one for windows)
```bash
$ .\venv\Scripts\activate
```

navigate to server directory and update dependencies:
```bash
$ cd ./server/
$ pip install -r requirements.txt
```

## 3. initialize the database
(from within athe server directory, in the virtual environment)
1. Ensure postgres is installed and working on the system.
2. In a psql terminal, create the postgres database, name it "dofuseye"
```sql
CREATE DATABASE dofuseye;
```
3. In `.flaskenv`, set the `DATABASE_URL` to the following, substituting in the postgres role username and password as appropriate: `postgresql://[username]:[password]@localhost:5432/dofuseye` (get rid of the square brakets too)
4. Execute the following commands to initialize the databse:
```bash
flask db init
flask db upgrade
```
At this point, the postgres database is set up, though empty of data. See below for database migration and population details.

## 4. start backend server
(https://flask.palletsprojects.com/en/2.0.x/quickstart/)

(from server directory, in virtual environment)
```bash
flask run
```

# Front end

need node.js installed.

navigate to ./client

do `npm start` to start the front end server. then navigate to `http://localhost:3000`.

...


using axios for http requests (will be installed with other dependancies automatically)

---
## Database Data Population
If you have a binary `main.db` sqlite3 file that matches the schema of this project (likely generated from the "PercScoreKeeper Discord Bot", before its eventual integration with the rest of the DofusEye project), place this file in `server/main.db` and run the following python script to transfer the data from this file into the __EMPTY__ postgres database:
```bash
$ python sqlite_to_psql.py
```

---
## Database Migration
TODO: This section is not complete

will be something about `flask db migrate`, making sure the datatypes in migrations/versions/XXX.py are correct, then doing `flask db upgrade`... 