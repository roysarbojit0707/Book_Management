import React, { useEffect, useRef } from "react";
import { Pic } from "../index";
import Typed from "typed.js";

function Home() {
  const typedMsg = useRef(null);
  useEffect(() => {
    const type = new Typed(typedMsg.current, {
      strings: [
        "More than 1000 Books",
        "Reach out to the Seller",
        "Get Suggestion from AI",
        "Viewing nearest Library using Maps",
      ],
      typeSpeed: 75,
      loop: true,
    });
    return () => {
      type.destroy();
    };
  }, []);
  return (
    <div className="hero w-full min-h-screen bg-violet-100 dark:bg-gray-900 transition-colors duration-300">
      <section
        className="firstSection flex justify-around p-0 m-0 items-center my-[130px] text-black dark:text-white"
        style={{ margin: "auto" }}
      >
        <div className="leftSection w-[30%] text-3xl my-8">
          <div>Welcome to the Library</div>
          <div>Here you can find:-</div>
          <span
            id="element"
            className="text-[#aa6be4] dark:text-violet-400"
            ref={typedMsg}
          ></span>
        </div>
        <div className="rightSection w-[30%]">
          <img src={Pic} className="w-full my-[50px]" alt="Library" />
        </div>
      </section>
    </div>
  );
}

export default Home;
