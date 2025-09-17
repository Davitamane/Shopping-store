import { Outlet } from "react-router-dom";
import Header from "./Header";
import { ToastContainer } from "react-toastify";

function AppLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <ToastContainer />
    </>
  );
}

export default AppLayout;
