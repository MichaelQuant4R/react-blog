from flask import (request, jsonify, send_from_directory)
from .models import (db, User, Blog, Comment,  app, jwt, create_access_token, current_user, jwt_required)
from .comment_section import app_com
from .notify_section import app_bell
from .blog_section import app_blog
from flask_cors import cross_origin

app.register_blueprint(app_com)
app.register_blueprint(app_bell)
app.register_blueprint(app_blog)

# Register a callback function that takes whatever object is passed in as the
# identity when creating JWTs and converts it to a JSON serializable format.

@app.route("/")
def serve():
    
    return send_from_directory(app.static_folder, "index.html")






@app.route("/api/signup", methods = ["POST"])
@cross_origin
def signup():
    
    data = request.get_json()
    
    print(data)
    
    if data is not None:
        
        print("DATA GOT!")
        print(data)
        # {'username': 'bob', 'email': 'bob@gmail.com', 'password': '111', 'confirmPassword': '111'}
        
        username = data["usernameData"]
        email = data["emailData"]
        password = data["passwordData"]
        confirm_password = data["confirmPasswordData"]
        
        check_user = User.query.filter_by(email = email).first()
        
        if check_user is None:
            user = User(username, email, password, confirm_password)
            db.session.add(user)
            db.session.commit()
            additional_claims = {"email": user.email, "image": user.get_image(), "username": user.username}

            access_token = create_access_token(identity=user)
            resp = jsonify({"signup": True}, access_token, additional_claims)

            return resp

    return jsonify({"signup": False})


@app.route("/api/login", methods = ["POST"])
@cross_origin
def login():
    
    data = request.get_json()
    print("LOGIN DATA!!")
    print(data)
    
    email = data["email"]
    password = data["password"]
    
    print(email, password)
    user = User.query.filter_by(email = email).one_or_none()
    
    print("USER", user)
    if user is not None:
        
        if user.checking_password(password):
        
            additional_claims = {"email": user.email, "image": user.get_image(), "username": user.username,
                                "id": user.id}
            
            access_token = create_access_token(identity=user)
            
            print("ADDITIONAL CLAIMS", additional_claims)
            print("ACCESS TOKEN", access_token)
            resp = jsonify({"login": True}, access_token, additional_claims)

            return resp

    return jsonify({"login": False}, {"access_token": "none"})




@app.route("/api/logout", methods = ["POST"])
@cross_origin
@jwt_required()
def logout():
    
    data = request.get_json()
    print("DATA", data)
    
    print("LOGOUT!!")
    
    
    return jsonify({"logout": True})

# @app.route("/api/auth", methods = ["GET"])
# @jwt_required()
# def auth():
    
    
#     print("PROFILE!!!")
#     print(current_user)
    
#     if current_user is not None:
        
#         print("CURRENT USER")
#         print(current_user.__dict__)
    
#     return jsonify({ "email":current_user.email , "username":current_user.username, "image": current_user.get_image()})



@app.route("/api/user", methods = ["GET"])
@cross_origin
@jwt_required()
def profile():
    
    
    print("PROFILE!!!")
    print(current_user)
    
    if current_user is not None:
        
        print("CURRENT USER")
        print(current_user.__dict__)
    
    
    return jsonify({ "email":current_user.email , "username":current_user.username, "image": current_user.get_image()})


@app.route("/api/auth", methods = ["GET"])
@cross_origin
@jwt_required()
def auth():
    
    print("AUTH!", current_user)
    
    if current_user is None:
        
        data = {"auth": False}
        
    else:
        
        data = {"auth": True, "email":current_user.email , "username":current_user.username, "image": current_user.get_image(), "id": current_user.id}
        
    print("DATA!", data)
    
    return jsonify(data)



@app.route("/api/check_profile", methods = ["POST"])
@cross_origin
def check_profile():
    print("CHECK PROFILE!")
    
    data = request.get_json()
    
    
    username = data["username"]
    
    user = User.query.filter_by(username = username).first()
    
    if user is None:
        
        
        return jsonify({"view", True})
    
    
    return jsonify({"view": True}, { "email":user.email , "username":user.username, "image": user.get_image()})





@app.route("/api/view_profile/<string:username>/<string:id>", methods = ["GET"])
@cross_origin
def view_profile(username, id):
    print("VIEW PROFILE!")
    print(username, id)
    
    check = True
    user = User.query.filter_by(username = username).filter_by(id = int(id)).one_or_none()
    data = { "email":None , "username":None, "image": None}
    if user is None:
        
        check = False
    else:
        data = { "email":user.email , "username":user.username, "image": user.get_image(), "id": user.id}
    
    return jsonify({"view": check}, data)






@app.route("/api/users", methods = ["GET"])
@cross_origin
def all_users():
    
    
    users = User.query.all()
    print("ALL USERS!");
    users_list = [{"id": user.id, "user": f"user-{user.id}", "username": user.username,
              "image": user.get_image(), "email": user.email}
             for user in users]
    
    print("USER LIST", users_list)
    
    return jsonify({"users": users_list})






if __name__ == "__main__":
    app.run(debug = False)

















    