import firebase_admin
import secrets as s
import random
from firebase_admin import credentials
from firebase_admin import firestore
from .GoogleSheet import googleSheet
from .ExpoNotification import ExpoNotification

cred = credentials.Certificate("./src/assert/FirebaseKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
sheet = googleSheet()
Notification = ExpoNotification()
fishs_ref = db.collection('fishs')
users_ref = db.collection('users')
feed_ref = db.collection('feedsNoti')


class firebase():
    def getAllUser(self):
        docs = users_ref.stream()
        users = {doc.id:doc.to_dict() for doc in docs}
        return users

    def addUserById(self,data):
        try:
            token = s.token_urlsafe(16)
            users_ref.document(data['id']).set({
            'name': data['name'],
            'token': token,
            'LoginState': False,
             })
            return {'id': data['id'],
                    'name':data['name'],
                    'token': token,
                    'LoginState': False,
                    'Success':True}
        except Exception as e:
            return f"An Error Occured: {e}"

    def addUser(self,data):
        try:
            token = s.token_urlsafe(16)
            id = self.getLastestID()
            users_ref.document(id).set({
            'name': data['name'],
            'token': token,
            'expoToken': data['token'],
            'LoginState': False,
             })
            return {'id':id,
                    'name':data['name'],
                    'token': token,
                    'LoginState': False,
                    'expoToken': data['token'],
                    'Success':True}
        except Exception as e:
            return f"An Error Occured: {e}"

    def editUser(self,data):
        try:
            users_ref.document(data['id']).update({
            data['key']: data['value'],
             })
            return {data['key']: data['value'],
                    'Success':True}
        except Exception as e:
            return f"An Error Occured: {e}"

    def updateLoginState(self,data):
        try:
            users_ref.document(data['id']).update({
            'LoginState': data['value'],
             })
            return {'LoginState': data['value'],
                    'Success':True}
        except Exception as e:
            return f"An Error Occured: {e}"

    def delUser(self,id):
        try:
            users_ref.document(id).delete()
            return {'Success':True}
        except Exception as e:
            return f"An Error Occured: {e}"

    def pushNotificationToUser(self):
        messages = ['ได้เลี่ยงปลาไว้ปร่าวอย่าลืมให้อาหารละ 🐟', 'วันนี้เป็นวันที่สดใสให้อาหารปลาด้วย 🐟', '🐟🐟🐟', 'ปลา']
        sendMessage = random.choice(messages)
        docs = users_ref.stream()
        for i in docs:
            data = i.to_dict()
            print(data['expoToken'])
            Notification.sendMessage('ExponentPushToken[RIc5bDGJbCKoZZBH1r0W70]',sendMessage)

        return {'LOG': 'DONE'}

    def FindUserByName(self,data):
        try:
            name = data['name'][0].upper() + data['name'][1:].lower()
            docs = users_ref.where('name', '==', name).stream()
            data = { i.id:i.to_dict() for i in docs}
            return {'data': data,
                    'Success':True}
        except Exception as e:
            return f"An Error Occured: {e}"
    
    def readData(self):
        docs = fishs_ref.stream()
        fishs = {doc.id:doc.to_dict() for doc in docs}
        return fishs

    def addData(self,data):
        try:
            fishs_ref.document(data['id']).set({
            'name': data['name'],
            'bio': data['bio'],
            'idetity': data['eye'],
            'size': data['size'],
            'pic': data['pic'],
            'tableFeed': data['tableFeed'],
            'icon': data['icon'],
            'ref': data['ref']
             })
            return {'id': data['id'],
                    'name':data['name'],
                    'bio':data['bio'],
                    'idetity':data['eye'],
                    'size':data['size'],
                    'pic': data['pic'],
                    'tableFeed': data['tableFeed'],
                    'icon': data['icon'],
                    'ref': data['ref'],
                    'Success':True
                    }
        except Exception as e:
            return f"An Error Occured: {e}"

    def editData(self,data):
        try:
            fishs_ref.document(data['id']).update({
            data['edited']: data['data'],
             })
            return {data['edited']: data['data'],
                    'Success':True}
        except Exception as e:
            return f"An Error Occured: {e}"

    def delData(self,id):
        try:
            fishs_ref.document(id).delete()
            return {'Success':True}
        except Exception as e:
            return f"An Error Occured: {e}"

    def addDataCalFish(self,data,mode = 'ADD_DATA'):
        try:
            id = feed_ref.document(data['token']).get().to_dict()
            datas = sheet.readData(data)
            name = data['name']
            age = int(data['age'])
            quantity = int(data['quantity'])
            foods = ''
            dayLeft = ''
            PrecentDayleft = ''
            count = ''
            
            i = 1
            while(i < len(datas[name])-1):
                ages = datas[name][i][0].split()
                Ranges = range(int(ages[0]),int(ages[2])+1)
            
                if(age in Ranges):
                    weights = datas[name][i][1].split()
                    foods = datas[name][i][2].split()
                    count = datas[name][i][3].split()
                    lastvalue = datas[name][-1][0].split()[0].replace('+','')
                    dayLeft = int(lastvalue) - age
                    PrecentDayleft = round((age/int(lastvalue)),3)
                    if len(weights) == 1:
                        weights = float(weights[0])
                        foods = float(foods[0])
                    else:
                        weights = (float(weights[0]) + float(weights[2]))/2
                        foods = (float(foods[0]) + float(foods[2]))/2
                    foods = round((foods/100)*weights) * quantity
                    break
                i+=1
            
            i+=1
            if(i == len(datas[name])):
                weights = datas[name][-1][1].split()
                foods = datas[name][-1][2].split()
                count = datas[name][-1][3].split()
                dayLeft = 0
                PrecentDayleft = 1
                if len(weights) == 1:
                    weights = float(weights[0].replace('+',''))
                    foods = float(foods[0])
                else:
                    weights = (float(weights[0]) + float(weights[2]))/2
                    foods = (float(foods[0]) + float(foods[2]))/2

                foods = round((foods/100)*weights) * quantity
            
            log = {
                'food' : foods,
                'count' : count,
                'dayLeft' : dayLeft,
                'Precent' : PrecentDayleft,
                'quantity' : quantity,
                'age' : age,
                'name' : data['name'],
                'nameFeed' : data['nameFeed']
            }

            if (id == None or id == {}):
                feed_ref.document(data['token']).set({ 'FN1' : log})
                return {data['token']: {id : log}}

            elif mode == 'UPDATE':
                id = data['id']
                feed_ref.document(data['token']).update({ id : log})
                return {data['token']: {id : log}}
            
            else :
                key = [ int(i.replace('FN','')) for i in id.keys()]
                id = 'FN'+str(max(key)+1)
                feed_ref.document(data['token']).update({ id : log})
                return {data['token']: {id : log}}
        except Exception as e:
            return f"An Error Occured: {e}"

    def getFeedData(self,token):
        feed = feed_ref.document(token).get().to_dict()
        if(feed == None):
            return {}
        else:
            return feed
        
    def delFeedData(self,token,id):
        try:
            log = feed_ref.document(token).update({
                id:firestore.DELETE_FIELD
            })
            return {'LOG' : True}
        except Exception as e:
            return f"An Error Occured: {e}"

    def updateFeedData(self):
        try:
            docs = feed_ref.stream()
            datas = { i.id:i.to_dict() for i in docs}
            for doc in datas:
                for id in datas[doc]:
                    log = datas[doc][id]
                    data = {
                        'token' : doc,
                        'name' : log['name'],
                        'nameFeed' : log['nameFeed'],
                        'age': str(log['age']+1),
                        'quantity' : log['quantity'],
                        'id' : id
                    }
                    state = self.addDataCalFish(data,mode = 'UPDATE')
                    print(state)
            return {'LOG' : True}

        except Exception as e:
            return f"An Error Occured: {e}"

    def getLastestID(self):
        try:
            docs = users_ref.stream()
            id = [ int((doc.id).replace('u','')) for doc in docs]
            lastestID = str(max(id)+1)
            return 'u'+lastestID
        except Exception as e:
            return f"An Error Occured: {e}"