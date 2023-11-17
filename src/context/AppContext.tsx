import { createContext, useState } from "react";

const AppContext = createContext<any>({});

function AppProvider({ children }: any) {
  const [openModalDetail, setOpenModalDetail] = useState<boolean>(false);
  const [categoryIdSelected, setCategoryIdSelected] = useState<string>("");

  const handleSetCategoryId = (id: string) => {
    setCategoryIdSelected(id)
  }
  
  const value = {
    openModalDetail,
    setOpenModalDetail,
    categoryIdSelected,
    handleSetCategoryId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
