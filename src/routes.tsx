import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import {
  AllItemsPage,
  HomePage,
  NewCategoryPage,
  NewItemPage,
} from "./pages/index";
import CreateItemPage from "./pages/CreateItemPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "all",
        element: <AllItemsPage />,
      },
      {
        path: "new-item",
        element: <NewItemPage />,
      },
      {
        path: "new-category",
        element: <NewCategoryPage />,
      },
      { path: "new-item/:id", element: <CreateItemPage /> },
    ],
  },
]);

export default router;
