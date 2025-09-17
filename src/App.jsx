import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="products" />} />

          <Route path="products" element={<Products />} />
          <Route path="products/01" element={<ProductPage />} />
          <Route path="login" element={<Login />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
