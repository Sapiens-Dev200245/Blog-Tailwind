import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Sign from "./components/Siglepost";
import WritePost from "./pages/WritePost";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Setting from "./pages/Setting";
export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Sign />} />
        <Route path="/write" element={<WritePost />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  );
}
