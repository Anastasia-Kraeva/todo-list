import React from 'react';
import {DragDropContext} from 'react-beautiful-dnd';

import DroppableWrapper from './DroppableWrapper';
import TodoList from './TodoList';

const DnDTodoList = () => {
  const [columnId] = React.useState('todoList');
  const [todosIds, setTodosIds] = React.useState([]);
  const [todos, setTodos] = React.useState([]);

  const onDragEnd = ({destination, source, draggableId}) => {
    if (!destination) return null

    const newTodosIds = [...todosIds]
    newTodosIds.splice(source.index, 1)
    newTodosIds.splice(destination.index, 0, draggableId)

    const newTodos = newTodosIds.map(todoId => todos.find(todo => todo.id === todoId))

    setTodosIds(newTodosIds)
    setTodos(newTodos)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DroppableWrapper className="source" droppableId={columnId}>
        <TodoList todos={todos}
                  setTodos={setTodos}
                  todosIds={todosIds}
                  setTodosIds={setTodosIds}/>
      </DroppableWrapper>
    </DragDropContext>
  )
}

export default DnDTodoList;
