import React, { useState } from 'react';
import { Plus } from 'react-bootstrap-icons';
import Modal from './Modal';
import ProjectForm from './ProjectForm';

const AddNewProject = () => {
  const [showModal, setShowModal] = useState(false);
  const [projectName, setprojectName] = useState('');
  function handleSubmit(e) {

  }
  return (
    <div className='AddNewProject'>
      <div className='add-button'>
        <span onClick={() => setShowModal(true)}>
          <Plus size='20' />
        </span>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <ProjectForm 
          handleSubmit={handleSubmit}
          heading='New project!'
          value={projectName}
          setValue={setprojectName}
          setShowModal={setShowModal}
          confirmButtonText='+ Add Project'
        />
      </Modal>
    </div>
  )
}

export default AddNewProject;