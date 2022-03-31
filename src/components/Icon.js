import React from 'react';

const Icon = ({onClick, name}) => {
  return (
    <div className="button"
         onClick={onClick}
         style={{cursor: 'pointer'}}>
      <i className="material-icons">{name}</i>
    </div>
  )
}

export default Icon;
