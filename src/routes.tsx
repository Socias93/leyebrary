import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import {
  AllItemsPage,
  HomePage,
  NewItemPage,
  CreateCategoryPage,
  CreateItemPage,
  AllCategoriesPage,
} from "./pages/index";

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
        path: "all/items",
        element: <AllItemsPage />,
      },
      {
        path: "all/categories",
        element: <AllCategoriesPage />,
      },
      {
        path: "new-item",
        element: <NewItemPage />,
      },

      { path: "edit-item/:id", element: <CreateItemPage /> },
      { path: "new-item/:id", element: <CreateItemPage /> },

      { path: "new-category", element: <CreateCategoryPage /> },
    ],
  },
]);

export default router;
