import Styles from '../styles/ToolFeatures.module.css'
import BrushSizeSlider from './BrushSizeSlider';
import { StrokeColor } from './StrokeColor';

const ToolFeatures = ({currentBrushSize, setCurrentBrushSize, currentBrushColor, setBrushColor})=>{
    return(
        <>
        <div className={Styles.main_ToolFeatures}>
            <StrokeColor
                currentBrushColor={currentBrushColor}
                setBrushColor={setBrushColor}
            />
            <BrushSizeSlider 
                currentBrushSize={currentBrushSize} 
                setCurrentBrushSize={setCurrentBrushSize}
            />
        </div>
        </>
    )
}

export {ToolFeatures};