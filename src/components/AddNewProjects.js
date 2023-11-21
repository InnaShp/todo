import React, { useState } from 'react';
import { Plus } from 'react-bootstrap-icons';
import Modal from './Modal';
import ProjectForm from './ProjectForm';
import { addDoc, collection, where, getDocs, query } from 'firebase/firestore';
import firebaseDB from '../firebase';

const AddNewProject = () => {
  const [showModal, setShowModal] = useState(false);
  const [projectName, setprojectName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (projectName) {
      const projectsRef = collection(firebaseDB, 'projects');
      getDocs(query(collection(firebaseDB, 'projects'), where('name', '==', projectName)))
        .then(querySnapshot => {
          querySnapshot.empty
            ? addDoc(projectsRef, { name: projectName })
            : alert('Project already exists!');
        })
        .catch(error => {
          console.error('Error querying projects:', error);
        });
      setShowModal(false);
      setprojectName('');
    }
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