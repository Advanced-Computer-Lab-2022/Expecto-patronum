import axios from "axios";
import { request } from "https";
import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";

var response=null;

const CountryPicker = () => {
  const [selected, setSelected] = useState("");
  async function onSelectFlag(CountryCode: string){
     console.log(CountryCode);
     axios.defaults.withCredentials = true;
    setSelected(CountryCode);
    response = await axios.get("http://localhost:5000/User/countryRate", {params:{
      country : CountryCode,
    }
    }).then((res: { data: any; }) => { return res.data });
    localStorage.setItem("rate",response.rate)
    var x= localStorage.getItem("rate")
    console.log(x);
    // return(CountryCode);
    // return(response);
     ;
  };
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
