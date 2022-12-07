import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import WebsitePortal from "./components/WebsitePortal";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Home" element={<WebsitePortal />}>
          {/* <Route path="/update" element={<Update/>}> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
