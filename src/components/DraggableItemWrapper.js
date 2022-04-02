import React from 'react';
import {Draggable} from 'react-beautiful-dnd';

export default (props) => {
  return (
    <Draggable draggableId={props.draggableId} index={props.index}>
      {(provided) => (
        <div className={props.className}
             ref={provided.innerRef}
             {...provided.draggableProps}
             {...provided.dragHandleProps}>
          {props.children}
        </div>
      )}
    </Draggable>
  )
}
