// import React from 'react';
// import { Routes, Route } from 'react-router-dom'; 
// import AuthPage from './components/AuthPage.jsx'; // Your login page
// import MainPage from './components/MainPage.jsx'; // Your dashboard or home page
// import FloatingChatButton from './components/FloatingChatButton.jsx'; // <-- The new component

// function App() {
//   const isAuthenticated = true; // HACKATHON BYPASS: Always show chat button

//   return (
//     <> 
//       {/* Routes uses the BrowserRouter from main.jsx */}
//       <Routes>
//         <Route path="/" element={<AuthPage />} /> 
//         <Route path="/home" element={<MainPage />} />
//         {/* Add your other routes here */}
//       </Routes>
      
//       {/* FLOATING CHAT BUTTON: Renders over all content */}
//       {isAuthenticated && <FloatingChatButton />} 
//     </>
//   );
// }

// export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import AuthPage from './components/AuthPage.jsx';
import MainPage from './components/MainPage.jsx'; // Your dashboard or home page
import FloatingChatButton from './components/FloatingChatButton.jsx'; 
import SoilDiagnosisForm from './components/SoilDiagnosisForm.jsx';

function App() {
  // This bypass is critical to show the main app
  const isAuthenticated = true; 

  return (
    <> 
      <Routes>
        {/* 🛑 CRITICAL FIX: Change the root path ("/") to load the Dashboard immediately. */}
        <Route path="/" element={<MainPage />} /> 
        
        {/* We keep the AuthPage route just in case, but it's no longer the entry point. */}
        <Route path="/login" element={<AuthPage />} /> 
        
        {/* Add your other routes here */}
      </Routes>
      
      {/* FLOATING CHAT BUTTON: Renders over all content */}
      {isAuthenticated && <FloatingChatButton />} 
    </>
  );
}

export default App;