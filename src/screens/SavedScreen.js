import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

export default function SavedScreen() {
  const [loading, setLoading] = useState(true);
  const [albumUris, setAlbumUris] = useState([]);
  const [appUris, setAppUris] = useState([]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      // 1) จากอัลบั้ม ARWheelApp (Gallery/Photos)
      const perm = await MediaLibrary.requestPermissionsAsync();
      if (perm.status === 'granted') {
        const album = await MediaLibrary.getAlbumAsync('ARWheelApp');
        if (album) {
          const assets = await MediaLibrary.getAssetsAsync({ album, mediaType: 'photo', first: 200, sortBy: 'creationTime' });
          // บางแพลตฟอร์มต้องขอ localUri เพิ่ม
          const infos = await Promise.all(assets.assets.map(a => MediaLibrary.getAssetInfoAsync(a)));
          setAlbumUris(infos.map(i => i.localUri || i.uri));
        } else {
          setAlbumUris([]);
        }
      }

      // 2) จากโฟลเดอร์ของแอป (App Sandbox)
      const dir = FileSystem.documentDirectory + 'photos';
      const info = await FileSystem.getInfoAsync(dir);
      if (info.exists) {
        const names = await FileSystem.readDirectoryAsync(dir);
        // เรียงใหม่ให้ไฟล์ล่าสุดอยู่บน
        names.sort((a, b) => (a < b ? 1 : -1));
        setAppUris(names.map(n => `${dir}/${n}`));
      } else {
        setAppUris([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item }} style={styles.img} />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>อัลบั้ม (ARWheelApp)</Text>
      {albumUris.length === 0 && <Text style={styles.empty}>ไม่มีรูปในอัลบั้ม</Text>}
      <FlatList
        data={albumUris}
        keyExtractor={(u, i) => `alb-${i}`}
        numColumns={3}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
      />

      <Text style={styles.header}>ไฟล์ในแอป (Sandbox)</Text>
      {appUris.length === 0 && <Text style={styles.empty}>ยังไม่มีไฟล์ในแอป</Text>}
      <FlatList
        data={appUris}
        keyExtractor={(u, i) => `app-${i}`}
        numColumns={3}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 16, fontWeight: '700', marginTop: 12, marginHorizontal: 12 },
  empty: { marginHorizontal: 12, marginTop: 6, color: '#666' },
  list: { paddingHorizontal: 6, paddingBottom: 12 },
  item: { width: '33.33%', aspectRatio: 1, padding: 6 },
  img: { flex: 1, borderRadius: 10, backgroundColor: '#eee' }
});
