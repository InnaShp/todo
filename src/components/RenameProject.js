import React, { useState } from 'react';
import ProjectForm from './ProjectForm';

const RenameProject = ({ project, setShowModal }) => {
  const [newProjectName, setnewProjectName] = useState(project.name);
  function handleSubmit(e) {

  }
  return (
    <div className='RenameProject'>
      <ProjectForm
        handleSubmit={handleSubmit}
        heading='Edit project name!'
        value={newProjectName}
        setValue={setnewProjectName}
        setShowModal={setShowModal}
        confirmButtonText='Confirm'
      />
    </div>
  )
}

export default RenameProject;