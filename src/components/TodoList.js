import React from "react"
import TodoItem from "./TodoItem"
import styles from "../stylesheets/TodoList.module.css"
const TodoList = (props) => {
  console.log(props.todos)
  return (
    <ul className={styles.list_container+" collection"}>
      {props.todos.map(todo => (
        <TodoItem key={todo.id} 
                  todo = {todo} 
                  onStatusClick={props.onStatusClick} 
                  onDeleteClick={props.onDeleteClick} 
                  updateItem={props.updateItem}
        />
      ))}
    </ul>
  )

}

export default TodoList