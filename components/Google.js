import * as React from 'react';

const api = 'https://thatfish.herokuapp.com/'

export const Google = ({
    getTable: async (data) => {
        var response  = await fetch(api+'getFishTable?name='+data)
        var responseJson = await response.json()
        var data = responseJson
        return data
    },
})