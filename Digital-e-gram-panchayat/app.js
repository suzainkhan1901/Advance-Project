import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-database.js";

const db = getDatabase();

document.getElementById("user-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    registerUser(username, password);
});

function registerUser(username, password) {
    const userRef = ref(db, 'users/' + username);
    set(userRef, {
        username: username,
        password: password
    }).then(() => {
        console.log("User registered successfully");
    }).catch((error) => {
        console.error("Error registering user: ", error);
    });
}

function loadServices() {
    const serviceRef = ref(db, 'services/');
    onValue(serviceRef, (snapshot) => {
        const services = snapshot.val();
        displayServices(services);
    });
}

function displayServices(services) {
    const serviceList = document.getElementById("service-list");
    serviceList.innerHTML = '';
    for (const service in services) {
        const serviceItem = document.createElement("div");
        serviceItem.innerText = `${service}: ${services[service].description}`;
        serviceList.appendChild(serviceItem);
    }
}

loadServices();