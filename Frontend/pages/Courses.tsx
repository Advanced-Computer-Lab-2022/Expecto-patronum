import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";
import CourseCard from "../components/CourseCard/CourseCard";
import FilterBar from "../components/filter/FilterBar";
import Hero from "../components/hero/Hero";
import FilterTag from "../components/shared/filterTag/FilterTag";
import Pagination from "../components/shared/pagination/Pagination";
import DataContext from "../context/DataContext";
import { GetServerSideProps } from "next";
import { BaseUrl } from "../constants/constants";
import { CardData } from "../DataFestek";

const Courses: NextPage = (props) => {
  const { Filter, SetFilter } = useContext(DataContext);

  console.log(props);
  return (
    <div className="flex  justify-between mt-20 mx-10">
      <FilterBar></FilterBar>

      <div className="w-4/5">
        <h1 className="text-2xl font-medium mb-3">10559 results for Node</h1>
        <div className="flex mb-8 gap-3">
          {Filter.Subject.map((item, dex) => {
            return (
              <FilterTag
                key={item}
                tag={item}
                Setter={(Data: string) => {
                  SetFilter((prev) => {
                    let Array = prev.Subject.filter((item) => {
                      return item !== Data;
                    });
                    return { ...prev, Subject: Array };
                  });
                }}
              ></FilterTag>
            );
          })}
          {Filter.Rating.map((item, index) => {
            return (
              <FilterTag
                key={item}
                tag={item}
                Setter={(Data: string) => {
                  SetFilter((prev) => {
                    let Array = prev.Rating.filter((item) => {
                      return item !== Data;
                    });
                    return { ...prev, Rating: Array };
                  });
                }}
              ></FilterTag>
            );
          })}
          {Filter.Price.map((item, index) => {
            return (
              <FilterTag
                key={item}
                tag={item}
                Setter={(Data: string) => {
                  SetFilter((prev) => {
                    let Array = prev.Price.filter((item) => {
                      return item !== Data;
                    });
                    return { ...prev, Price: Array };
                  });
                }}
              ></FilterTag>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-10 gap-y-14 ">
          {CardData.map((item, index) => {
            return <CourseCard rate={1.5} CardData={item}></CourseCard>;
          })}
        </div>
        <Pagination></Pagination>
      </div>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps<{ data: [] }> = async ({
//   resolvedUrl,
//   query,
// }) => {
//   let URL = BaseUrl + resolvedUrl;

//   const res = await fetch(URL);
//   const data: [] = await res.json();

//   return {
//     props: {
//       data,
//     },
//   };
// };

export default Courses;
