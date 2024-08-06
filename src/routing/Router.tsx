import Login from "../auth/Login";
import Home from "../pages/Home";
import OnlineBanking from "../pages/OnlineBanking";

let routing = [
    {
        path: "/",
        element: <Login/>,
    },
    {
        path: "/home",
        element: <Home/>,
    },
    {
        path: "/online_banking",
        element: <OnlineBanking/>,
    }
];

export default routing;