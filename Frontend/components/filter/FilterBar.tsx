import Router, { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../context/DataContext";
import FilterType from "./FilterType";

type FilterProps = {
  SubjectSetter: Function;
  RatingSetter: Function;
  PriceSetter: Function;
};

/*
 1) setting a filter then a get request is sent to the backend with this filter query to get 
the needed Data
2) but if the page refreshed our filter will be gone and user will need to filter again so in order to make
the filters presistant i send it as a query in the link so when the page refresh(only happen on first render)
   1)all the stats will be reinitialized so i check  if there is a query in the link  i set the state to the query value 



*/

const FilterBar: React.FC<FilterProps> = ({
  SubjectSetter,
  RatingSetter,
  PriceSetter,
}) => {
  const router = useRouter();
  const [FlagHelper, SetFlagHelper] = useState(false);
  const [FirstFilter, SetFirstFilter] = useState<true | false | null>(false);

  const { Filter, SetFilter } = useContext(DataContext);

  let SubjectData = { data: ["NodeJs", "MongoDb", "Dmet", "Csen"] };
  let PriceData = { data: ["500", "1000", "2000", "3000", "4000"] };
  let RatingData = { data: ["5", "4", "3", "2", "1"] };

  function FilterFunction(type: "GetFromUrl" | "PushToUrl") {
    let Link = "/Courses";

    function CheckFilters(Filterdata: number | string[], QueryName: string) {
      if (typeof Filterdata == "number") {
        if (Link === "/Courses") {
          Link = Link + "?" + QueryName + "=" + Filterdata;
        } else {
          Link = Link + "&" + QueryName + "=" + Filterdata;
        }
      } else {
        if (Filterdata.length !== 0) {
          Filterdata.forEach((item, index) => {
            if (Link === "/Courses") {
              Link = Link + "?" + QueryName + "=" + item;
            } else {
              Link = Link + "&" + QueryName + "=" + item;
            }
          });
        }
      }
    }

    function PushUrl() {
      if (
        Filter.Price.length !== 0 ||
        Filter.Rating.length !== 0 ||
        Filter.Subject.length !== 0 ||
        Filter.Page !== 1 ||
        Filter.Keyword.length !== 0
      ) {
        CheckFilters(Filter.Subject, "subject");
        CheckFilters(Filter.Rating, "rating");
        CheckFilters(Filter.Price, "price");
        CheckFilters(Filter.Page, "page");
        CheckFilters(Filter.Keyword, "keyword");
        router.push(Link);
      } else {
        router.push(Link);
      }
    }
    function GetUrl() {
      SetFirstFilter(true);
      let subject: string[] = [];
      let rating: string[] = [];
      let price: string[] = [];
      let page: number = 1;
      let keyword: string[] = [];
      let flag: boolean = false;
      if (router.query.subject) {
        flag = true;
        if (typeof router.query.subject == "object") {
          subject = router.query.subject;
        } else {
          subject.push(router.query.subject);
        }
      }
      if (router.query.price) {
        flag = true;
        if (typeof router.query.price == "object") {
          price = router.query.price;
        } else {
          price.push(router.query.price);
        }
      }
      if (router.query.rating) {
        flag = true;
        if (typeof router.query.rating == "object") {
          rating = router.query.rating;
        } else {
          rating.push(router.query.rating);
        }
      }
      if (router.query.page) {
        flag = true;
        if (typeof router.query.page !== "object") {
          page = parseInt(router.query.page);
        }
      }
      if (router.query.keyword) {
        flag = true;
        if (typeof router.query.keyword == "object") {
          keyword = router.query.keyword;
        } else {
          keyword.push(router.query.keyword);
        }
      }
      if (flag === true) {
        SetFilter({
          Subject: subject,
          Rating: rating,
          Price: price,
          Page: page,
          Keyword: keyword,
        });
      } else {
        router.push(Link);
      }
    }

    if (type === "PushToUrl") {
      PushUrl();
    } else {
      GetUrl();
    }
  }

  useEffect(() => {
    if (router.isReady) {
      if (
        router.query.rating ||
        router.query.subject ||
        router.query.price ||
        router.query.page ||
        router.query.keyword
      ) {
        FilterFunction("GetFromUrl");
      }
      else {
        SetFirstFilter(null);
      }
    }


  }, [router.isReady]);

  useEffect(() => {
    if (FlagHelper) {
      if (FirstFilter == null) {
        FilterFunction("PushToUrl");
      }
      else {
        if (FirstFilter === true) {
          SetFirstFilter(null);
        }
      }
    }
    SetFlagHelper(true);

  }, [Filter])




  return (
    <div className="mt-32 xs:hidden">
      <h1 className="text-xl mb-10 font-bold">Filter By</h1>
      <FilterType
        Choosen={Filter.Subject}
        title={"Subject"}
        data={SubjectData}
        setter={SubjectSetter}
      ></FilterType>
      <FilterType
        Choosen={Filter.Rating}
        title={"Rating"}
        data={RatingData}
        setter={RatingSetter}
      ></FilterType>
      <FilterType
        Choosen={Filter.Price}
        title={"Price"}
        data={PriceData}
        setter={PriceSetter}
      ></FilterType>
    </div>
  );
};

export default FilterBar;
