import { View, Text, Image } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from './style';
const renderItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <View style={styles.left}>
          <Image source={{ uri: item.avt }} style={styles.wrap} />
        </View>
        <View style={styles.right}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.content}>{item.content}</Text>
          {item.imgcontent ? (
            <Image
              source={{ uri: item.imgcontent }}
              style={styles.imgcontent}
            />
          ) : (
            <View style={styles.centeredTextContainer}>
              <Text style={styles.centeredText}></Text>
            </View>
          )}
          <View style={styles.bottomRight}>
            <AntDesign name='hearto' size={20} color='#38444d' />
            <AntDesign name='message1' size={20} color='#38444d' />
            <AntDesign name='sharealt' size={20} color='#38444d' />
          </View>
        </View>
      </View>

      <View style={styles.line}></View>
    </View>
  );
};

export default renderItem;
