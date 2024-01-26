import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Events from "./components/Events/Events";
import EventDetails from "./components/Events/EventDetails";
import NewEvent from "./components/Events/NewEvent";
import EditEvent from "./components/Events/EditEvent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/events" />,
  },
  {
    path: "/events",
    element: <Events />,

    children: [
      {
        path: "/events/new",
        element: <NewEvent />,
      },
    ],
  },
  {
    path: "/events/:id",
    element: <EventDetails />,
    children: [
      {
        path: "/events/:id/edit",
        element: <EditEvent />,
      },
    ],
  },
]);

// żeby użyć react-query musimy stworzyć instancję QueryClienta
// QueryClient jest kontekstem, który musi być dostarczony do komponentów, które będą używały react-query
// QueryClientProvider jest odpowiedzialny za dostarczenie kontekstu
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
