import React from 'react';

const Form = ({value, handleChange, handleSubmit, buttonText, handleCancel}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input value={value}
             onChange={handleChange}/>
      <input type="submit"
             value={buttonText}/>
      {!!handleCancel && <input type="button" value="Отменить" onClick={handleCancel}/>}
    </form>
  )
}

export default Form;
