import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyPosts from "./pages/MyPosts";
import {Home} from "./pages/HomeFeed";

const AppRoutes = [
    {
        index: true,
        element: <Home/>
    },
    {
        path: '/login',
        element: <LoginPage/>
    },
    {
        path: '/register',
        element: <RegisterPage/>
    },
    {
        path: '/my-posts',
        element: <MyPosts/>
    },
];

export default AppRoutes;
