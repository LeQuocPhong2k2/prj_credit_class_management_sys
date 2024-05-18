import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import rrulePlugin from '@fullcalendar/rrule'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import Cookies from 'cookie-universal'

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
      title: 'Toán',
      startRecur: '2024-05-01',
      endRecur: '2024-06-01',
      daysOfWeek: [1],
      startTime: '06:00:00',
      endTime: '10:00:00',
      extendedProps: {
        room: 'A101',
        instructor: 'Nguyễn Văn A'
      }
    }
  ]

  const eveningEvents = [
    {
      title: 'Lịch Học 2',
      start: '2024-05-18T14:00:00',
      end: '2024-05-18T16:00:00'
    }
  ]

  const eventContent = (arg) => {
    return (
      <>
        <div>{arg.timeText}</div>
        <div>{arg.event.title}</div>
        <div>Phòng: {arg.event.extendedProps.room}</div>
        <div>Giảng viên: {arg.event.extendedProps.instructor}</div>
      </>
    )
  }

  return (
    <div className='grid grid-flow-row pt-4 pl-40 pr-40 text-color-wrapper'>
      <div>
        <span className='font-semibold'>Lịch học</span>
      </div>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin, rrulePlugin]}
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
    </div>
  )
}
