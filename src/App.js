import "./css/App.css";
import Homepage from "./Homepage";
import Authentication from "./Authentication";
import NewRequest from "./NewRequest";
import Purchase from "./Purchase";
import NotFound from "./NotFound";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";

const App = () => {
  const token = localStorage.getItem("token");
  let user;

  axios.defaults.baseURL = "http://192.168.0.101:8000/";
  // axios.defaults.baseURL = "http://localhost:8000/";
  axios.defaults.headers.common["Token"] = token;

  if (!token) {
    return <Authentication />;
  } else {
    //token decode
    // const token = localStorage.setItem("token", );

    user = {
      id: 4,
      username: "migalvao",
      name: "Miguel Galvão",
    };
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Homepage user={user} token={token} />}
          ></Route>
          <Route
            path="/purchase/new"
            element={
              <NewRequest user={user} token={token} />
            }
          ></Route>
          <Route
            path="/purchase/:purchaseId"
            element={<Purchase user={user} token={token} />}
          ></Route>
          <Route
            path="/auth"
            element={
              token ? (
                <Navigate to="/" />
              ) : (
                <Authentication />
              )
            }
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
