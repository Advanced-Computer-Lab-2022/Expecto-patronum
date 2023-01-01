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

export interface AllCoursesData {
  data: {
    FinalResult: [CourseData];
    TotalCount: number;
  };
}

const Courses: NextPage<AllCoursesData> = ({ data }) => {
  const [Loading, SetLoading] = useState(false);



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
    <div className="flex  justify-between mt-20 mx-10">
      <FilterBar
        SubjectSetter={SubjectSetter}
        RatingSetter={RatingSetter}
        PriceSetter={PriceSetter}
      ></FilterBar>
      {Loading ? (
        <Spinner></Spinner>

      ) : (
        <div className="w-4/5">
          <h1 className="text-2xl font-medium mb-3">
            {data.TotalCount} results for {Filter.Keyword}
          </h1>
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

          <div className="gap-10 gap-y-14 grid grid-cols-3">
            {data.FinalResult.map((item, index) => {
              return <CourseCard key={index} CourseData={item}></CourseCard>;
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
