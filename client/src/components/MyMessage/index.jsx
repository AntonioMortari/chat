import { Box } from '@chakra-ui/react';
import style from '../../pages/Chat/style.module.css'

function MyMessage({username, message, hour}) {
    return (
        <Box className={style.myMessage}>
            <span>{username}</span>

            <p className={style.messageContent}>{message}</p>

            <p className={style.messageHour}>{hour}</p>
        </Box>
    );
}

export default MyMessage;