import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Programs } from "./pages/Programs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/programs",
    Component: Programs,
  },
]);
