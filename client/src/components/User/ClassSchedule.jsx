import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import Cookies from 'cookie-universal'
import { backdropClasses } from '@mui/material'

export default function ClassSchedule() {
  const cookies = Cookies()
  if (!cookies.get('accses_token')) {
    window.location.href = '/login'
  }
  useEffect(() => {
    document.title = 'Lịch học theo tuần'
  }, [])

  // const events = [
  //   {
  //     title: 'Buổi Sáng',
  //     startTime: '06:00:00',
  //     endTime: '12:00:00',
  //     daysOfWeek: [1, 2, 3, 4, 5], // Thứ 2 đến Thứ 6
  //     display: 'background'
  //   },
  //   {
  //     title: 'Chiều Tối',
  //     startTime: '13:00:00',
  //     endTime: '18:00:00',
  //     daysOfWeek: [1, 2, 3, 4, 5], // Thứ 2 đến Thứ 6
  //     display: 'background'
  //   }
  // ]
  const morningEvents = [
    {
      title: 'Anh Văn',
      start: '2024-05-18T06:00:00',
      end: '2024-05-18T10:00:00'
    },
    {
      title: 'Toán',
      start: '2024-05-18T10:30:00',
      end: '2024-05-18T12:30:00'
    }
    // Thêm các sự kiện khác cho buổi sáng tại đây
  ]

  // Sự kiện cho buổi chiều
  const eveningEvents = [
    {
      title: 'Lịch Học 2',
      start: '2024-05-18T14:00:00',
      end: '2024-05-18T16:00:00'
    }
    // Thêm các sự kiện khác cho buổi chiều tại đây
  ]

  const eventContent = (arg) => {
    return (
      <>
        <div>{arg.timeText}</div>
        <div>{arg.event.title}</div>
      </>
    )
  }

  return (
    <div className='grid grid-flow-row pt-4 pl-40 pr-40 text-color-wrapper'>
      <div>
        <span className='font-semibold'>Lịch học</span>
      </div>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView='timeGridWeek'
        slotMinTime='06:00:00'
        slotMaxTime='18:00:00'
        events={[...morningEvents, ...eveningEvents]}
        eventContent={eventContent}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,timeGridDay'
        }}
        height='auto'
      />
      {/* <div className='grid grid-cols-12'>
        <div className='w-4 flex justify-center items-center'>
          <h2>Buổi Sáng</h2>
        </div>
        <div className='col-span-10'>
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView='timeGridWeek'
            slotMinTime='06:00:00'
            slotMaxTime='12:00:00'
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'timeGridWeek,timeGridDay'
            }}
            height='auto'
          />
        </div>
      </div>
      <div className='grid grid-cols-12'>
        <div className='w-4 flex justify-center items-center'>
          <h2>Buổi Sáng</h2>
        </div>
        <div className='col-span-10'>
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView='timeGridWeek'
            slotMinTime='06:00:00'
            slotMaxTime='12:00:00'
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'timeGridWeek,timeGridDay'
            }}
            height='auto'
          />
        </div>
      </div> */}
    </div>
  )
}
