import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from './style';
import { db } from '../../firebase';
import Modal from 'react-native-modal';
import { v4 as uuidv4 } from 'uuid';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  ref,
  onValue,
  query,
  remove,
  orderByKey,
  limitToLast,
  update,
  orderByChild,
  equalTo,
  get,
} from 'firebase/database';

function ListChatScreen({ navigation }) {
  const auth = getAuth();
  const [chatdata, setchatdata] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  let userID = null;
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userID = user.uid;
        const dbRef = ref(db, 'users/');
        const queryRef = query(dbRef, orderByChild('id'), equalTo(userID));

        get(queryRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              const user = Object.keys(userData)[0];
              setName(userData[user].name);
              setEmail(userData[user].email);
            } else {
              console.log('Không tìm thấy người dùng tương ứng với userID.');
              setName('');
              setEmail('');
            }
          })
          .catch((error) => {
            console.error('Lỗi khi truy cập dữ liệu người dùng:', error);
          });
      } else {
        console.log('Đăng xuất rồi');
      }
    });
  });

  useEffect(() => {
    const startCountRef = ref(db, 'chatlists/');
    onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const filteredData = Object.keys(data)
          .filter((key) => key !== 'aa')
          .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
          }, {});

        const newPosts = Object.keys(filteredData).map((key) => ({
          id: key,
          ...filteredData[key],
        }));
        const filteredChats = newPosts.filter((item) => {
          return email == item.emailUser1 || email == item.emailUser2;
        });

        const chatKeys = filteredChats.map((chat) => chat.id);

        chatKeys.forEach((chatKey) => {
          const chatRef = ref(db, 'chat/' + chatKey + '/');
          const queryRef = query(chatRef, orderByKey(), limitToLast(1));
          onValue(queryRef, (chatSnapshot) => {
            const chatData = chatSnapshot.val();
            if (chatData) {
              const chatDataId = Object.keys(chatData)[0];
              if (chatData[chatDataId].msg) {
                const chatWithMsg = {
                  msg: chatData[chatDataId].msg,
                };
                const chatlistRef = ref(db, 'chatlists/' + chatKey);
                update(chatlistRef, chatWithMsg);
              }
              setchatdata(filteredChats);
            } else {
              console.log('không tìm thấy dữ liệu chat của id : ' + chatKey);
              setchatdata(filteredChats);
            }
          });
        });
      } else {
        console.log('Không có dữ liệu trong cơ sở dữ liệu Firebase.');
      }
    });
  }, [email]);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLongPress = (item) => {
    setSelectedItem(item);
    toggleModal();
  };

  const handleDeleteMessage = () => {
    if (selectedItem.id != null) {
      if (selectedItem && selectedItem.id) {
        const chatRef = ref(db, 'chatlists/' + selectedItem.id);
        try {
          remove(chatRef).then(() => {
            console.log('Cuộc trò chuyện đã được xóa.');
          });
        } catch (error) {
          console.error('Lỗi khi xóa cuộc trò chuyện:', error);
        }
      }
    } else {
      console.log('Không có dữ liêu để xóa');
    }
    toggleModal();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Chat', {
          roomId: item.id,
          emailOther:
            name == item.nameUser2 ? item.emailUser1 : item.emailUser2,
        })
      }
      onLongPress={() => handleLongPress(item)}
      style={styles.chatItem}
    >
      <Image
        source={{
          uri: name == item.nameUser2 ? item.avtUser1 : item.avtUser2,
        }}
        style={styles.avatar}
      />
      <View style={styles.chatInfo}>
        <Text style={styles.name}>
          {name === item.nameUser2 ? item.nameUser1 : item.nameUser2}
        </Text>
        <Text style={styles.message}>
          {item.msg && !item.msg.startsWith('http') ? item.msg : 'Hình ảnh'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chatdata}
        renderItem={renderItem}
        keyExtractor={() => uuidv4()}
      />
      <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <Text>Bạn có muốn xóa tin nhắn này không?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleDeleteMessage}>
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
}

export default ListChatScreen;
