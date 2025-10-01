import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, Image, StyleSheet, Modal, TouchableOpacity, TextInput, Platform, Share } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { loadGalleryItems, addGalleryItem } from '../utils/storage';
import ImageGrid from '../components/ImageGrid';
import CaptionInput from '../components/CaptionInput';
import { pickImageFromLibrary, takePhoto } from '../utils/media';
import uuid from 'react-native-uuid';
import { Image as RNImage } from 'react-native';

export default function GalleryScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [picked, setPicked] = useState(null);
  const [search, setSearch] = useState('');
  const [dark, setDark] = useState(false);

  // Load items & prefetch images
  useEffect(() => {
    (async () => {
      const loaded = await loadGalleryItems();
      setItems(loaded);
      // Prefetch images to ensure they display
      loaded.forEach(i => RNImage.prefetch(i.uri));
    })();
  }, []);

  const onPick = async () => {
    const res = await pickImageFromLibrary();
    if (res) {
      setPicked(res);
      setModalVisible(true);
    }
  };

  const onCamera = async () => {
    const res = await takePhoto();
    if (res) {
      setPicked(res);
      setModalVisible(true);
    }
  };

  const onSaveCaption = async (caption) => {
    const item = { id: uuid.v4(), uri: picked.uri, caption: caption || '', createdAt: Date.now() };
    const updated = await addGalleryItem(item);
    setItems(updated);
    setModalVisible(false);
    setPicked(null);
  };

  const onOpen = (item) => navigation.navigate('ImageView', { item });

  const filtered = items.filter(i => i.caption.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={[styles.container, { backgroundColor: dark ? '#121212' : '#fff' }]}>
      <View style={styles.header}>
        {user?.picture ? <Image source={{ uri: user.picture }} style={styles.avatar} /> : <View style={styles.avatar} />}
        <View style={{ flex: 1 }}>
          <Text style={[styles.name, { color: dark ? '#fff' : '#000' }]}>{user?.name || user?.email}</Text>
          <Text style={[styles.small, { color: dark ? '#ccc' : '#666' }]}>{user?.email}</Text>
        </View>
        <TouchableOpacity onPress={() => setUser(null)} style={styles.signout}>
          <Text style={{ color: dark ? '#fff' : '#000' }}>Sign out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.controls}>
        <Button title="Add Photo" onPress={onPick} />
        <Button title="Take Photo" onPress={onCamera} />
        <TextInput 
          placeholder="Search captions..." 
          value={search} 
          onChangeText={setSearch} 
          style={[styles.search, { color: dark ? '#fff' : '#000', borderColor: dark ? '#555' : '#ccc' }]} 
          placeholderTextColor={dark ? '#888' : '#999'}
        />
        <Button title="Toggle Theme" onPress={() => setDark(!dark)} />
      </View>

      <View style={{ flex: 1 }}>
        <ImageGrid items={filtered} onOpen={onOpen} dark={dark} />
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1, backgroundColor: dark ? '#121212' : '#fff' }}>
          {picked && <Image source={{ uri: picked.uri }} style={{ flex: 1 }} resizeMode="contain" />}
          <CaptionInput initial="" onSave={onSaveCaption} dark={dark} />
          <Button title="Cancel" onPress={() => { setModalVisible(false); setPicked(null); }} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#ccc' },
  name: { fontSize: 16, fontWeight: '600' },
  small: { fontSize: 12, color: '#666' },
  signout: { padding: 8 },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 8, flexWrap: 'wrap' },
  search: { borderWidth: 1, padding: 8, borderRadius: 8, minWidth: 140, marginHorizontal: 8 }
});
