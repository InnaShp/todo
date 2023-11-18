import { useEffect, useState } from 'react';
import firebaseDB from '../firebase';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

export function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todosCol = collection(firebaseDB, 'todos');
        const todosSnapshot = await getDocs(todosCol);
        const data = todosSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    const unsubscribe = onSnapshot(collection(firebaseDB, 'todos'), () => {
      fetchData();
    });
    return () => unsubscribe();
  }, []);

  return todos;
}

export function useProjects(todos) {
  const [projects, setProjects] = useState([]);

  function calculateNumOfTodos(projectName, todos) {
    return todos.filter(todo => todo.projectName === projectName).length;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsCol = collection(firebaseDB, 'projects');
        const projectsSnapshot = await getDocs(projectsCol);
        const data = projectsSnapshot.docs.map(doc => {
          const projectName = doc.data().name;
          return {
            id: doc.id,
            name: projectName,
            numOfTodos: calculateNumOfTodos(projectName, todos)
          };
        });
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    const unsubscribe = onSnapshot(collection(firebaseDB, 'projects'), () => {
      fetchData();
    });
    return () => unsubscribe();
  }, [todos]);

  return projects;
}
