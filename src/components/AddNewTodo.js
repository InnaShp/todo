import React, { useContext, useEffect, useState } from 'react';
import Modal from './Modal';
import TodoForm from './TodoForm';
import { TodoContext } from '../context';
import firebaseDB from '../firebase';
import { calendarItems } from '../constants';
import { addDoc, collection } from 'firebase/firestore';
import moment from 'moment';
import randomColor from 'randomcolor';


const AddNewTodo = () => {
  const { projects, selectedProject } = useContext(TodoContext);

  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState('');
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [todoProject, setTodoProject] = useState(selectedProject);

  function handleSubmit(e) {
    e.preventDefault();
    if (text && !calendarItems.includes(todoProject)) {
      const data = {
        text: text,
        date: moment(day).format('MM/DD/YYYY'),
        day: moment(day).format('d'),
        time: moment(time).format('hh:mm A'),
        checked: false,
        color: randomColor({ luminosity: 'bright' }),
        projectName: todoProject
      }
      addDoc(collection(firebaseDB, 'todos'), data);
      setShowModal(false);
      setText('');
      setDay(new Date());
      setTime(new Date());
    }
  }

  useEffect(() => {
    setTodoProject(selectedProject)
  }, [selectedProject]);

  return (
    <div className='AddNewTodo'>
      <div className='btn'>
        <button onClick={() => setShowModal(true)}>
          + New To do
        </button>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <TodoForm
          handleSubmit={handleSubmit}
          heading='Add new to do!'
          text={text}
          setText={setText}
          day={day}
          setDay={setDay}
          time={time}
          setTime={setTime}
          todoProject={todoProject}
          setTodoProject={setTodoProject}
          projects={projects}
          showButtons={true}
          setShowModal={setShowModal}
        />
      </Modal>
    </div>
  )
}

export default AddNewTodo;