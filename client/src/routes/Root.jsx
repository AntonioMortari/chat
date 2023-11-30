
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import {SocketContextProvider} from '../contexts/SocketContext'

// pages
import Join from '../pages/Join';
import Chat from '../pages/Chat';
import Rooms from '../pages/Rooms'
import NotFound from '../pages/NotFound';

function Root() {
    return (
        <Router>

            <SocketContextProvider>
                <Routes>
                    <Route path='/' element={<Join />} />
                    <Route path='/chat' element={<Chat />} />
                    <Route path='/rooms' element={<Rooms />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </SocketContextProvider>

        </Router>
    );
}

export default Root;