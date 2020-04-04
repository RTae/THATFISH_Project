import * as React from 'react';

const api = 'https://thatfish.herokuapp.com/'

export const Firebase = ({
    signIn: async (data) => {
        var response  = await fetch(api+'findUser?name='+data)
        var responseJson = await response.json()
        var data = responseJson.data
        if (Object.keys(data).length == 0) {
            return 404 // user not fonund
          }
        else{
           var user = data[Object.keys(data)[0]]
           return user
        }
    },

    Register: async (data) => {
        console.log(data.name)
        var log = await Firebase.signIn(data.name)
        if (log == 404) {
            var response  = await fetch(api+'addUser?name='+data.name+'&token='+data.token)
            var responseJson = await response.json()
            var name = responseJson.name
            if(name == data.name){
                return true
            }
            else{
                return 103 // system error
            }
        }
        else {
            return 101 // Use already
        }
    },

    stateLogin: async (id,state) => {
        var response  = await fetch(api+'loginState?id='+id+'&value='+state.toString())
        var responseJson = await response.json()
        var log = responseJson.Success
        if (log){
            return true
        }
        else{
            return 105 // Can't undate state for login state
        }
    },

    getFishDatas: async () => {
        var response = await fetch(api+'fishs')
        var responseJson = await response.json()
        var datas = []
        for(var key in responseJson){
            var item = responseJson[key]
            item.id = key
            datas.push(responseJson[key])
           }

        return [datas,responseJson]
    },

    calutlate: async (name,nameFeed,age,quantity,token) => {
        var reasponse = await fetch(api+'calFish?name='+name+'&age='+age+'&quantity='+quantity+'&token='+token+'&nameFeed='+nameFeed)

        return  reasponse
    },

    getFishFeed: async (token) => {
        var reasponse = await fetch(api+'getFeedFish?token='+token)
        var responseJson = await reasponse.json()
        var isEmpty = JSON.stringify(responseJson) == '{}'
        if(!isEmpty){
            var datas = []
            for(var key in responseJson){
                var item = responseJson[key]
                item.id = key
                datas.push(responseJson[key])
            }

            return [datas,responseJson]
        }else{
            return null
        }
    },

    delFishFeed: async (token,id) => {
        var reasponse = await fetch(api+'delFeedFish?token='+token+'&id='+id)
        var responseJson = await reasponse.json()

        return 
    }
})