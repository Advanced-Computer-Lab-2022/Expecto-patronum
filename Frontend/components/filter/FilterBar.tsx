import Router, { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../context/DataContext";
import FilterType from "./FilterType";
import { InterfaceFilter } from "./InterfaceFilter";
import { UseFilter } from "./UseFilter";

type Props = {};

/*
 1) setting a filter then a get request is sent to the backend with this filter query to get 
the needed Data
2) but if the page refreshed our filter will be gone and user will need to filter again so in order to make
the filters presistant i send it as a query in the link so when the page refresh(only happen on first render)
   1)all the stats will be reinitialized so i check  if there is a query in the link  i set the state to the query value 



*/

const FilterBar = (props: Props) => {
  const router = useRouter();
  const [FlagHelper, SetFlagHelper] = useState(false);

  const { Filter, SetFilter } = useContext(DataContext);

  let SubjectData = { data: ["NodeJs", "MongoDb", "Dmet", "Csen"] };
  let PriceData = { data: ["500", "1000", "2000", "3000", "4000"] };
  let RatingData = { data: ["5", "4", "3", "2", "1"] };

  function SubjectSetter(Data: string) {
    if (Filter.Subject.includes(Data)) {
      SetFilter((prev) => {
        let Array = prev.Subject.filter((item) => {
          return item !== Data;
        });

        return { ...prev, Subject: Array };
      });
    } else {
      SetFilter((prev) => {
        return { ...prev, Subject: [...prev.Subject, Data] };
      });
    }
  }
  function RatingSetter(Data: string) {
    if (Filter.Rating.includes(Data)) {
      SetFilter((prev) => {
        let Array = prev.Rating.filter((item) => {
          return item !== Data;
        });
        return { ...prev, Rating: Array };
      });
    } else {
      SetFilter((prev) => {
        return { ...prev, Rating: [...prev.Rating, Data] };
      });
    }
  }
  function PriceSetter(Data: string) {
    if (Filter.Price.includes(Data)) {
      SetFilter((prev) => {
        let Array = prev.Price.filter((item) => {
          return item !== Data;
        });
        return { ...prev, Price: Array };
      });
    } else {
      SetFilter((prev) => {
        return { ...prev, Price: [...prev.Price, Data] };
      });
    }
  }
  function ParamsToFilter() {
    let subject: string[] = [];
    let rating: string[] = [];
    let price: string[] = [];
    let page: string[] = [];
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
      if (typeof router.query.page == "object") {
        rating = router.query.page;
      } else {
        page.push(router.query.page);
      }
    }
    if (router.query.keyword) {
      flag = true;
      if (typeof router.query.keyword == "object") {
        rating = router.query.keyword;
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
      router.push("/Courses");
    }
  }

  useEffect(() => {
    if (router.query.rating || router.query.subject || router.query.price) {
      ParamsToFilter();
    }
  }, [router.isReady]);

  useEffect(() => {
    if (FlagHelper) {
      UseFilter("PushToUrl");
      // if (
      //   Filter.Price.length !== 0 ||
      //   Filter.Rating.length !== 0 ||
      //   Filter.Subject.length !== 0
      // ) {
      //   let Link = "/Courses";
      //   if (Filter.Subject.length !== 0) {
      //     Filter.Subject.forEach((item, index) => {
      //       if (Link === "/Courses") {
      //         Link = Link + "?" + "subject=" + item;
      //       } else {
      //         Link = Link + "&" + "subject=" + item;
      //       }
      //     });
      //   }
      //   if (Filter.Rating.length !== 0) {
      //     Filter.Rating.forEach((item) => {
      //       if (Link === "/Courses") {
      //         Link = Link + "?" + "rating=" + item;
      //       } else {
      //         Link = Link + "&" + "rating=" + item;
      //       }
      //     });
      //   }
      //   if (Filter.Price.length !== 0) {
      //     Filter.Price.forEach((item) => {
      //       if (Link === "/Courses") {
      //         Link = Link + "?" + "price=" + item;
      //       } else {
      //         Link = Link + "&" + "price=" + item;
      //       }
      //     });
      //   }
      //   router.push(Link);
      // } else {
      //   router.push("/Courses");
      // }
    } else {
      SetFlagHelper(true);
    }
  }, [Filter]);

  return (
    <div className="mt-32 ">
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
