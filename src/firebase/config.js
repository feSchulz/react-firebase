
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
/** Adicione aquia configuração do seu fireBase */
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };