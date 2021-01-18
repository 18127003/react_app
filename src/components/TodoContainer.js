import React, {useState, useEffect} from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./TodoList"
import Header from "./Header"
import TodoInput from "./TodoInput"
import About from "./About"
import Error from "../pages/Error"
import Navbar from "./Navbar";
import { Route, Switch } from "react-router-dom"

const TodoContainer = ()=> {
  const initTodos = ()=>{
    const temp = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(temp)
    if (loadedTodos.length>0) {
      return loadedTodos
    } else {
      (async ()=>{
        let res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
        let todo = await res.json()
        return todo
      })()    
    }
  }
  const [todos, setTodo]=useState(initTodos())

  const onStatusClick=(id)=>{
    setTodo(prevState => 
      prevState.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo
      })
    )
  }
  const onDeleteClick=(id)=>{
    setTodo(
      [
        ...todos.filter(todo => {
          return todo.id !== id;
        })
      ]
    );
  }
  const addTodoItem=(item)=>{
    setTodo(
      [...todos,{ 
        id: uuidv4(),
        title: item,
        completed: false
      }]
    )
  }
  const updateItem=(newTitle, id)=>{
    setTodo(
      todos.map(todo => {
        if (todo.id === id) {
          todo.title = newTitle
        }
        return todo
      })
    )
  }

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])

  return (
    <React.Fragment>
      <Navbar/>
      <Switch>
        <Route exact path="/">
          <div className="container">
            <Header/>
            <TodoInput addTodoItem={addTodoItem}/>
            <TodoList todos={todos} onStatusClick={onStatusClick} onDeleteClick={onDeleteClick} updateItem={updateItem}/>
          </div>
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </React.Fragment>
  );
  
}
export default TodoContainer;
