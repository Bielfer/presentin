import { adminFirestore, getServerTimestamp } from '@/services/firebase/admin';
import { User } from '@/types/user';

export const addUser = (uid: string, data: Partial<User>) =>
  adminFirestore
    .collection('users')
    .doc(uid)
    .set({
      ...data,
      updatedAt: getServerTimestamp(),
    });

export const getUserById = (userId: string) =>
  adminFirestore.collection('users').doc(userId).get();
