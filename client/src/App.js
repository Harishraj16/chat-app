import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home/index.js"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import {Toaster} from "react-hot-toast"

function App() {
  return (
    <>
    <Toaster position="top-center" reverseOrder={false}/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
