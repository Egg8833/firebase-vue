
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAtDbI_TQLxKhm8Ny9NQ5rE6cVhbXgVzAU",
  authDomain: "vue-fire-auth-6a8e0.firebaseapp.com",
  projectId: "vue-fire-auth-6a8e0",
  storageBucket: "vue-fire-auth-6a8e0.appspot.com",
  messagingSenderId: "332776243250",
  appId: "1:332776243250:web:ebf3e1772e0025da7f7c2b"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export{
    db
}