import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY = 'MY_GALLERY_ITEMS';
export async function loadGalleryItems() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}
export async function saveGalleryItems(items) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(items));
  } catch (e) {}
}
export async function addGalleryItem(item) {
  const items = await loadGalleryItems();
  items.unshift(item);
  await saveGalleryItems(items);
  return items;
}
export async function clearGallery() {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch (e) {}
}
