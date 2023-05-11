import { RouterProvider } from "react-router-dom";
import router from "./router";

import store from "./store";
import { Provider } from "react-redux";

// import "./App.css";

function App() {
  return (
    <div className="App max-w-[90%] mx-auto">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
