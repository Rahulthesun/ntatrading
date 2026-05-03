import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Programs } from "./pages/Programs";
import About  from "./pages/about";
import Articles from "./pages/Articles";
import RiskDisclosure from "./pages/Risk";
import FounderPage from "./pages/Founder";
import GalleryPage from "./pages/Gallery";
import TestimonialsPage from "./pages/Testimonials";

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
  {
    path: "/founder",
    Component: FounderPage,
  },
  {
    path: "/gallery",
    Component: GalleryPage,
  },
  {
    path: "/articles",
    Component: Articles,
  },
  {
    path: "/testimonials",
    Component: TestimonialsPage,
  },
  {
    path: "/risk",
    Component: RiskDisclosure,
  }
]);
