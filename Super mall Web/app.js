// script.js
document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this[0].value;
    const password = this[1].value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("Admin logged in:", userCredential.user);
            // Redirect or load admin functionalities here
        })
        .catch((error) => {
            console.error("Error logging in:", error);
        });
});

// Sample function to fetch shop details
function fetchShopDetails() {
    const shopRef = firebase.database().ref('shops/');
    shopRef.on('value', (snapshot) => {
        const shops = snapshot.val();
        document.getElementById('shopDetails').innerHTML = JSON.stringify(shops);
    });
}

// Call the function to fetch shop details
fetchShopDetails();