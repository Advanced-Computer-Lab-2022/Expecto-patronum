import Image from "next/image";
import React from "react";
import { MdOndemandVideo } from "react-icons/md";
import { GrAchievement, GrFormClock } from "react-icons/gr";
type Props = {};

const CourseContentInstructor = (props: Props) => {
  return (
    <div className="my-40">
      <h1 className="text-4xl mb-10 font-semibold">Instructor</h1>
      <h1 className="text-2xl ml-5 mb-4">Mohamed Salem</h1>

      <div className="flex  gap-10 mb-5">
        <div className="rounded-full w-24  h-24 bg-red-200 ">
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
        <ul>
          <li className="flex items-center gap-2 mb-2 ">
            <MdOndemandVideo color="black" />
            <p>4.8 Rating</p>
          </li>

          <li className="flex items-center gap-2 mb-2">
            <GrFormClock />
            <p>123000 students</p>
          </li>
          <li className="flex items-center gap-2 mb-2">
            <GrAchievement />
            <p>40 Courses</p>
          </li>
        </ul>
      </div>
      <p className="w-1/2">
        Stephane is a solutions architect, consultant and software developer
        that has a particular interest in all things related to Big Data, Cloud
        & API. He's also a many-times best seller instructor on Udemy for his
        courses in AWS and Apache Kafka. [See FAQ below to see in which order
        you can take my courses] Stéphane is recognized as an AWS Hero and is an
        AWS Certified Solutions Architect Professional & AWS Certified DevOps
        Professional. He loves to teach people how to use the AWS properly, to
        get them ready for their AWS certifications, and most importantly for
        the real world. He also loves Apache Kafka. He sits on the 2019 Program
        Committee organizing the Kafka Summit in New York, London and San
        Francisco. He is also an active member of the Apache Kafka community,
        authoring blogs on Medium and a guest blog for Confluent.{" "}
      </p>
    </div>
  );
};

export default CourseContentInstructor;
