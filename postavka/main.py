#!/usr/bin/python
# -*- coding: utf-8 -*-
import flask
from flask import Flask
from flask import request
from flask import Response
import json
import jwt


app = flask.Flask(__name__)

secret = 'danas.je.kolokvijum'

users = [
    {'username': 'admin', 'password': 'lozinka', 'rola': 'ROLE_ADMIN'},
    {'username': 'user', 'password': 'user', 'rola': 'ROLE_USER'}
]

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,auth-token')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

@app.before_request
def before_request():
    request.__setattr__('user', None)
    token = request.headers.get('auth-token')
    if token is not None:
        decoded = jwt.decode(bytes(token, 'ascii'), secret, algorithms=['HS256'])
        if decoded is not None:
            request.__setattr__('user', decoded)


@app.route("/api/login/", methods=["PUT"])
def login():
    user = request.json
    username = user['username']
    password = user['password']
    print(username, password)

    token = None
    for user in users:
        if username == user['username'] and password == user['password']:
            token = jwt.encode({
                'username': username,
                'rola': user['rola']}, secret, algorithm='HS256')
            break
    if token is not None:
        return flask.jsonify({'token': token.decode()})
    else:
        return 'User not found', 400


@app.route("/api/register/", methods=["PUT"])
def register():
    user = request.json
    users.append(user)
    return 'ok'

#Zabranjeno korisnicima da vide admine
@app.route("/api/users/", methods=["GET"])
def get_users():
    l = []
    for u in users:
        if u["rola"] == "ROLE_USER":
            l.append(u)
    return flask.jsonify(l)


@app.route("/api/user/", methods=["POST"])
def get_one_user():
    data = request.json

    for i in users:
        if i["username"]==data["username"]:
            return i


@app.route("/api/mesta/", methods=["GET"])
def mesta():
    if request.user is not None:
        with open("mesta.json", "r") as file:
            lista = json.load(file)
        print(lista)
        return flask.jsonify({'lista': lista})
    else:
        return 'not authorized', 400


# @app.route("/zaposleni", methods=["PUT"])
# def zaposleni_add():
#     data = request.json
#     print(data)
#     with open("zaposleni.json", "r") as file:
#         lista = json.load(file)
#     lista.append(data)
#     with open("zaposleni.json", "w") as file:
#         json.dump(lista, file, indent=4)
#     return flask.jsonify(lista)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8081, debug=True, use_reloader=True)