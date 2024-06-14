/* eslint-disable no-alert */
import React, {useState, useContext} from 'react';
import {StatusBar, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/api';
import {AppContext} from '../../contexts/app';
import {Box, Title, Text, Spacer, Button, Input} from '../../components';

const SignUp = ({navigation: {navigate, replace, goBack}}) => {
  const {setUser: setUserContext} = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const requestSignup = async () => {
    try {
      setLoading(true);
      if (
        user.name?.length === 0 ||
        user.email?.length === 0 ||
        user.password?.length === 0
      ) {
        alert('Fill all field.');
        return false;
      }

      const {data: loggedUser} = await api.post('/users', user);

      if (!loggedUser) {
        setLoading(false);
        alert('Não foi possível criar o usuário');
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
        <Title bold>Create new account.</Title>
        <Spacer />
        <Text>Enter your details below:</Text>
        <Spacer size="50px" />

        <Input
          placeholder="Name"
          editable={!loading}
          value={user.name}
          onChangeText={name =>
            setUser({
              ...user,
              name,
            })
          }
        />
        <Spacer />
        <Input
          placeholder="E-mail"
          editable={!loading}
          value={user.email}
          onChangeText={email =>
            setUser({
              ...user,
              email: email?.toLowerCase(),
            })
          }
        />
        <Spacer />
        <Input
          placeholder="Password"
          secureTextEntry
          editable={!loading}
          value={user.password}
          onChangeText={password =>
            setUser({
              ...user,
              password,
            })
          }
        />

        <Spacer size="50px" />

        {loading && <ActivityIndicator size="large" />}
        {!loading && (
          <>
            <Button block onPress={() => requestSignup()}>
              <Text color="light">Create new account</Text>
            </Button>
            <Spacer size="20px" />
            <Text underline onPress={() => goBack()}>
              Back to home
            </Text>
          </>
        )}
      </Box>
    </>
  );
};

export default SignUp;
