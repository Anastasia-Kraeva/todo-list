import React from 'react';
import Form from './Form';

const Icon = ({onClick, name}) => {
  return (
    <div className="button"
         onClick={onClick}
         style={{cursor: 'pointer'}}>
      <i className="material-icons">{name}</i>
    </div>
  )
}

const TodoList = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState('');
  const [todoEdit, setTodoEdit] = React.useState(null);

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleTodoAdd = (e) => {
    e.preventDefault()
    setTodos([...todos, {index: todos.length, value: todo, done: false}])
    setTodo('')
  }

  const deleteTodo = (e) => {
    setTodos(todos.filter((todo, i) => i !== +/\d+/.exec(e.target.closest('li').id)))
  }

  const doneTodo = (e) => {
    const i = +/\d+/.exec(e.target.closest('li').id)

    setTodos(todos.map(todo => {
      return todo.index === i
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

    todosCopy.splice(todoEdit.index, 1, {...todoEdit})
    setTodos([...todosCopy])
    setTodoEdit({})
  }

  const handleTodoEditStart = (e) => {
    const todoIndex = +/\d+/.exec(e.target.closest('li').id)
    setTodoEdit({...todos[todoIndex]})
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
        {todos?.map((todo, i) => {
          return (
            <li key={`tdli-${i}`}
                id={`tdli-${i}`}
                className={todo.done ? 'done' : null}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div>
                  <input type="checkbox"
                         onChange={doneTodo}
                         style={{cursor: 'pointer'}}/>
                  {todo.value}
                </div>
                <div>
                  <Icon onClick={handleTodoEditStart} name="edit"/>
                  <Icon onClick={deleteTodo} name="close"/>
                </div>
              </div>

              {todoEdit?.index === i &&
              <Form value={todoEdit.value}
                    handleChange={handleTodoChange}
                    handleSubmit={handleTodoEdit}
                    buttonText="Подтвердить"
                    handleCancel={handleCancel}/>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TodoList;
