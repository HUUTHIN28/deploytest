import { createContext, useState } from "react";

const ThemContext = createContext()

function Themprovider({children}) {
    const [them,setThem] = useState('huuthin');
  const data = {
    them,setThem
  }
    return <ThemContext.Provider value={data}>
        {children}
    </ThemContext.Provider>
    
}

export { ThemContext ,Themprovider}