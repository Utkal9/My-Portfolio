import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <Router>
            <div className="bg-darkBg text-white selection:bg-neoPrimary selection:text-white">
                <ToastContainer theme="dark" position="bottom-right" />
                <Routes>
                    <Route path="/" element={<Hero />} />
                    <Route path="/login" element={<Login />} />
                    {/* We will add Dashboard later */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
