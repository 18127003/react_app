import React from "react"
import ReactDOM from "react-dom"
import TodoContainer from "./components/TodoContainer"
import "./stylesheets/App.css"
import { HashRouter as Router } from "react-router-dom"

ReactDOM.render(
    <React.StrictMode>
        <Router>    
            <TodoContainer/>
        </Router>
    </React.StrictMode>
    , document.getElementById("root"))