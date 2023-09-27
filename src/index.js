import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Header from "./components/header";
import Root from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      //{
      //  path: "team",
      //  element: <Team />,
      //  loader: teamLoader,
      //},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Header />
    <RouterProvider router={router} />
  </>
);
