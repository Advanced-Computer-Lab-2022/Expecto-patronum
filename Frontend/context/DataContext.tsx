import React, { createContext } from "react";
import { useState } from "react";
import { InterfaceFilter } from "../components/filter/InterfaceFilter";
import { PropsWithChildren } from "react";

interface InterfaceDataContext {
  Filter: InterfaceFilter;
  SetFilter: React.Dispatch<React.SetStateAction<InterfaceFilter>>;
  Rate: { rate: number; curr: string };
  SetRate: React.Dispatch<React.SetStateAction<{ rate: number; curr: string }>>;
}
const defualtFilter = {
  Filter: { Subject: [], Rating: [], Price: [], Page: 1, Keyword: [] },
  SetFilter: () => {},
  Rate: { rate: 1, curr: "USD" },
  SetRate: () => {},
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

  const [Rate, SetRate] = useState<{ rate: number; curr: string }>({
    rate: 1,
    curr: "USD",
  });

  return (
    <DataContext.Provider value={{ Filter, SetFilter, Rate, SetRate }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
