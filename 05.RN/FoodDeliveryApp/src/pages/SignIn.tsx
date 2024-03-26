import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, "SignIn">;

function SignIn({navigation}:SignInScreenProps) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  
  const canGoNext = email && password;

  const onSubmit = useCallback(() => {
    if(!email || !email.trim()){
        Alert.alert('알림','이메일을 입력하세요!');
    }
    if(!password || !password.trim()){
        Alert.alert('알림','패스워드를 입력하세요!');
    }
    Alert.alert('알림','로그인 되었습니다.')
  }, [email,password]);
  const onChangeEmail = useCallback((text: string) => {
    setEmail(text.trim());
  }, []);
  const onChangePassword = useCallback((text: string) => {
    setPassword(text.trim());
  }, []);

  
  const toSignUp = useCallback(()=>{
    navigation.navigate('SignUp');
  },[navigation]);

  return (
    <View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          placeholder="이메일을 입력하세요"
          onChangeText={onChangeEmail}
          style={styles.textInput}
          value={email}
          importantForAutofill="yes"
          autoComplete="email"
          textContentType="emailAddress"
          blurOnSubmit = {false}
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          ref={emailRef}
          keyboardType = "email-address"></TextInput>
      </View>
      <View style={styles.inputWrapper}>
        <Text>비밀번호</Text>
        <TextInput
          placeholder="비밀번호를 입력하세요"
          onChangeText={onChangePassword}
          style={styles.textInput}
          value={password}
          secureTextEntry
          importantForAutofill="yes"
          autoComplete="password"
          textContentType="password"
          onSubmitEditing={onSubmit}
          ref={passwordRef}></TextInput>
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          onPress={onSubmit}
          style={
            !canGoNext
              ? styles.loginButton
              : StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
          }
          disabled={!canGoNext}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </Pressable>
        <Pressable onPress={toSignUp}>
          <Text>회원가입</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  buttonZone: {
    alignItems: 'center',
  },
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  inputWrapper: {
    padding: 20,
  },
});
export default SignIn;
