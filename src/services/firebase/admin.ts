import * as admin from 'firebase-admin';

const credentials = {
  credential: admin.credential.cert({
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  }),
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
};

if (!admin.apps.length) {
  admin.initializeApp(credentials);
}

const adminFirestore = admin.firestore();
const adminAuth = admin.auth();

const getServerTimestamp = () => admin.firestore.FieldValue.serverTimestamp();

const getIdTokenData = (idToken: string) =>
  adminAuth.verifyIdToken(idToken.split(' ')[1]);

export { adminAuth, adminFirestore, admin, getServerTimestamp, getIdTokenData };
