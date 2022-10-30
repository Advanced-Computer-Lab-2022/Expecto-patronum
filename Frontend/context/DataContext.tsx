import React, { createContext } from "react";
import { useState } from "react";
import { InterfaceFilter } from "../components/filter/InterfaceFilter";
import { PropsWithChildren } from "react";

interface InterfaceDataContext {
  Filter: InterfaceFilter;
  SetFilter: React.Dispatch<React.SetStateAction<InterfaceFilter>>;
}
const defualtFilter = {
  Filter: { Subject: [], Rating: [], Price: [], Page: [], Keyword: [] },
  SetFilter: () => {},
};

const DataContext = React.createContext<InterfaceDataContext>(defualtFilter);

export const DataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [Filter, SetFilter] = useState<InterfaceFilter>({
    Subject: [],
    Rating: [],
    Price: [],
    Page: [],
    Keyword: [],
  });

  return (
    <DataContext.Provider value={{ Filter, SetFilter }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
