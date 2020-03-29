import React, { useState, useEffect } from "react";

export const Header = (title) => {

    return ({
        headerShown: true,
        title: title,
        headerStyle: {
            backgroundColor: '#1A1260',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontSize : 40,
            fontFamily:'Priyati',
            textAlign: 'center',
        },
    })
}