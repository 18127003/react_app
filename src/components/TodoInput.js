import React, { useState } from "react"
import styles from "../stylesheets/TodoInput.module.css"
import { FaPlusCircle } from "react-icons/fa"

const TodoInput = (props) => {
    const [input, setInput]=useState({
        current:"",
    })
    const onChange = (input) => {
        setInput({
            ...input, 
            [input.target.name]: input.target.value
        })
    }
    const onSubmit=(event)=>{
        event.preventDefault();
        if(input.current.trim()){
            props.addTodoItem(input.current)
            setInput({
                current:""
            })
        } else {
            alert("Empty item")
        }
        
    }
    
    return (
        <div className="card white hoverable" id={styles.form_card}>
            <form onSubmit={onSubmit} className="form-container">
                <div className="row card-content">
                    <div className="col s10 m10 l11">
                        <input type="text" placeholder="Add Todo..." value={input.current} 
                                name = 'current'
                                onChange={onChange} 
                                className={styles.input_text} />
                    </div>
                    <div className="col s2 m2 l1">
                        <button className="input-submit btn btn-floating"><FaPlusCircle/></button>
                    </div>
                </div>
            </form>
        </div>
    )
    
}
export default TodoInput