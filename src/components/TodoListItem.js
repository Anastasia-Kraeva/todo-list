import React from 'react';
import Icon from './Icon';

const TodoListItem = (props) => {
  const {todo, handleTodoEditStart, doneTodo, deleteTodo} = props

  return (
    <li id={`tdli-${todo.id}`}
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
      {props.children}
    </li>
  )
}

export default TodoListItem;
