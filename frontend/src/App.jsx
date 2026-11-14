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
    <div className="min-h-screen w-full">
      <Routes>
        {/* 🛑 CRITICAL FIX: Change the root path ("/") to load the Dashboard immediately. */}
        <Route path="/" element={<MainPage />} />
        {/* We keep the AuthPage route just in case, but it's no longer the entry point. */}
        <Route path="/login" element={<AuthPage />} />
        {/* Add your other routes here */}
      </Routes>

      {/* FLOATING CHAT BUTTON: Renders over all content */}
      {isAuthenticated && <FloatingChatButton />}
    </div>
  );
}

export default App;
