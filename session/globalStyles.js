import React from 'react'
import { StyleSheet } from 'react-native'

export const getGlobalStyles = (isDarkMode) => {
    isDarkMode = true;
    var defaults = isDarkMode ? {
        backgroundColor: '#222',
        textColor: '#fff',
        borderColor: '#fff',

    } : {
        backgroundColor: '#fff',
        textColor: '#333',
        borderColor: '#333',

    };

    defaults = {
        ...defaults,

        btnBorderWidth: 1,
        btnBorderRadius: 15,

        btnPrimaryBackgroundColor: '#F4B942',
        btnPrimaryBackgroundColorHover: '#6B9AC4',
        btnPrimaryTextColor: '#fff',

        btnSecondaryTextColor: '#fff',
        btnSecondaryBackgroundColor: '#4059AD',
        btnSecondaryBackgroundColorHover: '#4059AD',

        headingColor: '#F4B942',
        textSize: 18,

        inputBgColor: "#333",
        inputTextColor: "#fff"

    };

    return StyleSheet.create({
        container: {
            backgroundColor: defaults.backgroundColor,
            height: '100%',
            padding: 20,
        },
        wrapperVertical: {
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
        },
        text: {
            color: defaults.textColor,
            fontSize: defaults.textSize,
            textAlign: 'justify',

        },
        heading1: {
            color: defaults.headingColor,
            fontSize: 45,
            fontWeight: 'bold',
            marginTop: 10,
            marginBottom: 10,
        },
        heading2: {
            color: defaults.headingColor,
            fontSize: 40,
            fontWeight: 'bold',
            marginTop: 10,
            marginBottom: 10,
        },
        heading3: {
            color: defaults.headingColor,
            fontSize: 35,
            fontWeight: 'bold',
            marginTop: 10,
            marginBottom: 10,
        },
        errorText: {
            color: 'crimson',
            fontWeight: 'bold',
            marginBottom: 10,
            marginTop: 6,
            textAlign: 'center',
        },
        btnPrimary: {
            borderRadius: defaults.btnBorderRadius,
            backgroundColor: defaults.btnPrimaryBackgroundColor,
        },
        btnPrimaryText: {
            color: defaults.btnPrimaryTextColor,
            fontSize: defaults.textSize,
            textAlign: 'center',
            padding: 10,
            paddingHorizontal:25,
            fontWeight: 'bold'
        },
        btnPrimaryHover: {
            backgroundColor: defaults.btnPrimaryBackgroundColorHover,
        },
        btnSecondary: {
            borderRadius: defaults.btnBorderRadius,
            backgroundColor: defaults.btnSecondaryBackgroundColor,
            borderWidth: defaults.btnBorderWidth,
            borderColor: defaults.btnSecondaryBorderColor,
            marginTop: 10,
            fontWeight: 'bold'
        },
        btnSecondaryText: {
            color: defaults.btnSecondaryTextColor,
            fontSize: defaults.textSize,
            textAlign: 'center',
            padding: 10,
        },
        img: {
            width: 350,
            height: 110,
            resizeMode: 'contain',
            alignSelf: 'center',
        },
        input: {
            backgroundColor: defaults.inputBgColor,
            color: defaults.inputTextColor,
            tintColor: defaults.inputTextColor,
            tintColor: defaults.inputTextColor,
            rippleColor:defaults.inputTextColor
        }
    });
}