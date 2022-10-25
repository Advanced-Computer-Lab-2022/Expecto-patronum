import Image from "next/image";
import React from "react";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="SectionHome">
      <div className="TextContainer">
        <h1>Learn a New Skill Everyday, Anytime, and Anywhere.</h1>
        <p>
          1000+ Courses covering all tech domains for you to learn and explore
          new oppurtunities. Learn from Industry Experts and land your Dream
          Job.
        </p>
        <div className="BtnContainer">
          <button className="Btn Btn_main">Start Trial</button>
          <button className="Btn Btn_side">How it Works</button>
        </div>
        <div className="TextInfoContainer">
          <div className="TextInfo">
            <p>1000+</p>
            <p>Courses to </p>
            <p>Thoose from</p>
          </div>
          <div className="TextInfo">
            <p>5000+</p>
            <p>Students</p>
            <p>Trained</p>
          </div>
          <div className="TextInfo">
            <p>200+</p>
            <p>Professional</p>
            <p>Trainers</p>
          </div>
        </div>
      </div>
      <div className="HeroImage">
        <Image
          src="/images/HeroImage1.png"
          width={45}
          height={59}
          alt={"CGP"}
          objectFit="contain"
          layout="responsive"
          priority
        />
        <div className={"RocketImage"}>
          <Image
            src="/images/Rocket3.png"
            width={45}
            height={45}
            alt={"CGP"}
            objectFit="contain"
            layout="responsive"
            priority
          />
        </div>
        <div className="TrophyImage">
          <Image
            src="/images/Trophy.png"
            width={45}
            height={45}
            alt={"CGP"}
            objectFit="contain"
            layout="responsive"
            priority
          />
        </div>
        <div className="EllipseLeft">
          <Image
            src="/images/Ellipse2.png"
            width={45}
            height={45}
            alt={"CGP"}
            objectFit="contain"
            layout="responsive"
            priority
          />
        </div>
        <div className="EllipseRight">
          <Image
            src="/images/Ellipse3.png"
            width={45}
            height={45}
            alt={"CGP"}
            objectFit="contain"
            layout="responsive"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
