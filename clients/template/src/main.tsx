import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "ui/src/styles/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router";
import { App } from "./App.tsx";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

/**
 * react-query client for the app. Used to interact with the cache
 * @see https://tanstack.com/query/latest/docs/reference/QueryClient
 */
const queryClient = new QueryClient();

/**
 * react-router router for all the app
 * @see https://reactrouter.com/start/data/installation
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
