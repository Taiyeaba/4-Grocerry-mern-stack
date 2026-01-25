

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Router/Routes.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import CartProvider from "./Context/CartContext.jsx";
import { Toaster } from "react-hot-toast";
import { ProductProvider } from "./Context/ProductContext.jsx";
import { AddressProvider } from "./Context/AddressContext.jsx";
import { OrderProvider } from "./Context/OrderContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ProductProvider>
        <AddressProvider>
          <OrderProvider>
            <CartProvider>
              <RouterProvider router={router} />
              <Toaster position="top-right" />
            </CartProvider>
          </OrderProvider>
        </AddressProvider>
      </ProductProvider>
    </AuthProvider>
  </StrictMode>
);

