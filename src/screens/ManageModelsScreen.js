import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import i18n from '../i18n';

const KEY = '@models';

const emptyModel = { id: '', name: '', price: '', size: '18"', material: 'Alloy' };

export default function ManageModelsScreen() {
  const { colors } = useTheme();
  const [models, setModels] = useState([]);
  const [editing, setEditing] = useState(null); // null | model
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(KEY);
      if (saved) setModels(JSON.parse(saved));
    })();
  }, []);

  useEffect(() => { AsyncStorage.setItem(KEY, JSON.stringify(models)); }, [models]);

  // ✅ สร้างใหม่: ยังไม่ใส่ id จนกว่าจะกดบันทึก
  const openNew = () => { setEditing({ ...emptyModel, id: '' }); setModalVisible(true); };

  const openEdit = (m) => { setEditing({ ...m }); setModalVisible(true); };

  const remove = (id) => Alert.alert(
    i18n.t('common.confirm'),
    i18n.t('common.delete') + ' ?',
    [
      { text: i18n.t('common.cancel') },
      { text: i18n.t('common.delete'), style: 'destructive', onPress: () => setModels((arr) => arr.filter((x) => x.id !== id)) },
    ]
  );

  // ✅ ตอนบันทึก: ถ้ายังไม่มี id ให้สร้างตอนนี้
  const save = () => {
    if (!editing?.name) return;
    const payload = { ...editing, id: editing.id || Date.now().toString() };

    setModels((arr) => {
      const idx = arr.findIndex((x) => x.id === payload.id);
      if (idx >= 0) {
        const clone = [...arr];
        clone[idx] = payload;
        return clone;
      }
      return [payload, ...arr];
    });

    setModalVisible(false);
  };

  const Item = ({ item }) => (
    <View style={[styles.item, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
        <Text style={{ color: colors.textDim, marginTop: 2 }}>
          {i18n.t('models.price')}: ฿{item.price || '-'}
        </Text>
        <Text style={{ color: colors.textDim }}>
          {i18n.t('models.size')}: {item.size}  •  {i18n.t('models.material')}: {item.material}
        </Text>
      </View>
      <TouchableOpacity onPress={() => openEdit(item)} style={styles.iconBtn}>
        <Ionicons name="create-outline" size={20} color={colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => remove(item.id)} style={styles.iconBtn}>
        <Ionicons name="trash-outline" size={20} color="#ff5252" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.text }]}>{i18n.t('models.manage')}</Text>
      <FlatList
        data={models}
        keyExtractor={(it) => it.id}
        renderItem={Item}
        contentContainerStyle={{ gap: 12, paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={{ color: colors.textDim, textAlign: 'center', marginTop: 30 }}>
            No models yet
          </Text>
        }
      />
      <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]} onPress={openNew}>
        <Ionicons name="add" size={26} color="#fff" />
      </TouchableOpacity>

      {/* Modal edit/new */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {editing?.id ? i18n.t('models.saveEdit') : i18n.t('models.saveNew')}
            </Text>

            <Field
              label={i18n.t('models.name')}
              value={editing?.name}
              onChange={(v) => setEditing((p) => ({ ...p, name: v }))}
            />
            <Field
              label={i18n.t('models.price')}
              value={editing?.price}
              onChange={(v) => setEditing((p) => ({ ...p, price: v }))}
              keyboardType="numeric"
            />
            <Field
              label={i18n.t('models.size')}
              value={editing?.size}
              onChange={(v) => setEditing((p) => ({ ...p, size: v }))}
            />
            <Field
              label={i18n.t('models.material')}
              value={editing?.material}
              onChange={(v) => setEditing((p) => ({ ...p, material: v }))}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12, marginTop: 10 }}>
              <Btn label={i18n.t('common.cancel')} onPress={() => setModalVisible(false)} />
              <Btn primary label={i18n.t('common.save')} onPress={save} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function Field({ label, value, onChange, keyboardType }) {
  const { colors } = useTheme();
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ color: colors.text, marginBottom: 6, fontWeight: '600' }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={label}
        placeholderTextColor={colors.textDim}
        keyboardType={keyboardType}
        style={{
          borderWidth: 1, borderColor: colors.border, borderRadius: 12,
          paddingHorizontal: 12, color: colors.text, height: 44
        }}
      />
    </View>
  );
}

function Btn({ label, onPress, primary }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 16, height: 44, borderRadius: 12,
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: primary ? colors.primary : 'transparent',
        borderColor: colors.border, borderWidth: primary ? 0 : 1
      }}
    >
      <Text style={{ color: primary ? '#fff' : colors.text }}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '800', marginBottom: 12 },
  item: {
    borderRadius: 12, padding: 14, borderWidth: 1,
    flexDirection: 'row', alignItems: 'center', gap: 12
  },
  name: { fontWeight: '800' },
  iconBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  fab: {
    position: 'absolute', right: 18, bottom: 28,
    width: 56, height: 56, borderRadius: 28,
    alignItems: 'center', justifyContent: 'center', elevation: 6
  },
  modalOverlay: { flex: 1, backgroundColor: '#0008', alignItems: 'center', justifyContent: 'center', padding: 16 },
  modalCard: { width: '100%', borderRadius: 16, padding: 16 },
  modalTitle: { fontSize: 18, fontWeight: '800', marginBottom: 6 },
});
