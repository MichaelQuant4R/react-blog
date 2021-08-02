from flask import Flask
import os
from werkzeug.security import (generate_password_hash, check_password_hash)
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from datetime import datetime as dt
from flask_gravatar import Gravatar
from flask_cors import CORS
from datetime import datetime as dt
from datetime import timedelta
from .config import (DATABASE_URL, JWT_SECRET_KEY)

app = Flask(__name__, static_folder="react-blog/build", static_url_path="")
# app = Flask(__name__)

gravatar = Gravatar(app,
                    size=100,
                    rating='g',
                    default='retro',
                    force_default=False,
                    force_lower=False,
                    use_ssl=False,
                    base_url=None
                   )


# cors = CORS(app, support_credentials=True, resources={r"/api/*":{"origins": "*"}})

cors = CORS(app, support_credentials = True)


# file_path = os.getcwd() + "\database.db"

app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
app.config["SQLALCHEMY_DATABASE_URI"] =  DATABASE_URL
# app.config["JWT_SECRET_KEY"] = "super secret"
# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + file_path


app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)

jwt = JWTManager(app)
db = SQLAlchemy(app)

migrate = Migrate(app, db)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(40), nullable=False, unique=True)
    confirm_password = db.Column(db.String(40), nullable=False)
    password = db.Column(db.String(128))
    is_admin = db.Column(db.Boolean, default = False)
    
    blogs = db.relationship("Blog", backref="user", lazy="dynamic")
    
    notify = db.relationship("Notify", backref="user", lazy="dynamic")
    
    user_comments = db.relationship("Comment", backref="user", lazy="dynamic")
    
    def __init__(self, username,email, password, confirm_password):
        self.username = username
        self.email = email
        self.password = generate_password_hash(password)
        self.confirm_password = confirm_password
        self.timestamp = dt.strftime(dt.now(), "%Y/%m/%d %H:%M:%S")
        self.is_admin = False

    # NOTE: In a real application make sure to properly hash and salt passwords
    def checking_password(self, check_password):
        return check_password_hash(self.password, check_password)
    
    def get_image(self):
        return gravatar(self.email)
    
    def __repr__(self):
        return "<User {} {}>".format(*[self.id, self.username])
    
    
    
class Blog(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(200), unique = True)
    text = db.Column(db.Text)
    timestamp = db.Column(db.String(40))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    
    comments = db.relationship("Comment", backref="blog", lazy="dynamic")
    
    def __init__(self, title, text, user_id):
        self.title = title
        self.text = text
        self.user_id = user_id
        self.timestamp = dt.strftime(dt.now(), "%Y/%m/%d %H:%M:%S")
        
    def __repr__(self):
        
        return "<Blog {}, {}>".format(*[self.id, self.user_id])
        
    
    
class Comment(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    text = db.Column(db.Text)
    timestamp = db.Column(db.String(40))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    
    blog_id = db.Column(db.Integer, db.ForeignKey("blog.id"))
    
    def __init__(self, text, blog_id, user_id):
       
        self.text = text
        self.blog_id = blog_id
        self.user_id = user_id
        self.timestamp = dt.strftime(dt.now(), "%Y/%m/%d %H:%M:%S")
        
    def __repr__(self):
        
        return "<Comment {}, blogID {}, userID {}>".format(*[self.id, self.blog_id, self.user_id])
        
    
class Notify(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    timestamp = db.Column(db.String(40))
    
    text = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    author_id = db.Column(db.Integer)
    text_id = db.Column(db.Integer)
    text_type = db.Column(db.String(40)) # comment, reply, blog
    bell = db.Column(db.Boolean, default = True)
    
    def __init__(self, text, text_type, text_id, author_id, user_id):
        
        self.text = text
        self.text_type = text_type
        self.text_id = text_id
        self.author_id = author_id
        self.bell = True
        self.user_id = user_id
        self.timestamp = dt.strftime(dt.now(), "%Y/%m/%d %H:%M:%S")
        
    def __repr__(self):
        
        return "<Notify {}, authorID {}, userID {}>".format(*[self.id, self.author_id, self.user_id])
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    