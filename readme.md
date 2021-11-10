# Dofus Eye
This is a test project. I wanted a web based viewer for the dofus perc screenshot reader bot. we'll see where this goes.

I have never build a website / web app before. Going to see what happens...

backend/api uses:
- Flask
- SQLalchemy
- Marshmallow

to attempt to build a restful api.

## Backend
#### 1. Virtual Environment

start virtual environment:
```bash
$ python3 -m venv venv
```

activate virtual environment:
```bash
$ . venv/bin/activate
```

navigate to server directory and update dependencies:
```bash
$ cd ./server/
$ pip install -r requirements.txt
```

#### 2. initialize the database

TODO: need to write this section...

#### 3. start backend server
(https://flask.palletsprojects.com/en/2.0.x/quickstart/)

(from server directory, in virtual environment)
```bash
flask run
```

## Front end

need node.js installed.

navicate to ./client

do `npm start` to start the front end server. then navigate to `http://localhost:3000`.

...