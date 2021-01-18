import React, {useState, useEffect} from "react"
import M from "materialize-css"
import { FaTrash } from "react-icons/fa"

const TodoItem = (props)=>{
    const [onEdit, setEditMode]=useState(false)
    const completeStyle={
        fontStyle: "italic",
        color: "teal",
        opacity: 0.5,
        textDecoration: "line-through",
    }
    const onEditMode=()=>{
        setEditMode(true)
    }
    const onSubmitUpdate = (event) =>{
        if(event.key==="Enter"){
            setEditMode(false)
        }
    }
    useEffect(()=>{
        return ()=>{
            // M.toast({html: 'Removed', classes: 'rounded'});
        }
    },[])

    const {completed, id, title} = props.todo
    let viewMode={}
    let editMode={}
    if(onEdit){
        viewMode.display = "none"
    } else {
        editMode.display = "none"
    }
    return <li className="collection-item">
            <div className="row" onDoubleClick={onEditMode}>
                <div className="col s10 m10 l11">
                    <label style={viewMode}>
                        <input type="checkbox" checked={completed} onChange={()=>props.onStatusClick(id)}/>
                        <span style={completed?completeStyle:null}>{title}</span> 
                    </label>
                    <input type="text" value={title} style={editMode} 
                            onKeyDown={onSubmitUpdate} 
                            onChange={(e)=>props.updateItem(e.target.value, id)}/>
                </div>
                <div className="col s2 m2 l1">
                    <button onClick={()=>props.onDeleteClick(id)} className="btn btn-flat"><FaTrash/></button>
                </div> 
            </div>            
        </li>
    
    
}

export default TodoItem