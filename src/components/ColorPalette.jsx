import { presetColors } from '../constants';
import Styles from '../styles/ColorPalette.module.css'

const ColorPalette = ({ labelName, currentColor, setColor }) => {
    const showTransparent = labelName === "Fill Color";

    return (
        <>
            <label>{labelName}</label>
            <div className={Styles.colorPicker}>
                <input
                    type="color"
                    value={currentColor || "white"} // fallback if currentColor is null
                    onChange={(e) => setColor(e.target.value)}
                />
                
                {showTransparent && (
                    <button
                        key="transparent"
                        className={Styles.colorButton}
                        style={{
                            backgroundColor: "transparent",
                            border: "1px dashed gray",
                            position: "relative",
                        }}
                        onClick={() => setColor("transparent")}
                        title="No Fill"
                    >
                        <span
                            style={{
                                position: "absolute",
                                top: "0",
                                left: "0",
                                width: "100%",
                                height: "100%",
                                backgroundImage: "linear-gradient(45deg, red 1px, transparent 1px)",
                                backgroundSize: "8px 8px",
                                opacity: 0.5,
                                pointerEvents: "none",
                            }}
                        />
                    </button>
                )}

                {presetColors.map((color) => (
                    <button
                        key={color}
                        className={Styles.colorButton}
                        style={{ backgroundColor: color }}
                        onClick={() => setColor(color)}
                    />
                ))}
            </div>
        </>
    );
};


export {ColorPalette};