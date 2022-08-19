import { useEffect, useState } from "react";
import sky4 from "../src/img/sky4.jpg"
import sky3 from "../src/img/sky3.jpg";
import sky2 from "../src/img/sky2.jpg"
import MoonPhaseNow from "./Components/Pages/MoonPhaseNow";
import MoonCalendar from "./Components/Pages/MoonCalendar";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import { Routes, Route } from 'react-router-dom';
import { motion } from "framer-motion";

function App() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  function randomImg(){
    const img = [sky2, sky3, sky4];
    const random = Math.floor(Math.random() * img.length);
    return img[random];
  }
  return (
    <div className="App min-h-screen"  style={{backgroundImage: `url(${randomImg()})`, backgroundSize: "fit", backgroundPosition: 'center'}}>
      <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}>
      <Nav />
      <Routes>
          <Route path="/" element={<MoonPhaseNow width={width} />} />
          <Route path="/calendar" element={<MoonCalendar width={width} />} />
      </Routes>
      </motion.div>
      <Footer />
    </div>
    
  );
}

export default App;
