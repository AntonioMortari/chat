import {useEffect, useState} from 'react'
import api from '../../config/axios'

import style from './style.module.css'

import {
    Container,

} from '@chakra-ui/react'

function Rooms() {
    const [defaultRooms, setDefaultRooms] = useState([])


    useEffect(() => {
        api.get('/rooms')
            .then(result => {
                setDefaultRooms(result.data)
            })
            .catch(error => {
                console.log(error)
            })
    },[])

    return (
        <Container mr='20px' ml='20px' bg='white' className={style.containerJoin} padding='20px' borderRadius='8px' boxShadow='0px 0px 20px rgba(0,0,0,0.22)'>

        {
            defaultRooms.map(data => {
                return <p>{data.name}</p>
            })
        }
        
        </Container>
    );
}

export default Rooms;