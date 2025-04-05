import React, { useEffect, useState } from "react";
import "./SplashScreen.css"; // Import CSS file for styling

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(); // Hide the splash screen after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup function
  }, [onComplete]);

  return (
    <div className="splash-screen">
      <div className="splash-text text-5xl"><span className="text-4xl text-orange-600">i</span>Task</div>
    </div>
  );
};

export default SplashScreen;
