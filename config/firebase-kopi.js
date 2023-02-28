import {initializeApp} from 'firebase/app';
import {getStorage} from "firebase/storage";
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
   your data here...
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore();
export const storage = getStorage(app);
