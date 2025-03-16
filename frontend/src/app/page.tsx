import CallToAction from "@/sections/CallToAction";
import Testimonials from "@/sections/Testimonials";
import Features from "@/sections/Features";
import Footer from "@/sections/Footer";
import Header from "@/sections/Header";
import Hero from "@/sections/Hero";
import Pricing from "@/sections/Pricing";


export default function Home() {
  return (
    <>
        <Header />
        <Hero />
        
        <Features />
        <Pricing />
       <Testimonials /> 
        <CallToAction />
        <Footer />
    </>
  );
}
