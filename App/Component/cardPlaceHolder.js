import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import {Colors, Metrics} from '../Themes'
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,

    ShineOverlay
    
  } from "rn-placeholder";


const cardPlaceHolder = () => {
    return (
        <View >
           
           <Placeholder
                Animation={ShineOverlay}
                
            >
                <View
                    style={{
                        width: Metrics.screenWidth * 0.91466667,
                        height: Metrics.screenWidth * 0.30666667,
                        backgroundColor: "#ffffff",
                        shadowColor: "rgba(0, 0, 0, 0.1)",
                        shadowOffset: {
                            width: 0,
                            height: 0
                        },
                        borderRadius: 20,
                        shadowOpacity: 1,
                        flexDirection: 'row-reverse',
                        elevation: 2,
                        // marginTop: -20, 
                        alignSelf: 'center',
                        marginBottom: 30
                    }}
                >

                    <PlaceholderLine style={{
                    height: 81, backgroundColor: Colors.lightBlueGrey, width: Metrics.screenWidth * 0.21066667, alignSelf: 'center', marginStart: 13, marginEnd: 16, borderRadius: 10
                    }} />
                    <View style={{width: '70%', marginTop: 8, alignItems: 'flex-end'}} >
                        <PlaceholderLine style={{width: '60%', backgroundColor: Colors.lightBlueGrey, }}  />

                        <PlaceholderLine style={{width: '90%', marginTop: 18, backgroundColor: Colors.lightBlueGrey, }}  />
                        <View style={{flexDirection: 'row-reverse', width: '90%', justifyContent: 'space-between', marginEnd: 15}} >
                            <PlaceholderLine style={{width: '30%', marginTop: 18, backgroundColor: Colors.lightBlueGrey,}}  />
                            <PlaceholderLine style={{width: '30%', marginTop: 18, backgroundColor: Colors.lightBlueGrey,}}  />
                        </View>
                        
                    </View>
                </View>
            </Placeholder>

        </View>
    )
}

export default cardPlaceHolder

const styles = StyleSheet.create({})
