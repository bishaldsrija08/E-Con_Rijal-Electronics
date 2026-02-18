import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Home/>
    },
    {
        path: "/about",
        element: <div>About</div>
    },
    {
        path: "/login",
        element: <Login/>
    },
   { path: "/register",
    element: <Register/>
}]
)