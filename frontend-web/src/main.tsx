import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import NotFoundPage from "./pages/Not Found/NotFound.tsx";
import HomeFeed from "./pages/Home/Home Components/Home Feed/HomeFeed.tsx";
import App from "./App.tsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "home",
    element: <Home />,
    children: [{ path: "course/:courseId", element: <HomeFeed /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={Router} />
  </Provider>
);
