import React from 'react';
import { View } from 'react-native';
import { perfectHeight } from '../../../utils/commonFunctions';

const VerticalSpace = ({ height }) => (
  <View style={{ height: perfectHeight(height) }} />
);

export default VerticalSpace;
