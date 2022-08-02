import { adminFirestore, getServerTimestamp } from '@/services/firebase/admin';
import { Presentin } from '@/types/presentin';

export const addPresentin = (data: Presentin) =>
  adminFirestore.collection('presentin').add({
    ...data,
    updatedAt: getServerTimestamp(),
  });

export const getPresentinById = (id: string) =>
  adminFirestore.collection('presentin').doc(id).get();

export const updatePresentinById = (
  id: string,
  uid: string,
  data: Presentin
) => {
  const presentinRef = adminFirestore.collection('presentin').doc(id);

  return adminFirestore.runTransaction(async (transaction) => {
    const presentinDoc = await transaction.get(presentinRef);
    const presentin = presentinDoc.data();

    if (!presentin) throw new Error('Presentin not found');

    if (uid !== presentin.uid)
      throw new Error('You cannot edit this presentin');

    transaction.update(presentinRef, {
      ...data,
      updatedAt: getServerTimestamp(),
    });
  });
};
