import Styles from '../styles/BrushSizeSlider.module.css'

const BrushSizeSlider = ({currentBrushSize, setCurrentBrushSize})=>{
    const handleSizeChange=(e)=>{
        setCurrentBrushSize(Number(e.target.value));
    }

    return(
        <div className={Styles.slider_container} >
            <label htmlFor="brush-size">Brush Size: {currentBrushSize}</label>
            <input 
                type="range"
                id="brush-size"
                min="1"
                max="15"
                value={currentBrushSize}
                onChange={handleSizeChange}
                />
        </div>
    )
};

export default BrushSizeSlider;