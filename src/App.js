import './App.css';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import User from './components/User';
import Calendar from './components/Calendar';
import AddNewTodo from './components/AddNewTodo';
import Projects from './components/Projects';
import Todos from './components/Todos';
import EditTodo from './components/EditTodo';

const App = () => {
  return (
    <div className="App">
      <Sidebar>
        <User />
        <AddNewTodo />
        <Calendar />
        <Projects />
      </Sidebar>
      <Main>
        <Todos />
        <EditTodo />
      </Main>
    </div>
  );
}

export default App;
