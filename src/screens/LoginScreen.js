import React, { useContext, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, Platform } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { AuthContext } from '../contexts/AuthContext';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession(); // Important for web OAuth

export default function LoginScreen() {
  const { setUser } = useContext(AuthContext);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '574836032990-m9d30rs9l6qnd6pc2p6j2u3giirugtfi.apps.googleusercontent.com',
    iosClientId: '574836032990-m9d30rs9l6qnd6pc2p6j2u3giirugtfi.apps.googleusercontent.com',
    androidClientId: '574836032990-0jsc9f2n3480jb5e8f5r76ki71igqsa0.apps.googleusercontent.com',
    webClientId: '574836032990-m9d30rs9l6qnd6pc2p6j2u3giirugtfi.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      (async () => {
        try {
          const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: { Authorization: `Bearer ${authentication.accessToken}` },
          });
          const userInfo = await res.json();
          setUser(userInfo);
        } catch (error) {
          console.log('Failed to fetch user info:', error);
        }
      })();
    }
  }, [response]);

  const handleSignIn = async () => {
    // For Web, use redirect mode to avoid COOP issues
     await promptAsync({ useProxy: true, showInRecents: true });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Gallery</Text>
      <Image source={require('../../assets/favicon.png')} style={styles.logo} />
      <Button disabled={!request} title="Sign in with Google" onPress={handleSignIn} />
      <Text style={styles.small}>Works on iOS, Android & Web</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, marginBottom: 16 },
  logo: { width: 120, height: 120, marginBottom: 16, resizeMode: 'contain' },
  small: { marginTop: 12, color: '#888' },
});
