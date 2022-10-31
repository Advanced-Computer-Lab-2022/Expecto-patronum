import axios from "axios";
import { request } from "https";
import React, { useContext, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import DataContext from "../../context/DataContext";

var response = null;

const CountryPicker = () => {
  const { SetRate } = useContext(DataContext);
  const [selected, setSelected] = useState("");
  async function onSelectFlag(CountryCode: string) {
    console.log(CountryCode);
    axios.defaults.withCredentials = true;
    setSelected(CountryCode);
    response = await axios
      .get("http://localhost:5000/User/countryRate", {
        params: {
          country: CountryCode,
        },
      })
      .then((res: { data: any }) => {
        return res.data;
      });
    console.log(response);
    localStorage.setItem("rate", response);
    SetRate(response);
    var x = localStorage.getItem("rate");

    // return(CountryCode);
    // return(response);
  }
  return (
    <ReactFlagsSelect 
      id="country-picker"
      className="mr-6"
      selected={selected}
      onSelect={(CountryCode) => onSelectFlag(CountryCode)}
      searchable={true}
    />
  );
};

export default CountryPicker;
