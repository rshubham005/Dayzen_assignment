import "./App.css";
import Notes from "./Components/Home/Notes";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/roboto";
import NewNote from "./Components/NewNote/NewNote";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Note from "./Components/Note/Note";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Notes />,
    },
    {
      path: "/addnote",
      element: <NewNote />,
    },
    {
      path: "/note/:id",
      element: <Note />,
    },
  ]);

  return (
    <Provider store={store}>
      <div className="m-0">
        {/* <Notes /> */}
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
