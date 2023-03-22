import React from "react";
import Marquee from "react-fast-marquee";

const TextSlide = () => {
  return (
    <>
      <div>
        <Marquee
          play={true}
          speed={100}
          gradient={false}
          direction="left"
          className="marquee"
        >
          <h1>Register</h1>
          <h1>Search</h1>
          <h1>Apply</h1>
          <h1>Interview</h1>
          <h1>Work</h1>
          <h1>Browser</h1>
          <h1>Earn</h1>
          <h1></h1>
        </Marquee>
      </div>
    </>
  );
};

export default TextSlide;
