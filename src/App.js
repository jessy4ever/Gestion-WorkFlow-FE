import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import HomePage from "./HomePage";
import Register from "./register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
