import React, { useState, useEffect } from "react";
import * as Font from 'expo-font'

export const Header = (title) => {

    return ({
        headerShown: true,
        title: title,
        headerStyle: {
            backgroundColor: '#B5D572',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontSize : 45,
            fontFamily:'iannnnnVCD',
            textAlign: 'center',
        },
    })
}