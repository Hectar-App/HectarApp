import React, { useEffect, useState } from 'react';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import Header from '../../../Component/Header';

import FAQsItem from '../../../Component/FAQsItem';

import api from '../../../Services/API';
import { BallIndicator } from 'react-native-indicators';
import { Colors } from '../../../Themes';

const API = api.create();

const HelpCenter = props => {
  const [FAQs, setFAQs] = useState();

  useEffect(() => {
    API.getFAQs()
      .then(res => {
        console.log('res', res);
        if (res && res.ok && res.data) {
          setFAQs(res.data);
        }
      })
      .catch(err => console.log('error', err));
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <Header
          headerTitle={'الأسئلة المتكررة'}
          doAnimation={true}
          onBackPress={() => props.navigation.goBack()}
        />

        {FAQs && (
          <FAQsItem
            FAQs={FAQs}
            containerStyle={{ marginTop: 32 }}
            doAnimation={true}
          />
        )}

        {!FAQs && (
          <View
            style={{
              justifyContent: 'center',
              marginTop: 150,
              alignItems: 'center',
            }}>
            <BallIndicator color={Colors.primaryGreen} />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HelpCenter;
