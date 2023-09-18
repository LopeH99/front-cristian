import * as ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./index.css";
import { LoginProvider } from "./context/loginContext";
import App from "./app";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoginProvider>
      <App />
  </LoginProvider>
);