import { Outlet } from "react-router-dom";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import CartSidebar from "./CartSidebar";
import { useState } from "react";

function AppLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <main>
        <Outlet />
      </main>
      <ToastContainer />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
}

export default AppLayout;
