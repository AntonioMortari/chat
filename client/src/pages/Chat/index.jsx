import useSocket from "../../hooks/useSocket";

import { useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {
    Flex,
    Heading,
    Box,
    Divider,
    InputGroup,
    InputRightElement,
    Button,
    

} from '@chakra-ui/react'

import { IoReturnUpBackOutline } from "react-icons/io5";
import { BsChatLeftDots } from "react-icons/bs";
import { VscSend } from "react-icons/vsc";

import MyMessage from "../../components/MyMessage";
import OtherMessage from "../../components/OtherMessage";

import style from './style.module.css'
import { toast } from "react-toastify";
import {getHours, getMinutes} from 'date-fns'

function Chat() {
    const {socket, setSocket, messageList, setMessageList, connectedUsers} = useSocket()
    const navigate = useNavigate()

    const messageRef = useRef()
    const scrollRef = useRef()

    useEffect(() =>{
        if(!socket) return navigate('/')

        messageRef.current.focus()
    },[])

    const handleSubmit = async() =>{
        const message = messageRef.current.value

        if(!message){
            return toast.error('Não é possível enviar uma mensagem vazia!')
        }

        await socket.emit('message', message)

        clearInput()
        scrollToBottom()
        messageRef.current.focus()
    }

    const clearInput = () =>{
        messageRef.current.value = ''
    }

    const scrollToBottom = () => {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    };


    const verifyKey = (e) =>{
        if(e.key == 'Enter'){
            handleSubmit()
        }
    }

    const backToHome = async() =>{
        if(socket){
            socket.disconnect()
            setSocket(null)
            setMessageList([])
        }

        navigate('/')
    }

    const getHour = (timestamp) =>{
        const today = new Date(timestamp)
        let hour = getHours(today)
        let minutes = getMinutes(today)

        if(hour < 10){
            hour = `0${hour}`
        }

        if(minutes < 10){
            minutes = `0${minutes}`
        }

        return `${hour}:${minutes}`
    }

    return (
        <>
            <Flex flexDir='column' w='450px' mr='20px' ml='20px' mt='20x' mb='20px' h='500px' bg='white' borderRadius='8px' p='15px' justifyContent='space-between'>
                <div>
                    <Heading display='flex' pb='8px' justifyContent='space-between' alignItems='center'>
                        <button onClick={backToHome}>
                            <IoReturnUpBackOutline size='30' color='#4B4453' />
                        </button>
                        <Box>
                            <Box display='flex' gap='10px' alignSelf='end'>
                                {/* <h2 className={style.titleChat}>Chat</h2> */}
                                {/* <BsChatLeftDots size='20' color='#845EC2' /> */}
                            </Box>
                            <p className={style.users}>Usuários Conectados: { connectedUsers } </p>
                        </Box>
                    </Heading>
                    <Divider />
                </div>


                <Flex height='80%' bg='white' overflowY='auto' flexDir='column' gap='15px' className={style.containerMessages} paddingRight='15px' >
                    {/* messages */}

                    {
                        messageList.map((message, index) => {
                            if(message.username_id == socket.id){
                                console.log(message)
                                return <MyMessage
                                    key={index}
                                    username={message.username}
                                    message={message.message}
                                    hour={getHour(message.timestamp)}
                                />
                            }else{
                                return <OtherMessage
                                    key={index}
                                    message={message.message}
                                    username={message.username}
                                    hour={getHour(message.timestamp)}
                                />
                            }
                        })
                    }     

                    <div ref={scrollRef} /> 
                </Flex>

                <Box>
                    
                    <InputGroup>
                        <input onKeyDown={verifyKey} type="text" ref={messageRef} className={style.inputMessage} />

                        <InputRightElement paddingBottom='10px'>
                            <button onClick={handleSubmit}>
                                <VscSend size='20' color='#845ec2' />
                            </button>
                        </InputRightElement>
                    </InputGroup>
                </Box>
            </Flex>
        </>
    );
}

export default Chat;