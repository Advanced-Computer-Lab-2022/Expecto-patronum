import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
  tag: String;
  Setter: Function;
};

const FilterTag = (props: Props) => {
  return (
    <div className="inline-flex items-center  px-3 py-2 rounded-3xl bg-gray-100 cursor-pointer hover:bg-gray-200 ">
      <p className="mr-2">{props.tag}</p>
      <AiOutlineClose
        onClick={() => {
          props.Setter(props.tag);
        }}
      ></AiOutlineClose>
    </div>
  );
};

export default FilterTag;
