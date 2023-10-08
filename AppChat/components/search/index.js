import styles from './style';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../../firebase';
import { useRoute } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  get,
  ref,
  query,
  orderByChild,
  equalTo,
  update,
  onValue,
} from 'firebase/database';

function SearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [avtother, setAvtother] = useState('');
  const [emailother, setEmailOther] = useState('');
  const [nameOther, setNameOther] = useState('');
  const [chatdata, setchatdata] = useState([]);
  const route = useRoute();
  const email = route.params.email;
  const name = route.params.name;
  const avt = route.params.avt;
  const id = route.params.idUser;

  let count = 0;
  let [oder, setOder] = useState('');

  useEffect(() => {
    count = searchText.length;
    if (count >= 10) {
      setOder('email');
    } else {
      setOder('phone');
    }
  });

  useEffect(() => {
    if (email == emailother) {
      setSearchResults(null);
    }
  });

  const handleSearch = (text) => {
    setSearchText(text);
    const dbRef = ref(db, 'users/');
    if (text.trim() === '') {
      setSearchResults([]);
    } else {
      const userQuery = query(dbRef, orderByChild(oder), equalTo(text));
      get(userQuery)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const results = [];
            snapshot.forEach((childSnapshot) => {
              const user = childSnapshot.val();
              results.push(user);
              setEmailOther(user.email);
              setAvtother(user.avt);
              setNameOther(user.name);
            });
            setSearchResults(results);
          } else {
            setSearchResults(null);
          }
        })
        .catch((error) => {
          console.error('Error searching users:', error);
        });
    }
  };

  useEffect(() => {
    const startCountRef = ref(db, 'chatlists/');
    onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newPosts = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setchatdata(newPosts);
      } else {
        console.log('Không có dữ liệu chat lists');
        setchatdata([]);
      }
    });
  }, []);

  const CreateChatRoom = () => {
    const existingChat = chatdata.find(
      (item) =>
        (item.emailUser1 === email && item.emailUser2 === emailother) ||
        (item.emailUser1 === emailother && item.emailUser2 === email)
    );
    if (!existingChat) {
      data = {
        emailUser1: email,
        nameUser1: name,
        avtUser1: avt,
        msg: 'Tin nhắn',
        emailUser2: emailother,
        nameUser2: nameOther,
        avtUser2: avtother,
      };
      const chatlistRef = ref(db, 'chatlists/' + uuid.v4());
      update(chatlistRef, data)
        .then(() =>
          Alert.alert('Thông báo', 'Đã thêm vào danh sách chat', [
            {
              text: 'OK',
              onPress: () => {
                goToChatScreen();
              },
            },
          ])
        )
        .catch((error) =>
          console.error('Lỗi không thêm vào được danh sách chat:', error)
        );
    } else {
      Alert.alert('Thông báo', 'Đã có trong danh sách', [
        {
          text: 'OK',
          onPress: () => {
            goToChatScreen();
          },
        },
      ]);
    }
  };

  const goToChatScreen = () => {
    navigation.navigate('ListChats');
  };
  const goToProfile = () => {
    navigation.navigate('ProfileUser', {
      emailother: emailother,
      id: id,
    });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} />
        <View style={styles.content}>
          <Icon name='search' size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder='Tìm kiếm...'
            autoFocus
            placeholderTextColor='#b1b5b9'
            keyboardType='email-address'
            onChangeText={(text) => {
              handleSearch(text);
            }}
            value={searchText}
          />
        </View>
        <View style={styles.bottom}>
          <FlatList
            data={searchResults}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={goToProfile}>
                <View style={styles.itemuser}>
                  <View style={styles.left}>
                    <View style={styles.avtuser}>
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 50,
                        }}
                        source={{ uri: item.avt }}
                      />
                    </View>
                  </View>
                  <View style={styles.center}>
                    <Text style={styles.username}>{item.name}</Text>
                  </View>
                  <View style={styles.right}>
                    <TouchableOpacity onPress={CreateChatRoom}>
                      <Image
                        style={styles.iconchat}
                        source={require('../../assets/icons/chat.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default SearchScreen;
