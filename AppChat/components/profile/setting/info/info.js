import { Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ref, query, orderByChild, equalTo, get } from 'firebase/database';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './style';
import { useRoute } from '@react-navigation/native';
import { db } from '../../../../firebase';

const InfoScreen = ({ navigation }) => {
  const [avt, setAvt] = useState('');
  const [bg, setBg] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const route = useRoute();
  const email = route.params.email;
  const imageUriAvt = avt || null;
  const imageUriBg = bg || null;

  const goToEditInfo = () => {
    navigation.navigate('EditInfo', { email: email });
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersRef = ref(db, 'users/');
        const queryRef = query(usersRef, orderByChild('email'), equalTo(email));
        const snapshot = await get(queryRef);

        if (snapshot.exists()) {
          const userData = snapshot.val();
          const userId = Object.keys(userData)[0];
          setAvt(userData[userId].avt);
          setName(userData[userId].name);
          setBg(userData[userId].bg);
          setGender(userData[userId].gender);
          setPhone(userData[userId].phone);
        } else {
          console.log('Không tìm thấy dữ liệu người dùng với email này.');
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
      }
    };

    if (email) {
      fetchUserData();
    }
  }, [email]);
  const handleIconClick = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.backgroundUser}>
          <Image
            source={{
              uri: imageUriBg,
            }}
            style={styles.wrapBG}
          />
        </View>
        <View style={styles.avtUser}>
          <View style={styles.avt}>
            <Image
              source={{
                uri: imageUriAvt,
              }}
              style={styles.wrapAvt}
            />
          </View>
        </View>
        <View style={styles.iconsBackContainer}>
          <TouchableOpacity onPress={handleIconClick}>
            <Ionicons name='arrow-back' size={25} color='white' />
          </TouchableOpacity>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameUser}>{name}</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.contentBody}>
          <Text style={styles.textContent}>Giới Tính : {gender}</Text>
        </View>
        <View style={styles.lineBody}></View>
        <View style={styles.contentBody}>
          <Text style={styles.textContent}>Email : {email}</Text>
        </View>
        <View style={styles.lineBody}></View>

        <View style={styles.contentBody}>
          <Text style={styles.textContent}>SĐT: {phone}</Text>
        </View>
        <View style={styles.lineBody}></View>

        <View style={styles.editContainer}>
          <View style={styles.contentEdit}>
            <TouchableOpacity onPress={goToEditInfo}>
              <Text style={styles.textContent}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default InfoScreen;
