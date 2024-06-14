import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import ContextProvider from './src/contexts/app';

import Routes from './src/routes';

const App = () => {
  return (
    <ContextProvider>
      <Routes />
    </ContextProvider>
  );
};

AppRegistry.registerComponent(appName, () => App);
