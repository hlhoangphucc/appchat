import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/login/index';
import WelcomeScreen from './components/welcome/index';
import ListChatScreen from './components/chat/index';
import HomeScreen from './components/home/index';
import NewpostScreen from './components/home/newpost/newpost';
import RegisterScreen from './components/register/index';
import ProfileScreen from './components/profile/index';
import UpdateAvt from './components/profile/upload/uploadavt';
import UpdateBg from './components/profile/upload/uploadbg';
import SettingProfile from './components/profile/setting/setting';
import InfoScreen from './components/profile/setting/info/info';
import EditiIfoScreen from './components/profile/setting/editinfo/editinfo';
import SearchScreen from './components/search';
import ChatScreen from './components/chat/message/index';
import ProfileUserScreen from './components/search/profileUser/index';
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Welcome'
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ headerShown: false, gestureEnabled: false }}
          key='home'
        />
        <Stack.Screen
          name='Newposts'
          component={NewpostScreen}
          options={{ headerShown: false }}
          key='home'
        />
        <Stack.Screen
          name='ListChats'
          component={ListChatScreen}
          options={{
            headerTitle: 'Danh sách cuộc trò chuyện',
            headerStyle: {
              backgroundColor: '#15202b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name='Chat'
          component={ChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Profile'
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='updateavt'
          component={UpdateAvt}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='updatebg'
          component={UpdateBg}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='SettingProfileScreen'
          component={SettingProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Info'
          component={InfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='EditInfo'
          component={EditiIfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Search'
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ProfileUser'
          component={ProfileUserScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
