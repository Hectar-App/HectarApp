import React from 'react';
import { View } from 'react-native';
import { perfectWidth } from '../../../utils/commonFunctions';

const HorizontalSpace = ({ width }) => (
  <View style={{ width: perfectWidth(width) }} />
);

export default HorizontalSpace;
