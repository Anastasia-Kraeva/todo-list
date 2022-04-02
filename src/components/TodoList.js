import React from 'react';

import DraggableItemWrapper from './DraggableItemWrapper';
import TodoListItem from './TodoListItem';
import Form from './Form';

const TodoList = ({todos, setTodos, todosIds, setTodosIds}) => {
  const [todo, setTodo] = React.useState('');
  const [todoEdit, setTodoEdit] = React.useState({});

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleTodoAdd = (e) => {
    e.preventDefault()
    const id = `${todos.length}`

    setTodosIds([...todosIds, id])
    setTodos([...todos, {id: id, value: todo, done: false}])
    setTodo('')
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const doneTodo = (id) => {
    setTodos(todos.map(todo => {
      return todo.id === id
        ? {...todo, done: !todo.done}
        : todo
    }))
  }

  const handleTodoChange = (e) => {
    setTodoEdit({...todoEdit, value: e.target.value})
  }

  const handleTodoEdit = (e) => {
    e.preventDefault()
    const todosCopy = [...todos]

    todosCopy.splice(todoEdit.id, 1, {...todoEdit})
    setTodos([...todosCopy])
    setTodoEdit({})
  }

  const handleTodoEditStart = (id) => {
    setTodoEdit({...todos.find(todo => todo.id === id)})
  }

  const handleCancel = () => setTodoEdit({})

  return (
    <div className="container">
      <Form value={todo}
            handleChange={handleChange}
            handleSubmit={handleTodoAdd}
            buttonText="Добавить"
      />
      <ul className="todoList">
        {todos?.map((todo, position) => {
          return (
            <DraggableItemWrapper key={todo.id}
                                  draggableId={todo.id}
                                  index={position}>
              <TodoListItem todo={todo}
                            handleTodoEditStart={() => {
                          handleTodoEditStart(todo.id)
                        }}
                            doneTodo={() => {
                          doneTodo(todo.id)
                        }}
                            deleteTodo={() => {
                          deleteTodo(todo.id)
                        }}>
                {todoEdit?.id === todo.id &&
                <Form value={todoEdit.value}
                      handleChange={handleTodoChange}
                      handleSubmit={handleTodoEdit}
                      buttonText="Подтвердить"
                      handleCancel={handleCancel}/>}
              </TodoListItem>
            </DraggableItemWrapper>
          )
        })}
      </ul>
    </div>
  )
}

export default TodoList;
