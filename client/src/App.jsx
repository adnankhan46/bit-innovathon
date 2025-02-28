import {BrowserRouter, Routes, Route} from "react-router";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/home" element={<Home/>} />




      <Route path="*" element={<h1 className="text-red-600">Wrong Route</h1>} />
    </Routes>
  </BrowserRouter>
      
        
    </>
  )
}

export default App
