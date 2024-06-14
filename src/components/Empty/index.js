import React from 'react';
import {ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import {colors} from '../../styles/theme.json';
import {Box, Spacer, Title} from '../';

const Empty = ({loading = false, messagem = 'Loading...'}) => {
  return (
    <Box justify="center" align="center" fluid>
      <Spacer size="50px" />

      {!loading && (
        <>
          <Icon name="exclamation" color={colors.primary} size={100} />
          <Spacer size="30px" />
        </>
      )}
      {loading && (
        <>
          <ActivityIndicator size="large" />
          <Spacer size="20px" />
        </>
      )}
      <Title>{loading ? 'Carregando...' : messagem}</Title>
    </Box>
  );
};

export default Empty;
