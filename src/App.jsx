import React, { useState } from 'react';
import logo from './tick.png';
import plus from './plus.svg';
import deleteicon from './delete.svg';
import './App.css';

function App() {

    const ToDoList = () => {
        const [todo, setTodo] = useState([]);
        const [showInitialText, setShowInitialText] = useState(true);
        const [addClass, setAddClass] = useState(false);
        const [taskdone, setTaskdone] = useState(false);


        const AddToDo = (event) => {
            const currentTodos = [...todo];
            if (currentTodos.length > 0 && !currentTodos[currentTodos.length - 1].text) {
                setAddClass(true);
                return false;
            }
            else {
                setAddClass(false);
            }
            setTodo([...todo, { text: '', completed: false }]);
            setShowInitialText(false);
        };

        const DeleteToDo = () => {
            if(todo.length == 0) {
                alert("Nothing to delete :)")
                return false;
            }
            let result = window.confirm("All items will be deleted. Are you sure ?");
            if ( result == false) {
                return false;
            }
            setTodo([]);
            setShowInitialText(true);
        };

        const handleInputChange = (index, event) => {
            const newTodos = [...todo];
            newTodos[index].text = event.target.value;
            setTodo(newTodos);
        };

        // Function to handle checkbox state changes
        const handleCheckboxChange = (index) => {
            const newTodos = [...todo];
            newTodos[index].completed = !newTodos[index].completed;
            if (newTodos[index].completed == true) {
                setTaskdone(true);
                setTimeout( ()=> {
                    setTaskdone(false);
                }, 1000)
            }
            setTodo(newTodos);
        };

        return (
            <div className="App">
                <div className={`sparkle-not ${taskdone ? 'tada' : ''}`}>
                <header className='todo-header'>
                    <div className='App-logo'>
                        <img src={logo} className='todo-logo'></img>
                    </div>
                    <p className='todo-title'>Let's do it</p>
                    <p className='todo-subtitle'>Get your tasks done, the right way !</p>
                </header>
                <div className='todo-body'>
                    
                    {showInitialText && <p className='initial-todo-text'>Enlist your tasks here!</p>}
                    <ul className='todo-list'>
                        {todo.map((todo, index) => (
                            <li key={index} className='todo-task'>
                                <input 
                                    type='checkbox' 
                                    checked={todo.completed} 
                                    className='todo-checkbox' 
                                    onChange={() => handleCheckboxChange(index)}>
                                </input>
                                <input 
                                    type='text' 
                                    placeholder='Enter your task' 
                                    className={`todo-input ${(!todo.text.length && addClass) ? 'input-error' : ''} `} 
                                    value={todo.text} 
                                    onChange={(event) => handleInputChange(index, event)} 
                                    required={true} 
                                    style={{ textDecoration: todo.completed ? 'line-through grey' : '',  color : todo.completed ? 'grey' : ''}}>
                                </input>
                                <div style={{display: 'none'}} 
                                className={`${(!todo.text.length && addClass) ? 'input-empty' : ''} `}>
                                    Please fill in this task
                                </div>
                            </li>
                        ))}
                    </ul>
                    {/* <ul className='todo-list'>
                        <li className='todo-task'>
                            <input type='checkbox' className='todo-checkbox'></input>
                            <input type='text' placeholder='Enter your task' className='todo-input'></input>
                        </li>
                    </ul> */}
                </div>
                <button className='todo-add-button' onClick={AddToDo}>
                    <img src={plus} className='add-todo'></img>
                </button>
                <button className='todo-delete-button' onClick={DeleteToDo}>
                    <img src={deleteicon} className='delete-todo'></img>
                </button>
            </div>
            </div>
        );
    };

    return <ToDoList />;
}

export default App;
