import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAfpyJW2cjAEiECu2JQAFXEEcSdaFGorAM',
  authDomain: 'auth-graphiql-79311.firebaseapp.com',
  projectId: 'auth-graphiql-79311',
  storageBucket: 'auth-graphiql-79311.appspot.com',
  messagingSenderId: '389902908715',
  appId: '1:389902908715:web:00dd65ef8d73babfa6d96e',
  measurementId: 'G-3VY08F6N6N',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logout = () => {
  signOut(auth);
};

export { auth, db, logout };
