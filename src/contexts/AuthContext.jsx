import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken({ token });
    }
  }, []);

  function loggedIn(token) {
    localStorage.setItem("token", token);
    setToken(token);
  }

  return (
    <AuthContext.Provider value={{ loggedIn, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
