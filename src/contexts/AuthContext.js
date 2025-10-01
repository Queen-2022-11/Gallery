import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const raw = await SecureStore.getItemAsync('MY_GALLERY_USER');
        if (raw) setUser(JSON.parse(raw));
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (user) await SecureStore.setItemAsync('MY_GALLERY_USER', JSON.stringify(user));
        else await SecureStore.deleteItemAsync('MY_GALLERY_USER');
      } catch (e) {}
    })();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
