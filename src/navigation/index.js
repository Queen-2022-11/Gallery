import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import GalleryScreen from '../screens/GalleryScreen';
import ImageViewScreen from '../screens/ImageViewScreen';
import { AuthContext } from '../contexts/AuthContext';
import { useColorScheme } from 'react-native';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useContext(AuthContext);
  const colorScheme = useColorScheme();
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Gallery" component={GalleryScreen} options={{ title: 'My Gallery' }} />
            <Stack.Screen name="ImageView" component={ImageViewScreen} options={{ title: 'Image' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
