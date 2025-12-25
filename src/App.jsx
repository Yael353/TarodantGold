import "./App.css";
import Body from "./components/layout/body/Body";
import HeroSection from "./components/layout/hero/HeroSection";
import Navbar from "./components/layout/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Body />
    </>
  );
}

export default App;
