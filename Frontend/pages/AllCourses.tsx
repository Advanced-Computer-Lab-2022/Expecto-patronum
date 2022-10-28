import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import CourseCard from "../components/CourseCard/CourseCard";
import Filter from "../components/filter/FilterType";
import Hero from "../components/hero/Hero";
import FilterTag from "../components/shared/filterTag/FilterTag";

const AllCourses: NextPage = () => {
  return (
    <div className="flex  justify-between mt-20 mx-10">
      <div className="w-4/5">
        <h1 className="text-2xl font-medium mb-3">10559 results for Node</h1>
        <div className="flex mb-8">
          <FilterTag></FilterTag>
        </div>

        <div className="flex flex-wrap gap-10 gap-y-14 ">
          <CourseCard></CourseCard>
          <CourseCard></CourseCard>
          <CourseCard></CourseCard>
          <CourseCard></CourseCard>
          <CourseCard></CourseCard>
          <CourseCard></CourseCard>
          <CourseCard></CourseCard>
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
