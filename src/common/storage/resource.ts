import { nanoid } from '@reduxjs/toolkit';
import localforage from 'localforage';

// 存储用户创建的资源
const resourceDB = localforage.createInstance({
  name: 'resource',
});

// 缓存，key 为资源对象的 id，value 为 Blob 对象的 url
const cache: Record<string, string> = {};

// 本地静态资源，便于统一处理
export const setStaticResource = (url: string) => {
  cache[url] = url;
};

export const setResource = (blob: Blob) => {
  const id = nanoid();
  cache[id] = URL.createObjectURL(blob);
  resourceDB.setItem(id, blob);
  return id;
};

export const getResource = async (id: string) => {
  if (cache[id]) return cache[id];
  const blob = await resourceDB.getItem<Blob>(id);
  if (!blob) return;
  const blobUrl = URL.createObjectURL(blob);
  cache[id] = blobUrl;
  return blobUrl;
};

export const removeResource = (id: string) => {
  if (!id) return;
  resourceDB.removeItem(id);
  URL.revokeObjectURL(cache[id]);
  delete cache[id];
};
