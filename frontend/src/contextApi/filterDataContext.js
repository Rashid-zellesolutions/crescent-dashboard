import React, {createContext, useState} from "react";

const DataContext = createContext();

export const DAtaProvider = ({children}) => {
    const [tableData, setTableData] = useState([]);

    return <DataContext.Provider value={{tableData, setTableData}} >
        {children}
    </DataContext.Provider>
}

export default DataContext;