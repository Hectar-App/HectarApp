import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity,  } from 'react-native'

import {Colors, Fonts, Metrics} from '../Themes'
const RadioButtonItem = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} >
            <View  style={{flexDirection: 'row-reverse',}} >
                <View
                    style={{
                        width: 20,
                        height: 20,
                        backgroundColor: "#ffffff",
                        borderStyle: "solid",
                        borderWidth: 1,
                        borderColor: Colors.darkSeafoamGreen,
                        borderRadius: 10, 
                        marginStart: 10,
                        justifyContent:'center'
                    }}
                >
                    {
                        props.selected &&
                        <View 
                            style={{
                                width: 12, 
                                height: 12,
                                backgroundColor: Colors.darkSeafoamGreen,
                                borderRadius: 6,
                                alignSelf: 'center',
                                opacity: 1
                            }}
                        />
                    }
                </View>
                <Text style={[Fonts.style.normal, {color: '#000', fontSize: 15, fontWeight: 'normal'}]} >{props.text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default RadioButtonItem

const styles = StyleSheet.create({})
