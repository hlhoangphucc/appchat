import React, { useId, useState } from 'react';
import styles from './style';
import { ref, set, orderByChild, query, equalTo, get } from 'firebase/database';
import app from '../../firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../firebase';
import {
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [Confirmpassword, setConfirmpassword] = useState('');
  const [isValidEmail, setisValidEmail] = useState('false');
  const auth = getAuth(app);

  const createUser = async () => {
    try {
      const phoneExists = await checkPhoneNumberExists(phonenumber);

      if (phoneExists) {
        Alert.alert('Thông báo', 'Số điện thoại đã được sử dụng', [
          { text: 'OK' },
        ]);
        return;
      } else if (isValidEmail) {
        Alert.alert('Thông báo', 'Sai định dạng emai', [{ text: 'OK' }]);
      } else if (email == '') {
        Alert.alert('Thông báo', 'Email không được để trống', [{ text: 'OK' }]);
      } else if (password == '') {
        Alert.alert('Thông báo', 'Mật khẩu không được để trống', [
          { text: 'OK' },
        ]);
      } else if (Confirmpassword == '') {
        Alert.alert('Thông báo', 'Mật khẩu không được để trống', [
          { text: 'OK' },
        ]);
      } else if (password != Confirmpassword) {
        Alert.alert('Thông báo', 'Mật khẩu không giống nhau', [{ text: 'OK' }]);
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        let userData = {
          email: email,
          phone: phonenumber,
          id: user.uid,
          name: username,
          password: password,
          avt: 'https://firebasestorage.googleapis.com/v0/b/projectapp-92f72.appspot.com/o/user.png?alt=media&token=72deef17-0672-41f8-92b0-10a42fec8e8e',
          bg: 'https://firebasestorage.googleapis.com/v0/b/projectapp-92f72.appspot.com/o/background.jpg?alt=media&token=0de166e5-e699-403e-bb2e-ccf7aa3a603b',
          gender: 'N/A',
        };
        const dbRef = ref(db, 'users/' + userData.id);
        set(dbRef, userData)
          .then(() => {
            console.log('Dữ liệu đã được đặt thành công');
            return navigation.navigate('Login');
          })
          .catch((error) => {
            console.error('Đã xảy ra lỗi: ', error);
          });
        console.log('User created:', user.uid);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
  const checkPhoneNumberExists = async (phoneNumber) => {
    try {
      const usersRef = ref(db, 'users/');
      const queryRef = query(
        usersRef,
        orderByChild('phone'),
        equalTo(phoneNumber)
      );
      const snapshot = await get(queryRef);

      return snapshot.exists();
    } catch (error) {
      console.error('Error checking phone number:', error);
      return false;
    }
  };
  const validateEmail = (text) => {
    // Sử dụng biểu thức chính quy để kiểm tra định dạng email
    const emailPattern = /^[A-Za-z0-9._%+-]+@gmail.com$/;
    if (emailPattern.test(text)) {
      setisValidEmail(false);
    } else {
      setisValidEmail(true);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
      style={styles.container}
    >
      <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.top}>
              <Image
                style={styles.phone}
                source={require('./../../assets/send.png')}
              />
            </View>
            <View style={styles.conten}>
              <TextInput
                placeholder='Username'
                style={styles.textInput}
                keyboardType='default'
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                }}
              />
              <TextInput
                placeholder='Phone number'
                style={styles.textInput}
                keyboardType='phone-pad'
                value={phonenumber}
                onChangeText={(text) => {
                  setPhonenumber(text);
                }}
              />
              <TextInput
                placeholder='Email'
                style={styles.textInput}
                keyboardType='email-address'
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  validateEmail(text);
                }}
              />
              <TextInput
                placeholder='Password'
                style={styles.textInput}
                secureTextEntry
                keyboardType='default'
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <TextInput
                placeholder='Confirm password'
                style={styles.textInput}
                secureTextEntry
                keyboardType='default'
                value={Confirmpassword}
                onChangeText={(text) => setConfirmpassword(text)}
              />
              {/*button của login */}
              <TouchableOpacity
                style={styles.button_login}
                onPress={() => {
                  createUser();
                }}
              >
                <Text style={styles.text_login}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
