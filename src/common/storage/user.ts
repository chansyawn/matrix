import localforage from 'localforage';

// 存储用户数据
const userDB = localforage.createInstance({
  name: 'user',
});

const storage = {
  db: userDB,
  getItem: userDB.getItem,
  setItem: userDB.setItem,
  removeItem: userDB.removeItem,
};

export const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  throttle: 1000,
  whitelist: ['search'],
};
