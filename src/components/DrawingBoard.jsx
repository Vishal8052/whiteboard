import {useEffect, useRef, useState } from 'react';
import Styles from '../styles/DrawingBoard.module.css'
import { ToolBar } from './ToolBar';
import {drawLine, drawArrow,drawEllipse,drawRectangle} from '../utils/drawingUtils';
import { CURSOR, ERASER, MAGIC_ERASER} from '../constants.jsx';
import { ToolFeatures } from './ToolFeatures.jsx';


const DrawingBoard = ()=>{
    const persistentCanvasRef = useRef(null);
    const tempCanvasRef = useRef(null);

    const persistentCtxRef = useRef(null);
    const tempCtxRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false);
    const [startPoint, setStartPoint] = useState(null);
    const [selectedTool, setSelectedTool] = useState("pen");

    const [redoHistory, setRedoHistory] = useState([]);

    const [elements, setElements] = useState(() => {
        const savedElements = localStorage.getItem('drawingElements');
        if (savedElements) {
          try {
            return JSON.parse(savedElements);
          } catch (error) {
            console.error('Error parsing saved elements:', error);
            return [];
          }
        }
        return [];
      });

    const [currentPenPath, setCurrentPenPath] = useState([]);
    const [isWriting, setIsWriting] = useState(false);
    const [currentText, setCurrentText] = useState("");
    const [showCursor,setShowCursor] = useState(true);
    const cursorIntervalRef = useRef(null);

    const [currentBrushSize, setCurrentBrushSize] = useState(1);
    const [currentBrushColor, setBrushColor] = useState("black");
    const [currFillColor, setFillColor] = useState("black");

    //save the elements in the local storage as soon as the elements array changes
    useEffect(()=>{
        localStorage.setItem('drawingElements',JSON.stringify(elements));
    },[elements]);

    useEffect(()=>{
        const persistentCanvas = persistentCanvasRef.current;
        const tempCanvas = tempCanvasRef.current;
        persistentCanvas.width = window.innerWidth;
        persistentCanvas.height = window.innerHeight;
        tempCanvas.width = window.innerWidth;
        tempCanvas.height = window.innerHeight;

        persistentCtxRef.current = persistentCanvas.getContext("2d");
        persistentCtxRef.current.font = `${currentBrushSize}px 'Architects Daughter'`;
        persistentCtxRef.current.lineWidth = currentBrushSize;
        persistentCtxRef.current.strokeStyle = currentBrushColor;
        persistentCtxRef.current.fillStyle = currFillColor;

        tempCtxRef.current = tempCanvas.getContext("2d");
        tempCtxRef.current.font = `${currentBrushSize}px 'Architects Daughter'`;
        tempCtxRef.current.lineWidth = currentBrushSize;
        tempCtxRef.current.strokeStyle = currentBrushColor;

        if(elements){
            reDrawCanvas(elements);
        }
    },[]);

    useEffect(()=>{
        if(persistentCtxRef.current && tempCtxRef.current){
            persistentCtxRef.current.lineWidth = currentBrushSize;
            tempCtxRef.current.lineWidth = currentBrushSize;
            persistentCtxRef.current.strokeStyle = currentBrushColor;
            tempCtxRef.current.strokeStyle = currentBrushColor;

            //about text - fontSize & fontColor
            persistentCtxRef.current.font = `${currentBrushSize+10}px 'Architects Daughter'`;
            tempCtxRef.current.font = `${currentBrushSize+10}px 'Architects Daughter'`;
            persistentCtxRef.current.fillStyle = currentBrushColor;
            tempCtxRef.current.fillStyle = currentBrushColor;
        }
    },[currentBrushSize,currentBrushColor]);

    const clearBoard = ()=>{
        if(!window.confirm("Clear the board?")){
            return;
        }
        
        const persistentCtx = persistentCtxRef.current;
        const tempCtx = tempCtxRef.current;
        
        persistentCtx.clearRect(0,0,persistentCanvasRef.current.width, persistentCanvasRef.current.height);
        tempCtx.clearRect(0,0,tempCanvasRef.current.width, tempCanvasRef.current.height);

        setIsDrawing(false);
        setStartPoint(null);
        setRedoHistory([]);
        setElements([]);
        setCurrentPenPath([]);
        setCurrentBrushSize(1);
    }

    //writing text
    const addCursor = (text, ctx, isEnd)=>{
        const tempCtx = tempCtxRef.current;
    
        tempCtx.clearRect(0,0,tempCanvasRef.current.width,tempCanvasRef.current.height);
        ctx.fillText(text,startPoint.x,startPoint.y);

        if(isEnd===false && showCursor){
            const textWidth = tempCtx.measureText(text).width;
            ctx.fillRect(startPoint.x+textWidth+2, 2+startPoint.y-currentBrushSize-10,CURSOR.WIDTH,currentBrushSize+10);
        }
    }

    const commitText = ()=>{
        setCurrentText((prevText)=>{
            const persistentCtx = persistentCtxRef.current;
            addCursor(prevText,persistentCtx, true);
            const newElement = {
                type:"text",
                x1: startPoint.x,
                y1: startPoint.y,
                text: prevText,
                fontSize: currentBrushSize+10,
                fontColor: currentBrushColor
            };
            setElements((prevElement)=>{
                const updatedElements = [...prevElement,newElement];
                reDrawCanvas(updatedElements);
                return updatedElements;
            });
            return "";
        });
        setIsWriting(false);
        setRedoHistory([[]]);
    }

    useEffect(()=>{
        if(isWriting===false) return;
        const tempCtx = tempCtxRef.current;

        //Add the cursor to the clicked location on the whiteboard
        addCursor(currentText,tempCtx,false);

        cursorIntervalRef.current = setInterval(()=>{
            setShowCursor((prev)=>!prev);
        },500);

        const handleKeyDown=(e)=>{
            if(e.key==="Enter"){
                commitText();
                setIsWriting(false);
                return;
            }

            else if(e.key==="Backspace"){
                setCurrentText((prevText)=>{
                    const newText = prevText.slice(0,-1);
                    addCursor(newText,tempCtx,false);
                    return newText;
                })
            }

            else if(e.key.length===1){
                setCurrentText((prevText) => {
                    const newText = prevText + e.key;
                    addCursor(newText,tempCtx,false);
                    return newText;
                });
            }
        }

        const handleClickOutside = (e)=>{
            if(!isWriting) return;
            const {offsetX,offsetY} = e;
            const isClickInsideText = 
            offsetX>=startPoint.x-10 && 
            offsetX<=startPoint.x+100 &&
            offsetY>=startPoint.y-30 &&
            offsetY<=startPoint.y+10;

            if(!isClickInsideText) {
                commitText();
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("mousedown",handleClickOutside);
        return ()=>{
            window.removeEventListener("keydown",handleKeyDown);
            window.removeEventListener("mousedown",handleClickOutside);
            clearInterval(cursorIntervalRef.current);
        }
    },[isWriting,showCursor]);

    const isElementNear = (element,x,y)=>{
        const threshold = Math.max(MAGIC_ERASER.MIN_SIZE, currentBrushSize*MAGIC_ERASER.SIZE_FACTOR);

        if(element.type === "pen" || element.type==="eraser"){
            return element.points.some((point)=>{
                const dx = point.x-x;
                const dy = point.y-y;
                return Math.sqrt(dx*dx+dy*dy)<=threshold;
            });
        }
        else if(element.type === "line" || element.type==="arrow"){
            const minX = Math.min(element.x1, element.x2);
            const maxX = Math.max(element.x1, element.x2);
            const minY = Math.min(element.y1, element.y2);
            const maxY = Math.max(element.y1, element.y2);

            return x>=minX-threshold && x<=maxX+threshold && y>=minY-threshold && y<=maxY+threshold;
        }
        else if(element.type==="rectangle"){
            return (x>=element.x1-threshold && x<=element.x1+element.width+threshold && y>=element.y1-threshold && y<=element.y1+element.height+threshold);
        }
        else if(element.type==="circle"){
            const dx = element.x1-x;
            const dy = element.y1-y;

            const maxRadius = Math.max(element.radiusX,element.radiusY);
            return Math.sqrt(dx*dx+dy*dy)<=maxRadius+threshold;
        }
        else if(element.type==="text"){
            const textWidth = element.text.length*(element.fontSize/2);
            return x>=element.x1-threshold && x<=element.x1+textWidth+threshold && y>=element.y1-element.fontSize-threshold && y<=element.y1+threshold;
        }

        return false;
    }

    const startDrawing = (e)=>{
        if(isDrawing){
            endDrawing();
        }
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        setStartPoint({x:x, y:y}); 

        if(selectedTool==="text"){
            if(isWriting===true) return;
            setIsWriting(true);
            return;
        }
        
        setIsDrawing(true);

        if(selectedTool==="pen" || selectedTool==="eraser"){
            const tempCtx = tempCtxRef.current;
            tempCtx.beginPath();
            tempCtx.moveTo(x,y);
            setCurrentPenPath([{x,y}]);
        }
        
    };

    //update the figure that is being currently drawn dynamically
    const drawing = (e)=>{
        if(!isDrawing) return;
        const tempCtx = tempCtxRef.current;
        tempCtx.clearRect(0,0,tempCanvasRef.current.width, tempCanvasRef.current.height);

        if(selectedTool==="line"){
            drawLine(tempCtx,startPoint.x, startPoint.y,e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        }
        else if(selectedTool==="rectangle"){
            const x = Math.min(startPoint.x,e.nativeEvent.offsetX);
            const y = Math.min(startPoint.y,e.nativeEvent.offsetY);
            const width = Math.abs(startPoint.x-e.nativeEvent.offsetX);
            const height = Math.abs(startPoint.y-e.nativeEvent.offsetY);
            drawRectangle(tempCtx,x,y,width,height,currFillColor);
        }
        else if(selectedTool==="circle"){
            const centerX = (startPoint.x+e.nativeEvent.offsetX)/2;
            const centerY = (startPoint.y+e.nativeEvent.offsetY)/2;
            const radiusX = Math.abs(e.nativeEvent.offsetX-startPoint.x)/2;
            const radiusY = Math.abs(e.nativeEvent.offsetY-startPoint.y)/2;
            drawEllipse(tempCtx,centerX,centerY,radiusX,radiusY,currFillColor);
        }
        else if(selectedTool==="pen"){
            const x = e.nativeEvent.offsetX;
            const y = e.nativeEvent.offsetY;
            tempCtx.lineTo(x,y);
            tempCtx.stroke();
            setCurrentPenPath((prevPath)=>[...prevPath,{x,y}]);
        }
        else if(selectedTool==="arrow"){
            drawArrow(tempCtx, startPoint.x, startPoint.y, e.nativeEvent.offsetX, e.nativeEvent.offsetY,40,Math.PI/6);
        }
        else if(selectedTool==="eraser"){
            const x = e.nativeEvent.offsetX;
            const y = e.nativeEvent.offsetY;
            tempCtx.strokeStyle = "white";
            tempCtx.lineWidth = ERASER.SIZE_FACTOR*currentBrushSize;
            tempCtx.lineCap = "round";
            tempCtx.lineTo(x,y);
            tempCtx.stroke();
            setCurrentPenPath((prevPath)=>[...prevPath,{x,y}]);
        }
        else if(selectedTool==="magic_eraser"){
            const x = e.nativeEvent.offsetX;
            const y = e.nativeEvent.offsetY;
            setElements((prevElements)=>{
                const elementsToDelete = prevElements.filter((element)=> isElementNear(element,x,y));
                const updatedElements = prevElements.filter((element)=> !isElementNear(element,x,y));
                reDrawCanvas(updatedElements);
                return updatedElements;
            });

            return;
        }
    }

    const reDrawCanvas = (updatedElements)=>{
        const persistentCtx = persistentCtxRef.current;
        persistentCtx.clearRect(0,0,persistentCanvasRef.current.width, persistentCanvasRef.current.height);
        const tempCtx = tempCtxRef.current;

        updatedElements.forEach((element)=>{
            if(element.type==="pen"){
                persistentCtx.beginPath();
                persistentCtx.lineWidth = element.brushSize;
                persistentCtx.strokeStyle = element.brushColor;
                persistentCtx.moveTo(element.points[0].x, element.points[0].y);

                for(let i=1;i<element.points.length;i++){
                    persistentCtx.lineTo(element.points[i].x, element.points[i].y);
                }
                persistentCtx.stroke();
            }
            else if(element.type=="line"){
                persistentCtx.lineWidth = element.brushSize;
                persistentCtx.strokeStyle = element.brushColor;
                drawLine(persistentCtx,element.x1,element.y1,element.x2,element.y2);
            }
            else if(element.type==="rectangle"){
                persistentCtx.lineWidth = element.brushSize;
                persistentCtx.strokeStyle = element.brushColor;
                drawRectangle(persistentCtx,element.x1,element.y1,element.width,element.height,element.fillColor);
            }
            else if(element.type==="circle"){
                persistentCtx.lineWidth = element.brushSize;
                persistentCtx.strokeStyle = element.brushColor;
                drawEllipse(persistentCtx,element.x1, element.y1,element.radiusX, element.radiusY,element.fillColor);
            }
            else if(element.type==="arrow"){
                persistentCtx.lineWidth = element.brushSize;
                persistentCtx.strokeStyle = element.brushColor;
                drawArrow(persistentCtx,element.x1, element.y1, element.x2, element.y2,element.headLength, element.headAngle);
            }
            else if(element.type==="eraser"){
                persistentCtx.beginPath();
                persistentCtx.lineWidth = element.brushSize;
                persistentCtx.strokeStyle = element.brushColor;
                persistentCtx.lineCap = element.lineCap;
                persistentCtx.moveTo(element.points[0].x, element.points[0].y);
                for(let i=1;i<element.points.length;i++){
                    persistentCtx.lineTo(element.points[i].x, element.points[i].y);
                }
                persistentCtx.stroke();
            }
            else if(element.type==="text"){
                persistentCtxRef.current.font = `${element.fontSize}px 'Architects Daughter'`;
                persistentCtxRef.current.fillStyle = element.fontColor;
                persistentCtx.fillText(element.text,element.x1,element.y1);
            }
        })

        persistentCtx.lineWidth = currentBrushSize;
        persistentCtx.strokeStyle = currentBrushColor;
        tempCtx.lineWidth = currentBrushSize;
        tempCtx.strokeStyle = currentBrushColor;
        persistentCtxRef.current.fillStyle = currFillColor;
        persistentCtxRef.current.font = `${currentBrushSize}px 'Architects Daughter'`;
    }

    //undo feature
    const undo = ()=>{
        if(elements.length<1) return;
        const lastElement = elements[elements.length-1];
        setRedoHistory((prevHistory)=>[...prevHistory,lastElement]);
        setElements((prevElements)=>{
            const updatedElements = prevElements.slice(0,-1);
            reDrawCanvas(updatedElements);
            return updatedElements;
        });
        reDrawCanvas(elements);
    };

    const redo = ()=>{
        if(redoHistory.length===0) return;

        setElements((prevElements)=>{
            const nextElement = redoHistory[redoHistory.length-1];
            setRedoHistory((prevHistory)=>{
                const newHistory = prevHistory.slice(0,-1);
                return newHistory;
            });

            const updatedElements = [...prevElements,nextElement];
            reDrawCanvas(updatedElements);
            return updatedElements;
        });
    };

    useEffect(()=>{
        if(isWriting) return;
        const handleKeyDown=(e)=>{
            if(e.ctrlKey && (e.key==="z" || e.key==="Z")){
                e.preventDefault();
                undo();
            }
            else if(e.ctrlKey && (e.key==="y" || e.key==="Y")){
                e.preventDefault();
                redo();
            }
        };

        window.addEventListener("keydown",handleKeyDown);
        return()=>{
            window.removeEventListener("keydown",handleKeyDown);
        }
    },[elements,redoHistory]);

    const endDrawing = (e)=>{
        if(!isDrawing) return;

        if(selectedTool==="line"){
            const newElement = {
                type:"line",
                x1: startPoint.x,
                y1: startPoint.y,
                x2: e.nativeEvent.offsetX,
                y2: e.nativeEvent.offsetY,
                brushSize: currentBrushSize,
                brushColor: currentBrushColor
            };

            setElements((prevElement)=>{
                const updatedElements = [...prevElement,newElement];
                reDrawCanvas(updatedElements);
                return updatedElements;
            });  
        }
        
        else if(selectedTool==="rectangle"){
            //top-left 
            const x = Math.min(startPoint.x,e.nativeEvent.offsetX);
            const y = Math.min(startPoint.y,e.nativeEvent.offsetY);
            const width = Math.abs(startPoint.x-e.nativeEvent.offsetX);
            const height = Math.abs(startPoint.y-e.nativeEvent.offsetY);

            const newElement = {
                type:"rectangle",
                x1: x,
                y1: y,
                width: width,
                height: height,
                brushSize: currentBrushSize,
                brushColor: currentBrushColor,
                fillColor: currFillColor
            };

            setElements((prevElement)=>{
                const updatedElements = [...prevElement,newElement];
                reDrawCanvas(updatedElements);
                return updatedElements;
            });  
        }

        else if(selectedTool==="circle"){
            const centerX = (startPoint.x+e.nativeEvent.offsetX)/2;
            const centerY = (startPoint.y+e.nativeEvent.offsetY)/2;
            const radiusX = Math.abs(e.nativeEvent.offsetX-startPoint.x)/2;
            const radiusY = Math.abs(e.nativeEvent.offsetY-startPoint.y)/2;

            const newElement = {
                type:"circle",
                x1: centerX,
                y1: centerY,
                radiusX:radiusX,
                radiusY:radiusY,
                brushSize: currentBrushSize,
                brushColor: currentBrushColor,
                fillColor: currFillColor
            };

            setElements((prevElement)=>{
                const updatedElements = [...prevElement,newElement];
                reDrawCanvas(updatedElements);
                return updatedElements;
            });  

        }
        else if(selectedTool==="pen"){
            const x = e.nativeEvent.offsetX;
            const y = e.nativeEvent.offsetY;
            const finalPenPath = [...currentPenPath, {x,y}];
            const newElement={
                type:"pen",
                points: finalPenPath,
                brushSize: currentBrushSize,
                brushColor: currentBrushColor
            };
            setElements((prevElement)=>{
                const updatedElements = [...prevElement,newElement];
                reDrawCanvas(updatedElements);
                return updatedElements;
            });  
        }
        else if(selectedTool==="arrow"){
            const newElement = {
                type:"arrow",
                x1: startPoint.x,
                y1: startPoint.y,
                x2: e.nativeEvent.offsetX,
                y2: e.nativeEvent.offsetY,
                headLength: 40,
                headAngle: Math.PI/6,
                brushSize: currentBrushSize,
                brushColor: currentBrushColor
            };

            setElements((prevElement)=>{
                const updatedElements = [...prevElement,newElement];
                reDrawCanvas(updatedElements);
                return updatedElements;
            });  

        }
        else if(selectedTool==="eraser"){
            const x = e.nativeEvent.offsetX;
            const y = e.nativeEvent.offsetY;
            
            const finalPenPath = [...currentPenPath, {x,y}];
            const newElement={
                type:"eraser",
                points: finalPenPath,
                brushSize: ERASER.SIZE_FACTOR*currentBrushSize,
                brushColor: "white",
                lineCap:"round"
            };

            setElements((prevElement)=>{
                const updatedElements = [...prevElement,newElement];
                reDrawCanvas(updatedElements);
                return updatedElements;
            });  
        }
        
        setRedoHistory([[]]);
        setIsDrawing(false);
        const tempCtx = tempCtxRef.current;
        tempCtx.clearRect(0,0,tempCanvasRef.current.width, tempCanvasRef.current.height);
    };

    const save = ()=>{  
        const canvas = persistentCanvasRef.current;
        const link = document.createElement('a');
        link.download = 'creation.png';
        link.href = canvas.toDataURL();
        link.click();
    }

    return(
        <>
        <div className={Styles.main_DrawingBoard}>
        <ToolBar undo={undo} redo={redo} selectedTool={selectedTool} setSelectedTool={setSelectedTool} clearBoard={clearBoard} save={save}/>
        <ToolFeatures 
            currentBrushSize={currentBrushSize}
            setCurrentBrushSize={setCurrentBrushSize}
            currentBrushColor={currentBrushColor}
            setBrushColor={setBrushColor}
            currFillColor={currFillColor}
            setFillColor={setFillColor}
            selectedTool={selectedTool}
            />
        </div>
        
        <canvas ref={persistentCanvasRef} style={{position:'absolute'}}/>
        <canvas
            ref={tempCanvasRef}
            onMouseDown={startDrawing}
            onMouseMove={drawing}
            onMouseUp={endDrawing}
            style={{position:'absolute'}}
            >
            Drawing Board!!
        </canvas>
        </>
    )
}

export {DrawingBoard};