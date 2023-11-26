import { createContext} from 'react'
import { useState } from 'react';

const SocketContext = createContext({})

function SocketContextProvider({children}) {
    const [socket, setSocket] = useState(null)
    const [messageList, setMessageList] = useState([])


    return ( 
        <SocketContext.Provider value={{socket, setSocket, messageList, setMessageList}}>

            {children}

        </SocketContext.Provider>
     );
}

export {SocketContextProvider, SocketContext};