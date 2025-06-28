import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import MainPanel from './pages/MainPanel.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MainPanel/>
    </StrictMode>
)
 