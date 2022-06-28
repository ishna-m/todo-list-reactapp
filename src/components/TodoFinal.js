import { useState } from 'react';
import TodoForm from './TodoForm';
import TodoProcess from './TodoProcess';

function TodoList() {
  const [todos, setTodos] = useState([]);

  function addTodo (todo) {
    //to prevent whitespace entries from being made in the list
    if (!todo.text || /^\s*$/.test(todo.text)) { 
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };

  function updateTodo (todoId, newValue) {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  function removeTodo (id) {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);
  };

  function completeTodo (id) {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete; //to toggle between true and false
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <TodoProcess
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;