import React from 'react'
import { StyleSheet } from 'react-native'

export const getGlobalStyles = (isDarkMode) => {
    isDarkMode = false;
    var defaults = isDarkMode ? {
        backgroundColor: '#333',
        textColor: '#fff',
        borderColor: '#fff',
        
        btnSecondaryTextColor: '#97D8C4',
        btnSecondaryBorderColor: '#6B9AC4',
    } : {
        backgroundColor: '#EFF2F1',
        textColor: '#333',
        borderColor: '#333',
        
        btnSecondaryTextColor: '#4059AD',
        btnSecondaryBorderColor: '#4059AD',
    };

    defaults = {
        ...defaults,
        
        btnBorderWidth: 1,
        btnBorderRadius: 15,

        btnPrimaryBackgroundColor: '#4059AD',
        btnPrimaryBackgroundColorHover: '#4059AD',
        btnPrimaryTextColor: '#fff',

        btnSecondaryBackgroundColor: 'transparent',
        btnSecondaryBackgroundColorHover: '#97D8C4',

        containerBackgroundColor: '#EFF2F1',
        containerBackgroundColorHover: '#97D8C4',

        headingColor: '#F4B942',
        textSize: 18,

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
        input: {
            borderWidth: 1,
            borderColor: defaults.borderColor,
            padding: 10,
            fontSize: 18,
            borderRadius: 6,
            color: defaults.textColor,
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
        },
        btnSecondaryText: {
            color: defaults.btnSecondaryTextColor,
            fontSize: defaults.textSize,
            textAlign: 'center',
            padding: 10,
        },
        img : {
            width: 350,
            height: 350,
            resizeMode: 'contain',
            alignSelf: 'center',
        }
    });
}