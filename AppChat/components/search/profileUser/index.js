import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './style';
import renderItem from './post/posts';
import { useRoute } from '@react-navigation/native';
import { db } from '../../../firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';

import {
  ref,
  query,
  orderByChild,
  equalTo,
  get,
  onValue,
  set,
  remove,
  push,
} from 'firebase/database';

const ProfileUserScreen = ({ navigation }) => {
  const route = useRoute();
  const [todoData, setTodoData] = useState([]);
  const [avt, setAvt] = useState('');
  const [bg, setBg] = useState('');
  const [name, setName] = useState('');
  const [checkfollow, setCheckFollow] = useState(false);
  const id = route.params.id;
  const emailother = route.params.emailother;
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
          .filter((post) => post.email === emailother);
        setTodoData(newPosts);
      }
    });
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersRef = ref(db, 'users/');
        const queryRef = query(
          usersRef,
          orderByChild('email'),
          equalTo(emailother)
        );
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

    if (emailother) {
      fetchUserData();
    }
  }, [emailother]);

  const goToChatScreen = () => {
    navigation.navigate('ListChats');
  };

  useEffect(() => {
    const fetchlistfollow = async () => {
      try {
        const usersRef = ref(db, 'listfollow/' + id);
        const queryRef = query(
          usersRef,
          orderByChild('email'),
          equalTo(emailother)
        );
        const snapshot = await get(queryRef);
        if (snapshot.exists()) {
          setCheckFollow(true);
        } else {
          console.log('Không tìm thấy dữ liệu người dùng với email này.');
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
      }
    };

    if (emailother) {
      fetchlistfollow();
    }
  });

  const followUser = () => {
    if (!checkfollow) {
      const dbRef = push(ref(db, 'listfollow/' + id));
      set(dbRef, { email: emailother })
        .then(() => {
          console.log('Theo dõi thành công ');
          setCheckFollow(true);
        })
        .catch((error) => {
          console.error('Đã xảy ra lỗi: ', error);
        });
    } else {
      const removefollow = async () => {
        const usersRef = ref(db, 'listfollow/' + id);
        const queryRef = query(
          usersRef,
          orderByChild('email'),
          equalTo(emailother)
        );
        const snapshot = await get(queryRef);
        snapshot.forEach((childSnapshot) => {
          const userId = childSnapshot.key;
          remove(ref(db, 'listfollow/' + id + '/' + userId))
            .then(() => {
              console.log('Đã hủy theo dõi thành công');
              setCheckFollow(false);
            })
            .catch((error) => {
              console.error('Đã xảy ra lỗi khi hủy theo dõi: ', error);
            });
        });
      };
      if (emailother) {
        removefollow();
      }
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todoData.reverse()}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <View style={styles.backgroundUser}>
              <Image
                source={{
                  uri: imageUriBg,
                }}
                style={styles.wrapBG}
              />
              <View style={styles.iconsBackContainer}>
                <TouchableOpacity onPress={handleIconClick}>
                  <Ionicons name='arrow-back' size={25} color='white' />
                </TouchableOpacity>
              </View>
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
            <View style={styles.nameContainer}>
              <Text style={styles.nameUser}>{name}</Text>
            </View>
          </View>
        }
      />
      <View style={styles.bodyContainer}>
        <TouchableOpacity style={styles.buttonaddFriend} onPress={followUser}>
          <Text style={styles.addFriend}>
            {checkfollow
              ? [
                  <Ionicons name='checkmark' size={20} color='white' />,
                  'Đang theo dõi',
                ]
              : [
                  <Ionicons name='person-add' size={20} color='white' />,
                  'Theo dõi',
                ]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonChat} onPress={goToChatScreen}>
          <Ionicons name='chatbox-ellipses' size={20} color='white' />
          <Text style={styles.addchat}>Nhắn tin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileUserScreen;
