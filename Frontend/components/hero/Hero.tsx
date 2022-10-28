import Image from "next/image";
import React from "react";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div>
      <div>
        <h1>Learn a New Skill Everyday, Anytime, and Anywhere.</h1>
        <p>
          1000+ Courses covering all tech domains for you to learn and explore
          new opportunities. Learn from Industry Experts and land your Dream
          Job.
        </p>
        <div>
          <button className="Btn Btn_main">Start Trial</button>
          <button className="Btn Btn_side">How it Works</button>
        </div>
        <div>
          <div>
            <p>1000+</p>
            <p>Courses to </p>
            <p>Thoose from</p>
          </div>
          <div>
            <p>5000+</p>
            <p>Students</p>
            <p>Trained</p>
          </div>
          <div>
            <p>200+</p>
            <p>Professional</p>
            <p>Trainers</p>
          </div>
        </div>
      </div>
      <div>
        <Image
          src="/images/HeroImage1.png"
          width={45}
          height={59}
          alt={"CGP"}
          objectFit="contain"
          layout="responsive"
          priority
        />
        <div>
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
        <div>
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
        <div>
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
        <div>
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
