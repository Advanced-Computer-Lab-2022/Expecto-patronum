import React, { createContext } from "react";
import { useState } from "react";
import { PropsWithChildren } from "react";

export interface InterfaceDataContext {
  Filter: InterfaceFilter;
  SetFilter: React.Dispatch<React.SetStateAction<InterfaceFilter>>;
  Rate: InterfaceRate;
  SetRate: React.Dispatch<React.SetStateAction<InterfaceRate>>;
  Profile: "AccountInfo" | "Wallet" | "Tickets";
  SetProfile: React.Dispatch<React.SetStateAction<"AccountInfo" | "Wallet" | "Tickets">>;
}
interface InterfaceRate {
  rate: number;
  curr: string;
  Country: string;
}




export interface InterfaceFilter {
  Subject: string[];
  Rating: string[];
  Price: string[];
  Page: number;
  Keyword: string[];
}

const defualtFilter = {
  Filter: { Subject: [], Rating: [], Price: [], Page: 1, Keyword: [] },
  SetFilter: () => { },
  Rate: { rate: 1, curr: "$", Country: "US" },
  SetRate: () => { },
  Profile: "AccountInfo" as "AccountInfo" | "Wallet" | "Tickets",
  SetProfile: () => { },
};

const DataContext = React.createContext<InterfaceDataContext>(defualtFilter);

export const DataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [Filter, SetFilter] = useState<InterfaceFilter>({
    Subject: [],
    Rating: [],
    Price: [],
    Page: 1,
    Keyword: [],
  });

  const [Rate, SetRate] = useState<InterfaceRate>(defualtFilter.Rate);
  const [Profile, SetProfile] = useState<"AccountInfo" | "Wallet" | "Tickets">(defualtFilter.Profile);

  return (
    <DataContext.Provider value={{ Filter, SetFilter, Rate, SetRate, Profile, SetProfile }}>
      {children}
    </DataContext.Provider >
  );
};

export default DataContext;
