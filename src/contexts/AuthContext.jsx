import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const avatar = localStorage.getItem("avatar");
    if (token) {
      setToken({ token });
      setEmail({ email });
      setAvatar({ avatar });
    }
  }, []);

  function loggedIn(data) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", data.user.email);
    localStorage.setItem("avatar", data.user.avatar);
    setToken(data);
  }

  return (
    <AuthContext.Provider value={{ loggedIn, token, email, avatar }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
