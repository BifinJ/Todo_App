import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();

// Function to Sign Up with Email and Password
const signUpWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential | void> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    if (user) {
      await sendEmailVerification(user);
      alert(
        "Signup successful! A verification email has been sent to your email address."
      );
      console.log("Signup successful, verification email sent.");
    }
    return userCredential; // Return the UserCredential object
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error signing up:", error.message);
    } else {
      console.error(String(error));
    }
  }
};

// Function to Login with Email and Password
const loginWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential | void> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    if (user.emailVerified) {
      console.log("Login successful");
      return userCredential; // Return the UserCredential object
    } else {
      console.warn("Please verify your email before logging in.");
    }
    console.log("Login successful");
    return userCredential; // Return the UserCredential object
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error logging in:", error.message);
    } else {
      console.error(String(error));
    }
  }
};

// Function to Sign In with Google
const loginWithGoogle = async (): Promise<UserCredential | void> => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Google Sign-In successful", result.user);
    return result; // Return the UserCredential object
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error signing in with Google:", error.message);
    } else {
      console.error(String(error));
    }
  }
};

// Function to Logout
const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log("Logged out successfully");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error logging out:", error.message);
    } else {
      console.error(String(error));
    }
  }
};

export { app, auth, signUpWithEmail, loginWithEmail, loginWithGoogle, logout };
