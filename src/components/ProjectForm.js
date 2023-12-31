import React from 'react';

const ProjectForm = ({
  handleSubmit,
  heading,
  value,
  setValue,
  setShowModal,
  confirmButtonText
}) => {
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
      <button className='cancel' onClick={() => setShowModal(false)}>
        cancel
      </button>
      <button className='confirm' type='submit'>
        {confirmButtonText}
      </button>
    </form>
  )
}

export default ProjectForm;