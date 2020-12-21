import React, {useEffect, useState} from 'react'
import {View, Animated, Text, Keyboard, TouchableWithoutFeedback, Image} from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';

import {Images, Fonts, Colors} from '../../Themes'
import Button from '../../Component/Button'


FinishRegistration = (props) => {



    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{flex:1, backgroundColor:'#fff', justifyContent:'center', alignItems:'center'}} >
               <Image source={Images.registrationFinishImage}  />

               <Text style={[Fonts.style.boldText, {fontSize: 18, marginTop: 25}]}>رائع!</Text>
               <Text style={[Fonts.style.normal, {fontSize: 14, marginTop: 19, marginBottom: 50, color: Colors.darkSlateBlue}]}>تم التسجيل بنجاح</Text>

               <Button  buttonText={'الرئيسية'} 
                    onPress={()=> props.navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'bottomTab' })],
                        }))} 
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default FinishRegistration