import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import {
  AllItemsPage,
  HomePage,
  CreateCategoryPage,
  CreateItemPage,
  AllCategoriesPage,
  NotFound,
  AllTypesPage,
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
      {
        path: "all/types",
        element: <AllTypesPage />,
      },

      { path: "edit-item/:id", element: <CreateItemPage /> },
      { path: "new-item/:id", element: <CreateItemPage /> },

      { path: "new-category", element: <CreateCategoryPage /> },
    ],
  },
]);

export default router;
