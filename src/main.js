import { createApp } from 'vue'
import App from './App.vue'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBS5in2CfIEyY2CRLun7nD5MLNMiFIYdHw",
    authDomain: "vue-chat-22d9e.firebaseapp.com",
    projectId: "vue-chat-22d9e",
    storageBucket: "vue-chat-22d9e.appspot.com",
    messagingSenderId: "190874283184",
    appId: "1:190874283184:web:0e8f5223f3bf3f681f9f75"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };


createApp(App).mount('#app')
