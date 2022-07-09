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

first, rename `server/.flaskenv_dist` to `server/.flaskenv`. same for `client/.env_dist` to `client/.env`:
```bash
$ cp server/.flaskenv_dist server/.flaskenv
$ cp client/.env_dist client/.env
```
TODO: i don't think that this SECRET_KEY and API_KEY stuff is needed anymore?

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

Navigate to server directory and install/update dependencies:
```bash
$ cd server/
$ pip install -r requirements.txt
```
NOTE: all of the following backend setup/maintenance should be done with the virtual environment active.

## 3. initialize the database

1. Ensure postgresql is [installed](https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart) and ensure the postgres service is currently running on the system.

2. In a psql prompt, create the postgres database, name it `dofuseye`:
```sql
CREATE DATABASE dofuseye;
```
3. In `server/.flaskenv`, set the `DATABASE_URL` to the following, substituting in the postgres role username and password as appropriate: `postgresql://[username]:[password]@localhost:5432/dofuseye` (get rid of the square brakets too)

4. Execute the following commands to initialize the databse:
```bash
$ flask db init
$ flask db upgrade
```

At this point, the postgres database is set up, though empty of all data. See below for [database migration](#database-migration) and [database population](#database-data-population) details.

## 4. start backend server

```bash
$ flask run
```

# Frontend

Ensure node.js is [installed](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04).

Rename `client/.env_dist` to `client/.env`, and then paste the API key (from server/.flaskenv) inside this file. This makes sure the front end can tell the server that it is authorized to make requests.

navigate to `client/` directory.

install node packages
```bash
npm install
```

start the front end:

```bash
npm start
```

Now you can navigate to `http://localhost:3000` in a web browser!


## Database Data Population
---
Make sure to start with an empy postgres database, where the schema has been set up with `flask db upgrade` but no data has been populated.

### From prod DB backup
If you have a binary backup file from the prod database backup export, something close to the following command can work to restore the binary postgres backup to the local postgres database:

```bash
$ pg_restore --verbose --clean --no-acl --no-owner -h localhost -d dofuseye backup.dump -U postgres
```

### From sqlite3 backup (unlikely)
If you have a binary `main.db` sqlite3 file (unlikely) that matches the schema of this project (from the old "PercScoreKeeper Discord Bot", before its eventual integration with the rest of the DofusEye project), place this file at `server/main.db` and run the following python script to transfer the data from this file into the empty postgres database:

```bash
$ python sqlite_to_psql.py
```

NOTE: when populating from sqlite3 database in this way, the `perc_prism_fight_id_seq` value will likely need to be altered to the current max(fight_id) + 1 for the auto increment to work properly.

## Database Migration
---
TODO: This section is not complete

...will be something about `flask db migrate`, making sure the datatypes in migrations/versions/XXX.py are correct, then doing `flask db upgrade`... 
