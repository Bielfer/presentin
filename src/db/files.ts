import { storage } from '@/services/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuid } from 'uuid';

export const uploadPresentinMessageImage = async (file: Blob) => {
  const storageRef = ref(storage, `presentin-message-image/${uuid()}`);

  await uploadBytes(storageRef, file);

  const downloadUrl = await getDownloadURL(storageRef);

  return downloadUrl;
};

export const temp = {};
