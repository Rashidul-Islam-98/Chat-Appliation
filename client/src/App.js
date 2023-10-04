import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss";
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
          <Route path ="/" element = {user ? <Home /> : <Login />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;