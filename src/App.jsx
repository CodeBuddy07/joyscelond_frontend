
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import { Toaster } from 'sonner'
import ResetPassword from './Page/ResetPassword/ResetPassword'
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {


  return (
    <Router>
      <Routes>
        <Route path="/reset-password/:token" element={< ResetPassword />} />
        
        <Route path="/" element={
          <div className=' scroll-smooth ' >

            <Navbar />

          </div>}

        />
      </Routes>
      <Toaster position="top-right" richColors />
    </Router>

  )
}

export default App
