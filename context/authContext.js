import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    //onAuthStateChange
    setIsAuthenticated(false);
  }, []);

  const login = async (email, password) => {
    try {
    } catch (error) {}
  };
  const logOut = async () => {
    try {
    } catch (error) {}
  };

  const register = async (email, password, userName, profileUrl) => {
    try {
    } catch (error) {}
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logOut, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wraped inside AuthContextProvider");
  }
  return value;
};
