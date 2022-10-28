import Image from "next/image";
import React, { useState } from "react";
import CheckBox from "../shared/checkBox/CheckBox";

type Props = {};

const FilterType = (props: Props) => {
  const [Clicked, SetClicked] = useState(false);
  return (
    <div className="w-40 mt-2">
      <div
        onClick={() => SetClicked((prev) => !prev)}
        className="flex justify-between items-center w-full border-t-2 border-black/40  pt-2  mb-4 cursor-pointer"
      >
        <p className="text-lg font-semibold">Topic</p>

        <div
          className={
            Clicked
              ? " w-5 h-5 rotate-180 ease-linear duration-200"
              : "w-5 h-5  ease-linear duration-200  "
          }
        >
          <Image
            src="/images/arrow-down.png"
            width={45}
            height={45}
            alt={"CGP"}
            objectFit="contain"
            layout="responsive"
            priority
          />
        </div>
      </div>
      <div
        className={
          Clicked
            ? "opacity-100 ease-linear duration-75 mb-8 "
            : "opacity-0 hidden ease-linear duration-75 "
        }
      >
        <CheckBox id="1"></CheckBox>
      </div>
    </div>
  );
};

export default FilterType;
