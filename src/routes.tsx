import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import {
  AllItemsPage,
  HomePage,
  CreateCategoryPage,
  CreateItemPage,
  AllCategoriesPage,
  NotFound,
} from "./pages/index";

const router = createBrowserRouter([
  { path: "*", element: <NotFound /> },
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
        path: "all/items",
        element: <AllItemsPage />,
      },
      {
        path: "all/categories",
        element: <AllCategoriesPage />,
      },

      { path: "edit-item/:id", element: <CreateItemPage /> },
      { path: "new-item/:id", element: <CreateItemPage /> },

      { path: "new-category", element: <CreateCategoryPage /> },
    ],
  },
]);

export default router;
