import React from 'react';

const ProjectForm = ({ handleSubmit, heading, value, setValue, setShowModal, confirmButtonText }) => {
  return (
    <form className='ProjectForm' onSubmit={handleSubmit}>
      <h3>{heading}</h3>
      <input
        type='text'
        value={value}
        placeholder='project name...'
        onChange={(e) => setValue(e.target.value)}
        autoFocus
      />
      <button 
        className='cancel' 
        role='button' 
        onClick={() => setShowModal(false)}
      >
        cancel
      </button>
      <button 
        className='confirm' 
        role='button' 
        onClick={() => setShowModal(false)}
      >
        {confirmButtonText}
      </button>
    </form>
  )
}

export default ProjectForm;