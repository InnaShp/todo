import React, { useContext, useState } from 'react';
import ProjectForm from './ProjectForm';
import firebaseDB from '../firebase';
import { doc, updateDoc, where, query, getDocs, collection } from "firebase/firestore";
import { TodoContext } from '../context';

const RenameProject = ({ project, setShowModal }) => {
  const [newProjectName, setnewProjectName] = useState(project.name);
  const { selectedProject, setSelectedProject } = useContext(TodoContext);

  async function renameProjectName(project, newProjectName) {
    const projectsRef = collection(firebaseDB, 'projects');
    const todosRef = collection(firebaseDB, 'todos');
    const { name: oldProjectName } = project;
    try {
      const projectSnapshot = await getDocs(query(projectsRef, where('name', '==', newProjectName)));
      if (!projectSnapshot.empty) {
        alert('Project with the same name already exists!');
      } else {
        await updateDoc(doc(projectsRef, project.id), {
          name: newProjectName
        });
        const todosSnapshot = await getDocs(query(todosRef, where('projectName', '==', oldProjectName)));
        for (const todoDoc of todosSnapshot.docs) {
          await updateDoc(todoDoc.ref, {
            projectName: newProjectName
          });
        }
        if (selectedProject === oldProjectName) setSelectedProject(newProjectName);
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    renameProjectName(project, newProjectName);
    setShowModal(false);
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