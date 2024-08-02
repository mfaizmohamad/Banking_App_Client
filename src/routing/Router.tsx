import Login from "../auth/Login";
import Home from "../pages/Home";

let routing = [
    {
        path: "/",
        element: <Login/>,
    },
    {
        path: "/home",
        element: <Home/>,
    }
];

export default routing;