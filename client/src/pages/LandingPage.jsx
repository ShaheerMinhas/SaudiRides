import Header from '../components/Header'
import Hero from '../components/Hero'
import Cars from '../components/Cars'
import AboutUs from '../components/AboutUs'
import Offers from '../components/Offers'
import Routes from '../components/Routes'
import Ziyarat from '../components/Ziyarat'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Cars />
        <AboutUs />
        <Offers />
        <Routes />
        <Ziyarat />
      </main>
      <Footer />
    </>
  )
}
