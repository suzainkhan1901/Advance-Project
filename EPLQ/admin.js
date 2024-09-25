import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
import { logAction } from './logger.js';
import { firebaseConfig } from './firebase-config.js';

const auth = getAuth();
const database = getDatabase();

export function adminLogin(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            logAction("Admin logged in");
            return true;
        })
        .catch((error) => {
            logAction("Admin login failed: " + error.message);
            throw error;
        });
}

export function uploadData(fileName, encryptedData) {
    return set(ref(database, 'data/' + fileName), { data: encryptedData })
        .then(() => {
            logAction("Data uploaded: " + fileName);
            return true;
        })
        .catch((error) => {
            logAction("Data upload failed: " + error.message);
            throw error;
        });
}
