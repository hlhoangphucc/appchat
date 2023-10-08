import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './style';
import renderItem from './post/posts';
import { useRoute } from '@react-navigation/native';
import { db } from '../../firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import Modal from 'react-native-modal';

import {
  ref,
  query,
  orderByChild,
  equalTo,
  get,
  onValue,
  remove,
} from 'firebase/database';

const ProfileScreen = ({ navigation }) => {
  const route = useRoute();
  const [todoData, setTodoData] = useState([]);
  const [avt, setAvt] = useState('');
  const [bg, setBg] = useState('');
  const [name, setName] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const email = route.params.email;
  const imageUriAvt = avt || null;
  const imageUriBg = bg || null;

  const handleIconClick = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const startCountRef = ref(db, 'NewPosts/');
    onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newPosts = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .filter((post) => post.email === email);
        setTodoData(newPosts);
      }
    });
  }, []);

  const goToUpdateAvt = () => {
    navigation.navigate('updateavt');
  };
  const goToUpdateBg = () => {
    navigation.navigate('updatebg');
  };
  const goToSettingProfile = () => {
    navigation.navigate('SettingProfileScreen', {
      username: name,
      email: email,
    });
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

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLongPress = (item) => {
    setSelectedItem(item);
    toggleModal();
  };

  const handleDeleteItem = (itemId) => {
    if (selectedItem.id != null) {
      if (selectedItem && selectedItem.id) {
        const chatRef = ref(db, 'NewPosts/' + selectedItem.id);
        try {
          remove(chatRef).then(() => {
            console.log('Xóa bài đăng thành công.');
          });
        } catch (error) {
          console.error('Lỗi xóa bài đăng:', error);
        }
      }
    } else {
      console.log('Không có dữ liêu để xóa');
    }
    toggleModal();
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={todoData.reverse()}
        renderItem={({ item }) => (
          <TouchableOpacity onLongPress={() => handleLongPress(item)}>
            {renderItem({ item })}
          </TouchableOpacity>
        )}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <View style={styles.backgroundUser}>
              <TouchableOpacity onPress={goToUpdateBg}>
                <Image
                  source={{
                    uri: imageUriBg,
                  }}
                  style={styles.wrapBG}
                />
              </TouchableOpacity>
              <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={goToSettingProfile}>
                  <Ionicons
                    name='ellipsis-horizontal'
                    size={25}
                    color='white'
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.iconsBackContainer}>
                <TouchableOpacity onPress={handleIconClick}>
                  <Ionicons name='arrow-back' size={25} color='white' />
                </TouchableOpacity>
              </View>
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
            <View style={styles.nameContainer}>
              <Text style={styles.nameUser}>{name}</Text>
            </View>
          </View>
        }
      />
      <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <Text>Bạn có muốn xóa bài đăng này không?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleDeleteItem}>
              <Text style={styles.button}>Có</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.button}>Không</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;
