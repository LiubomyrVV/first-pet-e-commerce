import { createBrowserRouter } from "react-router-dom"
import Home from "../screens/HomeScreen/HomeScreen"
import { ROUTES } from "./routes";
import Profile from "../screens/ProfileScreen/Profile";
import Auth from "../components/Auth/Auth";
import App from "../App";





const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.HELP,
    element: <Home />,
  },
  {
    path: ROUTES.TERMS,
    element: <Home />,
  },
  {
    path: ROUTES.CATEGORY,
    element: <Home />,
    children: [
      {
        path: ROUTES.PRODUCT,
        element: <Home />,
      },
    ]
  },
  {
    path: ROUTES.PROFILE,
    element: <Profile />,
    children: [
      {
        path: ROUTES.FAVORITES,
        element: <Profile />,
      },
      {
        path: ROUTES.CART,
        element: <Profile />,
      },
    ]
  },


]);

export default router;


