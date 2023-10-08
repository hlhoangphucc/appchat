import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import styles from './style';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getAuth, signOut } from 'firebase/auth';
const SettingProfile = ({ navigation }) => {
  const route = useRoute();
  const name = route.params.username;
  const email = route.params.email;
  const auth = getAuth();

  const goToUpdateAvt = () => {
    navigation.navigate('updateavt');
  };
  const goToUpdateBg = () => {
    navigation.navigate('updatebg');
  };
  const goToinfo = () => {
    navigation.navigate('Info', { email: email });
  };
  const [pressedButton, setPressedButton] = useState(null);

  const handlePress = (buttonName) => {
    setPressedButton(buttonName);
  };

  const handlePressOut = () => {
    setPressedButton(null);
  };

  const handleIconClick = () => {
    navigation.goBack();
  };
  const handlesignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('Login');
        console.log('Đăng xuất thành công');
      })
      .catch(() => {
        console.log('Loi roi cau oi');
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleIconClick}>
          <MaterialIcons name='arrow-back' size={22} color='white' />
        </TouchableOpacity>
        <Text style={styles.textHeader}>{name}</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.lineBody}></View>
        <TouchableOpacity
          style={[
            styles.contentBody,
            {
              backgroundColor:
                pressedButton === 'info' ? '#f0f0f0' : 'transparent',
            },
          ]}
          onPressIn={() => handlePress('info')}
          onPressOut={handlePressOut}
          onPress={goToinfo}
        >
          <Text style={styles.textContent}>Thông tin</Text>
        </TouchableOpacity>
        <View style={styles.lineBody}></View>
        <TouchableOpacity
          style={[
            styles.contentBody,
            {
              backgroundColor:
                pressedButton === 'avt' ? '#f0f0f0' : 'transparent',
            },
          ]}
          onPressIn={() => handlePress('avt')}
          onPressOut={handlePressOut}
          onPress={goToUpdateAvt}
        >
          <Text style={styles.textContent}>Đổi hình nền đại diện</Text>
        </TouchableOpacity>
        <View style={styles.lineBody}></View>
        <TouchableOpacity
          style={[
            styles.contentBody,
            {
              backgroundColor:
                pressedButton === 'bg' ? '#f0f0f0' : 'transparent',
            },
          ]}
          onPressIn={() => handlePress('bg')}
          onPressOut={handlePressOut}
          onPress={goToUpdateBg}
        >
          <Text style={styles.textContent}>Đổi hình nền</Text>
        </TouchableOpacity>
        <View style={styles.lineBody}></View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handlesignOut}>
          <View style={styles.btnsignout}>
            <Ionicons color={'#fff'} size={40} name='log-out' />
            <Text style={styles.txtbtn}>Sign out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingProfile;
