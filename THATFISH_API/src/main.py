from flask import Blueprint, request, render_template
from .component.Firebase import *
from .component.GoogleSheet import *

appBlueprint = Blueprint('main',__name__)
db = firebase()

@appBlueprint.route('/')
def index():
    return render_template('home.html')

@appBlueprint.route('/users')
def getUsers():
    log = db.getAllUser()
    return log

@appBlueprint.route('/addUserByID')
def addUserByID():
    data = {
            'id' : request.args['id'],
            'name' : request.args['name'],
            }
    
    return db.addUserById(data)

@appBlueprint.route('/addUser')
def addUser():
    data = {
            'name' : request.args['name'],
            'token' : request.args['token']
            }
    
    return db.addUser(data)

@appBlueprint.route('/editUser')
def editUser():
    data = {
            'id' : request.args['id'],
            'key' : request.args['key'],
            'value' : request.args['value'],
            }
    
    return db.editUser(data)

@appBlueprint.route('/loginState')
def loginState():
    data = {
            'id' : request.args['id'],
            'value' : request.args['value'],
            }
    
    return db.updateLoginState(data)

@appBlueprint.route('/findUser')
def findUser():
    data = {
            'name' : request.args['name'],
            }
    
    return db.FindUserByName(data)

@appBlueprint.route('/delUser')
def delUser():
    data = {
            'id' : request.args['id'],
            }
    
    return db.delUser(data['id'])

@appBlueprint.route('/sendMessageToUser')
def sendMessgeUser():
    
    return db.pushNotificationToUser()

@appBlueprint.route('/fishs')
def readData():
    log = db.readData()
    return log

@appBlueprint.route('/addFish',methods = ['POST', 'GET'])
def addData():
    if request.method == 'POST':
        data = {
            'id' : request.form['id'],
            'name' : request.form['name'],
            'bio' : request.form['bio'],
            'eye' : request.form['eye'],
            'size' : request.form['size'],
            'pic' : request.form['pic'],
            'icon' : request.form['icon'],
            'ref' : request.form['ref'],
            'tableFeed' : request.form['table']
            }

        return db.addData(data)
    else:
        data = {
            'id' : request.args['id'],
            'name' : request.args['name'],
            'bio' : request.args['bio'],
            'eye' : request.args['eye'],
            'size' : request.args['size'],
            'pic' : request.args['pic'],
            'icon' : request.args['icon'],
            'ref' : request.args['ref'],
            'tableFeed' : request.args['table']
            }
        return db.addData(data)
    
@appBlueprint.route('/editFish')
def editedData():
    data = {
            'id' : request.args['id'],
            'edited' : request.args['edited'],
            'data' : request.args['data'],
            }
    
    return db.editData(data)

@appBlueprint.route('/delFish/<string:id>')
def delete(id):
    log = db.delData(id)
    return log

@appBlueprint.route('/getFishTable')
def fishTable():
    data = {
            'name' : request.args['name'],
            }
    log = sheet.readData(data)
    return log


@appBlueprint.route('/calFish')
def calFish():
    data = {
            'name' : request.args['name'],
            'nameFeed' : request.args['nameFeed'],
            'age' : request.args['age'],
            'quantity' : request.args['quantity'],
            'token' : request.args['token']
            }
    log = db.addDataCalFish(data)
    return log

@appBlueprint.route('/getFeedFish')
def getFeedFish():
    data = {
            'token' : request.args['token'],
            }
    token = data['token']
    log = db.getFeedData(token)
    return log

@appBlueprint.route('/delFeedFish')
def delFeedFish():
    data = {
            'token' : request.args['token'],
            'id': request.args['id']
            }
    token = data['token']
    id = data['id']
    log = db.delFeedData(token,id)
    return log

@appBlueprint.route('/updateFeedFish')
def updateFeedFish():
    log = db.updateFeedData()
    return log