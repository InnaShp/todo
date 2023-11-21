import React, { useContext, useState } from 'react';
import RenameProject from './RenameProject';
import { Pencil, XCircle } from 'react-bootstrap-icons';
import Modal from './Modal';
import { TodoContext } from '../context'
import firebaseDB from '../firebase';
import { doc, deleteDoc, where, query, getDocs, collection } from "firebase/firestore";
import { useSpring, animated, useTransition } from 'react-spring';

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
      if (selectedProject === project.name) setSelectedProject(defaultProject);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  }

  const fadeIn = useSpring({
    from: { marginTop: '-12px', opacity: 0 },
    to: { marginTop: '0px', opacity: 1 }
  });

  const btnTransitions = useTransition(edit, {
    from: { opacity: 0, right: '-20px' },
    enter: { opacity: 1, right: '0px' },
    leave: { opacity: 0, right: '-20px' }
  });

  return (
    <animated.div className='Project' style={fadeIn}>
      <div
        className="name"
        onClick={() => setSelectedProject(project.name)}
      >
        {project.name}
      </div>
      <div className="btns">
        {
          btnTransitions((props, editProject) =>
            editProject ?
              <animated.div className="edit-delete" style={props}>
                <span
                  className="edit"
                  onClick={() => setShowModal(true)}
                >
                  <Pencil size="13" />
                </span>
                <span className="delete" onClick={() => deleteProject(project)}>
                  <XCircle size="13" />
                </span>
              </animated.div>
              :
              project.numOfTodos === 0 ?
                ""
                :
                <animated.div className="total-todos" style={props}>
                  {project.numOfTodos}
                </animated.div>
          )
        }
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <RenameProject project={project} setShowModal={setShowModal} />
      </Modal>
    </animated.div>
  )
}

export default Project;