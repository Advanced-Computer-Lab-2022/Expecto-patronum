import Image from "next/image";
import React from "react";
import styles from "./Hero.module.scss";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className={`${styles.SectionHome} `}>
      <div className={styles.TextContainer}>
        <h1>Learn a New Skill Everyday, Anytime, and Anywhere.</h1>
        <p>
          1000+ Courses covering all tech domains for you to learn and explore
          new oppurtunities. Learn from Industry Experts and land your Dream
          Job.
        </p>
        <div className={styles.BtnContainer}>
          <button className="Btn Btn_main">Start Trial</button>
          <button className="Btn Btn_side">How it Works</button>
        </div>
        <div className={styles.TextInfoContainer}>
          <div className={styles.TextInfo}>
            <p>1000+</p>
            <p>Courses to </p>
            <p>Thoose from</p>
          </div>
          <div className={styles.TextInfo}>
            <p>5000+</p>
            <p>Students</p>
            <p>Trained</p>
          </div>
          <div className={styles.TextInfo}>
            <p>200+</p>
            <p>Professional</p>
            <p>Trainers</p>
          </div>
        </div>
      </div>
      <div className={styles.HeroImage}>
        <Image
          src="/images/HeroImage1.png"
          width={45}
          height={59}
          alt={"CGP"}
          objectFit="contain"
          layout="responsive"
          priority
        />
        <div className={styles.RocketImage}>
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
        <div className={styles.TrophyImage}>
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
        <div className={styles.EllipseLeft}>
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
        <div className={styles.EllipseRight}>
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
