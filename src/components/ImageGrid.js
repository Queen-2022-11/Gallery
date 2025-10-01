import React from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, Dimensions } from 'react-native';

export default function ImageGrid({ items, onOpen, dark }) {
  const numColumns = 3;
  const size = Math.floor(Dimensions.get('window').width / numColumns) - 12;

  return (
    <FlatList
      data={items}
      keyExtractor={(i) => i.id}
      numColumns={numColumns}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onOpen(item)} style={{ margin: 6 }}>
          <Image 
            source={{ uri: item.uri }} 
            style={{ width: size, height: size, borderRadius: 8, backgroundColor: '#ccc' }} 
            resizeMode="cover"
          />
          <Text 
            numberOfLines={2} 
            style={{ 
              width: size, 
              marginTop: 4, 
              color: dark ? '#fff' : '#000' 
            }}
          >
            {item.caption}
          </Text>
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        <View style={{ padding: 20 }}>
          <Text style={{ color: dark ? '#fff' : '#000' }}>No images yet</Text>
        </View>
      }
    />
  );
}
