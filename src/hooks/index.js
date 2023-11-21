import { useEffect, useState } from 'react';
import firebaseDB from '../firebase';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import moment from 'moment';

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

export function useFilterTodos(todos, selectedProject) {
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    let data;
    const todayDateFormated = moment().format('MM/DD/YYYY');

    if (selectedProject === 'today') {
      data = todos.filter(todo => todo.date === todayDateFormated)
    } else if (selectedProject === 'next 7 days') {
      data = todos.filter(todo => {
        const todoDate = moment(todo.date, 'MM/DD/YYYY');
        const todayDate = moment(todayDateFormated, 'MM/DD/YYYY');
        const diffDays = todoDate.diff(todayDate, 'days');

        return diffDays > 0 && diffDays < 7;
      })
    } else if (selectedProject === 'all days') {
      data = todos;
    } else {
      data = todos.filter(todo => todo.projectName === selectedProject);
    }
    setFilteredTodos(data);
  }, [todos, selectedProject])
  return filteredTodos;
}

export function useProjects(todos) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsCol = collection(firebaseDB, 'projects');
        const projectsSnapshot = await getDocs(projectsCol);
        const data = projectsSnapshot.docs.map(doc => {
          return {
            id: doc.id,
            name: doc.data().name
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

export function useProjectWithStats(projects, todos) {
  const [projectWithStats, setProjectWithStats] = useState([]);

  useEffect(() => {
    const data = projects.map((project) => {
      return {
        numOfTodos: todos.filter(todo => todo.projectName === project.name && !todo.checked).length,
        ...project
      }
    })
    setProjectWithStats(data);
  }, [projects, todos]);
  return projectWithStats;
}
