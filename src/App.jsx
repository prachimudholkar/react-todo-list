import React, { useState } from 'react';
import logo from './tick.png';
import logo_purple from './tick-purple.png';
import plus from './plus.svg';
import plus_purple from './plus-purple.svg';
import deleteicon from './delete.svg';
import delete_purple from './purple-delete.svg';
import './App.css';

function App() {

    const ToDoList = () => {

        const [todo, setTodo] = useState([]);
        const [showInitialText, setShowInitialText] = useState(true);
        const [addInputClass, setaddInputClass] = useState(false);
        const [taskdone, setTaskdone] = useState(false);
        const [selectedTheme, setSelectedTheme] = useState('veges');

        // Adds one input to create a todo list 
        const AddToDo = () => {
            const currentTodos = [...todo];
            if (currentTodos.length > 0 && !currentTodos[currentTodos.length - 1].text) {
                setaddInputClass(true);
                return false;
            }
            else {
                setaddInputClass(false);
            }
            setTodo([...todo, { text: '', completed: false }]);
            setShowInitialText(false);
        };

        // Deletes the whole todo list
        const DeleteToDo = () => {
            if (todo.length === 0) {
                alert("Nothing to delete :)")
                return false;
            }
            let result = window.confirm("All items will be deleted. Are you sure ?");
            if (result === false) {
                return false;
            }
            setTodo([]);
            setShowInitialText(true);
        };

        // Function to handle input 
        const handleInputChange = (index, event) => {
            const newTodos = [...todo];
            newTodos[index].text = event.target.value;
            setTodo(newTodos);
        };

        // Function to handle checkbox state changes
        const handleCheckboxChange = (index) => {
            const newTodos = [...todo];
            newTodos[index].completed = !newTodos[index].completed;
            if (newTodos[index].completed === true) {
                setTaskdone(true);
                setTimeout(() => {
                    setTaskdone(false);
                }, 1000)
            }
            setTodo(newTodos);
        };

        return (
            <div className={`App ${selectedTheme === 'purple' ? 'purple-themeing' : selectedTheme === 'veges' ? 'veges-themeing' : selectedTheme === 'zebra' ? 'zebra-themeing' : ''}`}>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
                </meta>
                {/* Renders different theming for the app */}
                <div className='todo-themes'>
                    <div className='todo-purple' onClick={() => setSelectedTheme('purple')}>
                        <span className='purple-theme'></span>
                    </div>
                    <div className='todo-veges' onClick={() => setSelectedTheme('veges')}>
                        <span className='veges-theme'></span>
                    </div>
                    <div className='todo-zebra' onClick={() => setSelectedTheme('zebra')}>
                        <span className='zebra-theme'></span>
                    </div>
                </div>
                {/* Renders sparkling effect on completion of task */}
                <div className={`sparkle-not ${taskdone ? 'tada' : ''}`}>
                    {/* Renders app's title and logo */}
                    <header className='todo-header'>
                        <div className='App-logo'>
                            {selectedTheme === 'veges' ? (
                                <img src={logo} className='todo-logo' alt='logo of todo list'></img>
                            ) : selectedTheme === 'purple' ? (
                                <img src={logo_purple} className='todo-logo-purple' alt='logo of todo list'></img>
                            ) : selectedTheme === 'zebra' ? (
                                <img src={logo_purple} className='todo-logo-zebra' alt='logo of todo list'></img>
                            ) : ''
                            }
                        </div>
                        <p className={`todo-title ${selectedTheme === 'purple' ? 'purple-title' : selectedTheme === 'veges' ? 'veges-title' : selectedTheme === 'zebra' ? 'zebra-title' : ''}`}>Let's do it</p>
                        <p className={`todo-subtitle ${selectedTheme === 'purple' ? 'purple-subtitle' : selectedTheme === 'veges' ? 'veges-subtitle' : selectedTheme === 'zebra' ? 'zebra-subtitle' : ''}`}>Get your tasks done, the right way !</p>
                    </header>

                    {/* Renders the todo list */}
                    <div className={`todo-body ${selectedTheme === 'purple' ? 'purple-body' : selectedTheme === 'veges' ? 'veges-body' : selectedTheme === 'zebra' ? 'zebra-body' : ''}`}>
                        {showInitialText &&
                            <p className={`initial-todo-text ${selectedTheme === 'purple' ? 'purple-todo-text' : selectedTheme === 'veges' ? 'veges-todo-text' : selectedTheme === 'zebra' ? 'zebra-todo-text' : ''}`}>
                                Enlist your tasks here!
                                <span class="tooltiptext">Please click the plus button</span>
                            </p>
                        }
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
                                        autoFocus
                                        type='text'
                                        placeholder='Enter your task'
                                        className={`todo-input  ${selectedTheme === 'purple' ? 'purple-todo-input' : selectedTheme === 'veges' ? 'veges-todo-input' : selectedTheme === 'zebra' ? 'zebra-todo-input' : ''} ${(!todo.text.length && addInputClass) ? 'input-error' : ''}`}
                                        value={todo.text}
                                        onChange={(event) => handleInputChange(index, event)}
                                        required={true}
                                        style={{ textDecoration: todo.completed ? 'line-through grey' : '', color: todo.completed ? 'grey' : '' }}>
                                    </input>
                                    <div style={{ display: 'none' }}
                                        className={`${(!todo.text.length && addInputClass) ? 'input-empty' : ''} `}>
                                        Please fill in this task
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Renders the action buttons for todo, add and delete */}
                    <div className='todo-action-buttons'>
                        {/* Button to add one task in the list */}
                        <button className='todo-add-button' onClick={AddToDo}>
                            {selectedTheme === 'veges' ? (
                                <img src={plus} className='add-todo' alt='Button to add a task'></img>
                            ) : selectedTheme === 'purple' ? (
                                <img src={plus_purple} className='add-todo' alt='Button to add a task'></img>
                            ) : selectedTheme === 'zebra' ? (
                                <img src={plus} className='add-todo' alt='Button to add a task'></img>
                            ) : ''
                            }
                        </button>
                        {/* Button to delete the whole todo list */}
                        <button className='todo-delete-button' onClick={DeleteToDo}>
                            {selectedTheme === 'veges' ? (
                                <img src={deleteicon} className='delete-todo' alt='Button to delete the whole list'></img>

                            ) : selectedTheme === 'purple' ? (
                                <img src={delete_purple} className='delete-todo' alt='Button to delete the whole list'></img>

                            ) : selectedTheme === 'zebra' ? (
                                <img src={deleteicon} className='delete-todo' alt='Button to delete the whole list'></img>

                            ) : ''
                            }
                        </button>

                    </div>




                </div>
            </div>
        );
    };

    return <ToDoList />;
}

export default App;
