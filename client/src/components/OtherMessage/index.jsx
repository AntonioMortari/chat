import { Box } from '@chakra-ui/react';
import style from '../../pages/Chat/style.module.css'

function OtherMessage({username, message, hour}) {
    return (
        <Box className={style.otherMessage}>
            <span>{username}</span>

            <p className={style.messageContent}>{message}</p>

            <p className={style.messageHour}>{hour}</p>
        </Box>
    );
}

export default OtherMessage;