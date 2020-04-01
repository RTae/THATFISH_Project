import React, { useState, useEffect } from "react";
import * as Font from 'expo-font'

export const Header = (title) => {

    return ({
        headerShown: true,
        title: title,
        headerStyle: {
            backgroundColor: '#1A1260',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontSize : 50,
            fontFamily:'iannnnnVCD',
            textAlign: 'center',
        },
    })
}