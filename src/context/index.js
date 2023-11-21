import React, { createContext, useState } from 'react';
import { useFilterTodos, useProjectWithStats, useProjects, useTodos } from '../hooks';

const TodoContext = createContext();

function TodoContextProvider({ children }) {
  const defaultProject = 'today';
  const [selectedProject, setSelectedProject] = useState(defaultProject);
  const [selectedTodo, setSelectedTodo] = useState(undefined);

  const todos = useTodos();
  const projects = useProjects();
  const projectWithStats = useProjectWithStats(projects, todos)
  const filteredTodos = useFilterTodos(todos, selectedProject);

  return (
    <TodoContext.Provider
      value={
        {
          defaultProject,
          selectedProject,
          setSelectedProject,
          todos: filteredTodos,
          projects: projectWithStats,
          selectedTodo, 
          setSelectedTodo
        }
      }
    >
      {children}
    </TodoContext.Provider>
  )
}

export { TodoContextProvider, TodoContext };