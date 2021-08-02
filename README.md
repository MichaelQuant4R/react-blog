# Holistic Blogs (React with Flask API deployed on Heroku

The website can be seen here, [Holistic-Blogs](https://holistic-blogs.herokuapp.com/).

## Description

This is a simple blog app that contains the following functionality:

- Authentication (login, signup, logout)
- Post a blog (text, title)
- Loads newest blogs at the top of both home and blogs pages
- IntersectionalObservation utilized on both home and blogs pages
- Post a comment on any blog
- Notification bell icon for new comments to the author of the blog in question


## React packages installed

Ensure you have the following packages installed in your package.json file

- react-router-dom ^5.2.0
- jwt-decode ^3.1.2

If not shown, go to your react-blog folder in the command terminal, and install the above packages by entering:
- `npm install react-router-dom@5.2.0`
- `npm install jwt-decode@3.1.2`

## Flask packages installed

Ensure you have the following packages installed for the backend to work by entering `pip list` in your command terminal.
- Werkzeug==1.0.1
- arrow==0.15.7
- Flask_Gravatar==0.5.0
- SQLAlchemy==1.3.13
- Flask_Migrate==2.4.0
- Flask==1.0.2
- Flask_JWT_Extended==3.18.0
- Flask_SQLAlchemy==2.4.0
- alembic==1.4.2
- Flask_Cors==3.0.8

If not installed, simply enter in your command terminal `pip install <name of package>`



## Recreate app locally


In order to recreate the app locally, follow these steps:

- In the models.py file, remove the DATABASE_URL and JWT_SECRET_KEY variables.
- Set `app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + file_path`
- For file_path variable, do `file_path = os.getcwd() + '\database.db'`
- For JWT_SECRET_KEY, do `JWT_SECRET_KEY = os.urandom(40).hex()`
- Go to your command terminal, and in the same path as the models.py file, do the following:
    - For windows users, `set FLASK_APP=models.py`
    - For MAC users, `export FLASK_APP=models.py`
    - `flask db init`
    - `flask db migrate -m "some unique title"`
    - `flask db upgrade`
- In your react-blog folder, change the package.json file, `"proxy": "http://localhost:5000"`
- In the models.py file, set change app to `app = Flask(__name__)`
- Run the Flask backend by entering `python app.py` in your command terminal.
- Lastly, run the React frontend by entering either `yarn start` or `npm start`.

    
