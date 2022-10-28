import React from "react";
import { AiOutlineClose } from "react-icons/ai";

type Props = {};

const FilterTag = (props: Props) => {
  return (
    <div className="inline-flex items-center  px-3 py-2 rounded-3xl bg-gray-100 cursor-pointer hover:bg-gray-200 ">
      <p className="mr-2">Foundation</p>
      <AiOutlineClose></AiOutlineClose>
    </div>
  );
};

export default FilterTag;
