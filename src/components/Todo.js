import React, { useState } from 'react';
import { ArrowClockwise, CheckCircleFill, Circle, Trash } from 'react-bootstrap-icons';
import firebaseDB from '../firebase';
import { doc, deleteDoc, updateDoc, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import moment from 'moment';

const Todo = ({ todo }) => {
  const [hover, setHover] = useState(false);

  async function deleteTodo(todo) {
    try {
      await deleteDoc(doc(firebaseDB, "todos", todo.id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  async function checkTodo(todo) {
    try {
      const todosRef = collection(firebaseDB, 'todos');
      await updateDoc(doc(todosRef, todo.id), {
        checked: !todo.checked
      });
    } catch (error) {
      console.error("Error checking todo:", error);
    }
  }

  async function repeatTodoNextDay(todo) {
    const nextDayDate = moment(todo.date, 'MM/DD/YYYY').add(1, 'days');
    const repeatedTodo = {
      ...todo,
      checked: false,
      date: nextDayDate.format('MM/DD/YYYY'),
      day: nextDayDate.format('d'),
    }
    delete repeatedTodo.id;
    const todosRef = collection(firebaseDB, 'todos');
    const existingTodoQuery = query(
      todosRef,
      where('projectName', '==', repeatedTodo.projectName),
      where('date', '==', repeatedTodo.date)
    );
    try {
      const existingTodosSnapshot = await getDocs(existingTodoQuery);

      if (existingTodosSnapshot.empty) {
        await addDoc(todosRef, repeatedTodo);
      }
    } catch (error) {
      console.error("Error repeating todo:", error);
    }
  }

  return (
    <div className='Todo'>
      <div
        className='todo-container'
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className='check-todo'
          onClick={() => checkTodo(todo)}
        >
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
        <div
          className='add-to-next-day'
          onClick={() => repeatTodoNextDay(todo)}
        >
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