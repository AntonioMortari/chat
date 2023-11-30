import { createContext} from 'react'
import { useState } from 'react';

const SocketContext = createContext({})

function SocketContextProvider({children}) {
    const [socket, setSocket] = useState(null)
    const [messageList, setMessageList] = useState([])
    const [connectedUsers, setConnectedUsers] = useState(0)
    const [username, setUsername] = useState(null)


    return ( 
        <SocketContext.Provider value={{socket, setSocket, messageList, setMessageList,connectedUsers,setConnectedUsers, username,setUsername}}>

            {children}

        </SocketContext.Provider>
     );
}

export {SocketContextProvider, SocketContext};