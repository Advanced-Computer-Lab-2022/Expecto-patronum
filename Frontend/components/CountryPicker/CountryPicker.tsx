import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";

const CountryPicker = () => {
  const [selected, setSelected] = useState("");
  function onSelectFlag(CountryCode: string) {
    return setSelected(CountryCode);
  }
  return (
    <ReactFlagsSelect
      className="float-right"
      selected={selected}
      onSelect={(CountryCode) => onSelectFlag(CountryCode)}
      searchable={true}
    />
  );
};

export default CountryPicker;
