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
  const apipath = "https://react-server.herokuapp.com/api"

  const [todos, setTodo]=useState([])
  useEffect(()=>{
    const temp = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(temp)  
    if (loadedTodos) {
      setTodo(loadedTodos)
    } else {
      (async ()=>{
        let res = await fetch(`${apipath}/getAll`)
        let todo = await res.json()
        setTodo(JSON.parse(todo.todos))
      })()
    }
  },[])
  const onStatusClick= async (id)=>{
    await fetch(`${apipath}/updateTodo/${id}`,{
      method:"PUT",
      headers:{
        "Accept":"application/x-www-form-urlencoded",
        "Content-Type":"application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        completed: "true"
      })
    })
    setTodo(prevState => 
      prevState.map(todo => {
        if (todo._id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo
      })
    )
  }
  const onDeleteClick= async (id)=>{
    await fetch(`${apipath}/removeTodo/${id}`,{
      method:"DELETE",
    })
    setTodo(
      [
        ...todos.filter(todo => {
          return todo._id !== id;
        })
      ]
    );
  }
  const addTodoItem= async (item)=>{
    let new_id = uuidv4()
    await fetch(`${apipath}/saveTodo`,{
      method:"POST",
      headers:{
        "Accept":"application/x-www-form-urlencoded",
        "Content-Type":"application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        id: new_id,
        title: item,
        completed: false,
      })
    })
    setTodo(
      [...todos,{ 
        _id: new_id,
        title: item,
        completed: false
      }]
    )
  }
  const updateItem=(newTitle, id)=>{
    setTodo(
      todos.map(todo => {
        if (todo._id === id) {
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
