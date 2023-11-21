import React, { useContext } from 'react';
import { Calendar2Date, CaretUp } from 'react-bootstrap-icons';
import { calendarItems } from '../constants';
import { TodoContext } from '../context'

const Calendar = () => {
  const { setSelectedProject } = useContext(TodoContext);

  return (
    <div className='Calendar'>
      <div className='header'>
        <div className='title'>
          <Calendar2Date size='18' />
          <p>Calendar</p>
        </div>
        <div className='btns'>
          <span className='title'>
            <CaretUp size='20' />
          </span>
        </div>
      </div>
      <div className='items'>
        {
          calendarItems.map(item =>
            <div
              className='item'
              key={item}
              onClick={() => setSelectedProject(item)}
            >
              {item}
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Calendar;