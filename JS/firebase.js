// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyAz5oJtjtg90V-ZJ4EjJwuox7Zkq2HQaqs",
authDomain: "olym-input-buzz.firebaseapp.com",
databaseURL: "https://olym-input-buzz-default-rtdb.asia-southeast1.firebasedatabase.app",
projectId: "olym-input-buzz",
storageBucket: "olym-input-buzz.firebasestorage.app",
messagingSenderId: "455088422725",
appId: "1:455088422725:web:8c54ae5409d23f7112082c",
measurementId: "G-Q4MZS47V4M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);