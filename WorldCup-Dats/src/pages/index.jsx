import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

import { Home } from './Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

export const Router = () => (
  <RouterProvider router={ router } />
)