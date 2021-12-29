import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';

import { useSelector } from 'react-redux';

import { useMutation } from "@apollo/client";
import { AUTH_QUERY } from "../../apollo/apollo";

const Login = () => {

  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  
  const state = useSelector(state => state)

  const [authQuery, { data, loading }] = useMutation(AUTH_QUERY, {
    onCompleted: async () => {
      console.info('Auth done')
    },
    onError: ({message}) => {
      Alert.alert('Ошибка', message, [
        { text: "Ok", onPress: () => {} }
      ])
    }
  })

  const didTapButton = () => {
    authQuery({
      variables: {
        email,
        password
      }
    })
  }


  const isValidEmail = () => {
    return email.length > 6
  }

  const isValidPassword = () => {
    return password.length > 6
  }

  const isDisabled = !(isValidEmail() && isValidPassword())

  return (
    <SafeAreaView>
      <View style={styles.view}>
        <TextInput 
          style={styles.textInput}
          onChangeText={onChangeEmail} 
          value={email}
          placeholder={"E-mail"}
          placeholderTextColor="#787A91"/>
        <TextInput 
          style={styles.textInput}
          onChangeText={onChangePassword} 
          value={password}
          secureTextEntry={true}
          placeholder={"Пароль"}
          placeholderTextColor="#787A91"/>
        <TouchableOpacity 
          style={[
            styles.submitButton, 
            isDisabled ? styles.disabledBackground : styles.normalBackground
          ]}
          activeOpacity={0.7}
          disabled={isDisabled}
          onPress={() => didTapButton()}>
            <Text style={[
              styles.submitButtonText,
              isDisabled ? styles.disabledText : styles.normalText
            ]}>
              Sign In
            </Text>
        </TouchableOpacity>
        <Text style={styles.watchLabel}>
          {state.value ? "I'm watching you." : ''}
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#0F044C',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  textInput: {
    width: '100%',
    height: 40,
    fontSize: 18,
    marginHorizontal: 16,
    color: '#EEEEEE',
    marginVertical: 5,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#787A91'
  },
  submitButton: {
    marginTop: 40,
    width: 240,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6
  },
  submitButtonText: {
    fontSize: 18
  },
  normalBackground: {
    backgroundColor: "#EEEEEE"
  },
  disabledBackground: {
    backgroundColor: '#141E61'
  },
  disabledText: {
    color: "#787A91"
  },
  normalText: {
    color: "#141E61"
  },
  watchLabel: {
    marginTop: 40,
    color: "#787A91"
  }
});

export default Login