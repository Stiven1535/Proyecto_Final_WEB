// Importa Firebase y los módulos necesarios
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuración de Firebase (reemplaza con los datos de tu proyecto)
const firebaseConfig = {
  apiKey: "AIzaSyA0fNTefrl9F3jtFrT6i2sPliWhw20rfvA",
  authDomain: "proyecto-af877.firebaseapp.com",
  projectId: "proyecto-af877",
  storageBucket: "proyecto-af877.firebasestorage.app",
  messagingSenderId: "672864739123",
  appId: "1:672864739123:web:6b80752e8fb3823223e846",
  measurementId: "G-VZVBC3QDE8",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore y Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Exporta las instancias
export { db, auth };
