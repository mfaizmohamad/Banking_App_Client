import ContextProvider from "./context_provider/ContextProvider"
import { RouterProvider, createHashRouter } from "react-router-dom";
import routing from "./routing/Router";
import "aos/dist/aos.css";
import React from "react";
import Aos from "aos";


const router = createHashRouter(routing);

function App() {
  React.useEffect(() => {
    Aos.init({
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      offset: 100,
    });
    Aos.refresh();
  }, []);

  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  )
}

export default App
