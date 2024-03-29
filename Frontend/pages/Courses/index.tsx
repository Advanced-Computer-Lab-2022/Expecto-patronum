import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard/CourseCard";
import FilterBar from "../../components/filter/FilterBar";
import FilterTag from "../../components/shared/filterTag/FilterTag";
import DataContext from "../../context/DataContext";
import { ApiUrl } from "../../constants/constants";
import CompPagination from "../../components/shared/pagination/CompPagination";
import { CourseData } from "../../Interface/CourseDataInterface";
import Router, { useRouter } from "next/router";
import Spinner from "../../components/shared/spinner/Spinner";
import CourseCard2 from "../../components/CourseCard/CourseCard2";
import { HiViewBoards } from "react-icons/hi";
import { BsGridFill } from "react-icons/bs";

export interface AllCoursesData {
  data: {
    FinalResult: [CourseData];
    TotalCount: number;
  };
}

const Courses: NextPage<AllCoursesData> = ({ data }) => {

  const [Loading, SetLoading] = useState(false);
  const [isViewList, setIsViewList] = useState(true);



  useEffect(() => {

    Router.events.on("routeChangeComplete", () => {
      SetLoading(false);
    });

    Router.events.on("routeChangeStart", (url) => {
      if (!url.includes("Courses/")) {

        SetLoading(true);
      }

    });

  }, [])

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
        return { ...prev, Price: [Data], Page: 1 };
      });
    }
  }
  function PaginationSetter(page: any) {
    SetFilter((prev) => {
      return {
        ...prev,
        Page: page,
      };
    });
  }

  return (
    <div className="flex justify-between mt-4 mx-10">
      <FilterBar
        SubjectSetter={SubjectSetter}
        RatingSetter={RatingSetter}
        PriceSetter={PriceSetter}
      ></FilterBar>
      {Loading ? (
        <Spinner></Spinner>

      ) : (
        <div className="w-4/5">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-wide">
              Search results for '{Filter.Keyword[0]?.charAt(0).toUpperCase() + Filter.Keyword[0]?.slice(1)}': {data.TotalCount}
            </h1>
            <div className='sb-max:hidden flex items-center'>
              <button onClick={() => setIsViewList(true)} className={(isViewList ? 'text-main bg-gray-700' : 'text-gray-700') + ' mx-2 scale-[1.195] rounded-full border-1.5 border-gray-700 border-opacity-70 text-opacity-95 p-[0.271rem] hover:scale-[1.295] hover:text-main hover:bg-gray-700 transition-all duration-200 rotate-90'}><HiViewBoards /></button>
              <button onClick={() => setIsViewList(false)} className={(!isViewList ? 'text-main bg-gray-700' : 'text-gray-700') + ' mx-2 scale-[1.0665] rounded-full border-1.5 border-gray-700 border-opacity-70 text-opacity-95 p-1.5 hover:scale-[1.1665] hover:text-main hover:bg-gray-700 transition-all duration-200'}><BsGridFill /></button>
            </div>
          </div>

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

          <div className={(!isViewList ? 'grid grid-flow-row grid-cols-1 md:grid-cols-2 3lg:grid-cols-3 gap-x-10' : '') + ' sb-max:ml-8 sb-max:mr-22 mx-8'}>
            {data.FinalResult.map((item, index) => {
              return <CourseCard2 key={index} index={index} isViewList={isViewList} course={item}></CourseCard2>;
            })}
          </div>

          <CompPagination FromLink={true} Setter={PaginationSetter} totalCount={data.TotalCount} />
        </div>
      )}
    </div>
  );
};

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
