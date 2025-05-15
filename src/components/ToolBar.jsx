import Styles from '../styles/ToolBar.module.css';
import { TOOLS} from '../constants.jsx';


const Tool = ({selectedTool, clearBoard, setSelectedTool, name, icon, undo,redo, save})=>{
  return(
        <div 
          className={`${Styles.tool} ${selectedTool===name? Styles.active: ''}`}
          onClick={() =>{
            if(name==="clear") clearBoard();
            else if(name==="undo") undo();
            else if(name==="redo") redo();
            else if(name==="save") save();
            else setSelectedTool(name);
          }}
        >
        {icon}
        </div>
  )
}

const ToolBar = ({selectedTool, setSelectedTool, clearBoard, undo, redo, save})=>{
    return(
        <>
        <div className={Styles.main_Toolbar}>
          {
            TOOLS.map((tool)=>(
              <Tool
               key={tool.name}
               selectedTool={selectedTool}
               setSelectedTool={setSelectedTool}
               clearBoard={clearBoard}
               name={tool.name}
               icon={tool.icon}
               undo={undo} 
               redo={redo}
               save={save}
              />
            ))
          }
        </div>
        </>
    )
}

export {ToolBar};