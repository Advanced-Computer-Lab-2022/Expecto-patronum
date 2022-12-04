import axios from "axios";
import { request } from "https";
import React, { useContext, useEffect, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import DataContext from "../../context/DataContext";

var response = null;

const CountryPicker = () => {
  const { Rate, SetRate } = useContext(DataContext);
  useEffect(() => {
    let RateInfo = localStorage.getItem("rate");
    let Curr = localStorage.getItem("curr");
    let Country = localStorage.getItem("country");

    if (RateInfo !== null && Curr !== null && Country !== null) {
      SetRate({
        rate: parseInt(RateInfo),
        curr: Curr,
        Country: Country,
      });
    }
  }, []);

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
    localStorage.setItem("rate", response.rate);
    localStorage.setItem("curr", response.curr);
    localStorage.setItem("country", CountryCode);
    SetRate({ ...response, Country: CountryCode });
    var x = localStorage.getItem("rate");

    // return(CountryCode);
    // return(response);
  }
  return (
    <ReactFlagsSelect
      className="float-right"
      selected={selected !== "" ? selected : Rate.Country}
      onSelect={(CountryCode) => onSelectFlag(CountryCode)}
      searchable={true}
    />
  );
};

export default CountryPicker;
