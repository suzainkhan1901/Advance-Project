document.getElementById('registration-form').addEventListener('submit', registerUser);
document.getElementById('login-form').addEventListener('submit', loginUser);
document.getElementById('business-idea-form').addEventListener('submit', postBusinessIdea);

async function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // Store user role in the database
        await db.collection('users').doc(user.uid).set({
            username,
            email,
            role
        });
        console.log("User registered:", user);
    } catch (error) {
        console.error("Error registering user:", error);
    }
}

async function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const userCredential = await auth.signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);
    } catch (error) {
        console.error("Error logging in:", error);
    }
}

async function postBusinessIdea(event) {
    event.preventDefault();
    const title = document.getElementById('business-title').value;
    const description = document.getElementById('business-description').value;

    try {
        await db.collection('businessIdeas').add({
            title,
            description,
            createdAt: new Date()
        });
        console.log("Business idea posted:", title);
    } catch (error) {
        console.error("Error posting business idea:", error);
    }
}