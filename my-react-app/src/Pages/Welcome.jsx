import React from "react";

const Welcome = () => {
  return (
    <>
      <div className="h-screen">
        <h1>Believe Yourself</h1>
        <p>Train like a pro</p>
        <a
          href="/home"
          className="bg-yellow-300 p-6 rounded-full absolute bottom-6 left-6 right-6"
        >
          Start Training
        </a>
      </div>
    </>
  );
};

export default Welcome;
