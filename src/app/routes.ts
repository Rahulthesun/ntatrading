import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Programs } from "./pages/Programs";
import About  from "./pages/about";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/programs",
    Component: Programs,
  },
  {
    path: "/about",
    Component: About,
  },
]);
