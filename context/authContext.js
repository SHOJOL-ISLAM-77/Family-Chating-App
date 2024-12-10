import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase.config";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSubs = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
        updateUserData(user.uid);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });
    return unSubs;
  }, []);

  const updateUserData = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      console.log({ imUser: { user } });
      setUser({
        ...user,
        userName: data?.userName,
        profileUrl: data?.profileUrl,
        userId: data?.userId,
      });
    }
  };

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      setUser(response.user);
      setIsAuthenticated(true);
      return { success: true, data: response.user };
    } catch (error) {
      console.error("Login error:", error.message);
      return { success: false, message: error.message };
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error.message);
      return { success: false, message: error.message };
    }
  };

  const register = async (email, password, userName, profileUrl) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = response.user;

      await updateProfile(user, {
        displayName: userName,
        photoURL: profileUrl,
      });

      await setDoc(doc(db, "users", user.uid), {
        userName,
        profileUrl,
        userId: user.uid,
      });

      return { success: true, data: user };
    } catch (error) {
      return { success: false, message: "invalid email" };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logOut, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }
  return context;
};
