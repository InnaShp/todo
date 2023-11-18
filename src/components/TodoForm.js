import React from 'react'
import { Bell, CalendarDay, Clock, Palette, X } from 'react-bootstrap-icons';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';


const TodoForm = ({
  handleSubmit,
  heading = false,
  text, setText,
  day, setDay,
  time, setTime,
  todoProject, setTodoProject,
  projects,
  showButtons = false,
  setShowModal = false
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit} className='TodoForm'>
        <div className='text'>
          {
            heading &&
            <h3>{heading}</h3>
          }
          <input
            type='text'
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder='To do ...'
            autoFocus
          />
        </div>
        <div className='remind'>
          <Bell />
          <p>Remind Me</p>
        </div>
        <div className='pick-day'>
          <div className='title'>
            <CalendarDay />
            <p>Choose a day</p>
          </div>
          <MobileDatePicker
            value={day}
            onChange={day => setDay(day)}
          />
        </div>
        <div className='pick-time'>
          <div className='title'>
            <Clock />
            <p>Choose time</p>
          </div>
          <MobileTimePicker
            value={time}
            onChange={time => setTime(time)}
          />
        </div>
        <div className='pick-project'>
          <div className='title'>
            <Palette />
            <p>Choose a project</p>
          </div>
          <div className='projects'>
            {
              projects.map(project =>
                <div 
                  className={`project ${todoProject === project.name ? 'active' : ''}`} 
                  key={project.id}
                  onClick={() => setTodoProject(project.name)}
                >
                  {project.name}
                </div>
              )
            }
          </div>
        </div>
        {
          showButtons &&
          <div>
            <div className='cancel' onClick={() => setShowModal(false)}>
              <X size={40} />
            </div>
            <div className='confirm'>
              <button>+ Add to do</button>
            </div>
          </div>
        }
      </form>
    </LocalizationProvider>
  )
}

export default TodoForm;