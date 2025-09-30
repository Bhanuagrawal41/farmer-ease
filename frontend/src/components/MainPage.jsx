import React from "react";
// import Header from "./Header";
import Header from "./Header.jsx";
// import HeroSection from "./HeroSection";
import HeroSection from "./HeroSection.jsx";
// import WhyChoose from "./WhyChoose";
import WhyChoose from './whyChoose.jsx'
import OurFeatures from "./OurFeatures.jsx";
import GetInTouch from "./GetinTouch.jsx";
// import ChatBot from "./chatBot";
import ChatBot from './ChatBot.jsx';

function MainPage() {
  return (
    <>
    <span  id = "home">
      {/* ✅ Reusable Header */}
      <Header />

      {/* ✅ Main Content */}
      
        <HeroSection />
        <WhyChoose />
        <OurFeatures />
      <GetInTouch/>
      <ChatBot/>
      </span>
    </>
  );
}

export default MainPage;
