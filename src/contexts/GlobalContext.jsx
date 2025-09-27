import { createContext, useState } from "react";

export const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <GlobalContext.Provider value={{ isCartOpen, setIsCartOpen }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
