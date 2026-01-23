import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout.jsx/HomeLayout";
import Error from "../components/Error";
import Home from "../Pages/Home";
import AllProducts from "../Pages/AllProducts";
import AuthLayout from "../Layout.jsx/AuthLayout";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import Cart from "../Pages/Cart";
import MyOrder from "../Pages/MyOrder";
import ProductCategory from "../Pages/ProductCategory";
import ProductDetails from "../Pages/ProductDetails";
import Address from "../components/Address";
import SellerLayout from "../seller/SellerLayout";
import AddProduct from "../seller/AddProduct";
import Order from "../seller/Order";
import ProductList from "../seller/ProductList";
import AdminRoute from "./AdminRoute";
import PrivateRoutes from "./PrivateRoutes";
import MyProfile from "../seller/MyProfile";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/all-products",
        element: <AllProducts />,
      },

      {
        path: "/cart",
        element:<PrivateRoutes><Cart /></PrivateRoutes> ,
      },
      {
        path: "/my-order",
        element:<PrivateRoutes><MyOrder /></PrivateRoutes>,
      },

      {
        path: "/products-category/:category",
        element: <ProductCategory />,
      },
      {
        path: "products-details/:id",
        element: <ProductDetails />,
      },

      {
        path: "/address",
        element: <Address />,
      },

{
  path:'/profile',
  element:  <PrivateRoutes><MyProfile/></PrivateRoutes>,
}

    ]
  },

  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/login',
        element: <Login />,
      },
      {
        path: '/auth/register',
        element: <Register />,
      }
    ]
  }
  ,
  {
    path: "/seller",
    element: <AdminRoute><SellerLayout /></AdminRoute>,
    children: [
      {
        path: '/seller/add-product',
        element: <AddProduct />,
      },
      {
        path: '/seller/orders',
        element: <Order />,
      },

      {
        path: '/seller/products',
        element: <ProductList />,
      }

    ]
  }





]);