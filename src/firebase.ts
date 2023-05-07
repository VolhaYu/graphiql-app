/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err: any) {
    console.error(err.message);
    // alert(err.message);
  }
};

const registerWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = res;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      authProvider: 'local',
      email,
    });
  } catch (err: any) {
    console.error(err.message);
    // alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, logInWithEmailAndPassword, registerWithEmailAndPassword, logout };
