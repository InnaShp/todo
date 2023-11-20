import React, { useContext, useState } from 'react';
import RenameProject from './RenameProject';
import { Pencil, XCircle } from 'react-bootstrap-icons';
import Modal from './Modal';
import { TodoContext } from '../context'
import firebaseDB from '../firebase';
import { doc, deleteDoc, where, query, getDocs, collection } from "firebase/firestore";

const Project = ({ project, edit }) => {
  const { selectedProject, defaultProject, setSelectedProject } = useContext(TodoContext);
  const [showModal, setShowModal] = useState(false);

  async function deleteProject(project) {
    try {
      await deleteDoc(doc(firebaseDB, "projects", project.id));

      const todosQuery = query(
        collection(firebaseDB, "todos"),
        where('projectName', '==', project.name)
      );
      const todosSnapshot = await getDocs(todosQuery);

      for (const doc of todosSnapshot.docs) {
        await deleteDoc(doc.ref);
      }

      if (selectedProject === project.name) {
        setSelectedProject(defaultProject);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  }

  return (
    <div className='Project'>
      <div
        className="name"
        onClick={() => setSelectedProject(project.name)}
      >
        {project.name}
      </div>
      <div className="btns">
        {
          edit ?
            <div className="edit-delete">
              <span
                className="edit"
                onClick={() => setShowModal(true)}
              >
                <Pencil size="13" />
              </span>
              <span className="delete" onClick={() => deleteProject(project)}>
                <XCircle size="13" />
              </span>
            </div>
            :
            project.numOfTodos === 0 ?
              ""
              :
              <div className="total-todos">
                {project.numOfTodos}
              </div>
        }
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <RenameProject project={project} setShowModal={setShowModal} />
      </Modal>
    </div>
  )
}

export default Project;