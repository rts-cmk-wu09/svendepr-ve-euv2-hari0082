import React from "react";

const Welcome = () => {
  return (
    <>
      <img
        src="src/assets/welcome-background.jpg"
        alt="background"
        className="object-cover h-screen absolute"
      />
      <div className="h-screen absolute">
        <h1 className="text-[56px] text-left font-bold mt-60 px-8 text-yellow-400">
          Believe Yourself
        </h1>{" "}
        <p className="text-xl font-bold px-8 text-white">- Train like a pro</p>
        <img
          src="src/assets/welcome-center.jpg"
          alt="background"
          className="mt-12 h-1/3"
        />
        <a
          href="/home"
          className="bg-yellow-300 w-[176px] h-[50px] rounded-full absolute bottom-16 left-[6.5rem] flex justify-center items-center font-semibold tracking-wider text-sm"
        >
          START TRAINING
        </a>
      </div>
    </>
  );
};

export default Welcome;
