import { Toaster } from 'sonner'
import Navbar from './Components/Navbar/Navbar'
import ForgotPassword from './Page/ForgotPassword/ForgotPassword'
import ResetPassword from './Page/ResetPassword/ResetPassword'


function App() {


  return (
    <div className=' scroll-smooth ' >

      <Navbar />
      {/* <ResetPassword />
      <ForgotPassword /> */}
      <Toaster richColors position='top-center ' />

    </div>





  )
}

export default App
