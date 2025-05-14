import { presetColors } from '../constants';
import Styles from '../styles/StrokeColor.module.css'

const StrokeColor = ({currentBrushColor, setBrushColor})=>{
    return(
        <>
            <label>Brush Color</label>
            <div className={Styles.colorPicker}>
                <input type="color" 
                    value={currentBrushColor}
                    onChange={(e)=>setBrushColor(e.target.value)}
                />
                {presetColors.map((color)=>(
                    <button
                        key={color}
                        className={Styles.colorButton}
                        style={{backgroundColor: color}}
                        onClick={()=>setBrushColor(color)}
                    />
                ))}
       </div> 
        </>
       
    )
}

export {StrokeColor};