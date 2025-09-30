import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
// import WhyChoose from "./WhyChoose";
import WhyChoose from './whyChoose.jsx'
import OurFeatures from "./OurFeatures";
import GetInTouch from "./GetinTouch";
import ChatBot from "./chatBot";

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
