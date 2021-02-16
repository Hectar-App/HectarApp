import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from "react-native-camera";


export default class QRCodeCamera extends React.Component {

    state={
        reactivateMode:true
    }
    reactivate(){
        this.refs.scanner.reactivate();
    }

    render(){
        return(
            <QRCodeScanner 
            onRead={this.props.onRead}
            ref="scanner"
            reactivate={this.props.reactivate}
            containerStyle={{
              zIndex: -10
            }}
            torchMode = {1}
            
            vibrate={false}
            cameraProps={{flashMode:this.props.flashMode?RNCamera.Constants.FlashMode.torch:RNCamera.Constants.FlashMode.off}}
            cameraStyle={{
              width: '100%',
              height: '100%',
              top: 0,
              start: 0,
              bottom: 0,
              end: 0,
              opacity: 0.25,
              
            }}
          />
        )
    }

}