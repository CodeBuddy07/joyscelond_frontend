

import { Toaster } from 'sonner'
import ContactForm from './Components/ContactFrom/contactFrom'
import Dashboard from './Components/DashBoard/Dashboard'
import Do from './Components/Do/Do'
import Footer from './Components/Footer/Footer'
import FAQ from './Components/FQA/Fqa'
import HeroSection from './Components/Hero/HeroSection'
import Navbar from './Components/Navbar/Navbar'
import TestimonialSection from './Components/TestimonialSection/TestimonialSection'

function App() {


  return (
       
 
<div className=' scroll-smooth' >
<Navbar />

<HeroSection />
<Dashboard/>  


<div>
 <Do />
  <FAQ />
  <TestimonialSection />
  <ContactForm/>  
  </div> 

  <div>
        <Footer />
  </div>

  <Toaster richColors position='top-center '/>

</div>


      


  )
}

export default App
