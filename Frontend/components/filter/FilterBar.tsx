import Router, { useRouter } from "next/router";
import React, { useState } from "react";
import FilterType from "./FilterType";

type Props = {};

const FilterBar = (props: Props) => {
  const [Filter, SetFilter] = useState({
    subject: "",
    instructorName: "",
    price: "",
  });

  function Subject(Data: string) {}

  const router = useRouter();

  return (
    <div className="mt-32 ">
      <h1 className="text-xl mb-10 font-bold">Filter By</h1>
      <FilterType></FilterType>
      <FilterType></FilterType>
      <FilterType></FilterType>
      <FilterType></FilterType>
    </div>
  );
};

export default FilterBar;
