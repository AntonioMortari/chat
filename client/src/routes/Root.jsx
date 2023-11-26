
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import {SocketContextProvider} from '../contexts/SocketContext'

// pages
import Join from '../pages/Join';
import Chat from '../pages/Chat';

function Root() {
    return (
        <Router>

            <SocketContextProvider>
                <Routes>
                    <Route path='/' element={<Join />} />
                    <Route path='/chat' element={<Chat />} />
                </Routes>
            </SocketContextProvider>

        </Router>
    );
}

export default Root;