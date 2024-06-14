/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {ScrollView, Touchable, Text} from '../index.js';

import {colors} from '../../styles/theme.json';

const Tabs = ({tabs = [], active = '', onChange = tab => {}}) => {
  const totalTabs = tabs?.length;
  const activeTabStyle = {
    borderBottomWidth: 3,
    borderBottomColor: colors.danger,
  };

  return (
    <ScrollView
      horizontal
      style={{
        maxHeight: 60,
        backgroundColor: colors.light,
      }}>
      {tabs?.map(tab => (
        <Touchable
          onPress={() => onChange(tab.value)}
          hasPadding
          style={[
            {
              minWidth: `${100 / totalTabs}%`,
              alignItems: 'center',
            },
            active === tab.value ? activeTabStyle : {},
          ]}>
          <Text color={active === tab.value ? 'primary' : undefined}>
            {tab.label}
          </Text>
        </Touchable>
      ))}
    </ScrollView>
  );
};

export default Tabs;
