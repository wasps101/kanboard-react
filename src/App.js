import './App.css'
import { useState } from 'react'
import Workspace from './components/Workspace'
import UpperBar from './components/UpperBar'

function App() {

    const [theme, setTheme] = useState('light_mode')

    const handleThemeSwitch = () => {
        if (theme === 'light_mode') {
            setTheme('dark_mode')
        } else if (theme === 'dark_mode') {
            setTheme('light_mode')
        }
    }
  
    return (
        <div className={`main_container ${theme}`}>
            <UpperBar handleThemeSwitch={handleThemeSwitch}/>
            <Workspace />
        </div>
    )

}

export default App;
