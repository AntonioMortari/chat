import {
    Container
} from '@chakra-ui/react'

import MonsterImage from '../../images/monsterImage.png'

function NotFound() {
    return ( 
        <Container>
            <img src={MonsterImage} alt="Monster image 404 - Not Found" />
        </Container>
    );
}

export default NotFound;