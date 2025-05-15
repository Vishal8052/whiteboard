import Styles from '../styles/ToolFeatures.module.css'
import BrushSizeSlider from './BrushSizeSlider';
import { ColorPalette } from './ColorPalette';

const ToolFeatures = ({currentBrushSize, setCurrentBrushSize, currentBrushColor, setBrushColor, currFillColor, setFillColor, selectedTool})=>{
    return(
        <>
        {
             (selectedTool!="eraser" && selectedTool!="magic_eraser" && selectedTool!="save") &&
              <div className={Styles.main_ToolFeatures}>
            <ColorPalette
                labelName="Brush Color"
                currentColor={currentBrushColor}
                setColor={setBrushColor}
            />
            <BrushSizeSlider 
                currentBrushSize={currentBrushSize} 
                setCurrentBrushSize={setCurrentBrushSize}
            />
            {
            (selectedTool==="circle" || selectedTool==="rectangle") &&
             <ColorPalette
                labelName="Fill Color"
                currentColor={currFillColor}
                setColor={setFillColor}
            />}
        </div>
        }
       
        </>
    )
}

export {ToolFeatures};