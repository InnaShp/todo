import React, { useContext, useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import { TodoContext } from '../context';
import moment from 'moment';
import { collection, doc, updateDoc } from 'firebase/firestore';
import firebaseDB from '../firebase';

const EditTodo = () => {
  const [text, setText] = useState('');
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [todoProject, setTodoProject] = useState('');

  const { selectedTodo, projects } = useContext(TodoContext);

  function handleSubmit(e) {
  }

  useEffect(() => {
    if (selectedTodo) {
      setText(selectedTodo.text);
      setDay(moment(selectedTodo.date, 'MM/DD/YYYY').toDate());
      setTime(moment(selectedTodo.time, 'hh:mm A').toDate());
      setTodoProject(selectedTodo.projectName);
    }
  }, [selectedTodo]);

  useEffect(() => {
    try {
      if (selectedTodo) {
        const todosRef = collection(firebaseDB, 'todos');
        const data = {
          text,
          date: moment(day).format('MM/DD/YYYY'),
          day: moment(day).format('d'),
          time: moment(time).format('hh:mm A'),
          projectName: todoProject
        }
        updateDoc(doc(todosRef, selectedTodo.id), data);
      }
    } catch (error) {
      console.log('Error editing todo:', error);
    }

  }, [text, day, time, todoProject, selectedTodo]);

  return (
    <div>
      {
        selectedTodo &&
        <div className='EditTodo'>
          <div className='header'>
            Edit To do
          </div>
          <div className='container'>
            <TodoForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              day={day}
              setDay={setDay}
              time={time}
              setTime={setTime}
              todoProject={todoProject}
              setTodoProject={setTodoProject}
              projects={projects}
            />
          </div>
        </div>
      }
    </div>
  )
}

export default EditTodo;