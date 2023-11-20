import React, { useState } from 'react';
import { ArrowClockwise, CheckCircleFill, Circle, Trash } from 'react-bootstrap-icons';
import firebaseDB from '../firebase';
import { doc, deleteDoc } from "firebase/firestore";

const Todo = ({ todo }) => {
  const [hover, setHover] = useState(false);

  async function deleteTodo(todo) {
    try {
      await deleteDoc(doc(firebaseDB, "todos", todo.id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  return (
    <div className='Todo'>
      <div
        className='todo-container'
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className='check-todo'>
          {
            todo.checked ?
              <span className='checked'>
                <CheckCircleFill color='#bebebe' />
              </span>
              :
              <span className='unchecked'>
                <Circle color={todo.color} />
              </span>
          }
        </div>
        <div className='text'>
          <p style={{ color: todo.checked ? '#bebebe' : '#000000' }}>{todo.text}</p>
          <span>{todo.time} - {todo.projectName}</span>
          <div className={`line ${todo.checked ? 'line-through' : ''}`}></div>
        </div>
        <div className='add-to-next-day'>
          {
            todo.checked &&
            <span>
              <ArrowClockwise />
            </span>
          }
        </div>
        <div className='delete-todo' onClick={() => deleteTodo(todo)}>
          {
            (todo.checked || hover) &&
            <span>
              <Trash />
            </span>
          }
        </div>
      </div>
    </div>
  )
}

export default Todo;