import { createHashRouter, RouterProvider } from "react-router-dom";
import AuthLayer from "./Shared/AuthLayer/AuthLayer.jsx";
import Login from "./Auth/Login/Login.jsx";
import Register from "./Auth/Register/Register.jsx";
import Verfiy from "./Auth/Verfiy/Verfiy.jsx";
import Reset from "./Auth/Reset/Reset.jsx";
import Forget from "./Auth/Forget/Forget.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import MasterLayer from "./Shared/MasterLayer/MasterLayer.jsx";
import NotFound from "./Shared/NotFound/NotFound.jsx";
import ReciepeData from "./Recipes/RecipeData/RecipeData.jsx";
import CategoriesList from "./Categories/CategoriesList/CategoriesList.jsx";
import UsersList from "./Users/UserList/UsersList.jsx";
import { ToastContainer } from "react-toastify";

import ProtectedRoute from "./Shared/ProtectedRoute/ProtectedRoute.jsx";
import RecipesList from "./Recipes/RecipesList/RecipesList.jsx";
import AuthProvider from "./Contexts/AuthContext.jsx";
import FavoriteList from "./FavoriteList/FavoriteList.jsx";

function App() {
  const routes = createHashRouter([
    {
      path: "",
      element: <AuthLayer />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "verfiy",
          element: <Verfiy />,
        },
        {
          path: "reset",
          element: <Reset />,
        },
        {
          path: "forget",
          element: <Forget />,
        },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayer />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,

      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "recipes",
          element: <RecipesList />,
        },
        {
          path: "recipes/new",
          element: <ReciepeData />,
        },
        {
          path: "recipes/:id/edit",
          element: <ReciepeData />,
        },
        {
          path: "categories",
          element: <CategoriesList />,
        },
        {
          path: "favorites",
          element: <FavoriteList />,
        },
        {
          path: "users",
          element: <UsersList />,
        },
      ],
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={routes} />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
