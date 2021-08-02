from flask import (Blueprint, request, jsonify)
from .models import (db, User, Comment, Blog, Notify)
from flask_jwt_extended import (create_access_token, current_user, jwt_required)
import arrow
from flask_cors import cross_origin

app_bell = Blueprint("notify_section", __name__)


@app_bell.route("/api/notify/<int:id>", methods = ["GET"])
@jwt_required()
@cross_origin()
def get_notify(id):
    
    print("NOTIFY!!!", id)
    
    print("CURRENT USER", current_user)
    print("NOTIFICATIONS!")
    
    notify_list = []
    
    user = User.query.filter_by(id = int(id)).first()
    
    check = False
    
    
    notify_user = user.notify.all()
    
    
    if notify_user != []:
        
        check = True
        
        notify_user = notify_user[::-1]
        
        notify_list = [{"id": bell.id, 
                        "author": User.query.filter_by(id = bell.author_id).first().username,
                        "username": user.username,
                    "author_id": bell.author_id,
                    "user_id": user.id,
                        "title": Comment.query.filter_by(id = bell.text_id).first().blog.title,
                        "blog_id": Comment.query.filter_by(id = bell.text_id).first().blog.id,
                        "type": bell.text_type,
                        "bell": bell.bell,
                        "title": Comment.query.filter_by(id = bell.text_id).first().blog.title,
                        "text": bell.text,
                        "timestamp": arrow.get(bell.timestamp).shift(hours=-1).humanize(),
                        "image": user.get_image(),
                        "author_image": User.query.filter_by(id = bell.author_id).first().get_image()
                       } for bell in notify_user]


    
    return jsonify({"check": check, "new": notify_list})





@app_bell.route("/api/new_notify/<int:id>", methods = ["GET"])
@jwt_required()
@cross_origin()
def new_notify(id):

    print(id, "NEW NOTIFY!")
    return jsonify({"new": True})




@app_bell.route("/api/clear_bell_number", methods = ["POST"])
@jwt_required()
@cross_origin()
def clear_bell_number():
    
    data = request.get_json()
    
    print(data, "CLEAR NOTIFY!!")
    
    user_id = data["userID"];
    
    notify_list = Notify.query.filter_by(user_id = user_id).all()
    
    for notify in notify_list:
        
        notify.bell = False
        db.session.commit()
    
    return jsonify({"clear": True})

















