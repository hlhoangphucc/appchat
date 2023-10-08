import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ref, set, push } from 'firebase/database';
import { db } from '../../../firebase';
import { firebase } from '../../../firebase';
import { useRoute } from '@react-navigation/native';
import styles from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  Alert,
} from 'react-native';

const NewpostScreen = () => {
  const route = useRoute();
  const avt = route.params.avt;
  const name = route.params.name;
  const email = route.params.email;
  const [status, setStatus] = useState('');
  const [image, setImage] = useState(null);
  const imageUri = image || '';
  const navigation = useNavigation();

  const createNewpost = async () => {
    try {
      if (image) {
        const imageRef = await uploadImageToStorage(image);
        const imageUrl = await getImageDownloadURL(imageRef);
        const postData = {
          avt: avt,
          content: status,
          imgcontent: imageUrl,
          name: name,
          email: email,
        };
        await addPostToDatabase(postData);
        setStatus('');
        console.log('Bài viết mới đã được thêm vào Firebase thành công');
      } else {
        const postData = {
          avt: avt,
          content: status,
          imgcontent: '',
          name: name,
          email: email,
        };
        await addPostToDatabase(postData);
        setStatus('');
        console.log('Bài viết mới đã được thêm vào Firebase thành công');
      }
    } catch (error) {
      console.error('Lỗi khi thêm bài viết mới:', error);
    }
  };
  const checkStatus = () => {
    if (status == 0) {
      Alert.alert('Thông Báo', 'Vui Lòng Nhập Trạng Thái', [{ text: 'OK' }]);
    } else {
      createNewpost();
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
      Alert.alert('Thông Báo', 'Đăng bài thành công', [{ text: 'OK' }]);
      setImage(null);
      return ref;
    } catch (error) {
      console.error('Lỗi khi tải lên hình ảnh:', error);
      Alert.alert('Thông Báo', 'Đăng bài thất bại', [{ text: 'OK' }]);
    }
  };

  const addPostToDatabase = async (postData) => {
    const newDataRef = push(ref(db, 'NewPosts/'));
    await set(newDataRef, postData);
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
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={handleIconClick}>
              <Ionicons name='arrow-back' size={30} color='white' />
            </TouchableOpacity>

            <Text style={styles.textHeader}>Tạo bài viết</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.buttonHeader}>
              <Text style={styles.textbuttonHeader} onPress={checkStatus}>
                Đăng
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.line}></View>

        <View style={styles.bodyContainer}>
          <View style={styles.bodyheader}>
            <View style={styles.bodyheaderLeft}>
              <Image source={{ uri: avt }} style={styles.wrap} />
            </View>
            <View style={styles.bodyheaderRight}>
              <Text style={styles.name}>{name}</Text>
            </View>
          </View>
          <View style={styles.bodyBody}>
            <View style={styles.bodyStatus}>
              <TextInput
                placeholder='Bạn đang nghĩ gì ?'
                placeholderTextColor='#b1b5b9'
                style={styles.textInput}
                value={status}
                onChangeText={(text) => {
                  setStatus(text);
                }}
              />
            </View>
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
          <Entypo name='location' size={30} color='white' />
          <MaterialIcons name='emoji-emotions' size={30} color='white' />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default NewpostScreen;
