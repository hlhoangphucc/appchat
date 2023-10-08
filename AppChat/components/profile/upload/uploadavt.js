import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../../../firebase';
import { firebase } from '../../../firebase';
import styles from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Text, View, Image, Alert, SafeAreaView } from 'react-native';
import {
  ref,
  query,
  orderByChild,
  equalTo,
  get,
  update,
} from 'firebase/database';

const UpdateAvt = () => {
  const [image, setImage] = useState(null);
  const imageUri = image || '';
  const [id, setId] = useState('');
  const navigation = useNavigation();
  let [email, setEmail] = useState('');
  const auth = getAuth();
  let userID = null;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userID = user.uid;
      const dbRef = ref(db, 'users/');
      const queryRef = query(dbRef, orderByChild('id'), equalTo(userID));
      get(queryRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const user = Object.keys(userData)[0];
          setEmail(userData[user].email);
        } else {
          console.log('khong co du lieu');
        }
      });
    } else {
      console.log('dang xuat r');
    }
  });
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
  const updateImageURLInDatabase = async () => {
    try {
      if (image) {
        const imageRef = await uploadImageToStorage(image);
        const imageUrl = await getImageDownloadURL(imageRef);
        await update(ref(db, 'users/' + id), {
          avt: imageUrl,
        });
        console.log('Đổi avt thành công');
        goToHomeScreen();
      } else {
        Alert.alert('Thông Báo', 'Vui lòng chọn ảnh', [{ text: 'OK' }]);
      }
    } catch (error) {
      console.error('Lỗi khi thay đổi avt:', error);
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
      Alert.alert('Thông Báo', 'Thay đổi hình đại diện thành công', [
        { text: 'OK' },
      ]);

      setImage(null);
      return ref;
    } catch (error) {
      console.error('Thay đổi hình đại diện thất bại:', error);
      Alert.alert('Thông Báo', 'Thay đổi hình đại diện thành công thất bại', [
        { text: 'OK' },
      ]);
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
  const handleIconClick = () => {
    navigation.goBack();
  };
  const goToHomeScreen = () => {
    navigation.navigate('Home');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={handleIconClick}>
            <Ionicons name='arrow-back' size={30} color='white' />
          </TouchableOpacity>
          <Text style={styles.textHeader}>Đổi đại diện</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.buttonHeader}>
            <Text
              style={styles.textbuttonHeader}
              onPress={updateImageURLInDatabase}
            >
              Chọn
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.line}></View>

      <View style={styles.bodyContainer}>
        <View style={styles.bodyBody}>
          <View style={styles.uploadImg}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.imgStatus} />
            ) : (
              <View style={styles.centeredTextContainer}>
                <Text style={styles.centeredText}></Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={pickImage}>
          <FontAwesome5 name='photo-video' size={30} color='white' />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UpdateAvt;
