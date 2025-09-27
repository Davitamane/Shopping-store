import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import Checkout from "./pages/Checkout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthProvider from "./contexts/AuthContext";
import Registering from "./pages/Login/Registering";
import LoggingIn from "./pages/Login/LoggingIn";
import CartSidebar from "./UI/CartSidebar";
import GlobalProvider from "./contexts/GlobalContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <AuthProvider>
          <GlobalProvider>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate replace to="products" />} />

                <Route path="products" element={<Products />} />
                <Route path="products/:id" element={<ProductPage />} />
                <Route path="login" element={<LoggingIn />} />
                <Route path="register" element={<Registering />} />
                <Route path="checkout" element={<Checkout />} />
              </Route>
            </Routes>
            <CartSidebar />
          </GlobalProvider>
        </AuthProvider>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
