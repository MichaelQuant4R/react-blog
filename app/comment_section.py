from flask import (Blueprint, request, jsonify)
from .models import (db, User, Comment, Blog, Notify)
from flask_jwt_extended import (create_access_token, current_user, jwt_required)
import arrow
from flask_cors import cross_origin

app_com = Blueprint("comment_section", __name__)


@app_com.route("/api/new_comment", methods = ["POST"])
@cross_origin
@jwt_required()
def new_comment():
    
    data = request.get_json()
    
    print("CURRENT USER", current_user)
    print("NEW COMMENT!")
    print(data)
    
    print("BLOG ID", type(data["blogID"]), data["blogID"])
    
    if data is not None:
    
        comment = Comment(data["text"], data["blogID"],  current_user.id,)
        db.session.add(comment)
        db.session.commit()
        
        
        
    # Notify(text, text_type, text_id, author_id, user_id)
    
    comment = Comment.query.filter_by(user_id = current_user.id).filter_by(blog_id = data["blogID"])\
                            .filter_by(text = data["text"]).first()
    
    
    blog = Blog.query.filter_by(id = data["blogID"]).first()
    
    if current_user.id != blog.user_id:
    
        notify = Notify(comment.text, "comment", comment.id, current_user.id, blog.user.id)

        db.session.add(notify)
        db.session.commit()
    
    com_data = {"comment": comment.text, 
                "author": comment.user.username, 
                "timestamp": arrow.get(comment.timestamp).shift(hours=-1).humanize(),
                "id": comment.id, 
                "image": comment.user.get_image(), 
                "user_id": comment.user.id}
    
    return jsonify({"check": True, "new": com_data})

@app_com.route("/api/get_comments/<int:blog_id>", methods = ["GET"])
@cross_origin
def get_comments(blog_id):
    
    print("GET ALL COMMENTS!")
    
    print("BLOG ID!", blog_id)
    
    
    comment_list = Comment.query.filter_by(blog_id = int(blog_id)).all()
    comments = []
    if comment_list != []:
        
        comment_list = comment_list[::-1]
        comments = [{"comment": comment.text, 
                     "author": comment.user.username, 
                     "timestamp": arrow.get(comment.timestamp).shift(hours=-1).humanize(),
                    "id": comment.id, 
                     "image": comment.user.get_image(), 
                     "user_id": comment.user.id}
                   for comment in comment_list]
    
    return jsonify({"comments": comments})





























