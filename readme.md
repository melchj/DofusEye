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

or (this one's for windows)
```bash
$ .\venv\Scripts\activate
```

navigate to server directory and update dependencies:
```bash
$ cd ./server/
$ pip install -r requirements.txt
```

#### 2. initialize the database

TODO: need to write this section...

#### 3. set up environment configs

Rename '.flaskenv_dist' to '.flaskenv', either manually or by executing the following (in the server directory).

```bash
cp .flaskenv_dist .flaskenv
```

Next, open `.flaskenv` and put in there your SECRET_KEY and any other config settings.

#### 4. start backend server
(https://flask.palletsprojects.com/en/2.0.x/quickstart/)

(from server directory, in virtual environment)
```bash
flask run
```

## Front end

Ensure node.js is installed on the system.

Rename 'client/.env_dist' to 'client/.env', and then paste the API key (from server/.flaskenv) inside this file. This makes sure the front end can tell the server that it is authorized to make requests.

navigate to ./client

install node packages
```bash
npm install
```

start the front end:

```bash
npm start
```

Now you can navigate to `http://localhost:3000`.


---

frontend using axios for http requests (will be installed with other dependancies automatically?)
