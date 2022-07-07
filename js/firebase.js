import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  getDocs,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD-D-JWKB6NAKDLbWBtH9f4w9Hur8DQJjU",
  authDomain: "todocelulares-4cd43.firebaseapp.com",
  projectId: "todocelulares-4cd43",
  storageBucket: "todocelulares-4cd43.appspot.com",
  messagingSenderId: "510672956298",
  appId: "1:510672956298:web:8ce083b2f353c79fd93673"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const obtenerProductos = async () => {

  const querySnapshot = await getDocs(collection(db, "productos"));

  const productos = []

  querySnapshot.forEach((doc) => {

    productos.push(doc);

  });

  return productos;

}

export const obtenerProducto = async (id) => {

  const docRef = doc(db, "productos", id);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {

    return docSnap;

  } else {

    console.log("No such document!");

  };

};

