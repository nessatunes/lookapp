/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Title} from './components';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Feed from './pages/Feed';
import Orders from './pages/Orders';

import Marketplace from './pages/Marketplace';
import Category from './pages/Marketplace/category';
import Product from './pages/Marketplace/product';
import Cart from './pages/Cart';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

import {colors} from './styles/theme.json';
import util from './util';

const CustomDrawerComponent = props => {
  return (
    <DrawerContentScrollView {...props}>
      <Title bold color="light" variant="big" hasPadding>
        LOOKAPP
      </Title>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const DrawerComponent = () => {
  return (
    <Drawer.Navigator
      initialRouteName="FeedScreen"
      drawerContent={props => <CustomDrawerComponent {...props} />}
      screenOptions={{
        activeBackgroundColor: colors.primary,
        activeTintColor: colors.light,
        inactiveTintColor: util.toAlpha(colors.light, 60),
        style: {
          backgroundColor: colors.black,
        },
      }}>
      <Drawer.Screen
        options={{
          drawerIcon: ({color}) => <Icon name="people" color={color} />,
        }}
        name="FeedScreen"
        component={Feed}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({color}) => <Icon name="tag" color={color} />,
        }}
        name="Marketplace"
        component={Marketplace}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({color}) => <Icon name="basket" color={color} />,
        }}
        name="Orders"
        component={Orders}
      />
    </Drawer.Navigator>
  );
};

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Feed">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Signin"
          component={Signin}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Signup"
          component={Signup}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Feed"
          component={DrawerComponent}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Category"
          component={Category}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Product"
          component={Product}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Cart"
          component={Cart}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
