import Styles from '../styles/DrawingBoard.module.css'
import { ToolBar } from './ToolBar';
const DrawingBoard = ()=>{
    return(
        <>
        <div className={Styles.main}>
        <ToolBar/>
        <canvas>
            Drawing Board!!
        </canvas>
        </div>
        </>
    )
}

export {DrawingBoard};