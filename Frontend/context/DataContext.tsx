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
  ContentChoosen: ContentChoosen;
  SetContentChoosen: React.Dispatch<React.SetStateAction<ContentChoosen>>;
}
interface InterfaceRate {
  rate: number;
  curr: string;
  Country: string;
}
interface ContentChoosen {
  SubtitleID: string;
  ContentID: string;
  data: { url: string, time: number } | { name: string }
  isExercise: boolean;

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
  Rate: { rate: 1, curr: "USD", Country: "US" },
  SetRate: () => { },
  Profile: "AccountInfo" as "AccountInfo" | "Wallet" | "Tickets",
  SetProfile: () => { },
  ContentChoosen: {
    SubtitleID: "63966e85abce268194684c82", ContentID: "63966e85abce268194684c83", data: { url: "", time: 0 }, isExercise: false
  },
  SetContentChoosen: () => { },
}

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
  const [ContentChoosen, SetContentChoosen] = useState<ContentChoosen>(defualtFilter.ContentChoosen);

  return (
    <DataContext.Provider value={{ Filter, SetFilter, Rate, SetRate, Profile, SetProfile, ContentChoosen, SetContentChoosen }}>
      {children}
    </DataContext.Provider >
  );
};

export default DataContext;
