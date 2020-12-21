import React, {useEffect, useState} from 'react'
import {View, Animated, Text, Keyboard, TouchableWithoutFeedback} from 'react-native'


import Header from '../Component/Header'


import { Metrics, ApplicationStyles, Colors, Fonts } from '../Themes'


import api from '../Services/API'
import { ScrollView } from 'react-native-gesture-handler';

const API = api.create()

import {BallIndicator} from 'react-native-indicators'

const RolesAndCondation = (props) => {

    const [roles, setRoles] = useState('')
   

    useEffect(()=> {
        API.roles().then(res => {
            console.log('res', res)
            if(res && res.ok && res.data && !res.data.errors){
                setRoles(res.data)
            }
        }).catch(err => console.log('error', err))
    }, []) 

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {roles ? <View style={{flex:1, backgroundColor:'#fff'}} >


            <Header headerTitle={'الشروط و الاحكام'} onBackPress={()=> props.navigation.goBack()} />
            <ScrollView>
                <TouchableWithoutFeedback>
                    <View style={{width: Metrics.screenWidth, marginTop:37}}>
                        <Text
                            style={[ Fonts.style.normal,{
                                // width: 323,
                                // height: 66,
                                opacity: 0.8,
                                fontSize: 12,
                                fontWeight: "normal",
                                fontStyle: "normal",
                                lineHeight: 24,
                                letterSpacing: 0,
                                textAlign: "right",
                                color: Colors.black,
                                paddingHorizontal:22
                            },]}
                        >
                            {roles}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>

            </View>
                : 
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
                <BallIndicator color={Colors.primaryGreen} />
            </View> 
            }
        </TouchableWithoutFeedback>
    )
}

export default RolesAndCondation