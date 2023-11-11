import { createContext, useState } from "react";
import { ICategory } from "../interfaces/category";

const AppContext = createContext<any>({});

function AppProvider({ children }: any) {
  const [openModalDetail, setOpenModalDetail] = useState<boolean>(false);
  const [categorySelected, setCategorySelected] = useState<ICategory>({});

  const value = {
    openModalDetail,
    setOpenModalDetail,
    categorySelected,
    setCategorySelected,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
