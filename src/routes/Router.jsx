import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomeLayout from "../layouts/HomeLayout";
import AllMovies from "../pages/AllMovies";
import MovieDetails from "../pages/MovieDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import MyCollection from "../pages/MyCollection";
import AddMovie from "../pages/AddMovie";
import UpdateMovie from "../pages/UpdateMovie";
import WatchList from "../pages/WatchList"; // create this page
import Recent from "../components/Recent";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import SimpleLayout from "../layouts/SimpleLayout";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomeLayout /> },
      { path: "/all-movies", element: <AllMovies /> },

      // Protected routes
      {
        path: "/my-collection",
        element: (
          <PrivateRoute>
            <MyCollection />
          </PrivateRoute>
        ),
      },
      {
        path: "/movies/add",
        element: (
          <PrivateRoute>
            <AddMovie />
          </PrivateRoute>
        ),
      },
      {
        path: "/movies/update/:id",
        element: (
          <PrivateRoute>
            <UpdateMovie />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-watchlist",
        element: (
          <PrivateRoute>
            <WatchList />
          </PrivateRoute>
        ),
      },

      // Public route with param
      {
        path: "/movie-details/:id",
        element: <MovieDetails />,
      },

      {
        path: "/recently-added",
        element: <Recent />,
      },

      // Auth routes
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },

      {
        path: "*",
        element: <SimpleLayout />,
        children: [{ path: "*", element: <NotFound /> }],
      },
    ],
  },
]);

export default Router;
