import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../../context/DataContext";
import Pagination from "rc-pagination";
import { Router, useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const CompPagination: React.FC<{ totalCount: number, Setter: Function, FromLink: boolean }> = ({ totalCount, Setter, FromLink }) => {



  const [CurrentPage, SetCurrentPage] = useState(1);
  const { Filter, SetFilter } = useContext(DataContext);
  const route = useRouter();


  if (FromLink) {
    useEffect(() => {
      if (route.isReady) {
        SetCurrentPage(Filter.Page);
      }
    }, [route.isReady, Filter]);
  }


  const PaginationChange = (page: any, pageSize: any) => {
    Setter(page);
    SetCurrentPage(page);
  };

  const PrevNextArrow = (current: any, type: any, originalElement: any) => {
    if (type === "prev") {
      return (
        <button>
          <IoIosArrowBack></IoIosArrowBack>
        </button>
      );
    }
    if (type === "next") {
      return (
        <button>
          <IoIosArrowForward></IoIosArrowForward>
        </button>
      );
    }
    return originalElement;
  };

  if (totalCount == 0) {
    return <div className="text-center">No Data Found</div>;
  }
  return (
    <>
      <div className="table-filter-info flex justify-center mt-10 mb-20">
        <Pagination
          className="pagination-data"
          onChange={PaginationChange}
          total={totalCount}
          current={CurrentPage}
          pageSize={5}
          showSizeChanger={false}
          itemRender={PrevNextArrow}
        />
      </div>
    </>
  );
};
export default CompPagination;
