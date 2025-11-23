import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Expertise from "./components/Expertise";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import Form from "./components/Form";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import PopupForm from "./components/PopupForm";
import FloatingButtons from "./components/FloatingButtons";

export default function Home() {
  return (
    <main className="min-h-screen">
      <SmoothScroll />
      <Header />
      <Hero />
      <Services />
      <Expertise />
      <Gallery />
      <Testimonials />
      <About />
      <Form />
      <Footer />
      <PopupForm />
      <FloatingButtons />
    </main>
  );
}
