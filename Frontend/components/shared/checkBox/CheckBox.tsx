import React from "react";

type Props = {
  id: string;
};

const CheckBox = (props: Props) => {
  return (
    <div className="flex items-center mb-2 ">
      <input
        id={props.id}
        type="checkbox"
        value=""
        className="w-5 h-5 cursor-pointer text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor={props.id}
        className="ml-2 text-md  select-none  cursor-pointer text-black "
      >
        Checked state
      </label>
    </div>
  );
};

export default CheckBox;
