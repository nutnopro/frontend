// ✅ รองรับทั้งโค้ดเก่าที่ใช้ theme.colors และโค้ดใหม่แบบ Context
export const light = {
  bg: '#f5f5f5',
  card: '#ffffff',
  primary: '#667eea',
  text: '#111827',
  textDim: '#6B7280',
  border: '#e5e7eb',
  tabBar: '#ffffff',
};

export const dark = {
  bg: '#0f1115',
  card: '#171a21',
  primary: '#8da1ff',
  text: '#f5f6fa',
  textDim: '#a6adbb',
  border: '#2a2f3a',
  tabBar: '#0f1115',
};

// 👉 default export ให้มี .colors (light) เพื่อไม่ให้โค้ดเก่าพัง
const theme = { colors: light, light, dark };
export default theme;
