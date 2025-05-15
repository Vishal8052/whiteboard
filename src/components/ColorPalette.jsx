import { presetColors } from '../constants';
import Styles from '../styles/ColorPalette.module.css'

const ColorPalette = ({labelName, currentColor, setColor})=>{
    return(
        <>
            <label>{labelName}</label>
            <div className={Styles.colorPicker}>
                <input type="color" 
                    value={currentColor}
                    onChange={(e)=>setColor(e.target.value)}
                />
                {presetColors.map((color)=>(
                    <button
                        key={color}
                        className={Styles.colorButton}
                        style={{backgroundColor: color}}
                        onClick={()=>setColor(color)}
                    />
                ))}
       </div> 
        </>
       
    )
}

export {ColorPalette};