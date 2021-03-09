import { Dimensions } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { showMessage } from 'react-native-flash-message';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

const viewPortSize = { width: 360, height: 750 };

export const perfectWidth = value =>
  widthPercentageToDP((value / viewPortSize.width) * 100);
export const perfectHeight = value =>
  heightPercentageToDP((parseFloat(String(value)) / viewPortSize.height) * 100);
export const perfectFont = value =>
  RFPercentage((value / viewPortSize.height) * 100);

export const capitalize = s => {
  return s?.charAt(0).toUpperCase() + s.slice(1);
};

export const onError = message => {
  showMessage({
    message: capitalize(message),
    type: 'danger',
    duration: 4000,
  });
};

export const onSuccess = (message, description = '') => {
  showMessage({
    message: capitalize(message),
    description,
    type: 'success',
    duration: 4000,
  });
};
