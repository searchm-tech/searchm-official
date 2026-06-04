import Header from './components/Header';
import Hero from './components/Hero';
import Slogan from './components/Slogan';
import Company from './components/Company';
import Portfolio from './components/Portfolio';
import Clients from './components/Clients';
import Service from './components/Service';
import News from './components/News';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingBanners from './components/FloatingBanners';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Slogan />
        <Company />
        <Portfolio />
        <Clients />
        <Service />
        <News />
        <Contact />
      </main>
      <Footer />
      <FloatingBanners />
    </div>
  );
}

