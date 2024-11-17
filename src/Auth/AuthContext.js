import { createContext, useContext, useEffect, useState } from "react";
import { 
  GoogleAuthProvider, GithubAuthProvider, 
  sendPasswordResetEmail, signInWithPopup, 
  onAuthStateChanged, createUserWithEmailAndPassword, 
  signOut, getAuth 
} from "firebase/auth";
import axios from "axios";
import { auth } from "./firebase"; // Ensure auth setup is correct in ./firebase

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out.");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  const resetPassword = async () => {
    if (user?.email) {
      try {
        await sendPasswordResetEmail(auth, user.email);
        console.log("Password reset email sent.");
      } catch (error) {
        console.error("Error sending reset email:", error.message);
      }
    }
  };

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("Google sign-in successful.");
    } catch (error) {
      console.error("Error with Google sign-in:", error.message);
    }
  };

  const githubSignIn = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("GitHub sign-in successful.");
    } catch (error) {
      console.error("Error with GitHub sign-in:", error.message);
    }
  };

  const signUpWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      console.log("Sign-up successful.");
    } catch (error) {
      console.error("Error during sign-up:", error.message);
    }
  };

  const [userDetails, setUserDetails] = useState({ role: null, sessionList: [] });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const res = await axios.get(`http://localhost:8081/roles/${currentUser.uid}`);
          setUser(currentUser);
          setUserDetails({ role: res.data.roleUser, sessionList: res.data.sessionList });
        } catch (error) {
          console.error("Error fetching roles:", error.message);
        }
      } else {
        setUser(null);
        setUserDetails({ role: null, sessionList: [] });
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (user) {
        try {
          await user.getIdToken(true);
          console.log("Token refreshed.");
        } catch (error) {
          console.error("Error refreshing token:", error.message);
          setUser(null);
        }
      }
    },     1000); // Every 5 minutes

    return () => clearInterval(intervalId);
  }, [user]);

  return (
    <AuthContext.Provider value={{ googleSignIn, githubSignIn, user,userDetails, resetPassword, signUpWithEmailAndPassword, auth, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
