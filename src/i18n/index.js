import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

const i18n = new I18n();

// ===== translations (คงของเดิมทั้งหมด) =====
i18n.translations.th = {
  common: { save:'บันทึก', cancel:'ยกเลิก', delete:'ลบ', edit:'แก้ไข', add:'เพิ่ม', back:'ย้อนกลับ', confirm:'ยืนยัน' },
  profile: {
    title:'โปรไฟล์', manageModels:'จัดการโมเดล', statistics:'สถิติ', changePassword:'เปลี่ยนรหัสผ่าน',
    language:'ภาษา', theme:'ธีม', notification:'การแจ้งเตือน', arPrefs:'การตั้งค่า AR', logout:'ออกจากระบบ',
  },
  language: { title:'ภาษา', th:'ไทย', en:'อังกฤษ' },
  logout: { title:'ออกจากระบบ', ask:'คุณต้องการออกจากระบบหรือไม่?' },
  stats: {
    title:'สถิติ', totalModels:'จำนวนโมเดลทั้งหมด', followers:'ผู้ติดตาม', avgRating:'คะแนนเฉลี่ย',
    totalViews:'จำนวนการเข้าชม', totalLikes:'จำนวนถูกใจ', timeframe:'ช่วงเวลา',
    allTime:'ทั้งหมด', year:'ปี', month:'เดือน', week:'สัปดาห์', today:'วันนี้',
    topModels:'โมเดลยอดนิยม', audience:'ผู้ชม',
  },
  models: {
    manage:'จัดการโมเดล', addNew:'เพิ่มโมเดลใหม่', name:'ชื่อโมเดล', price:'ราคา',
    material:'วัสดุ', size:'ขนาด', saveEdit:'บันทึกการแก้ไข', saveNew:'บันทึกโมเดลใหม่',
  },
  ar: { title:'การตั้งค่า AR', showGuide:'แสดงวงกลมช่วยเล็ง', autoFocus:'โฟกัสอัตโนมัติ', mirrorFront:'กลับภาพกล้องหน้า' },
};

i18n.translations.en = {
  common: { save:'Save', cancel:'Cancel', delete:'Delete', edit:'Edit', add:'Add', back:'Back', confirm:'Confirm' },
  profile: {
    title:'Profile', manageModels:'Manage models', statistics:'Statistics', changePassword:'Change password',
    language:'Language', theme:'Theme', notification:'Notifications', arPrefs:'AR preferences', logout:'Logout',
  },
  language: { title:'Language', th:'Thai', en:'English' },
  logout: { title:'Logout', ask:'Do you want to log out?' },
  stats: {
    title:'Statistics', totalModels:'Total Models', followers:'Followers', avgRating:'Average Rating',
    totalViews:'Total Views', totalLikes:'Total Likes', timeframe:'Timeframe',
    allTime:'All-time', year:'Year', month:'Month', week:'Week', today:'Today',
    topModels:'Top Models', audience:'Audience Insights',
  },
  models: {
    manage:'Manage Models', addNew:'Add New Model', name:'Model Name', price:'Price',
    material:'Material', size:'Size', saveEdit:'Save Edit', saveNew:'Save New Model',
  },
  ar: { title:'AR Preferences', showGuide:'Show aiming circle', autoFocus:'Auto focus', mirrorFront:'Mirror front camera' },
};

// ===== safe locale setup =====
const sysLocale = typeof Localization?.locale === 'string' && Localization.locale ? Localization.locale : 'en';
i18n.locale = sysLocale;
i18n.enableFallback = true;

// helper ปลอดภัยเวลาเปลี่ยนภาษา
export const setLocaleSafe = (code) => {
  if (typeof code === 'string' && code.length) {
    i18n.locale = code;
  }
};

export default i18n;
