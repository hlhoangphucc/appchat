import { Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from '../../../../firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './style';
import { useRoute } from '@react-navigation/native';
import {
  ref,
  query,
  orderByChild,
  equalTo,
  get,
  update,
  onValue,
} from 'firebase/database';

const EditiIfoScreen = ({ navigation }) => {
  const [avt, setAvt] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [todoData, setTodoData] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [id, setId] = useState('');
  const route = useRoute();
  const email = route.params.email;
  const imageUriAvt = avt || null;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersRef = ref(db, 'users/');
        const queryRef = query(usersRef, orderByChild('email'), equalTo(email));
        const snapshot = await get(queryRef);

        if (snapshot.exists()) {
          const userData = snapshot.val();
          const userId = Object.keys(userData)[0];
          setId(userData[userId].id);
          setAvt(userData[userId].avt);
          setName(userData[userId].name);
          setGender(userData[userId].gender);
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

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        if (!email) {
          console.log('Email không hợp lệ.');
          return;
        }
        const usersRef = ref(db, 'NewPosts/');
        const queryRef = query(usersRef, orderByChild('email'), equalTo(email));
        const snapshot = await get(queryRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const userPosts = Object.keys(userData).map((key) => key);
          setTodoData(userPosts);
        } else {
          console.log(
            'Không tìm thấy bài viết nào của người dùng với email này.'
          );
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu bài viết:', error);
      }
    };

    fetchUserPosts();
  }, [email]);

  useEffect(() => {
    if (gender === 'nam') {
      setSelectedOption('nam');
    } else {
      setSelectedOption('nữ');
    }
  }, [gender]);

  const handleFocus = () => {
    setName('');
  };
  const updateDataInFirebase = async () => {
    try {
      if (name == '') {
        alert('Vui lòng nhập tên!!!!');
      } else {
        await update(ref(db, 'users/' + id), {
          gender: selectedOption,
          name: name,
        });
        todoData.map((id) => {
          update(ref(db, 'NewPosts/' + id), {
            name: name,
          });
        });
        console.log('Thay đổi thông tin thành công');
      }
    } catch (error) {
      console.error('Lỗi khi thay đổi thông tin:', error);
    }
  };

  const goToUpdateAvt = () => {
    navigation.navigate('updateavt');
  };
  const handleIconClick = () => {
    navigation.goBack();
  };
  const goToHomeScreen = () => {
    updateDataInFirebase();
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <View style={styles.bodyTop}>
          <View style={styles.bodyLeft}>
            <View style={styles.iconsBackContainer}>
              <TouchableOpacity onPress={handleIconClick}>
                <Ionicons name='arrow-back' size={25} color='white' />
              </TouchableOpacity>
            </View>
            <View style={styles.avtUser}>
              <View style={styles.avt}>
                <TouchableOpacity onPress={goToUpdateAvt}>
                  <Image
                    source={{
                      uri: imageUriAvt,
                    }}
                    style={styles.wrapAvt}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.bodyRight}>
            <View style={styles.textInputBody}>
              <TextInput
                style={styles.textInput}
                placeholderTextColor='#b1b5b9'
                value={name}
                onChangeText={(text) => {
                  setName(text);
                }}
                onFocus={handleFocus}
              />
            </View>
            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedOption === 'nam' && styles.radioButtonSelected,
                ]}
                onPress={() => setSelectedOption('nam')}
              >
                <Text style={styles.textOption}>Nam</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedOption === 'nữ' && styles.radioButtonSelected,
                ]}
                onPress={() => setSelectedOption('nữ')}
              >
                <Text style={styles.textOption}>Nữ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.bodyBottom}>
          <View style={styles.contentBottom}>
            <TouchableOpacity
              style={styles.contentBottom}
              onPress={goToHomeScreen}
            >
              <Text style={styles.saveText}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EditiIfoScreen;
