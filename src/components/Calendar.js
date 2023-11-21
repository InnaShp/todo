import React, { useContext, useState } from 'react';
import { Calendar2Date, CaretUp } from 'react-bootstrap-icons';
import { calendarItems } from '../constants';
import { TodoContext } from '../context'
import { useSpring, animated } from 'react-spring';

const Calendar = () => {
  const { setSelectedProject } = useContext(TodoContext);
  const [showMenu, setShowMenu] = useState(true);

  const spin = useSpring({
    transform: showMenu ? 'rotate(0deg)' : 'rotate(180deg)',
    config: { friction: 12 }
  });

  const menuAnimation = useSpring({
    display: showMenu ? 'block' : 'none',
    lineHeight: showMenu ? 1.2 : 0
  })

  return (
    <div className='Calendar'>
      <div className='header'>
        <div className='title'>
          <Calendar2Date size='18' />
          <p>Calendar</p>
        </div>
        <animated.div
          className='btns'
          style={spin}
          onClick={() => setShowMenu(!showMenu)}
        >
          <span className='title'>
            <CaretUp size='20' />
          </span>
        </animated.div>
      </div>
      <animated.div className='items' style={menuAnimation}>
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
      </animated.div>
    </div>
  )
}

export default Calendar;