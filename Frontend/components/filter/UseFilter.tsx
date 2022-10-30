import { Router, useRouter } from "next/router";
import { useContext } from "react";
import DataContext from "../../context/DataContext";

export function UseFilter(type: "GetFromUrl" | "PushToUrl") {
  function PushUrl() {
    if (
      Filter.Price.length !== 0 ||
      Filter.Rating.length !== 0 ||
      Filter.Subject.length !== 0 ||
      Filter.Page.length !== 0 ||
      Filter.Keyword.length !== 0
    ) {
      let Link = "/Courses";
      if (Filter.Subject.length !== 0) {
        Filter.Subject.forEach((item, index) => {
          if (Link === "/Courses") {
            Link = Link + "?" + "subject=" + item;
          } else {
            Link = Link + "&" + "subject=" + item;
          }
        });
      }
      if (Filter.Rating.length !== 0) {
        Filter.Rating.forEach((item) => {
          if (Link === "/Courses") {
            Link = Link + "?" + "rating=" + item;
          } else {
            Link = Link + "&" + "rating=" + item;
          }
        });
      }
      if (Filter.Price.length !== 0) {
        Filter.Price.forEach((item) => {
          if (Link === "/Courses") {
            Link = Link + "?" + "price=" + item;
          } else {
            Link = Link + "&" + "price=" + item;
          }
        });
      }
      router.push(Link);
    } else {
      router.push("/Courses");
    }
  }
  function GetUrl() {
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
  const router = useRouter();
  const { Filter, SetFilter } = useContext(DataContext);
  if ((type = "PushToUrl")) {
    PushUrl();
  } else {
    GetUrl();
  }
}
