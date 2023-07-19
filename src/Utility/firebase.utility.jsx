import { initializeApp } from 'firebase/app';
//Autherization
import { getAuth, 
        GoogleAuthProvider,  
        signInWithRedirect,
        signInWithPopup,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        signOut,
        onAuthStateChanged
        } from "firebase/auth";

import { getFirestore,
          doc,
          getDoc,
          setDoc,
          addDoc,
          collection
        } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCkODN1ZOkCZ4h3iDZvZgYrAdVbmxEhvv8",
    authDomain: "chatbox-481aa.firebaseapp.com",
    projectId: "chatbox-481aa",
    storageBucket: "chatbox-481aa.appspot.com",
    messagingSenderId: "1011605670549",
    appId: "1:1011605670549:web:2b9244015f29b53a4c299c",
    measurementId: "G-6KPMK7S90M"
  };
  
 
  // Initialize Firebase app
  const ChatBoxApp = initializeApp(firebaseConfig);
  //Initializing firestore
  export const db = getFirestore(ChatBoxApp);
  //Initializing provider
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  })
  //Calling firebase.auth.FirebaseAuth through static function getAuth
  const auth = getAuth();

  //Signing in through Google redirect: follows full-page redirect flow
  export const signInWithGoogleRedirect = () => {
    signInWithRedirect(auth, googleProvider);
  }
  //Signing in through Google Popup: follows pop-up based OAuth authentication flow
  export const signInWithGooglePopup = () => {
    signInWithPopup(auth, googleProvider);
  }
// Signing in through Email and Password: ASYNC
  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  }

  //Signing Out: ASYNC
  export const userSignOut = async () => {
    return await signOut(auth);
  }

  //Listener for the auth status to change
  export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback)
  }
   
  //FIRESTORE
  
  export const createUserDocumentFromAuth = async (user, additionalInfo) => {
    if (!user) return;

    const userDocRef = doc(db, "users", user.uid);

    const docSnap = await getDoc(userDocRef);
  
    if (!docSnap.exists()) {
      const {displayName, email, photoURL, uid} = user;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          uid,
          displayName,
          email,
          photoURL,
          createdAt,
          ...additionalInfo
        })
      } catch (error) {
        console.log('error while creating the user: ', error.message);
      }
    }
    return userDocRef;
  }

  export const createMessageDoc = async (message, currentUser) => {
    if (message.trim() === ''){
      alert ('Enter valid Message');
      return;
    }

    const {displayName, uid, email, photoURL} = currentUser;
 
    try{
      await addDoc (collection(db, "messages"),{
        text: message,
        name: (displayName === null ? email : displayName),
        avatar: (photoURL=== null ? "https://htmlcolorcodes.com/assets/images/colors/aqua-color-solid-background-1920x1080.png" : photoURL),
        createdAt: new Date(),
        uid
      })
    } catch (error) {
        console.log('error while sending message: ', error.message);
    }
  }
 

