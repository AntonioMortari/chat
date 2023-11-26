import { useContext} from 'react'
import { SocketContext } from '../contexts/SocketContext'

const useSocket = () =>{
    const context = useContext(SocketContext)

    if(!context){
        return
    }

    return context
}

export default useSocket