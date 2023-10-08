import React, { useState, useEffect, useRef } from 'react';
import styles from './style';
import Ionicons from '@expo/vector-icons/Ionicons';
import { db } from '../../../firebase';
import { useRoute } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../../../firebase';
import Lightbox from 'react-native-lightbox-v2';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {
  ref,
  set,
  onValue,
  push,
  query,
  orderByChild,
  equalTo,
  get,
} from 'firebase/database';

const ChatScreen = ({ navigation }) => {
  const auth = getAuth();
  const route = useRoute();
  const flatListRef = useRef(null);
  const [msg, setMsg] = useState('');
  const [chatData, setChatData] = useState([]);
  const [name, setName] = useState('');
  const [nameother, setNameOther] = useState('');
  const [avtother, setAvtOther] = useState('');
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const imageUri = image || '';
  const emailOther = route.params.emailOther;
  const idroom = route.params.roomId;
  const ITEM_HEIGHT = 100;
  const imageUserOther = avtother || null;

  let userID = null;
  // Lấy thông tin của chính mình
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
            } else {
              console.log('Không tìm thấy người dùng tương ứng với userID.');
              setName('');
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

  // Lấy thông tin của user khác
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersRef = ref(db, 'users/');
        const queryRef = query(
          usersRef,
          orderByChild('email'),
          equalTo(emailOther)
        );
        const snapshot = await get(queryRef);

        if (snapshot.exists()) {
          const userData = snapshot.val();
          const userId = Object.keys(userData)[0];
          setAvtOther(userData[userId].avt);
          setNameOther(userData[userId].name);
        } else {
          console.log('Không tìm thấy dữ liệu người dùng với email này.');
          setAvtOther('');
          setNameOther('');
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
      }
    };

    if (emailOther) {
      fetchUserData();
    }
  }, [emailOther]);

  useEffect(() => {
    const chatPath = 'chat/' + idroom;
    const chatRef = ref(db, chatPath);

    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newChat = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setChatData(newChat);
      } else {
        setChatData([]);
      }
    });
  }, []);

  const sendChat = async () => {
    if (imageUri == '') {
      if (msg == '') {
        return false;
      }
      let data = {
        msg: msg,
        name: name,
      };
      const newChatRef = push(ref(db, 'chat/' + idroom));
      set(newChatRef, data)
        .then(() => {
          console.log('Chat thành công ');
          setMsg('');
        })
        .catch((error) => {
          console.error('Đã xảy ra lỗi: ', error);
        });
    } else {
      const imageRef = await uploadImageToStorage(image);
      const imageUrl = await getImageDownloadURL(imageRef);
      let data = {
        msg: imageUrl,
        name: name,
      };
      const newChatRef = push(ref(db, 'chat/' + idroom));
      set(newChatRef, data)
        .then(() => {
          console.log('Chat thành công ');
          setMsg('');
        })
        .catch((error) => {
          console.error('Đã xảy ra lỗi: ', error);
        });
    }
  };

  const handleContentSizeChange = () => {
    if (flatListRef.current && chatData.length > 0) {
      const lastIndex = chatData.length - 1;
      const lastItem = chatData[lastIndex];
      let additionalHeight = 500;
      // Kiểm tra xem mục cuối cùng có phải là hình không
      if (lastItem.msg && lastItem.msg.startsWith('http')) {
        additionalHeight = 500; // Điều chỉnh chiều cao bổ sung cho hình ảnh
      }

      const contentHeight = (lastIndex + 1) * ITEM_HEIGHT + additionalHeight;

      flatListRef.current.scrollToOffset({
        offset: contentHeight,
        animated: true,
      });
    }
  };

  const getImageDownloadURL = async (imageRef) => {
    return await imageRef.getDownloadURL();
  };
  const uploadImageToStorage = async (image) => {
    const response = await fetch(image);
    const blob = await response.blob();
    const filename = image.substring(image.lastIndexOf('/') + 1);
    const ref = firebase.storage().ref().child(filename);
    try {
      await ref.put(blob);
      setImage(null);
      return ref;
    } catch (error) {
      console.error('Lỗi khi tải lên hình ảnh:', error);
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        const selectedAsset = result.assets[0];
        console.log(selectedAsset.uri);
        setImage(selectedAsset.uri);
      } else {
        console.log('Chọn hình ảnh đã bị hủy bỏ.');
      }
    } catch (error) {
      console.error('Lỗi khi chọn hình ảnh:', error);
    }
  };
  const openModal = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };

  // xử lý giao diện
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => openModal(item.msg)}>
        <View
          style={[
            styles.chatBubble,
            {
              backgroundColor: item.name != name ? '#fff' : '#ccc',
              alignSelf: item.name != name ? 'flex-start' : 'flex-end',
            },
            {
              maxWidth: Dimensions.get('window').width / 2 + 10,
              borderRadius: item.msg && !item.msg.startsWith('http') ? 100 : 0,
              padding: item.msg && !item.msg.startsWith('http') ? 15 : 2,
              marginHorizontal: 5,
              marginTop: 5,
            },
          ]}
        >
          {item.msg.startsWith('http') ? (
            <Image source={{ uri: item.msg }} style={styles.Imgmsg} />
          ) : (
            <Text>{item.msg}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const goToChatScreen = () => {
    navigation.navigate('ListChats');
  };
  console.log(chatData);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={goToChatScreen}>
              <Ionicons
                name='arrow-back-outline'
                size={30}
                style={[styles.iconHeader]}
              />
            </TouchableOpacity>

            <View style={[styles.avtCirle]}>
              <Image source={{ uri: imageUserOther }} style={styles.wrapBody} />
            </View>
            <Text style={[styles.Name]}>{nameother}</Text>
          </View>
          <Ionicons
            name='alert-circle-outline'
            size={30}
            style={[styles.iconHeader]}
          />
        </View>

        <FlatList
          ref={flatListRef}
          data={chatData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={{ flex: 1, marginBottom: 30 }}
          onContentSizeChange={handleContentSizeChange}
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={10}
        style={styles.bottom}
      >
        <View
          style={imageUri ? styles.inputContainerImg : styles.inputContainer}
        >
          <View style={styles.bottomLeft}>
            <TouchableOpacity onPress={pickImage}>
              <Ionicons name='image' size={20} style={styles.iconInput} />
            </TouchableOpacity>
            <Ionicons
              name='file-tray-stacked-outline'
              size={20}
              style={styles.iconInput}
            />
          </View>

          <View style={styles.bottomCenter}>
            {imageUri ? (
              <View style={styles.uploadImg}>
                {imageUri && (
                  <Image source={{ uri: imageUri }} style={styles.imgStatus} />
                )}
              </View>
            ) : (
              <TextInput
                placeholder='Bắt đầu một tin nhắn'
                placeholderTextColor='#b1b5b9'
                style={styles.keyboardText}
                onChangeText={(text) => setMsg(text)}
                value={msg}
                onPressIn={handleContentSizeChange}
              />
            )}
          </View>

          <View style={styles.bottomRight}>
            <TouchableOpacity onPress={sendChat}>
              <Ionicons name='send' size={30} style={styles.iconmicInput} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <Image source={{ uri: selectedImage }} style={styles.modalImage} />
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ChatScreen;
