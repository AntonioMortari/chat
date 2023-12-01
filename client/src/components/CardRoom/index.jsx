import useSocket from '../../hooks/useSocket';
import { useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { io } from 'socket.io-client'

import {
    Flex,
} from '@chakra-ui/react'

import { CgEnter } from "react-icons/cg";
import { IoMdInformationCircleOutline as Info } from "react-icons/io";
import { HiOutlineStatusOnline as Online } from "react-icons/hi";

import style from './style.module.css'

function CardRoom({ name, description, id }) {
    const [showDescription, setShowDescription] = useState(false)

    const { username, setMessageList, setSocket, setIdRoom } = useSocket()
    const navigate = useNavigate()

    const goToChat = async () => {
        const id_room = id

        // conectar com o socket
        const newSocket = await io('http://localhost:3000')

        // setar informações do usuário
        newSocket.emit('set_data_user', {
            username,
            id_room
        })

        // escutar eventos do servidor
        newSocket.on('new_room_message', data => {
            setMessageList(prevList => [...prevList, data])
        })
        
        setSocket(newSocket)

        // mandar para o chat
        setIdRoom(id_room)
        navigate('/chat')
    }

    const handleShowDescription = () =>{
        setShowDescription(!showDescription)
    }

    return (
        <Flex transition='.3s' _hover={{background:'rgba(0, 0, 0, 0.041)'}} borderRadius='5px' w='100%' align='center' justify='space-between' p='5px'>

            <Flex flexDirection='column'>
                <span>{name}</span>
                <Flex align='center' gap='5px'>
                    <Online />
                    12
                </Flex>
            </Flex>

            <Flex gap='8px'>
                <button onClick={goToChat}>
                    <CgEnter cursor='pointer' />
                </button>

                <Flex position='relative' onClick={handleShowDescription}>
                    <p>
                        <Info cursor='pointer' size='22' color='#0081CF' />
                    </p>

                    <div className={showDescription ? style.showDescription : style.hiddenDescription}>
                        <p>Descrição:</p>
                        {description}
                    </div>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default CardRoom;