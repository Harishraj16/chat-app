import {BrowserRouter,Routes,Route, useSearchParams} from "react-router-dom"
import Home from "./pages/Home/index.js"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import {Toaster} from "react-hot-toast"
import { ProtectedRoute } from "./components/protectedRoute.js"
import Loader from "./components/loader.js"
import { useSelector } from "react-redux"

function App() {
  const {loader} = useSelector(state => state.loaderReducer);
  return (
    <>
    <Toaster position="top-center" reverseOrder={false}/>
    {loader && <Loader/>}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
