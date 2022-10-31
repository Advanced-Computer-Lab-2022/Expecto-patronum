import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";
import CourseCard from "../components/CourseCard/CourseCard";
import FilterBar from "../components/filter/FilterBar";
import Hero from "../components/hero/Hero";
import FilterTag from "../components/shared/filterTag/FilterTag";
import DataContext from "../context/DataContext";
import { GetServerSideProps } from "next";
import { ApiUrl, BaseUrl } from "../constants/constants";
import { CardData } from "../DataFestek";
import Zew from "../components/shared/pagination/CompPagination";
import axios from "axios";

const Courses: NextPage<{ data: any }> = ({ data }) => {
  console.log(data);

  const { Filter, SetFilter } = useContext(DataContext);
  function SubjectSetter(Data: string) {
    if (Filter.Subject.includes(Data)) {
      SetFilter((prev) => {
        let Array = prev.Subject.filter((item) => {
          return item !== Data;
        });

        return { ...prev, Subject: Array, Page: 1 };
      });
    } else {
      SetFilter((prev) => {
        return { ...prev, Subject: [...prev.Subject, Data], Page: 1 };
      });
    }
  }
  function RatingSetter(Data: string) {
    if (Filter.Rating.includes(Data)) {
      SetFilter((prev) => {
        let Array = prev.Rating.filter((item) => {
          return item !== Data;
        });
        return { ...prev, Rating: Array, Page: 1 };
      });
    } else {
      SetFilter((prev) => {
        return { ...prev, Rating: [...prev.Rating, Data], Page: 1 };
      });
    }
  }
  function PriceSetter(Data: string) {
    if (Filter.Price.includes(Data)) {
      SetFilter((prev) => {
        let Array = prev.Price.filter((item) => {
          return item !== Data;
        });
        return { ...prev, Price: Array, Page: 1 };
      });
    } else {
      SetFilter((prev) => {
        return { ...prev, Price: [...prev.Price, Data], Page: 1 };
      });
    }
  }

  return (
    <div className="flex  justify-between mt-20 mx-10">
      <FilterBar
        SubjectSetter={SubjectSetter}
        RatingSetter={RatingSetter}
        PriceSetter={PriceSetter}
      ></FilterBar>

      <div className="w-4/5">
        <h1 className="text-2xl font-medium mb-3">10559 results for Node</h1>
        <div className="flex mb-8 gap-3">
          {Filter.Subject.map((item, dex) => {
            return (
              <FilterTag
                key={item}
                tag={item}
                Setter={(Data: string) => {
                  SubjectSetter(Data);
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
                  RatingSetter(Data);
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
                  PriceSetter(Data);
                }}
              ></FilterTag>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-10 gap-y-14 ">
          {CardData.map((item, index) => {
            return (
              <CourseCard key={index} rate={1.5} CardData={item}></CourseCard>
            );
          })}
        </div>

        <Zew></Zew>
      </div>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps<{ data: [] }> = async ({
//   resolvedUrl,
//   query,
// }) => {
//   let data: [] = [];

//   let URL = ApiUrl + resolvedUrl;
//   console.log("====================================");
//   console.log("hi");
//   console.log("====================================");
//   axios.get(URL).then((res: any) => {
//     data = res.data;

//     console.log("====================================");
//     console.log(data);
//     console.log("====================================");
//   });

//   return {
//     props: {
//       data,
//     },
//   };
// };

export async function getServerSideProps(UrlInfo: { resolvedUrl: string }) {
  let res = await fetch(ApiUrl + UrlInfo.resolvedUrl);
  let CoursesData = await res.json();
  return {
    props: {
      data: CoursesData,
    },
  };
}

export default Courses;
