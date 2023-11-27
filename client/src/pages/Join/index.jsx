import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import {
    Container,
    Button,
    Input,
    InputGroup,
    InputLeftElement
} from '@chakra-ui/react'

import { BsArrowRight } from "react-icons/bs";
import { RiUser3Line } from "react-icons/ri";
import { toast } from 'react-toastify'


import style from './style.module.css'

import { io } from 'socket.io-client'
import useSocket from '../../hooks/useSocket'

function Join() {
    const usernameRef = useRef()
    const { setSocket, setMessageList, setConnectedUsers } = useSocket()
    const navigate = useNavigate()

    const handleSubmit = async() => {
        // verificar se foi digitado algo
        const username = usernameRef.current.value
        if (!username) {
            return toast.error('Digite um nome de usuário para continuar')
        }

        // conetar com socket
        const newSocket = await io('https://server-chat-9z4a.onrender.com')
        await newSocket.emit('set_username', username)

        newSocket.on('messageToClient', data  =>{
            setConnectedUsers(data.users)
        })

        newSocket.on('new_message', data =>{
            setMessageList(prevList => [...prevList, data])   
        })

        setSocket(newSocket)

        // mandar socket para o chat
        navigate('/chat')

    }

    const verifyKey =(e) =>{
        if(e.key == 'Enter'){
            handleSubmit()
        }
    }

    return (
        <Container mr='20px' ml='20px' bg='white' className={style.containerJoin} padding='20px' borderRadius='8px' boxShadow='0px 0px 20px rgba(0,0,0,0.22)'>

            <h1 className={style.titleJoin}>Bem-Vindo(a) ao Stranger!</h1>

            <InputGroup w='80%' m='auto'>
                <InputLeftElement>
                    <RiUser3Line color='#4B4453' />
                </InputLeftElement>

                <Input onKeyDown={verifyKey} ref={usernameRef} type='text' focusBorderColor='primary_1' placeholder='Nome de usuário' />
            </InputGroup>

            <Button onClick={handleSubmit} _hover={{ bg: 'primary_3' }} mt='25px' bg='primary_2' color='white' rightIcon={<BsArrowRight />}>Comece a Conversar</Button>
        </Container>
    );
}

export default Join;