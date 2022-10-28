import React from "react";
import FilterType from "./FilterType";

type Props = {};

const FilterBar = (props: Props) => {
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
