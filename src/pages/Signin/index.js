/* eslint-disable no-alert */
import React, {useState, useContext} from 'react';
import {StatusBar} from 'react-native';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Box, Title, Text, Spacer, Button, Input} from '../../components';

import {AppContext} from '../../contexts/app';

const SignIn = ({navigation: {navigate, replace}}) => {
  const {setUser: setUserContext} = useContext(AppContext);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const requestLogin = async () => {
    try {
      if (user.email?.length === 0 || user.password?.length === 0) {
        alert('Fill all field.');
        return false;
      }

      const {data: users} = await api.get('/users', {
        params: {
          email: user.email?.toLocaleLowerCase(),
          password: user.password,
        },
      });

      const [loggedUser] = users;
      if (!loggedUser) {
        alert('User not found');
        return false;
      }

      // STORE IN DEVICE
      await AsyncStorage.setItem('@user', JSON.stringify(loggedUser));

      // PUT USER IN CONTEXT
      setUserContext(loggedUser);

      // GO TO FEED
      replace('Feed');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Box background="light" justify="center" align="center" hasPadding>
        <Title bold variant="big">
          LOOKUP
        </Title>
        <Spacer size="50px" />
        <Title bold>SignIn my account.</Title>

        <Spacer size="50px" />

        <Input
          placeholder="E-mail"
          value={user.email}
          onChangeText={email =>
            setUser({
              ...user,
              email,
            })
          }
        />
        <Spacer />
        <Input
          placeholder="Password"
          secureTextEntry
          value={user.password}
          onChangeText={password =>
            setUser({
              ...user,
              password,
            })
          }
        />

        <Spacer size="50px" />
        <Button block onPress={() => requestLogin()}>
          <Text color="light">SigIn my account</Text>
        </Button>
        <Spacer size="20px" />
        <Text underline onPress={() => navigate('Signup')}>
          Create new account
        </Text>
      </Box>
    </>
  );
};

export default SignIn;
