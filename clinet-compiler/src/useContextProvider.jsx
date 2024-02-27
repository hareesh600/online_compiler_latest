import {Websocketcontext} from "./UserContext"
import { useState } from "react"
function UseContextProvider({children}){
const[token,setToken]=useState(null)
    return (
        <Websocketcontext.Provider value={{token,setToken}}>
            {children}
        </Websocketcontext.Provider>
    )
}

export default UseContextProvider