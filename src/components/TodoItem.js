import React, {useState, useEffect, useRef} from "react"
// import M from "materialize-css"
import { FaTrash } from "react-icons/fa"

const TodoItem = (props)=>{
    const apipath = "http://localhost:5500"
    const [onEdit, setEditMode]=useState(false)
    const inputRef = useRef(null);
    const {completed, _id, title} = props.todo
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
            (async ()=>{
                await fetch(`${apipath}/updateTodo/${_id}`,{
                    method:"PUT",
                    headers:{
                    "Accept":"application/x-www-form-urlencoded",
                    "Content-Type":"application/x-www-form-urlencoded"
                    },
                    body: new URLSearchParams({
                    title: inputRef.current.value,
                    })
                })
                setEditMode(false)
            })()
        }
    }
    useEffect(()=>{
        return ()=>{
            // M.toast({html: 'Removed', classes: 'rounded'});
        }
    },[])

    
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
                        <input type="checkbox" checked={completed} onChange={()=>props.onStatusClick(_id)}/>
                        <span style={completed?completeStyle:null}>{title}</span> 
                    </label>
                    <input type="text" value={title} style={editMode} 
                            onKeyDown={onSubmitUpdate} 
                            onChange={(e)=>props.updateItem(e.target.value, _id)}
                            ref={inputRef}/>
                </div>
                <div className="col s2 m2 l1">
                    <button onClick={()=>props.onDeleteClick(_id)} className="btn btn-flat"><FaTrash/></button>
                </div> 
            </div>            
        </li>
    
    
}

export default TodoItem