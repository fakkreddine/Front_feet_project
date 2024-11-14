import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
function Cal() {
  return (
    <div className='w-full h-full '> <FullCalendar 
    plugins={[ dayGridPlugin ]}
    initialView="dayGridMonth"
    weekends={false}
    events={[
      { title: 'event 1', date: '2024-11-13' },
      { title: 'event 2', date: '2024-11-13' }
    ]}
  /></div>
  )
}

export default Cal