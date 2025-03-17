import Styles from '../styles/ToolBar.module.css'
import { useState } from 'react';

const ToolBar = ()=>{
    const [activeTool, setActiveTool] = useState("");
    return(
        <>
        <div className={Styles.main}>
        <div className={Styles.line}>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
            >
                <line x1="4" y1="20" x2="20" y2="4" />
            </svg>
        </div>

        </div>
        </>
    )
}

export {ToolBar};