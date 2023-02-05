d# using flask_restful
from flask import Flask, jsonify, request, make_response
from flask_restful import Resource, Api
import pandas as pd
import jwt
import bcrypt
import pymongo
from bson import ObjectId

# creating the flask app
app = Flask(__name__)
# creating an API object
api = Api(app)

client = pymongo.MongoClient('mongodb://localhost:27017/')
mydb = client['plane-traking']
mycol = mydb['users']

SECRET_KEY = "THISISASECRET"

class RegisterUsers(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        email = data['email']
        password = data['password']

        user_found = mycol.find_one({"username": username})
        email_found = mycol.find_one({"email": email})

        if user_found:
            return make_response(jsonify({"message": "User with username already exists!"}), 400)
        if email_found:
            return make_response(jsonify({"message": "User with email already exists!"}), 400)
        
        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(10))

        user_input = {"username": username, "email": email, "password": hashed}

        mycol.insert_one(user_input)

        return make_response(jsonify({"message": "User Created Successfully!"}), 201)

class LoginUsers(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']

        user_found = mycol.find_one({"username": username})

        if user_found:
            if (bcrypt.checkpw(password.encode('utf-8'), user_found['password'])):
                userid = str(user_found['_id'])
                auth_token = jwt.encode({
                    "_id": userid
                }, "THISISASECRET")
                print(auth_token)
                return make_response(jsonify({"auth_token": auth_token}), 200)
            else:
                return make_response(jsonify({"message": "Wrong Password!"}), 400)
        else:
            return make_response(jsonify({"message": "User with username does not exists!"}), 400)

class User(Resource):
    def get(self):

        if not request.headers['auth-token']:
            return make_response(jsonify({"message": "Token Missing!"}), 400)

        token = request.headers['auth-token']
        
        data = jwt.decode(token,"THISISASECRET",algorithms=['HS256'])
        
        user = mycol.find_one({"_id": ObjectId(data['_id'])})

        di = {
            "_id": str(user['_id']),
            "username": str(user['username']),
            "email": str(user['email'])
        }

        return make_response(jsonify(di), 200)
        

class Cities(Resource):
    def get(self):
        dbfile = 'dbfile.xlsx'
        df = pd.read_excel(dbfile)

        li = []

        for i in range(0, len(df.index)):
            li.append(df['Source'][i])

        return make_response(jsonify(li), 200)

class LatLong(Resource):
   def post(self):
    dbfile = 'dbfile1.xlsx'
    df = pd.read_excel(dbfile)

    data = request.get_json()
    source = []
    destination = []
    departure = []
    arrival = []
    delay = []
    reason = []
    contact = []

    sd = data['sd']

    for i in range(0,len(df.index)):
       if sd == (df.iat[i,0]):
        source.append(df.iat[i,1])
        destination.append(df.iat[i,2])
        departure.append(str(df.iat[i,3]))
        arrival.append(str(df.iat[i,4]))
        delay.append(str(df.iat[i,5]))
        reason.append(df.iat[i,6])
        contact.append(df.iat[i,7])
    
    di = [ source,  destination,  departure,  arrival,  delay,  reason,  contact]


    
    return make_response(jsonify(di), 200)
# adding the defined resources along with their corresponding urls
api.add_resource(LatLong, '/api/latlong')
api.add_resource(Cities, "/api/cities")
api.add_resource(RegisterUsers, "/api/users/register")
api.add_resource(LoginUsers, "/api/users/login")
api.add_resource(User, "/api/users")


# driver function
if __name__ == '__main__':

    app.run(debug=True)
