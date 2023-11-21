import React, { useContext, useState } from 'react';
import { ArrowClockwise, CheckCircleFill, Circle, Trash } from 'react-bootstrap-icons';
import firebaseDB from '../firebase';
import { doc, deleteDoc, updateDoc, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import moment from 'moment';
import { TodoContext } from '../context';
import { animated, useSpring, useTransition } from 'react-spring';

const Todo = ({ todo }) => {
  const [hover, setHover] = useState(false);
  const { selectedTodo, setSelectedTodo } = useContext(TodoContext);

  async function deleteTodo(todo) {
    try {
      await deleteDoc(doc(firebaseDB, "todos", todo.id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  function handleDelete(todo) {
    deleteTodo(todo);
    if (todo === selectedTodo) {
      setSelectedTodo(undefined);
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

    try {
      const todosRef = collection(firebaseDB, 'todos');
      const existingTodoQuery = query(
        todosRef,
        where('projectName', '==', repeatedTodo.projectName),
        where('date', '==', repeatedTodo.date)
      );
      const existingTodosSnapshot = await getDocs(existingTodoQuery);

      if (existingTodosSnapshot.empty) {
        await addDoc(todosRef, repeatedTodo);
      }
    } catch (error) {
      console.error("Error repeating todo:", error);
    }
  }

  const fadeIn = useSpring({
    from: { marginTop: '-12px', opacity: 0 },
    to: { marginTop: '0px', opacity: 1 }
  });

  const checkTransitions = useTransition(todo.checked, {
    from: { position: 'absolute', transform: 'scale(0)' },
    enter: { transform: 'scale(1)' },
    leave: { transform: 'scale(0)' }
  });

  return (
    <animated.div className='Todo' style={fadeIn}>
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
            checkTransitions((props, checked) =>
              checked ?
                <animated.span style={props} className='checked'>
                  <CheckCircleFill color='#bebebe' />
                </animated.span>
                :
                <animated.span style={props} className='unchecked'>
                  <Circle color={todo.color} />
                </animated.span>
            )
          }
        </div>
        <div
          className='text'
          onClick={() => setSelectedTodo(todo)}
        >
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
        <div className='delete-todo' onClick={() => handleDelete(todo)}>
          {
            (todo.checked || hover) &&
            <span>
              <Trash />
            </span>
          }
        </div>
      </div>
    </animated.div>
  )
}

export default Todo;