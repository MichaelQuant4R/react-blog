from flask import (Blueprint, request, jsonify)
from .models import (db, User, Comment, Blog, Notify)
from flask_jwt_extended import (create_access_token, current_user, jwt_required)
import arrow
from flask_cors import cross_origin


app_blog = Blueprint("blog_section", __name__)


@app_blog.route("/api/post_blog", methods = ["POST"])
@cross_origin
@jwt_required()
def post_blog():
    
    data = request.get_json()
    
    print("CURRENT USER")
    print(current_user)
    print("ID", current_user.id)
    
    print("BLOG POST")
    print(data)
    
    title = data["titleData"]
    text = data["textData"]
    
    
    blog = Blog(title, text, current_user.id)
    db.session.add(blog)
    db.session.commit()
    
    
    
    return jsonify({"blog": True})





@app_blog.route("/api/get_blogs", methods = ["GET"])
@cross_origin
def get_blogs():
    
    print("GET BLOGS!")
    
    #blogs = Blog.query.all()
    
    blogs = db.session.query(Blog).order_by(Blog.id.desc()).all()
    
    if blogs != []:
        
        #blogs = blogs[::-1]
    
        blog_list = [{"title": blog.title,
                  "text": blog.text,
                      "id": blog.id,
                      "user_id": blog.user.id,
                  "author": blog.user.username, 
                 "date": blog.timestamp} 
                     for blog in blogs]

    
    return jsonify({"blogs": blog_list})




@app_blog.route("/api/blog/<int:blog_id>", methods = ["GET"])
@cross_origin
def one_blog(blog_id):
    
    check = False
    blog_data = None
    
    blog = Blog.query.filter_by(id = blog_id).first()
    
    if blog is not None:
        
        blog_data = [{"title": blog.title, "author": blog.user.username, "id": blog.id, 
                      "timestamp": blog.timestamp, "text": blog.text, "image": blog.user.get_image()}]
        check = True
    return jsonify({"exists": check, "blog": blog_data})



@app_blog.route("/api/blog_page/<int:page>", methods = ["GET"])
@cross_origin
def blog_page(page):
    
    blogs = db.session.query(Blog).order_by(Blog.id.desc()).all()
    count = Blog.query.count()
    check = False
    count = Blog.query.count()
    
    print(type(page), "TYPE")
    
    print("PAGE NUMBER", page);
    
    blog_list = []
    if blogs != []:
        blogs = blogs[0:3*page]
        
        print("BLOGS!");

        blog_list = [{"id": blog.id, 
        "title": blog.title,
        "text": blog.text,
        "author": blog.user.username,
        "user_id": blog.user.id,
        "image": blog.user.get_image(),
        "timestamp": blog.timestamp,
        } for blog in blogs]
        
        check = True
        
        
    print(blogs)
    print("BLOGS", len(blog_list))
    return jsonify({"scroll":check, "blogs": blog_list, "max": count, "min": 3,})



@app_blog.route("/api/blog_scroll/<int:page>", methods = ["GET"])
@cross_origin
def blog_scroll(page=1):
    
    print("PAGE!", page)
    items = Blog.query.paginate(page, 3, error_out=False)
    check = False
    blog_list = []
    if items.items != []:
        blog_list = [{"id": blog.id, 
          "title": blog.title,
          "text": blog.text,
          "author": blog.user.username,
          "user_id": blog.user.id,
          "image": blog.user.get_image(),
          "timestamp": blog.timestamp,
         } for blog in items.items]
        check = True
    return jsonify({"scroll":check,  "blogs": blog_list})


