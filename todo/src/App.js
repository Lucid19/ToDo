import './App.css';
import React, {useState} from 'react';

const TodoList = (props) => {
  function handleChange(event){
    const li = event.target.parentNode
    const id = li.id

    props.todoItems.splice(id, 1)
    localStorage.setItem("todoList", JSON.stringify(props.todoItems))
    props.setTodoItems(JSON.parse(localStorage.getItem("todoList")))

  }

  return (
    <div>
      <h1>You have {props.todoItems.length} todos left</h1>
      {props.todoItems.map((todo, index) =>
        <li key={index} id={index} className="todoItem">
          <div className="text">{todo.todo}</div>
          <input onClick={handleChange} value="X" type="button" className="delete"></input>
      </li>)}
    </div> 
  )
}

const TodoSubmit = (props) => {
  function handleChange(event){
    props.setTextValue(event.target.value)
  }

  function handleSubmit(event){
    event.preventDefault()

    if(props.textValue) {
      props.todoItems.push({todo:props.textValue})
      localStorage.setItem("todoItems", JSON.stringify(props.todoItems))
      props.setTodoItems(JSON.parse(localStorage.getItem("todoItems")))
    }

    props.setTextValue("")
  }

  return(
    <form onSubmit={handleSubmit}>
        <input value={props.textValue} onChange={handleChange} type="text"></input>
        <input type="submit" value="Add"></input>
    </form>
  )
}

function App() {

  const [textValue, setTextValue] = useState("")
  const [todoItems, setTodoItems] = useState(JSON.parse(localStorage.getItem("todoItems")) ? JSON.parse(localStorage.getItem("todoItems")) : [])

  return (
    <div className="App">
      <h1>Todo</h1>
        <TodoSubmit textValue={textValue} setTextValue={setTextValue} todoItems={todoItems} setTodoItems={setTodoItems}/>
        <TodoList todoItems={todoItems} setTodoItems={setTodoItems}/>
    </div>
  );
}

export default App;
