// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import {
    getAuth, 
    signInAnonymously, 
    onAuthStateChanged
} from "firebase/auth";

import { 
    collection, 
    addDoc, 
    updateDoc, 
    getDoc, 
    getDocs,
    where,
    query,
    doc, 
    serverTimestamp, 
     } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Anonymous Sign
export const guestSignIn = async () => {
    try {
      const auth = getAuth();
      const userCredential = await signInAnonymously(auth);
      console.log("Guest signed in:", userCredential.user);
  
      // Save the UID for future use (e.g., in LocalStorage or IndexedDB)
      const userId = userCredential.user.uid;
      localStorage.setItem("guestUserId", userId);

      return true

    } catch (error) {
      console.error("Error during guest sign-in:", error);
      return false
    }
}

// Create User
export const createUser = async () => {
    try {
        const docRef = await addDoc(collection(db, "customers"), {
          email: "",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

// Update customer by email
export const updateCustomer = async () => {
    const customerEmail = doc(db, "customers", "slYd6w8gFgg0mHO40fr7");

    // Update customer email
    try {
       const docRef = await updateDoc(customerEmail, {
            email: 'terdoo@mail.com',
            updatedAt: serverTimestamp()
        });
        console.log("Document Updated with ID: ", docRef)
    } catch (e) {
        console.error("Error Updating document: ", e);
    }
}

// Get User
export const getUser = async () => {
    try {
        const docRef = doc(db, "customers", "slYd6w8gFgg0mHO40fr7");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
    } catch (e) {
        console.error("Error adding document: ", e);
      }
}

// Get Single Product
export const getProduct = async () => {
  try {
    // Query Firestore for the product with the specified barcode
    const q = query(collection(db, "products"), where("barcode", "==", "6034000482027"));
    const querySnapshot = await getDocs(q);

    // Check if we found any matching products
    if (!querySnapshot.empty) {
      // Extract and return the first matching product (assuming barcode is unique)
      const product = querySnapshot.docs[0].data();
      console.log("Product found:", product);
      return product;
    } else {
      console.log("No product found with the given barcode.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// Get all products
export const getProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    });

}








