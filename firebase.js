// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Replace this config with your own from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyDohigl8J9bOZAQMIPx0l2Lkx9C8vnhBvU",
    authDomain: "loginsystemproject-d7ace.firebaseapp.com",
    projectId: "loginsystemproject-d7ace",
    storageBucket: "loginsystemproject-d7ace.firebasestorage.app",
    messagingSenderId: "841070837339",
    appId: "1:841070837339:web:de677e4554de05daf0097e"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// =================== Register ===================

const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {

        e.preventDefault()

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("User Register");
                registerForm.reset()
            })
            .catch((err) => {
                alert("error", err)
            });
    })
}


// =================== Login ===================


const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const loginEmail = document.getElementById('loginEmail').value;
        const loginPassword = document.getElementById('loginPassword').value;

        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then(() => {
                alert("Login Succcessfull");
                window.location.href = 'dashboard.html'
            })
            .catch(err => {
                alert("Error", err)
            });
    })
}

const welcomeMessage = document.getElementById('welcomeMessage');
const logoutBtn = document.getElementById('logoutBtn');

if (welcomeMessage) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            welcomeMessage.textContent = `Welcome, ${user.email}`;
        }
        else {

            window.location.href = "login.html";
        }
    });

    logoutBtn.addEventListener('click', () => {
        signOut(auth)
            .then(() => {
                alert("Logout")
                window.location.href = "login.html";
            })
            .catch(() => alert("Error"))

    })
}
