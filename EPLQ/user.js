import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
import { logAction } from './logger.js';
import { firebaseConfig } from './firebase-config.js';

const auth = getAuth();
const database = getDatabase();

export function userLogin(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            logAction("User logged in");
            return true;
        })
        .catch((error) => {
            logAction("User login failed: " + error.message);
            throw error;
        });
}

export function searchPOIs() {
    const dbRef = ref(database);
    return get(child(dbRef, 'data/'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const results = [];
                snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val();
                    results.push(data.data); // Placeholder for decrypted data
                });
                logAction("POI search executed");
                return results;
            } else {
                logAction("No data available for POI search");
                return [];
            }
        })
        .catch((error) => {
            logAction("POI search failed: " + error.message);
            throw error;
        });
}
