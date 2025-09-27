import { Outlet } from "react-router-dom";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import CartSidebar from "./CartSidebar";

function AppLayout() {

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main>
          <Outlet/>
        </main>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

      </div>
    </>
  );
}

export default AppLayout;
