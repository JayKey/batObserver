"use client";

import React from "react";
import HomeForm from "./components/HomeForm";

const Home: React.FC = () => {
  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded p-6 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Zgłoś Obserwację Nietoperzy
          </h1>
          <HomeForm />
        </div>
      </div>
  );
};

export default Home;
