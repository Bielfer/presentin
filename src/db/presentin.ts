import { adminFirestore, getServerTimestamp } from '@/services/firebase/admin';
import { Presentin, PresentinMessage } from '@/types/presentin';

export const addPresentin = (data: Presentin) =>
  adminFirestore.collection('presentins').add({
    ...data,
    updatedAt: getServerTimestamp(),
  });

export const getPresentinById = (id: string) =>
  adminFirestore.collection('presentins').doc(id).get();

export const updatePresentinById = (
  id: string,
  uid: string,
  data: Presentin
) => {
  const presentinRef = adminFirestore.collection('presentins').doc(id);

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

export const getPresentinMessages = (presentinId: string) =>
  adminFirestore
    .collection('presentins')
    .doc(presentinId)
    .collection('messages')
    .get();

export const addPresentinMessage = (
  presentinId: string,
  data: PresentinMessage
) =>
  adminFirestore
    .collection('presentins')
    .doc(presentinId)
    .collection('messages')
    .add({ ...data, updatedAt: getServerTimestamp() });

export const deletePresentinMessage = (
  uid: string,
  presentinId: string,
  messageId: string
) => {
  const presentinRef = adminFirestore.collection('presentins').doc(presentinId);
  const messageRef = presentinRef.collection('messages').doc(messageId);

  return adminFirestore.runTransaction(async (transaction) => {
    const presentinDoc = presentinRef.get();
    const presentin = (await presentinDoc).data();
    const messageDoc = messageRef.get();
    const message = (await messageDoc).data();

    if (!message) throw new Error('Message not found');
    if (!presentin) throw new Error('Presentin not found');

    if (message.uid !== uid && presentin.uid !== uid)
      throw new Error('You cannot delete this message');

    transaction.delete(messageRef);
  });
};
